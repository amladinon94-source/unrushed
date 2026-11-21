# Unrushed

Motion direction for AI agents. Unrushed helps an agent brief, style, storyboard, export and critique motion graphics and videos so they do not look AI-generated: every movement gets a purpose, a duration, a curve, a distance and a place in the order of things, and every piece gets a story, a rhythm and transitions chosen for what they say.

Current version: **0.2** (see [CHANGELOG](CHANGELOG.md)).

It works with any tool. The project files (`VIDEO.md`, `STYLE.md`, `STORYBOARD.md`) describe the piece independently of the software, and adapters in `references/targets/` translate it for ChatCut, Remotion, or anything else.

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

If your setup can only hold a single `SKILL.md` (for example, a skill saved from a chat), use **`dist/unrushed-single-file.md`** as its content. It is the same skill with the essential references embedded: narrative, principles, visual explanation, transitions, AI tells, the 38 techniques condensed, and the ChatCut guide. Rebuild it after changing any reference with `python scripts/build_single.py`.

### Inside ChatCut

ChatCut's agent runs on Claude Code and loads the skills in your Claude account. Install Unrushed there (above), then ask ChatCut's AI composer directly: *"use unrushed to…"*. No export or copy and paste is needed. To drive ChatCut from Claude Code instead, install ChatCut's agent plugin (chatcut.io/claude) next to Unrushed.

### Optional: the video detector

`scripts/detect.py` checks an exported video for dips to black, stretches where nothing moves, and hard cuts, and checks a `STORYBOARD.md` for even scene lengths and repeated transitions. It needs Python 3, and ffmpeg for videos (numpy makes it faster if installed):

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

1. **`brief`**: say what the video is about and what it is for. The agent asks only what it cannot infer, then proposes the spine (hook, promise, proof, payoff, ask), a through-line (the one visual idea that carries the piece) and a beat map for the rhythm, and writes `VIDEO.md`.
   > *"Use unrushed to brief a 60-second silent video about the history of the bicycle, for Instagram."*

2. **`style`**: the agent proposes two or three directions that differ in material and ground, with a styleframe when it can render one. You choose; it completes material, palette, type, light and finish, dials, a signature move and, for product videos, the real design system to show, and writes `STYLE.md`.
   > *"unrushed style. I want it to feel like ink on paper, calm."*

3. **`storyboard`**: timed beats with exact text, the device that makes each idea visible (an interface with a cursor, ghosts, a camera push…), the technique, what moves and how, and a transition chosen by the relation between beats. It checks the spine, rhythm, transitions, reading time and the slide test before finishing. Writes `STORYBOARD.md`.
   > *"unrushed storyboard, 8 scenes."*

4. **`export <target>`**: compiles everything into what your tool needs: `chatcut`, `remotion` or `generic` (After Effects, Cavalry, another AI tool, or a human animator).
   > *"unrushed export chatcut"*

5. Make the video in your tool. Start with the pilot scene the export asks for.

6. **`critique`**: share the storyboard before building, or screenshots or the exported video after. You get scores on story, rhythm, explanation, transitions and craft, the AI tells it found, and the three fixes with the most impact, ready to paste back into your tool.
   > *"unrushed critique" + screenshots or video*

### Other commands

- **`recipe <reference>`**: turns a site, clip or screenshot whose motion you like into reusable values (durations, curves, parameters) and says how to reproduce it in each tool.
  > *"unrushed recipe https://example.com"*

### The techniques library

`references/techniques.md` holds 38 techniques studied from real pieces (particles, fluids, glass, cloth, metaballs, ASCII, transitions and more), each with what it communicates, its key parameters, how to build it in each tool, and a critical note. It is indexed **by meaning**, so the agent picks a technique because the scene needs to *reveal*, *dissolve*, *transform* or *connect*, not because it looks cool. `storyboard` uses it to choose techniques per scene, `export` carries their build notes to your tool, and every `recipe` you run can add a new entry. Each entry also says what drives it in video, where there is no mouse or scroll: time, a scripted path, a camera move or a simulated cursor.

### Story, explanation and transitions

- `references/narrative.md`: hooks, the spine, structures for explainers, product promos, launches, showcases and tutorials, and the beat map.
- `references/visual-explanation.md`: devices that show an idea happening instead of writing it beside a demo, the slide test, and interface simulation with real components (the product's own, or shadcn/ui, Material 3, Fluent 2, Apple's HIG) and a human cursor.
- `references/transitions.md`: transitions chosen by the relation between beats, with durations, the techniques that build them, and how to hide the seam.

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
```

## What's inside

```
unrushed/
├── SKILL.md                  Commands, dials and workflow
├── references/
│   ├── narrative.md          Hook, promise, proof, payoff, ask; structures; rhythm and the beat map
│   ├── principles.md         Timing, curves, distance, choreography, type, materials
│   ├── visual-explanation.md Devices, the slide test, interfaces with real design systems, cursors
│   ├── transitions.md        Transitions by relation, catalogue, hiding the seam
│   ├── ai-tells.md           What makes video read as AI-generated, and what to do instead
│   ├── techniques.md         38 techniques from real reference pieces, indexed by meaning
│   └── targets/              chatcut.md, remotion.md, generic.md
├── assets/                   Templates for VIDEO.md, STYLE.md, STORYBOARD.md
├── scripts/detect.py         Automatic checks on an exported video and on a storyboard
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

## License

MIT © 2026 Andres Ladino. See [LICENSE](LICENSE).
