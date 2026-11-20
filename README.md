# Unrushed

Motion direction for AI agents. Unrushed helps an agent brief, style, storyboard, export and critique motion graphics and videos so they do not look AI-generated: every movement gets a purpose, a duration, a curve, a distance and a place in the order of things.

It works with any tool. The project files (`VIDEO.md`, `STYLE.md`, `STORYBOARD.md`) describe the piece independently of the software, and adapters in `references/targets/` translate it for ChatCut, Remotion, or anything else.

## Commands

| Command | What it does |
|---|---|
| `brief` | Captures the piece and its through-line → `VIDEO.md` |
| `style` | Defines material, palette, type, dials and motion tokens → `STYLE.md` |
| `storyboard` | Timed scenes with exact text and motion → `STORYBOARD.md` |
| `recipe <reference>` | Turns a site or clip into reusable motion values |
| `export <target>` | Compiles a prompt or spec for `chatcut`, `remotion` or `generic` |
| `critique` | Scores frames or a video, lists AI tells and the top fixes |

Dials: `energy`, `density`, `variance` (1–10) and `material`.

## Install

Copy the `unrushed/` folder into your agent's skills folder, for example `~/.claude/skills/` for Claude Code.

`scripts/detect.py` needs `ffmpeg` and `ffprobe`.

## Credits and influences

The principles are written in our own words, drawing on:

- The animation canon: Frank Thomas and Ollie Johnston's twelve principles of animation.
- Issara Willenskomer, *UX in Motion Manifesto*.
- Daniel Shiffman, *The Nature of Code* (2024): forces, oscillation, particles. Recommended reading; no text or code is reproduced here.
- Paul Bakaus's *Impeccable*, whose structure inspired this one: one skill, commands as shared vocabulary, context files, named anti-patterns and deterministic detectors.
- Measured values from the 36 reference pieces studied while building the skill.

## License

MIT © 2026 Andres Ladino. See [LICENSE](LICENSE).
