# Unrushed

Motion direction for AI agents. Unrushed helps an agent brief, style, storyboard, export and critique motion graphics and videos so they do not look AI-generated: every movement gets a purpose, a duration, a curve, a distance and a place in the order of things.

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

If your setup can only hold a single `SKILL.md` (for example, a skill saved from a chat), use **`dist/unrushed-single-file.md`** as its content. It is the same skill with the essential references embedded: principles, AI tells, the 38 techniques condensed, and the ChatCut guide. Rebuild it after changing any reference with `python scripts/build_single.py`.

### Inside ChatCut

ChatCut's agent runs on Claude Code and loads the skills in your Claude account. Install Unrushed there (above), then ask ChatCut's AI composer directly: *"use unrushed to…"*. No export or copy and paste is needed. To drive ChatCut from Claude Code instead, install ChatCut's agent plugin (chatcut.io/claude) next to Unrushed.

### Optional: the video detector

`scripts/detect.py` checks an exported video for dips to black, frozen stretches and cut rhythm. It needs Python 3 and ffmpeg:

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

1. **`brief`**: say what the video is about. The agent asks only what it cannot infer, proposes a through-line (the one visual idea that carries the piece) and writes `VIDEO.md`.
   > *"Use unrushed to brief a 60-second silent video about the history of the bicycle, for Instagram."*

2. **`style`**: the agent proposes material, palette, type, dials and a signature move, and writes `STYLE.md`.
   > *"unrushed style. I want it to feel like ink on paper, calm."*

3. **`storyboard`**: timed scenes with exact text, what moves and how, and checks that every line can be read in time. Writes `STORYBOARD.md`.
   > *"unrushed storyboard, 8 scenes."*

4. **`export <target>`**: compiles everything into what your tool needs: `chatcut`, `remotion` or `generic` (After Effects, Cavalry, another AI tool, or a human animator).
   > *"unrushed export chatcut"*

5. Make the video in your tool. Start with the pilot scene the export asks for.

6. **`critique`**: share screenshots or the exported video. You get scores, the AI tells it found, and the three fixes with the most impact, ready to paste back into your tool.
   > *"unrushed critique" + screenshots or video*

### Other commands

- **`recipe <reference>`**: turns a site, clip or screenshot whose motion you like into reusable values (durations, curves, parameters) and says how to reproduce it in each tool.
  > *"unrushed recipe https://example.com"*

### The techniques library

`references/techniques.md` holds 38 techniques studied from real pieces (particles, fluids, glass, cloth, metaballs, ASCII, transitions and more), each with what it communicates, its key parameters, how to build it in each tool, and a critical note. It is indexed **by meaning**, so the agent picks a technique because the scene needs to *reveal*, *dissolve*, *transform* or *connect*, not because it looks cool. `storyboard` uses it to choose techniques per scene, `export` carries their build notes to your tool, and every `recipe` you run can add a new entry.

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
```

## What's inside

```
unrushed/
├── SKILL.md                  Commands, dials and workflow
├── references/
│   ├── principles.md         Timing, curves, distance, choreography, type, materials
│   ├── ai-tells.md           What makes video read as AI-generated, and what to do instead
│   ├── techniques.md         38 techniques from real reference pieces, indexed by meaning
│   └── targets/              chatcut.md, remotion.md, generic.md
├── assets/                   Templates for VIDEO.md, STYLE.md, STORYBOARD.md
└── scripts/detect.py         Automatic checks on an exported video
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
