---
name: unrushed
description: Motion direction for videos and animated pieces that must not look AI-generated. Use it to brief, style, storyboard, export or critique motion graphics, explainer and promo videos, animated titles, kinetic typography, transitions, particle and morph sequences, and prompts for video tools such as ChatCut, Remotion, After Effects or Claude Code. Use it as well when someone says a video looks generic, cheap or "made with AI", wants better animations or transitions, shares a site or clip whose motion they want to reproduce, or asks for a storyboard or a motion style guide, even if they never say "motion design".
---

# Unrushed

Generic motion comes from defaults: every element fades up the same 30 px in the same half second, scenes dip to black, the palette is neon on navy, and nothing moves for a reason. Unrushed replaces adjectives with decisions. Every movement gets a purpose, a duration, a curve, a distance and a place in the order of things. "Smooth and modern" is not a direction; "enters over 700 ms on an expo-out curve, 16 px, 150 ms after the year" is.

The name is the stance: calm, deliberate motion that gives the viewer time to read and feel. Unrushed does not mean slow. A fast piece can be unrushed if every beat is chosen.

## How to work with it

Unrushed is a set of commands around one loop: **context → create → review → steer**. The person directs; you execute and advise. Run the command they ask for. If they ask for something without naming a command, pick the one that fits and say which one you used. A request to improve, fix or polish a video that already exists ("make this video better", "mejora todo el video") is `improve`, not `critique`: `critique` reports, `improve` changes the piece and answers for every fix. Suggest the next step at the end of each command, but do not run a chain of commands on your own: the human judgment between steps is the point.

Reply in the person's language. Command names stay in English.

**Where the files are.** Commands read files in `references/`. If that folder is not next to this file, read "References" at the end of this file before opening anything: it says where else to find them.

### Project files

Commands share up to four files in the project folder. Read whichever exist before any command.

| File | Written by | Holds |
|---|---|---|
| `BRAND.md` | `brief`, from the person's brandbook or built in the conversation | The brand rules the piece must keep: logo use, colours with roles, type, graphic elements, imagery, motion, voice, video templates |
| `VIDEO.md` | `brief` | What the piece is: topic, message, audience, format, sound, through-line, facts to verify |
| `STYLE.md` | `style` | How it looks and moves: material, palette, type, dials, signature move, forbidden list |
| `STORYBOARD.md` | `storyboard` | Scene by scene: exact text, figure, motion, timing, transition, and the cue sheet of library effects, zooms and sound |

| `REVISION.md` | `improve` | Baseline scores, the fixes with their acceptance tests, and their status after the rebuild |

Templates are in `assets/`. If a command needs a file that does not exist, say so and offer to run the command that creates it, rather than inventing its contents.

### Context before creation

No command that creates or changes visuals (`style`, `storyboard`, `export`, `improve`) runs on assumptions. If `VIDEO.md` is missing, or `BRAND.md` is missing for a branded piece, run the intake first. The intake has four steps:

1. **Extract what you can.** Read the conversation and the files. When a video or project already exists, also read:
   - its script, voice-over or transcript;
   - the fonts, colours and logo it uses;
   - the screens it shows.
2. **Find the product**, when the piece shows one: its code, its design files and the running product (`references/visual-explanation.md` §8). Do this before designing any interface.
3. **Ask one round of questions**, at most five, for what is still missing:
   - the brand: brandbook, logo, imagery and things to avoid;
   - the script or voice;
   - the product demo: the flow, the "aha" moment, the sources, the sample data, and what must not be shown;
   - format and constraints.
4. **Write it down.** Put the answers in `VIDEO.md` and `BRAND.md`.

Do not start building in the same turn as the questions. If the person says to skip the questions, go ahead, but write an **Assumptions** list at the top of the plan and of the report, one line per assumption, so each can be corrected.

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
| Context | `brief` | Captures what the piece is, its one visual idea and the brand it must keep | a brandbook, if there is one | `VIDEO.md`, `BRAND.md` |
| Context | `style` | Defines the visual and motion system | `VIDEO.md`, `BRAND.md` | `STYLE.md` |
| Create | `storyboard` | Breaks the piece into timed scenes and cues | `VIDEO.md`, `STYLE.md`, `BRAND.md` | `STORYBOARD.md` |
| Create | `recipe <reference>` | Turns a site, clip or screenshot into reusable motion values | — | a recipe in the reply |
| Deliver | `export <target>` | Compiles everything into a prompt or spec for one tool | all project files | the deliverable |
| Review | `critique [focus]` | Scores frames or a video and lists what to fix, with a test for each fix | `STYLE.md`, `BRAND.md` if they exist | a report in the reply |
| Review | `improve` | Rebuilds an existing piece: intake, critique, a revision plan with tests, approval, rebuild, re-score | everything it can find | `VIDEO.md`, `BRAND.md`, `REVISION.md`, the new version |

### `brief`

Read `references/narrative.md` first. Ask only what you cannot infer from the conversation or files, and at most five questions at once:

1. Topic, the goal (explain, sell, launch, teach, celebrate) and the one sentence the viewer should leave with.
2. Audience: who they are, what they already know or believe, and what they should feel or do afterwards.
3. Platform, aspect ratio, duration and sound. A silent piece carries its whole narrative in on-screen text and motion beats, which changes the timing rules.
4. Facts the piece states (dates, names, figures, product claims). List them; each needs a source or is marked `[verify]`.

   **For a product**, do not just ask whether you can see it: look for it (`references/visual-explanation.md` §8) in the project, a repository, the design files or the running product, and list what you found. Then ask for what is still missing:
   - the flow the video should show, and the "aha" moment;
   - realistic sample data;
   - what must not be shown;
   - the repository or link, if you found nothing.
5. **The brand.** Ask for the brandbook or style sheet: a PDF, a link, a Figma file, design tokens, a guidelines `.md`, or even screenshots. Also ask for references and things to avoid.

**Brand first.** A piece for a real brand has to look like that brand, so ask about it before proposing anything visual.

- **If the person has a brandbook**, read it and write `BRAND.md` from the template: logo use, colours with roles, type and licences, graphic elements, imagery, motion, voice and video templates. Brandbooks are usually made for print and the web, so they rarely say how the brand moves. List what is missing for video (motion curves and durations, logo animation, transitions, lower thirds, end card) and propose those parts, marked as proposals, for the person to approve.
- **If there is none**, offer to build a short one in the conversation. Ask for, or propose for approval, five decisions:
  1. logo or name treatment and where it may appear;
  2. a palette with roles, and the one accent and its job;
  3. two type families with roles and licences;
  4. the motion personality (curve, tempo, what is forbidden);
  5. the voice, as a few words to use and avoid.

  Write them to `BRAND.md`, marked "built in conversation".
- **If the piece carries no brand** (a personal or one-off piece), say that `BRAND.md` is skipped and that `style` will set the look.

Brand rules outrank this skill's defaults. When a brand rule triggers an AI tell or a legibility problem, for example a default font from `ai-tells.md`, or a colour pair below 4.5:1 for text, keep the rule, say so, and suggest the least intrusive fix.

Then propose, and let the person choose or correct:

- **The spine.** Hook, promise, proof, payoff and ask, one line each, and the structure that fits the type of piece. The hook must work visually in the first second.
- **The through-line.** The single visual idea that carries the whole piece, and the most important decision in the brief. Propose two or three options and recommend one. A piece about the history of AI made of nine unrelated effects reads as a demo reel; the same piece where one set of particles travels from a neuron to a human profile reads as a story. A good through-line is a transformation that means something.
- **The beat map.** Sections with their tempo and beat lengths, and where the payoff lands on the tension curve.

For a product piece, also write the **product demo script** (`visual-explanation.md` §9): every step of the real flow with its action, the product's response, the screen and components it uses, and their source.

Write `VIDEO.md` from the template, and `BRAND.md` when there is a brand.

### `style`

Read `references/principles.md`, `references/ai-tells.md` and the index of `references/techniques.md` first.

**Within the brand.** If `BRAND.md` exists, its palette, type, logo rules and forbidden items are fixed. The directions you propose vary what the brand leaves open: material, ground, light, composition and the signature move. Say which brand rules each direction relies on.

**Propose before deciding.** Offer two or three directions and let the person choose; never pick a look silently. Directions must differ in material and ground, not only in colour: three palettes of the same idea are one direction. Do not reuse the look of earlier projects (earlier `STYLE.md` files, earlier pieces in the conversation) unless the person asks for it. For each direction give:

- a name and one sentence on how it feels;
- material, ground, palette, type, and light and finish;
- the signature move and the library techniques it draws on;
- a styleframe, one key frame rendered as a still, whenever you can render one, because people choose looks by seeing them.

Recommend one and say why it serves the through-line. Once the person chooses, complete it:

1. **Material.** Choose it before colour. It sets the motion personality: ink settles, glass is precise, fluid overlaps, cloth lags behind its driver.
2. **Palette.** A ground, an ink and at most one accent with a stated job ("the accent marks the present day"). Give hex values and roles.
3. **Type.** Two families at most, each with a role and sizes for the target resolution. Avoid the defaults listed in `ai-tells.md` unless the person asks for them.
4. **Light and finish.** What makes it physical: grain that moves (renewed every two frames, never a static overlay), motion blur on fast moves, shadow and depth, refraction or bloom only when the material has them.
5. **Dials.** Set `energy`, `density` and `variance`, and say why.
6. **Signature move.** One recurring motion that identifies the piece, such as particles that reassemble or a mask that always opens from the bottom. Name the entry in `references/techniques.md` it starts from.
7. **Forbidden list.** The generic choices this piece in particular is tempted by.
8. **Interface system**, when the piece shows a product or a tool: which components, icons and fonts the interface uses, and their licences. See `references/visual-explanation.md`.

**Pieces that show several styles or techniques**, such as a showcase or a demo of what a tool can do: define a frame system that stays constant (type, text zone, the through-line element), and give each style its own world, with its own ground, palette and light. If every style shares the same paper and ink, the viewer sees one style with different shapes.

Write `STYLE.md`. Include a ready-to-paste style block for the likely target (for ChatCut, the Design Style fields; see `references/targets/`).

### `storyboard`

Build the storyboard from the spine and beat map in `VIDEO.md`; if they are missing, offer to run `brief` first. Build a table with one row per scene: start time, duration, exact on-screen text, the figure or visual, the technique, what moves (with curve, duration and distance), and the transition into the next scene.

- Choose each scene's technique from the line's meaning. Read the index by meaning in `references/techniques.md`, pick the entry whose image enacts the line, and adapt its key parameters to `STYLE.md`. Name the entry in the table so `export` can carry its build notes. Keep the signature move as the thread; techniques serve it, not the other way round.
- Give each beat a device from `references/visual-explanation.md`: the way the idea becomes visible (interface simulation, ghosts, same space with two behaviours, a camera push, one canvas…). Neighbouring beats use different devices or compositions. Run the slide test on every scene: if a paused frame reads as a slide, rework it.
- Choose each transition from `references/transitions.md` by the relation between the two beats, and write the relation next to it. Never the same type twice in a row; at least four kinds in a piece over 60 s; the biggest one leads into the payoff.
- When the piece shows a product or a tool, simulate its interface with real components: the product's own, found as described in `visual-explanation.md` §8, otherwise the design system it is built on. Never invent controls.
  - Build demo scenes from the product demo script in `VIDEO.md`. Every key step shows an action and the product's visible response.
  - A camera move over a still screen connects steps; it is never a step.
  - Mark any screen not built from the real product as approximate.
- One protagonist at a time. Text enters when the main movement is about 60% complete, never during it.
- **Library effects, zooms and sound.** When the target tool has an effects library (ChatCut does), read `references/effects.md`.
  - The default is no effect.
  - Add a cue only when it does a job the cut, framing or graphics cannot: guide the eye, stress a line, hide something, separate the subject, show how a machine sees, mark another time.
  - Tie each zoom and sound accent to a word or line of the script.
  - Respect the budgets: at most one tier C effect, with a reason; at most two stylize looks per piece; roughly one zoom per 8–12 s in a talking head; never the same library transition on three cuts in a row.
  - Write every cue in the cue sheet of `STORYBOARD.md`, with its reason.
- Check reading time for every line of text with the rule in `principles.md`. For silent pieces, flag any line held for less than its reading time.
- Use only facts from `VIDEO.md`. Anything not there is marked `[verify]`.
- Make sure the image and the text say the same thing. If the line says "funding freezes", the figure should freeze, not pile up.

Before finishing, review the storyboard as a whole and fix what fails, saying what you changed:

- **Spine.** Each beat is tagged hook, promise, proof, payoff or ask, and the payoff is the strongest image at roughly 70–85% of the piece.
- **Rhythm.** At least three different beat lengths; the beat map in `VIDEO.md` is followed. With Python available, `python scripts/detect.py --storyboard STORYBOARD.md` checks scene lengths and repeated transitions.
- **Transitions.** No type twice in a row, at least four kinds over 60 s, the biggest one into the payoff.
- **Slide test.** No scene reads as a slide when paused; neighbouring beats use different devices.
- **Variance.** If scenes share the same structure, apply `variance`.
- **Cues.**
  - Every cue in the cue sheet has a reason and a tier.
  - No two distortions are stacked.
  - No zoom and transition fall within the same 10 frames.
  - The budgets in `effects.md` hold.
- **Brand.** Nothing contradicts `BRAND.md`.

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
- includes the forbidden list from `STYLE.md` and the brand rules from `BRAND.md`;
- carries the cue sheet from `STORYBOARD.md`: each effect, zoom, library transition and sound accent with its range in frames, its parameters and its reason. If the tool's library is available, the cues are applied directly; otherwise they are written so the tool can apply them (see the target file and `references/effects.md`);
- asks the tool to pilot the first scene and the closing before building the rest, and to report what it could not do;
- ends with the review checklist from `critique`, so the tool checks its own frames.

### `critique [focus]`

With a focus, such as `critique physics`, `critique demo`, `critique rhythm`, `critique transitions`, `critique effects`, `critique legibility` or `critique brand`, score that criterion in depth and the rest briefly. Without one, score everything.

Read `references/ai-tells.md`, `references/narrative.md`, `references/transitions.md`, and `STYLE.md` and `BRAND.md` if they exist. When the piece uses an editor's library effects, zooms or sound accents, also read `references/effects.md`. Read `references/principles.md` §9 for Physics, and `references/visual-explanation.md` when a product is shown. `critique` works on a finished video, on frames, or on a plan (`STORYBOARD.md`) before anything is built; critiquing the plan is the cheapest moment to fix rhythm and transitions.

If you have a video file and `ffmpeg`, run `python scripts/detect.py <video> --storyboard STORYBOARD.md` first: it reports:

- dips to black;
- stretches where nothing moves anywhere in the frame;
- hard cuts;
- the planned rhythm and repeated transitions;
- the cue sheet's budgets: cues without a reason, tier C and stylize looks over budget, zooms per minute, the same library transition three times in a row, zooms colliding with transitions, and stacked distortions.

Then look at frames, sampled densely around every transition. Stills cannot show physics. For the two or three movements that matter most, read consecutive frames (`detect.py --strip <seconds>`) or the per-frame change (`--profile <start> <end>`), as described in `principles.md` §9, or watch the video at full speed. If none of these is possible, say that Physics was not scored rather than guessing.

Score each criterion from 1 to 5 with one line of evidence:

| Criterion | Question |
|---|---|
| Story | Does the hook work in the first second? Is the promise kept by a payoff that is the strongest image? Is the ask clear? |
| Rhythm | Do beat lengths vary with purpose: building, then holding after a reveal? Or does it tick along evenly? |
| Explanation | Is each idea shown happening, with a device, rather than written beside a demo? Does any paused frame read as a slide? |
| Transitions | Does each transition say the relation between beats? How many kinds, and are any repeated back to back? |
| Effects | Does every library effect, zoom and sound accent do a job the cut cannot? Is each zoom tied to a word? Are the budgets in `effects.md` kept, with no gimmick without a reason and nothing stacked? Would the beat be better with no effect at all? |
| Concept | Is the figure understood without reading the text? |
| Hierarchy | Does the eye know where to go first, second, third? |
| Legibility | Can every line be read in the time it is on screen? |
| Choreography | One protagonist at a time, overlap instead of dead frames? |
| Timing | Do entrances decelerate, exits run faster, holds feel intended? |
| Physics | Do things move with mass, inertia, follow-through, overlap and arcs, or do they glide at one speed and stop dead? Scored from strips, a profile or playback, never from single stills. |
| Product demo | Only when a product is shown. Is it the real product, found in its code, design files or running app, with the sources listed? Does each key step show an action and the product's visible response, or is it camera moves over still screens? |
| Material and light | Does the piece have texture, depth and light that belong to its material? Does each style have its own world? |
| Distinctiveness | How many AI tells are present? |
| Consistency | Does it follow `STYLE.md`, and `BRAND.md` when there is one: logo use, colour roles, type, voice? |

Then list the AI tells you found, and the fixes:

- **Which fixes.** The three with the most impact, plus one for every criterion scored 2 or less. A low score never goes without a fix.
- **What each fix contains:**
  - where it applies (scene and time);
  - what is wrong now, with evidence;
  - the change, in numbers;
  - an **acceptance test**: something observable that proves the fix worked, for example "in 'the AI reads the email', the email is seen arriving and the click produces ticket REC-1104 within 300 ms";
  - its weight: light or heavy.
- **Write it ready to paste** into the tool.
- **A fix must treat the problem it names.**
  - Physics is fixed by changing how things move.
  - A demo is fixed with actions and responses on the real interface.
  - Grain, glow, a camera move or a slower duration are not fixes for those.

When a scene looks generic because of its technique, device or transition, suggest an alternative from `references/techniques.md`, `references/visual-explanation.md` or `references/transitions.md` that says the same thing better. Be specific about what stills cannot show: motion, fluidity and rhythm need the video.

### `improve`

Use it for a video or project that already exists, whether or not Unrushed made it. `critique` reports; `improve` rebuilds the piece and answers for every fix. Keep the previous version intact for comparison.

1. **Context.** Run the intake in "Context before creation":
   - watch or sample the video and read its timeline, script or transcript;
   - find the product when there is one;
   - ask one round of questions;
   - write `VIDEO.md` and `BRAND.md`.

   Change nothing yet.
2. **Baseline.** Run `critique` on the current version, with the focus the person asked for if any, and save the scores at the top of `REVISION.md`.
3. **Revision plan.** Write `REVISION.md` from the template: one row per fix, with the criterion, the place, the evidence, the change in numbers, the acceptance test and the weight. It includes:
   - the three highest-impact fixes;
   - a fix for every criterion scored 2 or less;
   - when Product demo scores 3 or less, a demo script rebuilt from the real product (`visual-explanation.md` §8–9);
   - when Physics scores 3 or less, the movements that change and how (mass, follow-through, overlap, arcs, settle), with the strip or profile that shows the problem.

   Update `STORYBOARD.md` for the scenes that change.
4. **Approval.** Show the plan with the heavy fixes marked, and wait for approval. If the person already said to apply without asking, continue, with the Assumptions list at the top.
5. **Rebuild.** Build every approved fix in full, heavy fixes first. This is the **fix contract**:
   - Never swap a fix for a cheaper one. A rebuilt demo cannot become a camera move, physics cannot become grain, and a new transition cannot become a slower old one.
   - If a fix cannot be done as planned, stop that fix, say why, and propose the closest real alternative.
   - Nothing approved becomes "optional" later.
6. **Verify.** Run each acceptance test on the new version with frames, strips, the profile and the detector, then re-score every criterion. Report:
   - each criterion's baseline score next to its new one;
   - each fix as **done**, **partial** or **not done**, with evidence (time, frame, measurement);
   - what could not be verified.

   A criterion whose score did not rise is not reported as fixed.

## References

Read only what the current command needs.

The reference files live in a `references/` folder next to this file. Some hosts install a skill as this single file: Claude accounts, and agents that load those skills, such as ChatCut's. If the folder is missing, read the same files from the public repository, replacing the path below:

`https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>`

If you cannot reach them either, work from the embedded essentials in the single-file edition, if this is that edition, and say that the full references were not available.

| File | Read for |
|---|---|
| `references/narrative.md` | Hook, promise, proof, payoff and ask; structures by type of piece; beats, rhythm and the beat map. `brief`, `storyboard`, `critique` |
| `references/visual-explanation.md` | Devices that make an idea visible, the slide test, interface simulation with real design systems, cursor choreography, finding the real product (code, design files, running app) and the product demo script. `brief`, `style`, `storyboard`, `export`, `critique`, `improve` |
| `references/effects.md` | Library effects, zooms, transitions and sound accents (ChatCut's library and their Remotion and After Effects equivalents): choosing by intent, tiers, budgets, and how to apply them through ChatCut's tools or a prompt. `storyboard`, `export`, `critique` |
| `references/transitions.md` | Transitions chosen by the relation between beats, a catalogue with durations and related techniques, eye trace and other ways to hide the seam. `storyboard`, `export`, `critique` |
| `references/principles.md` | Timing, curves, distances, choreography, type timing, material behaviour, physics and how to check it in a video. `style`, `storyboard`, `recipe`, `export`, `critique`, `improve` |
| `references/ai-tells.md` | What makes motion and video read as AI-generated, and what to do instead. `style`, `export`, `critique` |
| `references/techniques.md` | 38 techniques from real reference pieces, indexed by meaning and by family, with key parameters and build routes. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/targets/chatcut.md` | Exporting to ChatCut |
| `references/targets/remotion.md` | Exporting to Remotion, through Claude Code or any coding agent |
| `references/targets/generic.md` | Any other tool, or a spec for a human animator |
| `scripts/detect.py` | Automatic checks on an exported video (dips, freezes, cuts), frame strips and motion profiles for judging physics, and checks on the rhythm, transitions and cue sheet of a `STORYBOARD.md` |
