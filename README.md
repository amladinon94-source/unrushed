# Unrushed

Motion direction for AI agents. Unrushed helps an agent brief, style, storyboard, export and critique motion graphics and videos so they do not look AI-generated: every movement gets a purpose, a duration, a curve, a distance and a place in the order of things, and every piece gets a story, a rhythm and transitions chosen for what they say.

Current version: **0.5** (see [CHANGELOG](CHANGELOG.md)).

Unrushed directs motion inside the tool you already edit in, with your footage and your real product. It does not generate films on its own; it decides what each beat says, how it moves in measured numbers, and checks the export by script.

It works with any tool. The project files (`BRAND.md`, `VIDEO.md`, `STYLE.md`, `STORYBOARD.md`) describe the piece independently of the software, and adapters in `references/targets/` translate it for ChatCut, Remotion, or anything else.

## Install

### Any agent that supports skills (recommended)

```bash
npx skills add amladinon94-source/unrushed
```

The installer detects your agents (Claude Code, Cursor, Codex and others) and asks where to install. Useful flags:

```bash
# Install for every project on your machine, not just this one
npx skills add amladinon94-source/unrushed -g

# Install for one agent only, without prompts
npx skills add amladinon94-source/unrushed --agent claude-code -y
```

Requires Node.js.

### Manual install

Clone the repo into your agent's skills folder. For Claude Code:

```bash
# For all your projects
git clone https://github.com/amladinon94-source/unrushed ~/.claude/skills/unrushed

# For one project only (run from the project root)
git clone https://github.com/amladinon94-source/unrushed .claude/skills/unrushed
```

For other agents, copy the folder into wherever they read skills from.

### Claude apps (web and desktop)

Download this repo as a ZIP (**Code → Download ZIP**) and upload it as a custom skill in the Skills section of Claude's settings.

If your setup can only hold a single `SKILL.md` (for example, a skill saved from a chat), use **`dist/unrushed-single-file.md`** as its content. It is the same skill with the essential references embedded: narrative, principles, visual explanation, transitions, effects, AI tells, the 38 techniques condensed, and the ChatCut guide. Rebuild it after changing any reference with `python scripts/build_single.py`.

### Inside ChatCut

ChatCut's agent runs on Claude Code and loads the skills in your Claude account. Install Unrushed there (above), then ask ChatCut's AI composer directly: *"use unrushed to…"*. No export or copy and paste is needed. To drive ChatCut from Claude Code instead, install ChatCut's agent plugin (chatcut.io/claude) next to Unrushed.

### Optional: the video detector

`scripts/detect.py` checks an exported video from any tool against six gates (the piece exists and matches its planned length, no empty frames, a short ending, plus three judged by eye on a contact sheet), and reports dips to black, frozen stretches, cuts, loudness and motion compared with human-made films. It also checks a `STORYBOARD.md` for rhythm, designed transitions, what each beat buys, the importance budget and Never ship words, and checks its cue sheet against the effect budgets. It needs Python 3, and ffmpeg for videos (numpy makes it faster if installed):

```bash
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Debian / Ubuntu
```

## Use

You can talk to your agent normally; it loads Unrushed when the request is about motion or video. You can also name a command. In Claude Code, `/unrushed` followed by the command works too.

### The workflow

```
brief  →  style  →  storyboard  →  export  →  (make it in your tool)  →  critique  →  repeat
```

1. **`brief`**: say what the video is about and what it is for. The agent asks for your brandbook or style sheet and writes it to `BRAND.md`, with the video rules it lacks marked as proposals. If you have none, it builds a short one with you in the conversation. It asks only what it cannot infer, then proposes the spine (hook, promise, proof, payoff, ask), a through-line (the one visual idea that carries the piece) and a beat map for the rhythm, and writes `VIDEO.md`.
   > *"Use unrushed to brief a 60-second silent video about the history of the bicycle, for Instagram."*

2. **`style`**: the agent proposes two or three directions that differ in material and ground, with a styleframe when it can render one. You choose; it completes material, palette, type, light and finish, dials, a signature move and, for product videos, the real design system to show, and writes `STYLE.md`.
   > *"unrushed style. I want it to feel like ink on paper, calm."*

3. **`storyboard`**: timed beats with exact text, the device that makes each idea visible (an interface with a cursor, ghosts, a camera push…), the technique, what moves and how, and a transition chosen by the relation between beats. When your editor has an effects library, as ChatCut does, it also writes a cue sheet. The default is none; each effect, zoom, library transition and sound accent is listed with its frames, its parameters, the word it is tied to and the reason. It checks the spine, rhythm, transitions, reading time, the slide test and the effect budgets before finishing. Writes `STORYBOARD.md`.
   > *"unrushed storyboard, 8 scenes."*

4. **`export <target>`**: compiles everything into what your tool needs: `chatcut`, `remotion` or `generic` (After Effects, Cavalry, another AI tool, or a human animator).
   > *"unrushed export chatcut"*

   With ChatCut's agent plugin installed, the cues are applied directly through ChatCut's tools and checked in the viewer. Without it, the agent writes one precise sentence per cue for ChatCut's chat.

5. Make the video in your tool, in passes: the hardest beat first, then blocking, type, motion and finish, with a contact sheet after each.

6. **`critique`**: share the storyboard before building, or screenshots or the exported video after. You get scores on story, rhythm, explanation, transitions and craft, the AI tells it found, and the three fixes with the most impact, ready to paste back into your tool.
   > *"unrushed critique" + screenshots or video*

### Improving a video that already exists

**`improve`**: for a video or project that already exists, whether or not Unrushed made it. `critique` only reports; `improve` rebuilds the piece and answers for every fix.

1. It gathers context first and does not assume:
   - it reads the video, timeline and transcript;
   - it **looks for the real product**: the repository, the design files, the running app;
   - it asks one round of questions about the brand, the script and the product demo.
2. It scores the current version.
3. It writes `REVISION.md`: every fix with an acceptance test you can check. Every criterion scored 2 or less gets a fix.
4. It waits for your approval.
5. It rebuilds, heavy fixes first.
6. It re-scores, and reports each fix as done, partial or not done, with evidence.

It is not allowed to swap a fix for a cheaper one, such as grain instead of physics or a camera move instead of a real demo.

> *"unrushed improve this video"*

### Other commands

- **`recipe <reference>`**: turns a site, clip or screenshot whose motion you like into reusable values (durations, curves, parameters) and says how to reproduce it in each tool.
  > *"unrushed recipe https://example.com"*

### The techniques library

`references/techniques.md` holds 38 techniques studied from real pieces (particles, fluids, glass, cloth, metaballs, ASCII, transitions and more), each with what it communicates, its key parameters, how to build it in each tool, and a critical note. It is indexed **by meaning**, so the agent picks a technique because the scene needs to *reveal*, *dissolve*, *transform* or *connect*, not because it looks cool. `storyboard` uses it to choose techniques per scene, `export` carries their build notes to your tool, and every `recipe` you run can add a new entry. Each entry also says what drives it in video, where there is no mouse or scroll: time, a scripted path, a camera move or a simulated cursor.

### Story, explanation and transitions

- `references/narrative.md`: hooks, the spine, structures for explainers, product promos, launches, showcases and tutorials, and the beat map.
- `references/visual-explanation.md`: devices that show an idea happening instead of writing it beside a demo, the slide test, and interface simulation with real components (the product's own, or shadcn/ui, Material 3, Fluent 2, Apple's HIG) and a human cursor. It also covers how to find the real product (repository, design files, running app) and what to read in it, and the product demo script: every step an action and the product's visible response.
- `references/transitions.md`: transitions chosen by the relation between beats, with durations, the techniques that build them, and how to hide the seam.

### Effects, zooms and sound from your editor's library

`references/effects.md` covers every effect, zoom preset, transition and sound accent in ChatCut's library (blur, masks, distortions, 26 stylize effects, 6 zooms, 12 transitions). For each one it gives:

- the intent it serves;
- when to use it and when never to;
- a tier: workhorse, situational, or gimmick (gimmicks need a written reason);
- the equivalent in Remotion and in After Effects.

It also sets budgets, such as one gimmick per piece, two stylize looks, and roughly one zoom per 8–12 s in a talking head, and explains how to apply each cue through ChatCut's tools or by prompt.

`examples/unrushed-launch/` shows the whole set for a 39-second launch: `BRAND.md` from the Unrushed brandbook, `VIDEO.md`, and a `STORYBOARD.md` with a cue sheet that passes the detector.

### Dials

Change them at any point, in plain words:

| Dial | Range | Default | Controls |
|---|---|---|---|
| `energy` | 1–10 | 4 | Speed, distance, overshoot, how many things move at once |
| `density` | 1–10 | 3 | Elements and words per frame, empty space |
| `variance` | 1–10 | 5 | How much scenes differ from one another |
| `material` | a word | set in `style` | ink, paper, glass, cloth, fluid, particles, metal, light… |

> *"energy 7, variance 8"*

### Running the detector yourself

```bash
python scripts/detect.py my-video.mp4
python scripts/detect.py my-video.mp4 --white   # also check flat light frames
python scripts/detect.py my-video.mp4 --json    # machine-readable output
python scripts/detect.py --storyboard STORYBOARD.md                  # check the plan before building
python scripts/detect.py my-video.mp4 --storyboard STORYBOARD.md     # both
python scripts/detect.py my-video.mp4 --strip 12.4                   # 12 consecutive frames as one image, to judge physics
python scripts/detect.py my-video.mp4 --profile 12.0 13.2            # per-frame change: a rough speed curve with a reading
python scripts/detect.py my-video.mp4 --expect 30 --expect-audio --strict   # gates; exit code 3 if one fails
python scripts/detect.py my-video.mp4 --sheet                        # contact sheet, and the frames around every cut
python scripts/blind_review.py old.mp4 new.mp4                       # compare versions blind, record your pick
```

### Measured motion, in numbers

`references/motion-kit.md` gives ten curves fitted to measured professional moves as cubic-beziers, with their usual durations, and recipes in numbers: land, leave, arrive from oversize, stagger, press, camera push and snap, whip, counters and the one spring per piece. It says how to apply them in ChatCut, in After Effects (an expression) and in Remotion, where `assets/remotion/unrushed-motion.ts` provides them as functions.

### Your taste

Each project keeps a `TASTE.md`: what you said about pieces made for you, before-and-after pairs and your picks from blind reviews. Unrushed reads it before every command and adds your reactions as you give them. `taste/` holds the author's own verdicts as the shared example.

## What's inside

```
unrushed/
├── SKILL.md                  Commands, dials and workflow
├── references/
│   ├── narrative.md          Hook, promise, proof, payoff, ask; structures; rhythm and the beat map
│   ├── principles.md         Timing, curves, distance, choreography, type, materials, physics and how to check it
│   ├── motion-kit.md         Measured curves as cubic-beziers and recipes in numbers, per tool
│   ├── visual-explanation.md Devices, the slide test, real interfaces, cursors, finding the product, demo scripts
│   ├── transitions.md        Transitions by relation, catalogue, hiding the seam
│   ├── effects.md            Library effects, zooms, transitions and sound: intent, tiers, budgets, ChatCut, Remotion, AE
│   ├── ai-tells.md           What makes video read as AI-generated, and what to do instead
│   ├── techniques.md         38 techniques from real reference pieces, indexed by meaning
│   └── targets/              chatcut.md, remotion.md, generic.md
├── assets/                   Templates for BRAND.md, VIDEO.md, STYLE.md, STORYBOARD.md, REVISION.md, TASTE.md
│   └── remotion/             unrushed-motion.ts: the motion kit as Remotion functions
├── taste/                    The author's verdicts and before-and-after edits
├── examples/unrushed-launch/ A worked example with a brand and a cue sheet
├── scripts/detect.py         Gates and checks on an exported video, contact sheets, and checks on a storyboard
├── scripts/blind_review.py   Side-by-side blind comparison of versions
├── scripts/build_single.py   Builds dist/unrushed-single-file.md
└── dist/                     The single-file edition
```

## Credits and influences

The principles are written in our own words, drawing on:

- The animation canon: Frank Thomas and Ollie Johnston's twelve principles of animation.
- Issara Willenskomer, *UX in Motion Manifesto*.
- Daniel Shiffman, *The Nature of Code* (2024): forces, oscillation, particles. Recommended reading; no text or code is reproduced here.
- Paul Bakaus's *Impeccable*, whose structure inspired this one: one skill, commands as shared vocabulary, context files, named anti-patterns and deterministic detectors.
- Measured values from the 36 reference pieces studied while building the skill.
- [motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) by Tejas Makwana (Apache-2.0): the measured motion values (about 4,300 moves in 53 professional moments), the human motion band, the gate thresholds, the study of what makes films read as AI-made, and the ideas of a Never ship list, honest review, the hardest beat first, a taste file and blind review. Unrushed restates them in its own words and implements its own code; the cubic-bezier fits are its own.

## License

MIT © 2026 Andres Ladino. See [LICENSE](LICENSE).
