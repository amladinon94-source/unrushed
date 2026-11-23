#!/usr/bin/env python3
"""Unrushed blind review: compare versions of a piece without knowing which is which.

Writes one self-contained page that plays the versions side by side, in sync, under random labels
(A, B, C…). The person picks one, rates each, marks whether it looks AI-made and notes its worst
moment, then copies the verdict into the project's TASTE.md. The names stay hidden behind a
Reveal button until the verdict is written.

The idea of blind side-by-side review comes from the motionmaxxing project
(Apache-2.0, github.com/Tejashmakwana/motionmaxxing); this is Unrushed's own implementation.

Usage:
  python blind_review.py old.mp4 new.mp4                        (writes ./review/index.html)
  python blind_review.py a.mp4 b.mp4 c.mp4 --out review --title "Launch, round 2"
  python blind_review.py v1.mp4=before v2.mp4=after             (names shown only on Reveal)

Open review/index.html in a browser. Judge the picture with the sound off first, then each
soundtrack alone. Re-running keeps the same labels unless --reshuffle.
"""
import argparse
import base64
import html
import json
import os
import random
import shutil
import subprocess
import sys

PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
<style>
:root{--bg:#f3efe7;--ink:#1c1b19;--mute:#6f6a61;--line:#d8d1c4;--accent:#e8541e}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,-apple-system,sans-serif}
main{max-width:1500px;margin:0 auto;padding:24px}h1{font-size:20px;font-weight:550;margin:0 0 4px}
p.hint{color:var(--mute);margin:0 0 18px}
.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(420px,1fr))}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px}
.card h2{font-size:16px;margin:0 0 8px;display:flex;justify-content:space-between;align-items:center}
video{width:100%;background:#000;border-radius:6px;display:block}
.bar{position:sticky;top:0;background:var(--bg);padding:10px 0;display:flex;gap:10px;flex-wrap:wrap;align-items:center;z-index:2}
button,select{font:inherit;padding:6px 12px;border:1px solid var(--line);border-radius:6px;background:#fff;cursor:pointer}
button.primary{background:var(--ink);color:#fff;border-color:var(--ink)}
input[type=range]{flex:1;min-width:200px}label{display:block;margin-top:8px;color:var(--mute);font-size:13px}
textarea{width:100%;font:inherit;padding:6px;border:1px solid var(--line);border-radius:6px;min-height:52px}
.row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:8px}.name{color:var(--accent);font-weight:600}
#out{white-space:pre-wrap;background:#fff;border:1px solid var(--line);border-radius:8px;padding:12px;margin-top:16px;display:none}
</style></head><body><main>
<h1>__TITLE__</h1>
<p class="hint">Watch with the sound off first, then listen to each version alone. Decide before you reveal the names.</p>
<div class="bar">
<button class="primary" id="play">Play all</button><button id="step-">&#9664; 1 frame</button><button id="step">1 frame &#9654;</button>
<input type="range" id="scrub" min="0" max="1000" value="0">
<select id="rate"><option>0.25</option><option>0.5</option><option selected>1</option></select>
<label style="margin:0"><input type="checkbox" id="loop" checked> loop</label>
</div>
<div class="grid" id="grid"></div>
<div class="row" style="margin-top:18px"><button class="primary" id="copy">Copy verdict</button><button id="reveal">Reveal names</button></div>
<div id="out"></div>
</main>
<script>
const LABELS = __LABELS__;
const KEY = "__KEY__";
const FPS = __FPS__;
const grid = document.getElementById('grid');
LABELS.forEach((l, i) => {
  const c = document.createElement('div'); c.className = 'card';
  c.innerHTML = `<h2><span>Version ${l.label}</span><span class="name" id="name-${i}"></span></h2>
  <video src="${l.src}" playsinline preload="auto"></video>
  <div class="row"><label style="margin:0"><input type="radio" name="pick" value="${l.label}"> my pick</label>
  <label style="margin:0">rating <select class="score"><option value="">–</option>${[...Array(10)].map((_, k) => `<option>${k + 1}</option>`).join('')}</select></label>
  <label style="margin:0"><input type="checkbox" class="ai"> looks AI-made</label>
  <label style="margin:0"><input type="checkbox" class="solo"> sound</label></div>
  <label>worst moment (time and what)</label><textarea class="worst"></textarea>
  <label>best moment</label><textarea class="best"></textarea>`;
  grid.appendChild(c);
});
const vids = [...document.querySelectorAll('video')];
vids.forEach(v => { v.muted = true; });
document.querySelectorAll('.solo').forEach((box, i) => box.onchange = () => {
  document.querySelectorAll('.solo').forEach((b, j) => { if (j !== i) b.checked = false; });
  vids.forEach((v, j) => { v.muted = !(j === i && box.checked); });
});
const lead = () => vids[0];
let playing = false;
document.getElementById('play').onclick = e => {
  playing = !playing; e.target.textContent = playing ? 'Pause all' : 'Play all';
  const t = lead().currentTime; vids.forEach(v => { v.currentTime = Math.min(t, v.duration || t); playing ? v.play() : v.pause(); });
};
const seek = t => vids.forEach(v => { v.currentTime = Math.min(Math.max(0, t), v.duration || t); });
document.getElementById('step').onclick = () => { vids.forEach(v => v.pause()); playing = false; seek(lead().currentTime + 1 / FPS); };
document.getElementById('step-').onclick = () => { vids.forEach(v => v.pause()); playing = false; seek(lead().currentTime - 1 / FPS); };
const scrub = document.getElementById('scrub');
scrub.oninput = () => seek((scrub.value / 1000) * Math.max(...vids.map(v => v.duration || 0)));
document.getElementById('rate').onchange = e => vids.forEach(v => { v.playbackRate = parseFloat(e.target.value); });
setInterval(() => {
  const d = Math.max(...vids.map(v => v.duration || 0)); if (d) scrub.value = (lead().currentTime / d) * 1000;
  if (playing) vids.forEach(v => { if (Math.abs(v.currentTime - lead().currentTime) > 0.08 && !v.ended) v.currentTime = lead().currentTime; });
}, 200);
vids.forEach(v => v.onended = () => { if (document.getElementById('loop').checked && v === lead()) { seek(0); vids.forEach(x => x.play()); } });
const names = () => JSON.parse(atob(KEY));
document.getElementById('reveal').onclick = () => {
  if (!confirm('Reveal the names? Write your verdict first.')) return;
  const n = names(); LABELS.forEach((l, i) => { document.getElementById('name-' + i).textContent = n[l.label]; });
};
document.getElementById('copy').onclick = () => {
  const pick = (document.querySelector('input[name=pick]:checked') || {}).value || 'none';
  const cards = [...document.querySelectorAll('.card')];
  const n = names();
  const lines = [`- **${new Date().toISOString().slice(0, 10)} · blind review: __TITLE_JS__**`, `  - Picked: ${pick} (${n[pick] || 'no pick'})`];
  cards.forEach((c, i) => {
    const l = LABELS[i].label;
    lines.push(`  - ${l} = ${n[l]}: ${c.querySelector('.score').value || '?'}/10${c.querySelector('.ai').checked ? ', looks AI-made' : ''}` +
      `${c.querySelector('.worst').value ? '; worst: ' + c.querySelector('.worst').value.trim() : ''}` +
      `${c.querySelector('.best').value ? '; best: ' + c.querySelector('.best').value.trim() : ''}`);
  });
  const text = lines.join('\\n');
  const out = document.getElementById('out'); out.style.display = 'block'; out.textContent = text + '\\n\\nPaste this under "Verdicts" in TASTE.md.';
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
};
</script></body></html>
"""


def probe(path):
    cmd = ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
           "stream=width,height,r_frame_rate:format=duration", "-of", "json", path]
    try:
        data = json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout or "{}")
    except (OSError, ValueError):
        return None
    stream = (data.get("streams") or [{}])[0]
    num, _, den = (stream.get("r_frame_rate") or "30/1").partition("/")
    fps = float(num) / float(den or 1) if float(den or 1) else 30.0
    return {"size": f"{stream.get('width')}x{stream.get('height')}", "fps": round(fps, 3),
            "duration": round(float((data.get("format") or {}).get("duration") or 0), 2)}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("videos", nargs="+", help="FILE or FILE=Name, at least two")
    p.add_argument("--out", default="review", help="folder to write (default: review)")
    p.add_argument("--title", default="Blind review", help="title of the round")
    p.add_argument("--reshuffle", action="store_true", help="draw new labels even if the folder already has some")
    args = p.parse_args()

    items = []
    for spec in args.videos:
        path, _, name = spec.partition("=")
        if not os.path.isfile(path):
            sys.exit(f"Not a file: {path}")
        items.append((path, name or os.path.splitext(os.path.basename(path))[0]))
    if len(items) < 2:
        sys.exit("Give at least two videos.")

    os.makedirs(os.path.join(args.out, "videos"), exist_ok=True)
    key_path = os.path.join(args.out, ".key.json")
    order = None
    if os.path.exists(key_path) and not args.reshuffle:
        saved = json.load(open(key_path, encoding="utf-8"))
        if sorted(saved.get("files", [])) == sorted(os.path.abspath(i[0]) for i in items):
            order = [next(i for i in items if os.path.abspath(i[0]) == f) for f in saved["files"]]
    if order is None:
        order = items[:]
        random.SystemRandom().shuffle(order)

    labels, key = [], {}
    for n, (path, name) in enumerate(order):
        label = chr(ord("A") + n)
        ext = os.path.splitext(path)[1] or ".mp4"
        dest = os.path.join(args.out, "videos", f"{label}{ext}")
        if os.path.exists(dest):
            os.remove(dest)
        try:
            os.link(path, dest)
        except OSError:
            shutil.copyfile(path, dest)
        labels.append({"label": label, "src": f"videos/{label}{ext}"})
        key[label] = name
    json.dump({"files": [os.path.abspath(p) for p, _ in order], "key": key}, open(key_path, "w", encoding="utf-8"), indent=2)
    try:
        os.chmod(key_path, 0o600)
    except OSError:
        pass

    info = [probe(p) for p, _ in order]
    fps = next((i["fps"] for i in info if i), 30)
    if all(info):
        for field in ("size", "fps", "duration"):
            values = {i[field] for i in info}
            if len(values) > 1:
                print(f"Warning: the versions differ in {field} ({', '.join(map(str, values))}). "
                      "That can give them away and is unfair to the comparison.")

    page = (PAGE.replace("__TITLE__", html.escape(args.title))
            .replace("__TITLE_JS__", args.title.replace("\\", "").replace("`", "'").replace("$", ""))
            .replace("__LABELS__", json.dumps(labels))
            .replace("__KEY__", base64.b64encode(json.dumps(key).encode()).decode())
            .replace("__FPS__", str(fps)))
    out = os.path.join(args.out, "index.html")
    open(out, "w", encoding="utf-8").write(page)
    print(f"Wrote {out} with {len(labels)} versions labelled {', '.join(l['label'] for l in labels)}.")
    print("Open it in a browser. Judge before revealing; paste the copied verdict into TASTE.md.")


if __name__ == "__main__":
    main()
