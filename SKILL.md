---
name: unrushed
description: Motion direction for videos and animated pieces that must not look AI-generated. Use it to brief, style, storyboard, export or critique motion graphics, explainer and promo videos, animated titles, kinetic typography, transitions, particle and morph sequences, and prompts for video tools such as ChatCut, Remotion, After Effects or Claude Code. Use it as well when someone says a video looks generic, cheap or "made with AI", wants better animations or transitions, shares a site or clip whose motion they want to reproduce, or asks for a storyboard or a motion style guide, even if they never say "motion design".
---

# Unrushed

Generic motion comes from defaults: every element fades up the same 30 px in the same half second, scenes dip to black, the palette is neon on navy, and nothing moves for a reason. Unrushed replaces adjectives with decisions. Every movement gets a purpose, a duration, a curve, a distance and a place in the order of things. "Smooth and modern" is not a direction; "enters over 700 ms on an expo-out curve, 16 px, 150 ms after the year" is.

The name is the stance: calm, deliberate motion that gives the viewer time to read and feel. Unrushed does not mean slow. A fast piece can be unrushed if every beat is chosen.

## How to work with it

Unrushed is a set of commands around one loop: **context → create → review → steer**. The person directs; you execute and advise. Run the command they ask for. If they ask for something without naming a command, pick the one that fits and say which one you used. Suggest the next step at the end of each command, but do not run a chain of commands on your own: the human judgment between steps is the point.

Reply in the person's language. Command names stay in English.

**Where the files are.** Commands read files in `references/`. If that folder is not next to this file, read "References" at the end of this file before opening anything: it says where else to find them.

### Project files

Commands share three files in the project folder. Read whichever exist before any command.

| File | Written by | Holds |
|---|---|---|
| `VIDEO.md` | `brief` | What the piece is: topic, message, audience, format, sound, through-line, facts to verify |
| `STYLE.md` | `style` | How it looks and moves: material, palette, type, dials, signature move, forbidden list |
| `STORYBOARD.md` | `storyboard` | Scene by scene: exact text, figure, motion, timing, transition |

Templates are in `assets/`. If a command needs a file that does not exist, say so and offer to run the command that creates it, rather than inventing its contents.

## Dials

Four settings shape every decision. Defaults suit most explainers; the person can change them at any time ("energy 7").

| Dial | Range | Default | What it changes |
|---|---|---|---|
| `energy` | 1–10 | 4 | Durations, distances, how much overshoot is allowed, how many things may move at once |
| `density` | 1–10 | 3 | Elements per frame, words per scene, how much empty space surrounds the protagonist |
| `variance` | 1–10 | 5 | How much scenes differ from one another in layout, rhythm and structure |
| `material` | a word | chosen in `style` | The physical behaviour motion borrows: ink, paper, glass, cloth, fluid, particles, metal, light |

How `energy` maps to numbers, as a starting point:

| energy | Text entrance | Scene transition | Overshoot | Moving at once |
|---|---|---|---|---|
| 1–3 | 800–1200 ms | 1400–2000 ms | none | 1 |
| 4–6 | 500–900 ms | 900–1500 ms | small elements only | 1–2 |
| 7–8 | 300–600 ms | 500–900 ms | allowed on accents | 2–3 |
| 9–10 | 150–400 ms | 250–600 ms | expressive | many, but choreographed |

`variance` guards against the most common failure of a long piece: every scene built the same way. Above 4, vary at least one of composition, rhythm or entrance pattern between neighbouring scenes.

`material` matters more than it looks. Across dozens of reference pieces, what made motion feel premium was rarely the technique; it was light and material: motion blur, self-shadowing, refraction, grain. Choose the material first and let it decide how things accelerate, settle and overlap.

## Commands

| Group | Command | Does | Reads | Writes |
|---|---|---|---|---|
| Context | `brief` | Captures what the piece is and its one visual idea | — | `VIDEO.md` |
| Context | `style` | Defines the visual and motion system | `VIDEO.md` | `STYLE.md` |
| Create | `storyboard` | Breaks the piece into timed scenes | `VIDEO.md`, `STYLE.md` | `STORYBOARD.md` |
| Create | `recipe <reference>` | Turns a site, clip or screenshot into reusable motion values | — | a recipe in the reply |
| Deliver | `export <target>` | Compiles everything into a prompt or spec for one tool | all three files | the deliverable |
| Review | `critique` | Scores frames or a video and lists what to fix | `STYLE.md` if it exists | a report in the reply |

### `brief`

Read `references/narrative.md` first. Ask only what you cannot infer from the conversation or files, and at most five questions at once:

1. Topic, the goal (explain, sell, launch, teach, celebrate) and the one sentence the viewer should leave with.
2. Audience: who they are, what they already know or believe, and what they should feel or do afterwards.
3. Platform, aspect ratio, duration and sound. A silent piece carries its whole narrative in on-screen text and motion beats, which changes the timing rules.
4. Facts the piece states (dates, names, figures, product claims). List them; each needs a source or is marked `[verify]`. For a product, ask whether you can see the product itself, its code or its interface.
5. Anything already decided: brand, references, things to avoid.

Then propose, and let the person choose or correct:

- **The spine.** Hook, promise, proof, payoff and ask, one line each, and the structure that fits the type of piece. The hook must work visually in the first second.
- **The through-line.** The single visual idea that carries the whole piece, and the most important decision in the brief. Propose two or three options and recommend one. A piece about the history of AI made of nine unrelated effects reads as a demo reel; the same piece where one set of particles travels from a neuron to a human profile reads as a story. A good through-line is a transformation that means something.
- **The beat map.** Sections with their tempo and beat lengths, and where the payoff lands on the tension curve.

Write `VIDEO.md` from the template.

### `style`

Read `references/principles.md` and `references/ai-tells.md` first.

1. **Material.** Choose it before colour. It sets the motion personality: ink settles, glass is precise, fluid overlaps, cloth lags behind its driver.
2. **Palette.** A ground, an ink and at most one accent with a stated job ("the accent marks the present day"). Give hex values and roles.
3. **Type.** Two families at most, each with a role and sizes for the target resolution. Avoid the defaults listed in `ai-tells.md` unless the person asks for them.
4. **Dials.** Set `energy`, `density` and `variance`, and say why.
5. **Signature move.** One recurring motion that identifies the piece, such as particles that reassemble or a mask that always opens from the bottom. Look in `references/techniques.md` for techniques whose meaning matches the through-line and whose behaviour matches the material, and say which entry you started from.
6. **Forbidden list.** The generic choices this piece in particular is tempted by.
7. **Interface system**, when the piece shows a product or a tool: which components, icons and fonts the interface uses, and their licences. See `references/visual-explanation.md`.

Write `STYLE.md`. Include a ready-to-paste style block for the likely target (for ChatCut, the Design Style fields; see `references/targets/`).

### `storyboard`

Build the storyboard from the spine and beat map in `VIDEO.md`; if they are missing, offer to run `brief` first. Build a table with one row per scene: start time, duration, exact on-screen text, the figure or visual, the technique, what moves (with curve, duration and distance), and the transition into the next scene.

- Choose each scene's technique from the line's meaning. Read the index by meaning in `references/techniques.md`, pick the entry whose image enacts the line, and adapt its key parameters to `STYLE.md`. Name the entry in the table so `export` can carry its build notes. Keep the signature move as the thread; techniques serve it, not the other way round.
- Give each beat a device from `references/visual-explanation.md`: the way the idea becomes visible (interface simulation, ghosts, same space with two behaviours, a camera push, one canvas…). Neighbouring beats use different devices or compositions. Run the slide test on every scene: if a paused frame reads as a slide, rework it.
- Choose each transition from `references/transitions.md` by the relation between the two beats, and write the relation next to it. Never the same type twice in a row; at least four kinds in a piece over 60 s; the biggest one leads into the payoff.
- When the piece shows a product or a tool, simulate its interface with real components: the product's own when you can see it, otherwise the design system it is built on. Never invent controls.
- One protagonist at a time. Text enters when the main movement is about 60% complete, never during it.
- Check reading time for every line of text with the rule in `principles.md`. For silent pieces, flag any line held for less than its reading time.
- Use only facts from `VIDEO.md`. Anything not there is marked `[verify]`.
- Read the storyboard as a whole before finishing: if every scene has the same structure, apply `variance` and say what you changed.
- Make sure the image and the text say the same thing. If the line says "funding freezes", the figure should freeze, not pile up.

### `recipe <reference>`

Turn a reference into values someone can reuse. Read `references/principles.md`.

1. **Inspect.** With a browser, read computed transitions and keyframes, look for libraries (GSAP, Three.js, Lenis, OGL), and read the names and values of any on-page controls: authors often expose the exact parameters. With only a clip or screenshot, estimate and say so.
2. **Classify.** Give the family (particles, physics and cloth, fluids, glass and lenses, organic forms, pixel and ASCII, generative patterns, 3D and waves, scroll and transitions) and the mental model: simulation, function of time, function of distance, per-pixel shader, or discrete rules.
3. **Extract values.** Durations, curves, distances, counts and parameters.
4. **Say what it communicates** and when it would be the wrong choice.
5. **Map it to targets.** How to reproduce it in each tool, from "paste these values into ChatCut" to "needs Blender".
6. **Critical note.** Cliché risk, licence, and anything you could not verify.

Write the result in the same format as the entries in `references/techniques.md`, with a slug, source and credit, what it is, what it communicates, key parameters, build routes, difficulty and critical note, so it can join the library. If the skill folder is editable, offer to add the entry and to list it in the index by meaning.

Extract values and intent; never copy a reference's code or assets into the person's project.

### `export <target>`

Read `references/targets/<target>.md` (`chatcut`, `remotion` or `generic`; use `generic` for any other tool and adapt it). Compile `VIDEO.md`, `STYLE.md` and `STORYBOARD.md` into what the tool needs. The target file only translates: it never changes the creative decisions made in the project files.

If you are running inside the target tool itself, as with ChatCut's agent, or have its tools available, build directly instead of handing the person something to paste. The target file says how.

Every export:

- states motion as numbers (ms, curve values, px, counts) next to the intent behind them, because tools follow numbers more reliably than adjectives, and generalise better when they know why;
- for each technique named in the storyboard, carries its key parameters and build notes from `references/techniques.md`, so the tool knows how to build it and not only what it should look like;
- includes the forbidden list from `STYLE.md`;
- asks the tool to pilot the first scene and the closing before building the rest, and to report what it could not do;
- ends with the review checklist from `critique`, so the tool checks its own frames.

### `critique`

Read `references/ai-tells.md`, and `STYLE.md` if it exists.

If you have a video file and `ffmpeg`, run `python scripts/detect.py <video>` first: it reports fades to black, frozen stretches and cut rhythm, which are hard to judge from stills. Then look at frames.

Score each criterion from 1 to 5 with one line of evidence:

| Criterion | Question |
|---|---|
| Concept | Is the figure understood without reading the text? |
| Hierarchy | Does the eye know where to go first, second, third? |
| Legibility | Can every line be read in the time it is on screen? |
| Choreography | One protagonist at a time, overlap instead of dead frames? |
| Timing | Do entrances decelerate, exits run faster, holds feel intended? |
| Material and light | Does the piece have texture, depth, a physical feel? |
| Distinctiveness | How many AI tells are present? |
| Consistency | Does it follow `STYLE.md`? |

Then list the AI tells you found, and the three fixes with the most impact. Write each fix as an instruction ready to paste into the tool. When a scene looks generic because of its technique, suggest an alternative from `references/techniques.md` that says the same thing better. Be specific about what stills cannot show: motion, fluidity and rhythm need the video.

## References

Read only what the current command needs.

The reference files live in a `references/` folder next to this file. Some hosts install a skill as this single file: Claude accounts, and agents that load those skills, such as ChatCut's. If the folder is missing, read the same files from the public repository, replacing the path below:

`https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>`

If you cannot reach them either, work from the embedded essentials in the single-file edition, if this is that edition, and say that the full references were not available.

| File | Read for |
|---|---|
| `references/narrative.md` | Hook, promise, proof, payoff and ask; structures by type of piece; beats, rhythm and the beat map. `brief`, `storyboard`, `critique` |
| `references/visual-explanation.md` | Devices that make an idea visible, the slide test, interface simulation with real design systems, cursor choreography. `style`, `storyboard`, `export`, `critique` |
| `references/transitions.md` | Transitions chosen by the relation between beats, a catalogue with durations and related techniques, eye trace and other ways to hide the seam. `storyboard`, `export`, `critique` |
| `references/principles.md` | Timing, curves, distances, choreography, type timing, material behaviour. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/ai-tells.md` | What makes motion and video read as AI-generated, and what to do instead. `style`, `export`, `critique` |
| `references/techniques.md` | 38 techniques from real reference pieces, indexed by meaning and by family, with key parameters and build routes. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/targets/chatcut.md` | Exporting to ChatCut |
| `references/targets/remotion.md` | Exporting to Remotion, through Claude Code or any coding agent |
| `references/targets/generic.md` | Any other tool, or a spec for a human animator |
| `scripts/detect.py` | Automatic checks on an exported video |
