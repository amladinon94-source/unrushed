#!/usr/bin/env python3
"""Unrushed detector: objective checks on an exported video.

Finds the AI tells that do not need judgment:
  - dips to black (and, with --white, dips to white)
  - frozen stretches (no visible change for a while)
  - hard cuts, and the average shot length

Requires ffmpeg and ffprobe on PATH. Prints a readable summary, or JSON with --json.

Usage:
  python detect.py video.mp4
  python detect.py video.mp4 --json
  python detect.py video.mp4 --white --cut-threshold 0.35 --freeze-seconds 2
"""

import argparse
import json
import re
import shutil
import subprocess
import sys


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


def freezes(path, min_seconds, noise):
    log = run_ffmpeg_filter(path, f"freezedetect=n={noise}:d={min_seconds}")
    starts = [float(x) for x in re.findall(r"freeze_start:\s*([\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"freeze_end:\s*([\d.]+)", log)]
    found = []
    for i, start in enumerate(starts):
        end = ends[i] if i < len(ends) else None
        item = {"start": round(start, 2), "end": round(end, 2) if end is not None else None}
        if end is not None:
            item["duration"] = round(end - start, 2)
        found.append(item)
    return found


def cuts(path, threshold):
    """Frames whose content changes abruptly from the previous one."""
    log = run_ffmpeg_filter(path, f"select='gt(scene,{threshold})',showinfo")
    return [round(float(t), 2) for t in re.findall(r"pts_time:([\d.]+)", log)]


def position_label(t, total, edge=1.0):
    if t <= edge:
        return "at the start"
    if t >= total - edge:
        return "at the end"
    return "mid-piece"


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("video")
    p.add_argument("--json", action="store_true", help="print JSON instead of a summary")
    p.add_argument("--white", action="store_true", help="also look for dips to white")
    p.add_argument("--dip-seconds", type=float, default=0.1, help="shortest dip to report (default 0.1)")
    p.add_argument("--dip-threshold", type=float, default=0.10,
                   help="how dark a pixel must be to count as black, 0-1 (default 0.10)")
    p.add_argument("--freeze-seconds", type=float, default=2.0, help="shortest freeze to report (default 2)")
    p.add_argument("--freeze-noise", type=float, default=0.003, help="change tolerated in a freeze (default 0.003)")
    p.add_argument("--cut-threshold", type=float, default=0.35,
                   help="scene-change score that counts as a hard cut, 0-1 (default 0.35)")
    args = p.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            sys.exit(f"{tool} is not installed or not on PATH.")

    total = duration_of(args.video)
    report = {
        "video": args.video,
        "duration": round(total, 2),
        "dips_to_black": dips(args.video, args.dip_seconds, args.dip_threshold),
        "freezes": freezes(args.video, args.freeze_seconds, args.freeze_noise),
        "cuts": cuts(args.video, args.cut_threshold),
    }
    if args.white:
        report["dips_to_white"] = dips(args.video, args.dip_seconds, args.dip_threshold, white=True)
    shots = len(report["cuts"]) + 1
    report["average_shot_length"] = round(total / shots, 2)

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
    report["flags"] = flags

    if args.json:
        print(json.dumps(report, indent=2))
        return

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
    print()
    if flags:
        print("Flags:")
        for fl in flags:
            print(f"  - {fl}")
    else:
        print("No flags. Motion, rhythm and legibility still need a human (or model) watching the video.")


if __name__ == "__main__":
    main()
