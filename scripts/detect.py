#!/usr/bin/env python3
"""Unrushed detector: objective checks on an exported video.

Finds the AI tells that do not need judgment, and gives evidence for the ones that do:
  - dips to black (and, with --white, dips to white)
  - frozen stretches: nothing changes anywhere in the frame for a while
    (a small moving cursor or a single word entering counts as change)
  - hard cuts, and the average shot length
  - with --storyboard: the planned rhythm, read from STORYBOARD.md (scene
    lengths that are all alike, designed transitions repeated back to back or
    more than 1-3 per minute), the Never ship items in the plan (counters, URLs,
    slogan copy, numbers missing from VIDEO.md, page furniture named in the
    visual column), and the cue sheet's budgets (reasons, tier C, stylize looks, zooms per minute,
    the same library transition three times, zooms colliding with
    transitions, stacked distortions; see references/effects.md)

  - with --sheet: a contact sheet of evenly spaced frames with timecodes, to describe
    every frame in one sentence before judging
  - with --strip and --profile: consecutive frames as one image, and the per-frame change of a
    movement, to judge physics (deceleration, dead stops, settle) where single stills cannot

Requires ffmpeg and ffprobe on PATH. Prints a readable summary, or JSON with --json.

Usage:
  python detect.py video.mp4
  python detect.py video.mp4 --json
  python detect.py --storyboard STORYBOARD.md        (check the plan before building)
  python detect.py video.mp4 --sheet 16              (contact sheet of 16 frames with timecodes)
  python detect.py video.mp4 --strip 12.4             (12 consecutive frames as one image, to judge physics)
  python detect.py video.mp4 --profile 12.0 13.2      (per-frame change: a rough speed curve with a reading)
  python detect.py video.mp4 --white --cut-threshold 0.35 --freeze-seconds 2 --still-level 1.5
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys

try:
    import numpy as np  # optional: makes the motion analysis about ten times faster
except ImportError:
    np = None


def run_ffmpeg_filter(path, vf):
    """Run ffmpeg with a video filter and return its stderr, where filters log."""
    cmd = ["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-vf", vf, "-an", "-f", "null", "-"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"ffmpeg failed:\n{result.stderr[-2000:]}")
    return result.stderr


def duration_of(path):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration",
           "-of", "default=noprint_wrappers=1:nokey=1", path]
    out = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
    try:
        return float(out)
    except ValueError:
        sys.exit(f"Could not read the duration of {path}. Is it a video file?")


def dips(path, min_seconds, pixel_threshold, white=False):
    """Stretches where nearly the whole frame is black (or white, by negating first).

    For white, the frame must be almost completely flat (99.5% of pixels), because
    pieces on a light ground (paper, cream) legitimately show mostly-empty frames.
    """
    vf = f"blackdetect=d={min_seconds}:pix_th={pixel_threshold}"
    if white:
        vf = f"negate,blackdetect=d={min_seconds}:pix_th={pixel_threshold}:pic_th=0.995"
    log = run_ffmpeg_filter(path, vf)
    found = []
    for m in re.finditer(r"black_start:([\d.]+)\s+black_end:([\d.]+)\s+black_duration:([\d.]+)", log):
        start, end, dur = (float(x) for x in m.groups())
        found.append({"start": round(start, 2), "end": round(end, 2), "duration": round(dur, 2)})
    return found


SAMPLE_W, SAMPLE_H, BLOCK = 320, 180, 10  # analysis grid: 32 x 18 blocks of 10 x 10 px


def sample_frames(path, fps):
    """Grey frames at low resolution and `fps`, as a list of bytes objects."""
    cmd = ["ffmpeg", "-hide_banner", "-nostats", "-loglevel", "error", "-i", path,
           "-vf", f"fps={fps},scale={SAMPLE_W}:{SAMPLE_H},format=gray", "-f", "rawvideo", "-"]
    data = subprocess.run(cmd, capture_output=True).stdout
    size = SAMPLE_W * SAMPLE_H
    return [data[i:i + size] for i in range(0, len(data) - size + 1, size)]


def block_means(frame):
    """Mean brightness of each 10 x 10 block. Averaging hides moving grain but keeps real motion."""
    if np is not None:
        a = np.frombuffer(frame, dtype=np.uint8).reshape(SAMPLE_H // BLOCK, BLOCK, SAMPLE_W // BLOCK, BLOCK)
        return a.mean(axis=(1, 3)).ravel()
    cols, rows = SAMPLE_W // BLOCK, SAMPLE_H // BLOCK
    out = []
    for by in range(rows):
        for bx in range(cols):
            total = 0
            for y in range(by * BLOCK, (by + 1) * BLOCK):
                row = y * SAMPLE_W + bx * BLOCK
                total += sum(frame[row:row + BLOCK])
            out.append(total / (BLOCK * BLOCK))
    return out


def changed_fraction(a, b, level):
    """Share of blocks whose mean brightness moved by more than `level` (0-255)."""
    if np is not None:
        return float((np.abs(a - b) > level).mean())
    return sum(1 for x, y in zip(a, b) if abs(x - y) > level) / len(a)


def activity(path, fps=10, level=1.0):
    """Per sample: share of blocks changed since the previous sample."""
    means = [block_means(f) for f in sample_frames(path, fps)]
    return [0.0] + [changed_fraction(means[i - 1], means[i], level) for i in range(1, len(means))]


def frame_rate(path):
    cmd = ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
           "-of", "default=noprint_wrappers=1:nokey=1", path]
    out = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
    try:
        num, den = out.split("/")
        return float(num) / float(den)
    except (ValueError, ZeroDivisionError):
        return 30.0


def frame_strip(path, start, count, out):
    """Write `count` consecutive frames from `start` (seconds) as one image, left to right, top to bottom."""
    cols = min(count, 6)
    rows = (count + cols - 1) // cols
    vf = f"select='lt(n\\,{count})',scale=360:-2,tile={cols}x{rows}:padding=6:color=0x808080"
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", str(start), "-i", path,
           "-vf", vf, "-frames:v", "1", out]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"ffmpeg failed:\n{result.stderr[-2000:]}")
    return out


FONT_CANDIDATES = ["/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", "/System/Library/Fonts/Menlo.ttc",
                   "/System/Library/Fonts/Supplemental/Courier New.ttf", "C:/Windows/Fonts/consola.ttf"]


def contact_sheet(path, count, out, times=None):
    """One image with `count` frames spread evenly over the video (or at `times`), timecode burned in, 4 per row.

    Describe every frame in one sentence before judging the piece (SKILL.md, "Looking honestly").
    """
    fps = frame_rate(path)
    total = duration_of(path)
    if times is None:
        times = [total * (i + 0.5) / count for i in range(count)]
    frames = sorted({max(0, int(round(t * fps))) for t in times})
    select = "+".join(f"eq(n\\,{n})" for n in frames)
    cols = min(4, len(frames))
    rows = (len(frames) + cols - 1) // cols
    font = next((f for f in FONT_CANDIDATES if os.path.exists(f)), None)
    label = (f",drawtext=fontfile='{font}':text='%{{pts\\:hms}}':x=8:y=8:fontsize=18:fontcolor=white:"
             "box=1:boxcolor=black@0.6:boxborderw=4") if font else ""
    vf = f"select='{select}',scale=480:-2{label},tile={cols}x{rows}:padding=6:color=0x808080"
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", path, "-vf", vf,
           "-fps_mode", "passthrough", "-frames:v", "1", out]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"ffmpeg failed:\n{result.stderr[-2000:]}")
    return {"path": out, "times": [round(n / fps, 2) for n in frames]}


def motion_profile(path, start, end):
    """Per-frame change between consecutive frames at the video's own frame rate, and what its shape suggests.

    The change between two frames grows with how far things moved, so the sequence of values is a rough
    speed curve: big steps then smaller ones is a deceleration; equal steps are linear; a high last step
    before stillness is a dead stop. It measures the whole frame, so isolate the movement by choosing
    the time window well. Read it as a hint, and confirm with --strip or by watching.
    """
    fps = frame_rate(path)
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-ss", str(start), "-t", str(max(0.04, end - start)),
           "-i", path, "-vf", f"scale={SAMPLE_W}:{SAMPLE_H},format=gray", "-f", "rawvideo", "-"]
    data = subprocess.run(cmd, capture_output=True).stdout
    size = SAMPLE_W * SAMPLE_H
    frames = [data[i:i + size] for i in range(0, len(data) - size + 1, size)]
    diffs = []
    for a, b in zip(frames, frames[1:]):
        if np is not None:
            d = float(np.abs(np.frombuffer(a, np.uint8).astype(np.int16) - np.frombuffer(b, np.uint8).astype(np.int16)).mean())
        else:
            d = sum(abs(x - y) for x, y in zip(a, b)) / size
        diffs.append(round(d, 3))
    out = {"start": start, "end": end, "fps": round(fps, 3), "steps": diffs, "reading": []}
    if not diffs or max(diffs) < 0.05:
        out["reading"].append("No visible motion in this window.")
        return out
    peak = max(diffs)
    active = [i for i, d in enumerate(diffs) if d > 0.12 * peak]
    seg = diffs[active[0]:active[-1] + 1]
    out["moving_frames"] = len(seg)
    third = max(1, len(seg) // 3)
    first, last = sum(seg[:third]) / third, sum(seg[-third:]) / third
    mean = sum(seg) / len(seg)
    cv = (sum((d - mean) ** 2 for d in seg) / len(seg)) ** 0.5 / mean if mean else 0
    if len(seg) < 4:
        out["reading"].append(f"Only {len(seg)} moving frames: a cut, a jump or a very fast move.")
    elif last < 0.5 * first:
        out["reading"].append("Steps shrink toward the end: it decelerates (an ease-out arrival).")
    elif last > 2 * first:
        out["reading"].append("Steps grow toward the end: it accelerates (an ease-in exit, or an arrival that never slows).")
    elif cv < 0.25:
        out["reading"].append("Steps stay nearly equal: constant speed, which reads as linear and mechanical.")
    else:
        out["reading"].append("Steps rise then fall: it eases in and out.")
    tail_end = active[-1]
    if tail_end + 1 < len(diffs) and diffs[tail_end] >= 0.5 * peak:
        out["reading"].append(f"The last moving step is {diffs[tail_end] / peak:.0%} of the peak and then motion stops: "
                              "a dead stop, with no settle or follow-through.")
    after = diffs[diffs.index(peak) + 1:]
    bumps = sum(1 for i in range(1, len(after) - 1) if after[i] > after[i - 1] and after[i] > after[i + 1]
                and after[i] > 0.15 * peak)
    if bumps:
        out["reading"].append(f"{bumps} smaller rise(s) after the peak: a settle, overshoot or secondary motion "
                              "(or another element starting). Check the strip.")
    return out


def read_tables(path):
    """Every markdown table in a file, as (header, rows) pairs."""
    tables, header, rows = [], None, []
    for line in open(path, encoding="utf-8"):
        if not line.strip().startswith("|"):
            if header is not None:
                tables.append((header, rows))
            header, rows = None, []
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if header is None:
            header = [c.lower() for c in cells]
            continue
        if set("".join(cells)) <= set("-: "):
            continue
        rows.append(dict(zip(header, cells)))
    if header is not None:
        tables.append((header, rows))
    return tables


# Library names by family, for the budget checks in references/effects.md.
STYLIZE = {"ascii rain", "body landmarks", "cartoon", "color distance", "color halftone", "crt retro", "dither",
           "edge glow", "emboss", "face laser eyes", "glow", "hair regions", "hand landmarks", "heat map",
           "laser eyes", "ndvi false color", "person regions", "photocopy", "posterize", "primary colors",
           "rgb split", "sobel edges", "soft glow", "three-level threshold", "threshold", "two-level threshold",
           "tilt-shift", "mosaic blur", "analog tv sync"}
# Looks that work as mattes or explanations do not count as a stylize look.
NOT_A_LOOK = {"person regions", "hair regions", "color distance", "body landmarks", "hand landmarks", "sobel edges"}
DISTORT = {"lens distortion", "dome magnifier", "magnifying glass", "corner pin", "elastic scale", "analog tv sync",
           "camera shake", "lens correction"}


def _num(text):
    m = re.search(r"-?\d+(?:\.\d+)?", text or "")
    return float(m.group(0)) if m else None


def _col(header, *prefixes):
    return next((h for h in header if any(h.startswith(p) for p in prefixes)), None)


def storyboard_rhythm(path):
    """Scene lengths and transitions from STORYBOARD.md, and checks on its cue sheet."""
    tables = read_tables(path)
    scene = next(((h, r) for h, r in tables if _col(h, "dur") and _col(h, "transition")), None)
    cue = next(((h, r) for h, r in tables if _col(h, "kind") and _col(h, "library")), None)
    out = {"scene_lengths": [], "repeated_transitions": []}
    if scene:
        header, rows = scene
        dur_key, tr_key = _col(header, "dur"), _col(header, "transition")
        lengths = []
        for r in rows:
            m = re.search(r"([\d.]+)\s*s", r.get(dur_key, ""))
            if m:
                lengths.append(float(m.group(1)))
        out["scene_lengths"] = lengths
        if len(lengths) >= 4:
            mean = sum(lengths) / len(lengths)
            sd = (sum((x - mean) ** 2 for x in lengths) / len(lengths)) ** 0.5
            out["variation"] = round(sd / mean, 2)
            out["distinct_lengths"] = len({round(x) for x in lengths})
        kinds = [r.get(tr_key, "").split("→")[-1].strip().lower() for r in rows]
        # Hard cuts are the default join, so a run of cuts is healthy. Only
        # designed transitions (anything that is not a plain cut) may not repeat.
        plain = lambda k: (not k) or k in {"cut", "hard cut", "-", "—", "none"} or k.startswith(("cut ", "hard cut", "match"))
        designed = [None if plain(k) else k for k in kinds]
        out["transition_kinds"] = len({k for k in designed if k})
        out["designed_transitions"] = sum(1 for k in designed if k)
        out["repeated_transitions"] = [i + 1 for i in range(1, len(designed)) if designed[i] and designed[i] == designed[i - 1]]
    out["never_ship"] = plan_lint(path)
    out["information"] = information_checks(scene)
    if cue:
        out["cues"] = cue_checks(*cue, total_seconds=sum(out["scene_lengths"]) or None, fps=_fps(path))
    return out


def _fps(path):
    m = re.search(r"frame rate\*{0,2}\s*:?\s*\*{0,2}\s*(\d+(?:\.\d+)?)", open(path, encoding="utf-8").read(), re.I)
    return float(m.group(1)) if m else None


def cue_checks(header, rows, total_seconds=None, fps=None):
    """Budgets and stacking rules from references/effects.md, applied to the cue sheet."""
    k = {name: _col(header, *pre) for name, pre in {
        "id": ("cue",), "kind": ("kind",), "name": ("library",), "from": ("from",), "frames": ("frames",),
        "why": ("why",), "tier": ("tier",), "target": ("target",)}.items()}
    cues = []
    for r in rows:
        name = r.get(k["name"], "").strip().lower()
        kind = r.get(k["kind"], "").strip().lower()
        if not name and not kind:
            continue
        cues.append({"id": r.get(k["id"], "") or f"row {len(cues) + 1}", "kind": kind, "name": name,
                     "from": _num(r.get(k["from"], "")), "frames": _num(r.get(k["frames"], "")),
                     "why": r.get(k["why"], "").strip(), "tier": r.get(k["tier"], "").strip().upper(),
                     "target": r.get(k["target"], "").strip().lower()})
    flags = []
    for c in cues:
        if not c["why"]:
            flags.append(f"{c['id']} ({c['name'] or c['kind']}) has no reason. Every cue needs one.")
        if not c["tier"]:
            flags.append(f"{c['id']} ({c['name'] or c['kind']}) has no tier.")
    tier_c = [c["id"] for c in cues if c["tier"].startswith("C")]
    if len(tier_c) > 1:
        flags.append(f"{len(tier_c)} tier C cues ({', '.join(tier_c)}); the budget is one.")
    looks = sorted({c["name"] for c in cues if c["kind"] == "effect" and c["name"] in STYLIZE - NOT_A_LOOK})
    if len(looks) > 2:
        flags.append(f"{len(looks)} stylize looks ({', '.join(looks)}); the budget is two per piece.")
    zooms = [c for c in cues if c["kind"] == "zoom"]
    per_minute = None
    if total_seconds and zooms:
        per_minute = round(len(zooms) / total_seconds * 60, 1)
        if per_minute > 7.5:
            flags.append(f"{per_minute} zooms per minute. In a talking head aim for one every 8–12 s; "
                         "screen recordings may use more.")
    trans = sorted((c for c in cues if c["kind"] == "transition" and c["from"] is not None), key=lambda c: c["from"])
    for i in range(2, len(trans)):
        if trans[i]["name"] and trans[i]["name"] == trans[i - 1]["name"] == trans[i - 2]["name"]:
            flags.append(f"{trans[i]['name'].title()} on three cuts in a row (ending at {trans[i]['id']}).")
    timed = [c for c in cues if c["from"] is not None]
    window = 10
    for z in (c for c in timed if c["kind"] == "zoom"):
        z_end = z["from"] + (z["frames"] or 0)
        for t in (c for c in timed if c["kind"] == "transition"):
            t_end = t["from"] + (t["frames"] or 0)
            if t["from"] - window <= z_end and z["from"] <= t_end + window:
                flags.append(f"{z['id']} (zoom) and {t['id']} ({t['name']}) fall within {window} frames of each other.")
    dist = [c for c in timed if c["kind"] == "effect" and c["name"] in DISTORT and c["frames"]]
    for i, a in enumerate(dist):
        for b in dist[i + 1:]:
            if a["from"] < b["from"] + b["frames"] and b["from"] < a["from"] + a["frames"]:
                flags.append(f"{a['id']} ({a['name']}) and {b['id']} ({b['name']}) are stacked distortions.")
    return {"count": len(cues), "zooms": len(zooms), "zooms_per_minute": per_minute, "tier_c": tier_c,
            "stylize_looks": looks, "flags": flags}


def still_stretches(step, fps, min_seconds):
    """Runs of samples where not a single block changed."""
    found, start = [], None
    for i, v in enumerate(step + [1.0]):
        if v == 0 and i > 0:
            start = i if start is None else start
        elif start is not None:
            dur = (i - start) / fps
            if dur >= min_seconds:
                end = i / fps if i < len(step) else None
                item = {"start": round((start - 1) / fps, 2), "end": round(end, 2) if end is not None else None}
                if end is not None:
                    item["duration"] = round(end - (start - 1) / fps, 2)
                found.append(item)
            start = None
    return found


def cuts(path, threshold):
    """Frames whose content changes abruptly from the previous one."""
    log = run_ffmpeg_filter(path, f"select='gt(scene,{threshold})',showinfo")
    return [round(float(t), 2) for t in re.findall(r"pts_time:([\d.]+)", log)]


# ---------------------------------------------------------------------------------------------------------------
# Gates: numbers computed on the finished file, from any tool (ChatCut, Remotion, After Effects, an editor export).
# A fail is fixed, never argued. Thresholds follow the measurements of the motionmaxxing project
# (Apache-2.0, github.com/Tejashmakwana/motionmaxxing); this is our own implementation.
GATE_W, GATE_H = 96, 54       # analysis frame (luma)
FLAT_STD, FLAT_RANGE = 1.5, 8  # a frame with less spread than this is one flat field
HOLD_EPS = 0.35               # mean |frame diff| (0-255) under which the picture counts as unchanged
HUMAN_MOTION = (4.4, 6.8, 9.8)  # mean frame-to-frame change of human-made films: 25th, 50th, 75th percentile


def frame_stats(path):
    """Per frame at the video's own rate: brightness spread (std, range) and change from the previous frame."""
    cmd = ["ffmpeg", "-hide_banner", "-nostats", "-loglevel", "error", "-i", path,
           "-vf", f"scale={GATE_W}:{GATE_H}:flags=area,format=gray", "-f", "rawvideo", "-"]
    data = subprocess.run(cmd, capture_output=True).stdout
    size = GATE_W * GATE_H
    frames = [data[i:i + size] for i in range(0, len(data) - size + 1, size)]
    stats, prev = [], None
    for f in frames:
        if np is not None:
            a = np.frombuffer(f, np.uint8).astype(np.int16)
            std, rng = float(a.std()), int(a.max() - a.min())
            diff = float(np.abs(a - prev).mean()) if prev is not None else 0.0
            prev = a
        else:
            vals = list(f)
            mean = sum(vals) / size
            std = (sum((v - mean) ** 2 for v in vals) / size) ** 0.5
            rng = max(vals) - min(vals)
            diff = sum(abs(x - y) for x, y in zip(vals, prev)) / size if prev is not None else 0.0
            prev = vals
        stats.append((std, rng, diff))
    return stats


def audio_report(path):
    """Loudness, true peak and silence at the end, or None when the file has no sound."""
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index",
                            "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip()
    if not probe:
        return None
    cmd = ["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-vn",
           "-af", "ebur128=peak=true,silencedetect=n=-50dB:d=0.5", "-f", "null", "-"]
    log = subprocess.run(cmd, capture_output=True, text=True).stderr
    out = {}
    summary = log[log.rfind("Summary:"):] if "Summary:" in log else log
    m = re.search(r"I:\s*(-?[\d.]+|-inf)\s*LUFS", summary)
    out["lufs"] = float(m.group(1)) if m and m.group(1) != "-inf" else None
    m = re.search(r"True peak:\s*Peak:\s*(-?[\d.]+|-inf)", summary)
    out["true_peak"] = float(m.group(1)) if m and m.group(1) != "-inf" else None
    starts = [float(x) for x in re.findall(r"silence_start:\s*(-?[\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"silence_end:\s*([\d.]+)", log)]
    total = duration_of(path)
    tail = 0.0
    if starts and len(starts) > len(ends):        # silence runs to the end of the file
        tail = total - starts[-1]
    out["silent_tail"] = round(max(0.0, tail), 2)
    out["silent"] = out["lufs"] is None or out["lufs"] < -60
    return out


def compute_gates(path, total, cut_times, expect=None, expect_tol=0.15, expect_audio=False, hold_max=1.4):
    fps = frame_rate(path)
    st = frame_stats(path)
    n = len(st)
    gates, notes = {}, []
    if n == 0:
        gates["G0 piece exists"] = ("FAIL", "no frame could be decoded")
        return {"gates": gates, "notes": notes}
    content = sum(1 for sd, rg, _ in st if sd >= FLAT_STD or rg >= FLAT_RANGE) / n
    moving = sum(1 for *_, d in st[1:] if d > HOLD_EPS) / max(1, n - 1)
    problems = []
    if content < 0.05:
        problems.append(f"blank: only {content:.0%} of frames have any picture")
    if moving < 0.05:
        problems.append(f"barely moves: {moving:.0%} of frames change")
    if expect is not None and abs(total - expect) > expect_tol:
        problems.append(f"length {total:.2f} s, planned {expect:.2f} s")
    audio = audio_report(path)
    if expect_audio and audio is None:
        problems.append("no sound track")
    elif expect_audio and audio["silent"]:
        problems.append("the sound track is silent")
    gates["G0 piece exists"] = ("FAIL" if problems else "PASS",
                                "; ".join(problems) or f"{n} frames, {content:.0%} with picture, {moving:.0%} changing")

    runs, start = [], None
    for i, (sd, rg, _) in enumerate(st + [(99, 99, 0)]):
        flat = sd < FLAT_STD and rg < FLAT_RANGE
        if flat and start is None:
            start = i
        elif not flat and start is not None:
            if i - start > 3:
                runs.append((round(start / fps, 2), i - start))
            start = None
    gates["G2 no empty frames"] = ("FAIL" if runs else "PASS",
                                   ", ".join(f"{k} flat frames from {t}s" for t, k in runs) if runs
                                   else "no run of more than 3 flat frames")

    hold = 0
    for *_, d in reversed(st[1:]):
        if d >= HOLD_EPS:
            break
        hold += 1
    hold_s = round(hold / fps, 2)
    final_shot = round(total - cut_times[-1], 2) if cut_times else None
    share = final_shot / total if final_shot is not None and total else None
    problems = []
    if hold_s > hold_max:
        problems.append(f"the last {hold_s} s do not change (max {hold_max} s)")
    if share is not None and share > 0.25:
        problems.append(f"the final shot is {final_shot} s, {share:.0%} of the piece (max 25%)")
    detail = f"end hold {hold_s} s" + (f", final shot {final_shot} s ({share:.0%})" if share is not None else ", no cuts found")
    gates["G3 short ending"] = ("FAIL" if problems else "PASS", "; ".join(problems) or detail)
    if hold_s < 0.6:
        notes.append(f"The end hold is {hold_s} s: the piece ends mid-motion. Fine when intended; a resolved ending holds 0.6-1.4 s.")

    motion = sum(d for *_, d in st[1:]) / max(1, n - 1)
    lo, mid, hi = HUMAN_MOTION
    if motion < lo:
        notes.append(f"Motion {motion:.1f} (human-made films: median {mid}, middle half {lo}-{hi}). "
                     "Below the band: what is alive between beats?")
    elif motion > hi:
        notes.append(f"Motion {motion:.1f} (human-made films: median {mid}, middle half {lo}-{hi}). "
                     "Above the band: is the picture too busy to read?")
    else:
        notes.append(f"Motion {motion:.1f}, inside the human band ({lo}-{hi}). A question, not a gate.")

    if audio:
        if audio["lufs"] is not None and not audio["silent"]:
            line = f"Sound: {audio['lufs']} LUFS, true peak {audio['true_peak']} dBTP"
            if audio["lufs"] < -17 or audio["lufs"] > -11:
                line += "; web and social sit near -14 LUFS"
            if audio["true_peak"] is not None and audio["true_peak"] > -1:
                line += "; the peak is above -1 dBTP and may clip after upload"
            notes.append(line + ".")
        if audio["silent_tail"] > 0.5:
            notes.append(f"The sound goes silent {audio['silent_tail']} s before the end: intended, or a short music file?")
    gates["G1 proof readable"] = ("LOOK", "judge on the contact sheet: UI text at least 4% of the height, the proof large or cropped by the frame")
    gates["G4 one hero per frame"] = ("LOOK", "judge on the contact sheet: one thing the eye goes to first in every frame")
    gates["G5 no page furniture"] = ("LOOK", "judge on the contact sheet, and run --storyboard on the plan")
    order = ["G0 piece exists", "G1 proof readable", "G2 no empty frames", "G3 short ending", "G4 one hero per frame",
             "G5 no page furniture"]
    return {"gates": {k: gates[k] for k in order if k in gates}, "notes": notes, "end_hold": hold_s,
            "final_shot": final_shot, "motion": round(motion, 2), "audio": audio}


def precut_sheet(path, cut_times, out, shown=12):
    """One row per cut: 2 frames before, 1 before, the cut, 1 after. Broken transitions hide just before a cut."""
    fps = frame_rate(path)
    picks = []
    for t in cut_times[:shown]:
        c = int(round(t * fps))
        picks += [max(0, c - 2), max(0, c - 1), c, c + 1]
    if not picks:
        return None
    select = "+".join(f"eq(n\\,{k})" for k in picks)
    rows = len(picks) // 4
    vf = f"select='{select}',scale=320:-2,tile=4x{rows}:padding=4:color=0x808080"
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", path, "-vf", vf,
           "-fps_mode", "passthrough", "-frames:v", "1", out]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return out if result.returncode == 0 else None


def position_label(t, total, edge=1.0):
    if t <= edge:
        return "at the start"
    if t >= total - edge:
        return "at the end"
    return "mid-piece"


def cue_summary(sb):
    c = sb.get("cues")
    if not c:
        return ""
    lines = [f"\nCue sheet: {c['count']} cues, {c['zooms']} zooms"
             + (f" ({c['zooms_per_minute']} per minute)" if c["zooms_per_minute"] is not None else "")
             + f", tier C: {len(c['tier_c'])}, stylize looks: {len(c['stylize_looks'])}"]
    lines += [f"  - {fl}" for fl in c["flags"]] or ["  no cue flags"]
    return "\n".join(lines)


# Never ship, in the plan. Words and furniture that read as AI before anything is built (SKILL.md, "Never ship").
SLOGANS = ["meet ", "introducing", "unlock", "the future of", "supercharge", "seamless", "in seconds",
           "ai-powered", "next-level", "game-changer", "revolutionary", "not just", "effortless"]
FURNITURE = ["counter", "timecode", "progress bar", "crop mark", "kicker", "eyebrow", "tagline", "label chip",
             "chip", "episode", "ep 0", "lower third card", "corner label", "lens flare", "vignette", "status dot",
             "stat slide", "end card", "page number", "tracked caps", "tracked-caps", "left headline",
             "left-aligned headline", "headline left", "header bar", "footer bar"]


def plan_lint(path):
    """Flags Never ship items in a STORYBOARD.md: on-screen text and the visual description of each scene."""
    tables = read_tables(path)
    scene = next(((h, r) for h, r in tables if _col(h, "dur") and _col(h, "transition")), None)
    if not scene:
        return []
    header, rows = scene
    text_key = _col(header, "text")
    visual_keys = [k for k in (_col(header, "visual"), _col(header, "what moves"), _col(header, "device")) if k]
    video_md = os.path.join(os.path.dirname(os.path.abspath(path)), "VIDEO.md")
    facts = open(video_md, encoding="utf-8").read().lower() if os.path.exists(video_md) else None
    out = []
    for i, r in enumerate(rows, 1):
        label = f"scene {r.get('#', i)}"
        text = (r.get(text_key, "") if text_key else "").strip()
        low = text.lower()
        if text and text not in ("—", "-"):
            if re.search(r"\b\d{1,2}\s*[/|]\s*\d{1,2}\b|\b(chapter|episode|ep|part|step)\s*\d+|^\s*\d{2}\s*[—–-]", low):
                out.append(("FAIL", f"{label}: a counter or chapter number on screen ({text[:40]}). Delete it."))
            if re.search(r"https?://|www\.|\b[\w-]+\.(com|io|dev|app|ai|co|org)\b|github\.com|@\w{3,}", low):
                out.append(("FAIL", f"{label}: a URL or handle on screen. Put it in the post copy."))
            hits = [w.strip() for w in SLOGANS if w in low]
            if hits:
                out.append(("FAIL", f"{label}: slogan copy ({', '.join(hits)}). Use the brand's own phrasing or a plain sentence."))
            run = best = 0
            for sentence in re.split(r"[.!?]+", re.sub(r"[\"“”`]", "", text)):
                if not sentence.strip():
                    continue
                run = run + 1 if len(sentence.split()) == 1 else 0
                best = max(best, run)
            if best >= 3:
                out.append(("FAIL", f"{label}: three one-word sentences in a row. One sentence, one claim."))
            for num in re.findall(r"\d[\d.,]*\s*(?:%|x\b|×|k\b|m\b|\+)", low):
                if "[verify]" in low:
                    continue
                if facts is None:
                    out.append(("WARN", f"{label}: the number '{num.strip()}' needs a source in VIDEO.md."))
                elif num.strip().rstrip("+").strip() not in facts:
                    out.append(("FAIL", f"{label}: the number '{num.strip()}' is not in VIDEO.md. Source it or remove it."))
            letters = re.sub(r"[^A-Za-z]", "", text)
            if len(letters) >= 8 and letters.isupper() and not text.strip().startswith(("`", ">")):
                out.append(("WARN", f"{label}: all-caps text ({text[:30]}). If it is a label or tagline, delete it."))
        visual = " ".join(r.get(k, "") for k in visual_keys).lower()
        for w in FURNITURE:
            for m in re.finditer(re.escape(w), visual):
                before = visual[max(0, m.start() - 12):m.start()]
                if re.search(r"\b(no|not|without|never)\b[^.;]*$", before):
                    continue
                out.append(("WARN", f"{label}: '{w}' in the visual plan. Check it against Never ship."))
                break
    return out


def information_checks(scene):
    """What each beat buys and the importance budget (references/narrative.md §5)."""
    if not scene:
        return []
    header, rows = scene
    buys_key, imp_key, beat_key = _col(header, "buys"), _col(header, "importance"), _col(header, "beat")
    out = []
    if not buys_key:
        out.append("The storyboard has no 'Buys' column: write what each beat makes the viewer believe.")
    else:
        empty = [r.get("#", str(i)) for i, r in enumerate(rows, 1) if r.get(buys_key, "").strip() in ("", "—", "-")]
        if empty:
            which = f"Scene {empty[0]} does not" if len(empty) == 1 else f"Scenes {', '.join(empty)} do not"
            out.append(f"{which} say what it buys. Finish the sentence or cut the beat." if len(empty) == 1
                       else f"{which} say what they buy. Finish the sentence or cut the beat.")
    if not imp_key:
        out.append("The storyboard has no 'Importance' column: mark each beat 1, 2 or 3.")
        return out
    levels = [(r, _num(r.get(imp_key, ""))) for r in rows]
    missing = [r.get("#", "?") for r, v in levels if v is None]
    if missing:
        out.append(f"Scene {missing[0]} has no importance." if len(missing) == 1
                   else f"Scenes {', '.join(missing)} have no importance.")
    marked = [v for _, v in levels if v is not None]
    threes = [r.get("#", "?") for r, v in levels if v == 3]
    if marked and len(threes) > max(1, len(marked) // 4):
        out.append(f"{len(threes)} of {len(marked)} beats are importance 3 (scenes {', '.join(threes)}); "
                   f"at most {max(1, len(marked) // 4)}. When everything is emphasised, nothing is.")
    if beat_key:
        payoff = [r for r, v in levels if "payoff" in r.get(beat_key, "").lower()]
        if payoff and not any(v == 3 for r, v in levels if r in payoff):
            out.append("The payoff is not importance 3.")
    if marked and not threes:
        out.append("No beat is importance 3: what is the point of the piece?")
    return out


def storyboard_flags(sb):
    """Rhythm and transition flags for a storyboard, shared by both output modes."""
    flags = []
    if sb.get("variation") is not None and (sb["variation"] < 0.25 or sb["distinct_lengths"] < 3):
        flags.append(f"Storyboard rhythm: {len(sb['scene_lengths'])} scenes with nearly the same length "
                     f"(variation {sb['variation']}, {sb['distinct_lengths']} distinct lengths). See narrative.md.")
    if sb.get("scene_lengths") and sb.get("designed_transitions"):
        minutes = sum(sb["scene_lengths"]) / 60
        limit = max(2, round(3 * minutes))
        if sb["designed_transitions"] > limit:
            flags.append(f"Storyboard: {sb['designed_transitions']} designed transitions; at most {limit} for this length "
                         "(1-3 per minute). Make the rest hard cuts on motion. See transitions.md.")
    for n in sb.get("repeated_transitions", []):
        flags.append(f"Storyboard: scene {n} repeats the previous designed transition. "
                     "Use a hard cut on motion or a different relation. See transitions.md.")
    for msg in sb.get("information", []):
        flags.append(f"Information: {msg} See narrative.md §5.")
    for level, msg in sb.get("never_ship", []):
        flags.append(f"Never ship ({level}): {msg}")
    for fl in sb.get("cues", {}).get("flags", []):
        flags.append(f"Cue sheet: {fl} See effects.md.")
    return flags


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("video", nargs="?", help="the exported video; optional when only --storyboard is checked")
    p.add_argument("--json", action="store_true", help="print JSON instead of a summary")
    p.add_argument("--white", action="store_true", help="also look for dips to white")
    p.add_argument("--dip-seconds", type=float, default=0.1, help="shortest dip to report (default 0.1)")
    p.add_argument("--dip-threshold", type=float, default=0.10,
                   help="how dark a pixel must be to count as black, 0-1 (default 0.10)")
    p.add_argument("--freeze-seconds", type=float, default=2.0, help="shortest freeze to report (default 2)")
    p.add_argument("--storyboard", help="STORYBOARD.md to check the planned rhythm and transitions")
    p.add_argument("--still-level", type=float, default=1.0,
                   help="brightness change (0-255) a 10x10 block needs to count as motion (default 1.0)")
    p.add_argument("--cut-threshold", type=float, default=0.35,
                   help="scene-change score that counts as a hard cut, 0-1 (default 0.35)")
    p.add_argument("--strip", type=float, metavar="SECONDS",
                   help="write consecutive frames from this time as one image, to judge physics")
    p.add_argument("--sheet", type=int, nargs="?", const=16, metavar="N",
                   help="write a contact sheet of N evenly spaced frames with timecodes (default 16)")
    p.add_argument("--expect", type=float, metavar="SECONDS", help="G0: the planned length")
    p.add_argument("--expect-audio", action="store_true", help="G0: the piece must have a sound track that is not silent")
    p.add_argument("--hold-max", type=float, default=1.4, help="G3: longest allowed final hold in seconds (default 1.4)")
    p.add_argument("--strict", action="store_true", help="exit with code 3 when a gate fails")
    p.add_argument("--strip-frames", type=int, default=12, help="how many frames in the strip (default 12)")
    p.add_argument("--out", help="where to write the strip (default: next to the video)")
    p.add_argument("--profile", type=float, nargs=2, metavar=("START", "END"),
                   help="per-frame change between two times, as a rough speed curve with a reading")
    args = p.parse_args()

    if args.sheet and args.video and args.strip is None and not args.profile:
        for tool in ("ffmpeg", "ffprobe"):
            if not shutil.which(tool):
                sys.exit(f"{tool} is not installed or not on PATH.")
        out = args.out or re.sub(r"\.[^./]+$", "", args.video) + "_sheet.jpg"
        sheet = contact_sheet(args.video, args.sheet, out)
        sheet["cuts_sheet"] = precut_sheet(args.video, cuts(args.video, args.cut_threshold),
                                           re.sub(r"_sheet\.jpg$", "", out) + "_cuts.jpg")
        if args.json:
            print(json.dumps(sheet, indent=2))
        else:
            print(f"Contact sheet: {len(sheet['times'])} frames at {', '.join(f'{t}s' for t in sheet['times'])} -> {sheet['path']}")
            if sheet["cuts_sheet"]:
                print(f"Around each cut (2 before, 1 before, the cut, 1 after), one row per cut -> {sheet['cuts_sheet']}")
            print("Describe every frame in one sentence: what is on screen, where the eye goes first, "
                  "and whether it would pass for a slide. Then check the Never ship list.")
        return
    if (args.strip is not None or args.profile) and not args.video:
        p.error("--strip and --profile need a video")
    if args.strip is not None or args.profile:
        for tool in ("ffmpeg", "ffprobe"):
            if not shutil.which(tool):
                sys.exit(f"{tool} is not installed or not on PATH.")
        result = {}
        if args.strip is not None:
            out = args.out or re.sub(r"\.[^./]+$", "", args.video) + f"_strip_{args.strip:g}s.png"
            result["strip"] = frame_strip(args.video, args.strip, args.strip_frames, out)
        if args.profile:
            result["profile"] = motion_profile(args.video, *args.profile)
        if args.json:
            print(json.dumps(result, indent=2))
            return
        if "strip" in result:
            print(f"Strip: {args.strip_frames} consecutive frames from {args.strip}s, left to right, top to bottom -> {result['strip']}")
        if "profile" in result:
            pr = result["profile"]
            print(f"Profile {pr['start']}–{pr['end']}s at {pr['fps']} fps (change per frame, 0-255):")
            top = max(pr["steps"] or [1]) or 1
            for i, d in enumerate(pr["steps"]):
                print(f"  {i + 1:3d} {d:7.3f} " + "#" * round(30 * d / top))
            for r in pr["reading"]:
                print(f"  -> {r}")
            print("  This is a hint from whole-frame change. Confirm with --strip or by watching.")
        return

    for tool in ("ffmpeg", "ffprobe") if args.video else ():
        if not shutil.which(tool):
            sys.exit(f"{tool} is not installed or not on PATH.")

    if not args.video:
        if not args.storyboard:
            p.error("give a video, a --storyboard, or both")
        sb = storyboard_rhythm(args.storyboard)
        print(json.dumps(sb, indent=2) if args.json else
              f"Storyboard: {len(sb['scene_lengths'])} scenes, lengths {sb['scene_lengths']}\n"
              + (f"  variation {sb['variation']} (under 0.25 reads as monotonous), distinct lengths {sb['distinct_lengths']}\n" if "variation" in sb else "")
              + (f"  designed transitions {sb.get('designed_transitions', 0)} ({sb['transition_kinds']} kinds); repeated back to back at scenes {sb['repeated_transitions'] or 'none'}" if "transition_kinds" in sb else "")
              + cue_summary(sb))
        if not args.json:
            sf = [f for f in storyboard_flags(sb) if not f.startswith("Cue sheet:")]
            print("\nFlags:\n" + "\n".join(f"  - {f}" for f in sf) if sf else "\nNo storyboard flags.")
        return

    total = duration_of(args.video)
    report = {
        "video": args.video,
        "duration": round(total, 2),
        "dips_to_black": dips(args.video, args.dip_seconds, args.dip_threshold),
        "cuts": cuts(args.video, args.cut_threshold),
    }
    fps = 10
    report["freezes"] = still_stretches(activity(args.video, fps, args.still_level), fps, args.freeze_seconds)
    if args.storyboard:
        report["storyboard"] = storyboard_rhythm(args.storyboard)
    if args.white:
        report["dips_to_white"] = dips(args.video, args.dip_seconds, args.dip_threshold, white=True)
    shots = len(report["cuts"]) + 1
    report["average_shot_length"] = round(total / shots, 2)
    report["gates"] = compute_gates(args.video, total, report["cuts"], args.expect, 0.15, args.expect_audio, args.hold_max)

    flags = []
    for kind in ("dips_to_black", "dips_to_white"):
        for d in report.get(kind, []):
            where = position_label(d["start"], total)
            if where == "mid-piece":
                if kind == "dips_to_black":
                    flags.append(f"Dip to black mid-piece at {d['start']}s ({d['duration']}s): "
                                 "a common sign of an undesigned transition.")
                else:
                    flags.append(f"Flat light frame mid-piece at {d['start']}s ({d['duration']}s): "
                                 "a dip to white, or an empty frame on a light ground. Check whether it was intended.")
    for f in report["freezes"]:
        if f.get("duration") and f["duration"] >= 4:
            flags.append(f"Frozen for {f['duration']}s from {f['start']}s: intended hold, or a stalled render?")
    sb = report.get("storyboard")
    if sb:
        flags += storyboard_flags(sb)
    report["flags"] = flags

    failed = any(v[0] == "FAIL" for v in report["gates"]["gates"].values())
    if args.json:
        print(json.dumps(report, indent=2))
        sys.exit(3 if args.strict and failed else 0)

    print(f"Video: {args.video} ({report['duration']} s)")
    print(f"Hard cuts: {len(report['cuts'])}  ·  average shot length: {report['average_shot_length']} s")
    if report["cuts"]:
        print("  at: " + ", ".join(f"{t}s" for t in report["cuts"][:30]) + (" …" if len(report["cuts"]) > 30 else ""))
    for kind in ("dips_to_black", "dips_to_white"):
        if kind in report:
            label = kind.replace("_", " ")
            items = report[kind]
            print(f"{label.capitalize()}: {len(items)}")
            for d in items:
                print(f"  {d['start']}–{d['end']}s ({d['duration']}s, {position_label(d['start'], total)})")
    print(f"Freezes of {args.freeze_seconds}s or more: {len(report['freezes'])}")
    for f in report["freezes"]:
        print(f"  from {f['start']}s" + (f" for {f['duration']}s" if f.get('duration') else " to the end"))
    sb = report.get("storyboard")
    if sb:
        print(f"Storyboard: {len(sb['scene_lengths'])} scenes"
              + (f"  ·  variation of lengths {sb['variation']}  ·  distinct lengths {sb['distinct_lengths']}" if "variation" in sb else "")
              + (f"  ·  transition kinds {sb['transition_kinds']}" if "transition_kinds" in sb else ""))
    print("\nGates (quote these numbers; LOOK means judge it on the contact sheet and say so):")
    for name, (status, detail) in report["gates"]["gates"].items():
        print(f"  {name}: {status} - {detail}")
    for note in report["gates"]["notes"]:
        print(f"  note: {note}")
    print()
    if flags:
        print("Flags:")
        for fl in flags:
            print(f"  - {fl}")
    else:
        print("No flags from the script. That is a floor, not a verdict: make a contact sheet (--sheet), describe every frame, "
              "check the Never ship list and watch the key moves as strips. Never report the piece as verified or clean.")
    if args.strict and failed:
        sys.exit(3)


if __name__ == "__main__":
    main()
