---
name: unrushed
description: Motion direction for videos and animated pieces that must not look AI-generated. Use it to brief, style, storyboard, export or critique motion graphics, explainer and promo videos, animated titles, kinetic typography, transitions, particle and morph sequences, and prompts for video tools such as ChatCut, Remotion, After Effects or Claude Code. Use it as well when someone says a video looks generic, cheap or "made with AI", wants better animations or transitions, shares a site or clip whose motion they want to reproduce, or asks for a storyboard or a motion style guide, even if they never say "motion design".
---

# Unrushed

> **Single-file edition.** The reference files are embedded at the end of this file, each under a heading "Embedded: <path>". Whenever an instruction says to read a file in `references/`, read that section instead of looking for the file on disk. Files not embedded (`targets/remotion.md`, `targets/generic.md`, the templates, the example, `scripts/detect.py`, `assets/remotion/unrushed-motion.ts`) can be read from https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>.

Generic motion comes from defaults: every element fades up the same 30 px in the same half second, scenes dip to black, the palette is neon on navy, and nothing moves for a reason. Unrushed replaces adjectives with decisions. Every movement gets a purpose, a duration, a curve, a distance and a place in the order of things. "Smooth and modern" is not a direction; "enters over 700 ms on an expo-out curve, 16 px, 150 ms after the year" is.

The name is the stance: calm, deliberate motion that gives the viewer time to read and feel. Unrushed does not mean slow. A fast piece can be unrushed if every beat is chosen.

## How to work with it

Unrushed is a set of commands around one loop: **context → create → review → steer**. The person directs; you execute and advise. Run the command they ask for. If they ask for something without naming a command, pick the one that fits and say which one you used. A request to improve, fix or polish a video that already exists ("make this video better", "mejora todo el video") is `improve`, not `critique`: `critique` reports, `improve` changes the piece and answers for every fix. Suggest the next step at the end of each command, but do not run a chain of commands on your own: the human judgment between steps is the point.

Reply in the person's language. Command names stay in English.

**Where the files are.** Commands read files in `references/`. If that folder is not next to this file, read "References" at the end of this file before opening anything: it says where else to find them.

### Project files

Commands share these files in the project folder. Read whichever exist before any command. Read `TASTE.md` first: what this person rejected before outranks the skill's defaults.

| File | Written by | Holds |
|---|---|---|
| `BRAND.md` | `brief`, from the person's brandbook or built in the conversation | The brand rules the piece must keep: logo use, colours with roles, type, graphic elements, imagery, motion, voice, video templates |
| `VIDEO.md` | `brief` | What the piece is: topic, message, audience, format, sound, through-line, facts to verify |
| `STYLE.md` | `style` | How it looks and moves: material, palette, type, dials, signature move, forbidden list |
| `STORYBOARD.md` | `storyboard` | Scene by scene: exact text, figure, motion, timing, transition, and the cue sheet of library effects, zooms and sound |
| `REVISION.md` | `improve` | Baseline scores, the fixes with their acceptance tests, and their status after the rebuild |
| `TASTE.md` | every command, whenever the person reacts | What this person said about pieces made for them, before-and-after pairs, and picks from blind reviews |

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

**Taste.** If `TASTE.md` does not exist, create it from the template. Read `taste/verdicts.md` in this skill too: the shared example of what made pieces read as AI-made, and why several rules exist.

Do not start building in the same turn as the questions. If the person says to skip the questions, go ahead, but write an **Assumptions** list at the top of the plan and of the report, one line per assumption, so each can be corrected.

## Never ship

A piece that contains any of these is not finished. Delete the element; do not justify it. These are the patterns that made people say "this was made with AI", in our tests and in a study of rejected films (motionmaxxing, Apache-2.0, github.com/Tejashmakwana/motionmaxxing). Details and alternatives are in `references/ai-tells.md`.

1. **Page furniture.** A brand or title in a corner, tracked-caps labels, scene or chapter counters ("02 / 05"), timecodes, FPS or resolution text, progress bars, crop marks, label chips naming the app or scene.
2. **Deck layouts.** A kicker above a headline, a held left-aligned headline beside a box or device, title then content, a header or footer bar.
3. **An invented product.** Made-up controls, names, numbers or messages when the real ones were reachable; a generic card with a status dot and "label · value"; a screenshot moved around by the camera instead of the product doing something.
4. **Invented proof.** Statistics, users, logos or quotes that are not in `VIDEO.md` with a source; a stat slide (a big centred number over a small label).
5. **Slogan copy.** "Meet X", "Not just X. It's Y.", "Unlock", "the future of", "in seconds", "AI-powered", three one-word sentences in a row.
6. **A flat swatch per scene, or a small object on a void.** A different flat colour for every scene reads as a deck; a small card in an empty ground reads as unfinished.
7. **A pinned element.** The same pill, dock or caption box at the same place through three or more shots.
8. **The house style as a default.** A designed transition, a dissolve or a whoosh on every cut; a different effect in every beat; a dot that becomes the logo because nothing else did; a headline typed letter by letter with a caret; glow, vignette or grain added "for depth".
9. **A web-footer ending.** Logo, tagline, button and URL stacked; any final frame held longer than 1.4 s.
10. **Self-certification.** "Verified", "clean" or "looks great" without the numbers from `scripts/detect.py` and a description of the frames you looked at.
11. **A piece nobody watched.** Delivering without sampling frames around every cut and every key movement.

## Looking honestly

Every command that judges a piece (`critique`, the verify step of `improve`, and the report after any direct build) follows the same order, because a model that ticks its own checklist reports a finished piece that is not:

1. **Run the gates** when you have the file: `python scripts/detect.py <video> --expect <planned seconds> [--expect-audio] --storyboard STORYBOARD.md`. It computes, from any tool's export:

   | Gate | Passes when | How |
   |---|---|---|
   | G0 piece exists | it decodes, is not blank, moves, matches the planned length, and has sound if sound was planned | script |
   | G1 proof readable | interface text is at least 4% of the frame height; the proof is large or cropped by the frame | by eye, on the contact sheet |
   | G2 no empty frames | no run of more than 3 flat frames | script |
   | G3 short ending | the final frame holds at most 1.4 s; the final shot is at most 25% of the piece | script |
   | G4 one hero per frame | one thing the eye goes to first in every frame | by eye, on the contact sheet |
   | G5 no page furniture | nothing from Never ship item 1 or 2 | the plan with `--storyboard`, the render by eye |

   A failed gate is fixed, never argued. It also prints notes that are questions, not gates: overall motion against human-made films, loudness, and sound that stops before the picture.
2. **Describe before you judge.** `--sheet` writes a contact sheet of evenly spaced frames and a second image with the frames around every cut, where broken transitions hide. Write one sentence per frame: what is on screen, what the eye goes to first, and whether it would pass for a slide.
3. **Check the Never ship list** against those frames and the plan. Any item present is a fix, whatever else scores well.
4. **Watch the moves that matter** as strips or a profile (`principles.md` §9), never from single stills.
5. **Fix in this order:** anything untrue or broken; the idea and what the viewer must understand; how beats connect; hierarchy and scale; timing; surface and finish; sound. Two or three honest passes beat ten cosmetic ones.
6. **Report, never certify.** Quote the gate results and numbers the script printed, say which gates you judged by eye, list the frame descriptions, say what is real and what is approximate, and say what you would still improve. Only the person decides whether it is good.

## Building in passes

Whenever you build or rebuild a piece yourself (`export` inside the tool, `improve`), build it in passes instead of in one go. A piece built in one go comes back polished on the surface and wrong underneath, and by then every fix is expensive. Each pass has one job, ends with a look at the render, and is fixed before the next starts.

| Pass | Job | Look at | Done when |
|---|---|---|---|
| 0. Hardest beat | Build only the hero moment (usually the payoff) and its hardest handoff, with real motion | 3 stills and a strip of the key move | It reads at full speed. If not, fix the idea or the staging now, before anything else exists |
| 1. Blocking | Every scene in place: real durations, positions, sizes, cuts and the carried object. Simple motion is fine | Contact sheet (`--sheet`) and `detect.py --expect <seconds>` | Length and rhythm match the plan; one hero per frame (G4); no frame reads as a slide; G0 passes |
| 2. Type and information | The exact words, sizes by role, reading time, real content and numbers | Contact sheet, and `--storyboard` | Every line readable in its time (G1); one claim per frame; no Never ship words |
| 3. Motion | The recipes from `references/motion-kit.md`: landings, exits, stagger, camera, press, cuts on motion | Strips and profiles of the 2–3 key moves (`--strip`, `--profile`), the cuts image | Landings decelerate, exits accelerate, no dead frames (G2), the ending holds 0.6–1.4 s (G3) |
| 4. Finish | Material, light and texture that belong to the world; cues; sound with 1–3 hand-placed hits | All gates and notes | Every gate passes or is reported as failed; the report follows "Looking honestly" |

Rules for every pass:

- **Describe the contact sheet** in one sentence per frame before changing anything.
- **Revise by frame range.** Name the scene and the frames ("frames 120–168: the card stops dead; give it `softLand` 12 f"), never "make it smoother".
- **Fix in the order of "Looking honestly"**, and do not polish a pass whose job is not done: grain does not rescue blocking, and timing does not rescue a beat that buys nothing.
- **Show the person after pass 0**, and again at the end. Credits and render time are spent on the passes in between only once the hardest beat works.
- **Two or three honest rounds per pass**, at most. If a pass still fails, say so and ask, rather than starting a new idea on your own.

## Learning the person's taste

Taste is learned from reactions, not assumed. Whenever the person reacts to a piece ("this looks AI", "too slow", "I like the second one"):

1. **Append it to `TASTE.md`** the same turn: date, piece and version, their words, what they reacted to (scene, time or frame) and the narrowest lesson it supports. Never rewrite an earlier entry.
2. **Apply it as far as its context goes.** A rejection of one ending is not a rule against all endings. When a verdict contradicts this skill's defaults, the verdict wins for this person; say so.
3. **When there are versions to choose between**, offer a blind review: `python scripts/blind_review.py old.mp4 new.mp4` writes a page that plays them side by side under random labels, records a pick, a rating, "looks AI-made" and the worst moment for each, and copies the verdict to paste into `TASTE.md`. Picking without knowing which is the new one keeps the comparison honest.

## Dials

Four settings shape every decision. Defaults suit most explainers; the person can change them at any time ("energy 7").

| Dial | Range | Default | What it changes |
|---|---|---|---|
| `energy` | 1–10 | 4 | Durations, distances, how much overshoot is allowed, how many things may move at once |
| `density` | 1–10 | 3 | Elements per frame, words per scene, how much empty space surrounds the protagonist |
| `variance` | 1–10 | 5 | How much scenes differ from one another in layout, rhythm and structure |
| `material` | a word | chosen in `style` | The physical behaviour motion borrows: ink, paper, glass, cloth, fluid, particles, metal, light |

How `energy` maps to numbers, as a starting point. Durations are in frames at 30 fps. Professional moves have a median of 10 frames (0.33 s); see `principles.md`.

| energy | Entry | Joins between scenes | Overshoot | Moving at once |
|---|---|---|---|---|
| 1–3 | 15–24 f (0.5–0.8 s) | hard cuts; one designed transition at most | none | 1 |
| 4–6 | 10–15 f (0.33–0.5 s) | hard cuts on motion; 1–3 designed transitions per minute | one late lean on an accent | 1–2 |
| 7–8 | 6–12 f (0.2–0.4 s) | fast hard cuts on motion | one visible spring, on the payoff | 2–3, staggered 1–3 f |
| 9–10 | 3–8 f snaps | rapid cuts, often 2–4 per second | expressive, still late and small | many, but choreographed |

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

Before the spine, write **the one true thing** and the **brand inventory** in `VIDEO.md` (`narrative.md` §5): the problem, the emotion, the one real feature or moment the piece is for, and what the brand already owns (logo shape, core control, material, key verb, success moment, voice).

Then propose, and let the person choose or correct:

- **The spine.** Hook, promise, proof, payoff and ask, one line each, and the structure that fits the type of piece. The hook must work visually in the first second.
- **The through-line.** The single visual idea that carries the whole piece, and the most important decision in the brief. Propose two or three options and recommend one. A piece about the history of AI made of nine unrelated effects reads as a demo reel; the same piece where one set of particles travels from a neuron to a human profile reads as a story. A good through-line is a transformation that means something, and it comes from the brand inventory rather than from the name's first association. Run the cover-the-logo test on each option: if a competitor's name could replace the brand's, say so.
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
6. **Signature move.** One motion that identifies the piece, such as particles that reassemble or a mask that opens from the bottom. Name the entry in `references/techniques.md` it starts from. It appears at the moments that matter, not in every scene, and it changes role each time; repeated identically, it becomes a template.
7. **Forbidden list.** The generic choices this piece in particular is tempted by.
8. **Interface system**, when the piece shows a product or a tool: which components, icons and fonts the interface uses, and their licences. See `references/visual-explanation.md`.

**Pieces that show several styles or techniques**, such as a showcase or a demo of what a tool can do: define a frame system that stays constant (type and the through-line element), and give each style its own world, with its own ground, palette and light. If every style shares the same paper and ink, the viewer sees one style with different shapes.

Write `STYLE.md`. Include a ready-to-paste style block for the likely target (for ChatCut, the Design Style fields; see `references/targets/`).

### `storyboard`

Build the storyboard from the spine and beat map in `VIDEO.md`; if they are missing, offer to run `brief` first. Build a table with one row per scene: start time, duration, what the beat buys ("the viewer believes ___") and its importance from 1 to 3 (`narrative.md` §5), exact on-screen text, the figure or visual, the technique, what moves (with curve, duration and distance), and the transition into the next scene.

- Use one idea and only the techniques it needs. Most scenes need no named technique: a cut, a camera move and a well-timed arrival are enough. When a line has a meaning a technique can enact, read the index by meaning in `references/techniques.md`, pick that entry, and adapt its key parameters to `STYLE.md`. Name it in the table so `export` can carry its build notes. A new technique in every beat is a showreel, not a piece.
- Give each beat a device from `references/visual-explanation.md`: the way the idea becomes visible (interface simulation, ghosts, same space with two behaviours, a camera push, one canvas…). Neighbouring beats use different devices or compositions. Run the slide test on every scene: if a paused frame reads as a slide, rework it.
- Join scenes with hard cuts on motion by default. Use a designed transition from `references/transitions.md` only where the relation between two beats needs it, and write the relation next to it. Never use a dissolve between scenes by default, never repeat a designed transition twice in a row, and lead into the payoff with the biggest one.
- When the piece shows a product or a tool, simulate its interface with real components: the product's own, found as described in `visual-explanation.md` §8, otherwise the design system it is built on. Never invent controls.
  - Build demo scenes from the product demo script in `VIDEO.md`. Every key step shows an action and the product's visible response.
  - A camera move over a still screen connects steps; it is never a step.
  - Mark any screen not built from the real product as approximate.
- Write "What moves" with the recipes and curve names from `references/motion-kit.md` ("words land, softLand 12 f, from 5% H; card arrives from 1.6× on snapSettle 18 f"), so the build uses measured values instead of improvising.
- One protagonist at a time. Text enters when the main movement is about 60% complete, never during it.
- **Library effects, zooms and sound.** When the target tool has an effects library (ChatCut does), read `references/effects.md`.
  - The default is no effect.
  - Add a cue only when it does a job the cut, framing or graphics cannot: guide the eye, stress a line, hide something, separate the subject, show how a machine sees, mark another time.
  - Tie each zoom and sound accent to a word or line of the script.
  - Respect the budgets: at most one tier C effect, with a reason; at most two stylize looks per piece; roughly one zoom per 8–12 s in a talking head; never the same library transition on three cuts in a row.
  - Write every cue in the cue sheet of `STORYBOARD.md`, with its reason.
- **Information.** At most a quarter of the beats are importance 3, and the payoff is one of them. Every claim is shown happening, with the proof before it or right after it; every setup (a prompt, a question, a problem) is answered on screen. One claim per frame, in as few words as the beat allows.
- Check reading time for every line of text with the rule in `principles.md`. For silent pieces, flag any line held for less than its reading time.
- Use only facts from `VIDEO.md`. Anything not there is marked `[verify]`.
- Make sure the image and the text say the same thing. If the line says "funding freezes", the figure should freeze, not pile up.

Before finishing, review the storyboard as a whole and fix what fails, saying what you changed:

- **Spine.** Each beat is tagged hook, promise, proof, payoff or ask, and the payoff is the strongest image at roughly 70–85% of the piece.
- **Information.** Every beat says what it buys; the importance budget holds; the picture still says each beat with the text covered.
- **Rhythm.** At least three different beat lengths; the beat map in `VIDEO.md` is followed. With Python available, `python scripts/detect.py --storyboard STORYBOARD.md` checks scene lengths, designed transitions, what each beat buys, the importance budget and the Never ship words.
- **Transitions.** Most joins are hard cuts on motion. Designed transitions appear only where a relation needs them, none is repeated back to back, there is no dissolve by default, and the biggest one leads into the payoff.
- **Never ship.** None of the items in the Never ship list. `detect.py --storyboard` flags counters, URLs, slogan words and unsourced numbers in the on-screen text, and page furniture named in the visual column.
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

- states motion as numbers from `references/motion-kit.md` (curve name and cubic-bezier, frames, distance, counts) next to the intent behind them, never as adjectives such as "smooth", because tools follow numbers more reliably than adjectives, and generalise better when they know why;
- for each technique named in the storyboard, carries its key parameters and build notes from `references/techniques.md`, so the tool knows how to build it and not only what it should look like;
- includes the forbidden list from `STYLE.md` and the brand rules from `BRAND.md`;
- carries the cue sheet from `STORYBOARD.md`: each effect, zoom, library transition and sound accent with its range in frames, its parameters and its reason. If the tool's library is available, the cues are applied directly; otherwise they are written so the tool can apply them (see the target file and `references/effects.md`);
- asks the tool to build in passes ("Building in passes"): the hardest beat first, then blocking, type, motion and finish, with a contact sheet after each, and to report what it could not do;
- includes the Never ship list, word for word, as things the tool must not add;
- ends with the review checklist from `critique`, so the tool checks its own frames, and asks for a report with numbers and frame descriptions instead of a verdict.

### `critique [focus]`

With a focus, such as `critique physics`, `critique demo`, `critique rhythm`, `critique transitions`, `critique effects`, `critique legibility` or `critique brand`, score that criterion in depth and the rest briefly. Without one, score everything.

Read `references/ai-tells.md`, `references/narrative.md`, `references/transitions.md`, and `STYLE.md` and `BRAND.md` if they exist. When the piece uses an editor's library effects, zooms or sound accents, also read `references/effects.md`. Read `references/principles.md` §9 for Physics, and `references/visual-explanation.md` when a product is shown. `critique` works on a finished video, on frames, or on a plan (`STORYBOARD.md`) before anything is built; critiquing the plan is the cheapest moment to fix rhythm and transitions.

If you have a video file and `ffmpeg`, run `python scripts/detect.py <video> --expect <seconds> --storyboard STORYBOARD.md` first: it reports:

- the gates G0–G5 (see "Looking honestly");
- dips to black;
- stretches where nothing moves anywhere in the frame;
- hard cuts;
- the planned rhythm and repeated transitions;
- the cue sheet's budgets: cues without a reason, tier C and stylize looks over budget, zooms per minute, the same library transition three times in a row, zooms colliding with transitions, and stacked distortions.

Then follow "Looking honestly": describe the sampled frames in one sentence each and check the Never ship list before scoring. Look at frames sampled densely around every transition. Stills cannot show physics. For the two or three movements that matter most, read consecutive frames (`detect.py --strip <seconds>`) or the per-frame change (`--profile <start> <end>`), as described in `principles.md` §9, or watch the video at full speed. If none of these is possible, say that Physics was not scored rather than guessing.

Score each criterion from 1 to 5 with one line of evidence:

| Criterion | Question |
|---|---|
| Story | Does the hook work in the first second? Is the promise kept by a payoff that is the strongest image? Is the ask clear? |
| Rhythm | Do beat lengths vary with purpose: building, then holding after a reveal? Or does it tick along evenly? |
| Explanation | Is each idea shown happening, with a device, rather than written beside a demo? Does any paused frame read as a slide? |
| Transitions | Does each transition say the relation between beats? How many kinds, and are any repeated back to back? |
| Effects | Does every library effect, zoom and sound accent do a job the cut cannot? Is each zoom tied to a word? Are the budgets in `effects.md` kept, with no gimmick without a reason and nothing stacked? Would the beat be better with no effect at all? |
| Information | Does every beat buy one belief, with at most a quarter of them emphasised? Is every claim shown happening, every setup answered, every number and name real and sourced? Does the idea pass the cover-the-logo test? |
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

Then list the Never ship items and the AI tells you found, and the fixes. Every Never ship item present is a fix, and Distinctiveness scores 2 or less while any remains:

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
5. **Rebuild** in passes ("Building in passes"), starting with the fix that touches the hardest beat. Build every approved fix in full, heavy fixes first. This is the **fix contract**:
   - Never swap a fix for a cheaper one. A rebuilt demo cannot become a camera move, physics cannot become grain, and a new transition cannot become a slower old one.
   - If a fix cannot be done as planned, stop that fix, say why, and propose the closest real alternative.
   - Nothing approved becomes "optional" later.
6. **Verify.** Run each acceptance test on the new version with frames, strips, the profile and the detector, then re-score every criterion. Report:
   - each criterion's baseline score next to its new one;
   - each fix as **done**, **partial** or **not done**, with evidence (time, frame, measurement);
   - what could not be verified.

   A criterion whose score did not rise is not reported as fixed. Offer a blind review of the old and new versions, and add the person's pick to `TASTE.md`. Quote the detector's numbers and the frame descriptions; never call the result verified or clean.

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
| `references/motion-kit.md` | The measured curves as cubic-beziers, recipes in numbers (land, leave, arrive from oversize, stagger, press, camera push and snap, whip, counters, the one spring) and how to apply them in ChatCut, Remotion (`assets/remotion/unrushed-motion.ts`) and After Effects. `storyboard`, `export`, `improve` |
| `references/principles.md` | Timing, curves, distances, choreography, type timing, material behaviour, physics and how to check it in a video. `style`, `storyboard`, `recipe`, `export`, `critique`, `improve` |
| `references/ai-tells.md` | What makes motion and video read as AI-generated, and what to do instead. `style`, `export`, `critique` |
| `references/techniques.md` | 38 techniques from real reference pieces, indexed by meaning and by family, with key parameters and build routes. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/targets/chatcut.md` | Exporting to ChatCut |
| `references/targets/remotion.md` | Exporting to Remotion, through Claude Code or any coding agent |
| `references/targets/generic.md` | Any other tool, or a spec for a human animator |
| `taste/verdicts.md`, `taste/edits.md` | What the author said about real pieces made with Unrushed, and before-and-after corrections: the shared example of taste, and the reason behind several rules. Every command, before proposing |
| `scripts/blind_review.py` | A page to compare versions side by side under random labels and record the person's pick for `TASTE.md` |
| `scripts/detect.py` | Automatic checks on an exported video (dips, freezes, cuts), frame strips and motion profiles for judging physics, and checks on the rhythm, transitions and cue sheet of a `STORYBOARD.md` |


---

# Embedded references (single-file edition)

This edition embeds the essentials so the skill works where only one file is installed. The full files, with every source link, are in the repository: https://github.com/amladinon94-source/unrushed. `targets/remotion.md`, `targets/generic.md`, the templates, `scripts/detect.py` and `assets/remotion/unrushed-motion.ts` are only there.

## Embedded: references/narrative.md

### Narrative and rhythm

A motion piece is a story before it is an animation. The story decides the rhythm, and the rhythm decides the motion. A video where every scene runs the same length with the same layout reads as a slideshow, even if each movement is well crafted. Read this file for `brief`, `storyboard` and `critique`.

#### Contents

1. The spine: hook, promise, proof, payoff, ask
2. Hooks
3. Structures by type of piece
4. Beats, not scenes
5. Information discipline: the one true thing, the brand's idea, what each beat buys, show then say, words, real content
6. Rhythm and the beat map
7. Tension and release
8. Pieces that sell a product
9. Checklist

#### 1. The spine

Every piece answers five questions in order. Write each in one line in `VIDEO.md` before any visual decision.

| Part | Question it answers | Typical share of a 60–120 s piece |
|---|---|---|
| **Hook** | Why should I keep watching? | the first 1–3 s |
| **Promise** | What will I get if I stay? | 5–10% |
| **Proof** | Show me. | 50–65%, in at most three beats of rising strength |
| **Payoff** | The moment the promise is kept. The strongest image of the piece. | 10–15% |
| **Ask** | What do I do now, or what do I keep? | the last 5–10%, held long enough to act on |

Shares are starting points. A teaser may be almost all hook and payoff; a tutorial may be almost all proof.

The spine stays the same whether the piece explains, sells or celebrates. What changes is what counts as proof: a demonstration, a result, a transformation, a number, a person.

#### 2. Hooks

The hook is visual first. In the first second something is already moving, or something is already wrong, unfinished or surprising.

Hooks that work:

- **Start mid-action.** The first frame is part of a movement already happening, not an entrance onto an empty screen.
- **A visual question.** Something incomplete, impossible or out of place that the viewer wants resolved.
- **Contrast.** Before and after, generic and crafted, problem and solution, side by side or one turning into the other.
- **The result first.** Show the finished outcome, then rewind to how it was made.
- **A concrete claim** with a figure the piece will prove. Only with a sourced figure.

Hooks that fail: a logo first, a title card first, a slow fade from an empty frame, an abstract background waiting for text.

#### 3. Structures by type of piece

**Explainer (60–120 s).** Hook → problem the viewer recognises → the turn ("there is another way") → how it works, in at most three ideas → proof → close. Each idea gets its own composition and its own visual device (see `visual-explanation.md`), never the same template three times.

**Product promo (15–45 s).** Hook with the product already in use → one benefit per beat, two or three beats, each shown in the real interface → payoff, the moment that matters to the user → logo and ask. Benefits, not a feature list.

**Launch or teaser (10–30 s).** Tension builds while the subject is withheld or partly seen → the reveal → a hold on the reveal → date or ask.

**Showcase or sizzle (30–90 s).** Cold open on the strongest piece → montage with cuts that accelerate → a breath → one hero piece held longer → end card. Montage is how a showcase shows breadth: twelve techniques at 1.5–3 s each say more than five at 8 s.

**Tutorial or walkthrough.** The end result first → steps, each with one visible action → the result again, now understood.

**Vertical social (6–30 s).** Hook in the first second, text inside safe areas and readable on a phone, a loopable ending.

#### 4. Beats, not scenes

A beat is one idea shown once. A scene can hold several beats; one beat can cross a transition. Plan the piece as beats, then group them into scenes.

- One beat, one protagonist, one thing to understand.
- Each beat needs a different visual device or composition from its neighbours. If three beats in a row share the same layout, the viewer stops looking and starts waiting.
- Text supports the beat; it does not carry it. If the beat cannot be understood with the sound off and the text hidden, the image is not doing its job.

#### 5. Information discipline

Noise in a generated piece is rarely too many effects. It is too many claims, said instead of shown, with nothing in them that belongs to this brand. Decide what the piece says before deciding how it moves. Several rules here follow a study of designer-made and AI-made launch films (motionmaxxing, Apache-2.0, github.com/Tejashmakwana/motionmaxxing), restated in our own words.

##### The one true thing

Before the spine, write four short lines in `VIDEO.md`: the **problem** the viewer has, the **audience**, the **goal** of the piece, and the **emotion** it should leave. Then name the one real feature or moment the piece exists for. Everything else is support or is cut.

##### The idea belongs to the brand

Look at what the brand already owns before inventing anything: the shape of its logo, its core control, its material, the verb it is about, the moment its users succeed, its voice. The strongest ideas turn one of those into the product's action: the logo's shape becomes the switch, the success moment becomes the ending.

- **Cover-the-logo test.** Cover the logo and swap in a competitor's name. If the piece still works, it is the category's film, not this brand's.
- **Avoid the name's first association.** Stars for a name that suggests stars, a glow for a name that suggests fire, a rocket for "launch". Everyone thinks of it first.
- **Invent the surroundings, keep the product literal.** The stage, light, camera and metaphor can be invented; the interface, logo, type and copy are the real ones.

##### What each beat buys

Every beat earns its place by changing what the viewer believes. Write it in the storyboard as **Buys: the viewer believes ___** ("this is for me", "it understood my mess", "it is one click", "I can try it now"). If you cannot finish the sentence, cut the beat.

Give each beat an **importance** before designing it:

| Importance | What it is | How it is treated |
|---|---|---|
| 1 | Connective | Fast, small: a cut, a word swap, a carried object |
| 2 | Supporting | Normal timing and size |
| 3 | The point | Slower, larger, its own sound, held for reading time plus 0.5–1 s |

At most a quarter of the beats are a 3, and the payoff is one of them. Treating every line the same is one of the strongest AI tells: when everything is emphasised, nothing is.

##### Show it, then say it

- **Consequence over claim.** Replace the adjective with what it causes. Not "smart alerts": the price crosses the line and the notification arrives. Not "fast": the result is on screen before the cursor finishes moving.
- **Proof before claim.** Let the viewer see it happen, then name it, or cut straight from the claim to the product doing it. A claim with no proof after it is a caption.
- **Every setup is answered on screen.** A typed prompt, a question, a toggle or a problem shown at the start has its result shown later. A setup that is never answered reads as unfinished.
- **The text-covered test.** Cover the on-screen text. If the picture no longer says the beat, the image is not doing its job.

##### Words on screen

- **One claim per frame,** one line at a time.
- **Few words.** One to three display words read in 0.5–1 s; a sentence needs 1.5–2 s; a paragraph never belongs on screen. A fast section uses fewer words, not less reading time.
- **The brand's own phrasing,** quoted exactly, beats any copywriting formula (`ai-tells.md`, "Words on screen").
- **Emphasis by scale first,** then colour, then isolation. Weight comes last. Spend the biggest size once.

##### Specific, real content

Specific content is the cheapest proof that a product is real; generic content proves the opposite.

- **Order of preference:** real copy and screens from the product; plausible, specific content marked as illustrative in `VIDEO.md`; an honest abstract idea. Never "Project Alpha", "Your Brand Here", lorem ipsum or a sender called "Name".
- **Numbers only from `VIDEO.md`,** with a source. A number earns screen time when it is real and the piece makes its size felt; shown inside the action that causes it, not on a slide. A counter for a claim lands on a round value; a counter in a data field lands on a specific value, so the screen feels real.
- **Nothing invented and shown as real:** users, customers, testimonials, partners, results or interface.

#### 6. Rhythm and the beat map

Rhythm is the pattern of durations. Monotony, every beat the same length, is the most common sign of a generated piece after the visual clichés.

Draw a beat map in `VIDEO.md`: each section with its tempo and its beat lengths.

| Section | Tempo | Beat lengths |
|---|---|---|
| Hook | fast | 1–2 s |
| Promise | settle | 2–3 s |
| Proof 1–3 | builds, shortening | 5 s, 4 s, 3 s |
| Montage | fast, accelerating | 2.5 → 1.2 s |
| Payoff | a breath, then the strongest image | 0.6–1.5 s breath, then 3–5 s |
| Ask | resolve | 2–3 s, final frame held 0.6–1.4 s |

These are starting points, and shorter is usually better. In one study of designer-made and AI-made launch films, the tightest films ran 15–20 s, and the longer ones (40–90 s) tended to repeat a device or end twice (motionmaxxing, Apache-2.0). Stop before the idea is exhausted.

Rules:

- **At least three different beat lengths** in any piece longer than 30 s.
- **Accelerate into a turn, hold after a reveal.** Shorter beats build tension; a long hold lets it land.
- **Three, then break.** A pattern repeated three times creates an expectation; break it on the fourth.
- **Contrast density.** A dense, busy beat makes the next sparse one feel calm, and the other way round.
- **Silent pieces** keep rhythm through motion beats: impacts, stops, holds and cuts on movement. With music, cut on the beat, place hits on downbeats and transitions on bar changes.
- **Reading time still rules** (see `principles.md`). A fast section uses fewer words, not shorter reading time.

#### 7. Tension and release

Plot the piece as a curve of intensity over time. A flat line is boring; a line that only rises is exhausting.

- The highest point, the payoff, usually lands at 70–85% of the duration.
- Place the quietest moment just before the biggest reveal.
- After the payoff, release: slower motion, more space, a hold.
- The ending breathes. The last frame stays long enough to read and remember.

#### 8. Pieces that sell a product

When the piece sells or explains a real product:

- **Know what the viewer must believe** at each beat: "this is for me", "this solves it", "it is easy", "I can trust it", "I will try it".
- **Show the real product.** Use its real interface when available, or the design system it is built on (see `visual-explanation.md`). Invented interfaces read as fake.
- **One benefit per beat.** Show the user's outcome, not the button.
- **The "aha" is the payoff.** The moment the product does something the viewer did not expect, held long enough to land.
- **The ask is concrete.** A URL, a command, a date, a single action, shown long enough to read and no longer. The final frame holds 0.6–1.4 s with something alive. A lockup of logo, tagline, button and URL is a landing page, not an ending: keep the name and the one action.
- **Claims are sourced.** Figures, customers and results come from the brief, or they are marked `[verify]`.

#### 9. Checklist

- Can you state the hook, promise, proof, payoff and ask in one line each?
- Is something already moving or unresolved in the first second?
- Is the strongest image the payoff, at roughly 70–85% of the piece?
- Does every beat say what it buys, and are at most a quarter of them importance 3?
- Does the piece pass the cover-the-logo test and the text-covered test?
- Is every claim shown happening, and every setup answered on screen?
- Is every number and name on screen real and sourced?
- Does the piece use at least three different beat lengths?
- Do neighbouring beats use different compositions or devices?
- Could a viewer follow the story with the sound off and the text hidden?
- Is the ask held long enough to act on?

## Embedded: references/principles.md

### Motion principles

The working numbers and rules behind every Unrushed decision. Values are starting points for 1920×1080 at 30 fps; scale distances with resolution and adjust durations with the `energy` dial.

#### Contents

1. Why anything moves
2. Duration
3. Curves
4. Distance
5. Asymmetry: entering and leaving
6. Choreography
7. Type on screen
8. Material behaviour
9. Physics in plain words
10. Classic principles, condensed

---

#### 1. Why anything moves

A movement earns its place by doing at least one of these jobs:

- **Direct attention**: tell the eye where to look next.
- **Show a relationship**: this came from that, these belong together, this causes that.
- **Show a change of state**: something appeared, grew, broke or was replaced.
- **Give character**: the way a thing moves says what it is made of and what it feels like.

If a movement does none of them, remove it. Stillness is part of the vocabulary: a held frame after a lot of motion reads as emphasis.

#### 2. Duration

Professional motion is faster than it feels. Across about 4,300 moves measured by the motionmaxxing project (Apache-2.0, github.com/Tejashmakwana/motionmaxxing), the median move lasts **10 frames at 30 fps (0.33 s)**. A piece built on 20–30 frame ease-outs everywhere is slower than every professional sample, and slow, even motion is what reads as "a slide deck that moves".

| What moves | Default at 30 fps | Usual range (p25–p75) |
|---|---|---|
| An entry by position or scale | 12 frames (0.4 s) | 6–24 frames |
| An exit by position | 13–14 frames, accelerating | 7–27 frames |
| Opacity, used only as a helper | 6 frames (0.2 s) | 4–12 frames |
| Blur clearing | 7 frames | 4–10 frames |
| A camera push or pull | 10–18 frames | 6–22 frames |
| A drift that keeps a hold alive | 20+ frames, linear, 1–3 px per frame | — |
| A transformation, such as a morph | 18–36 frames | once or twice per piece |

Size and distance still matter: a bigger thing, or a longer journey, takes longer. But start from these numbers, not from a second.

**Holds.** A hold is where meaning lands, but a frozen frame reads as a slide. While something holds:
- keep one living thing on it: a slow drift, a caret, light moving, a counter ticking;
- give a designed breath of 0.6–1.5 s, with a reason you can state, right before a payoff;
- let a payoff the viewer must read sit perfectly still for at most about 1 s;
- hold the final frame 0.6–1.4 s.

Source: the numbers in this section and sections 3–6 are measured by the motionmaxxing project (Apache-2.0, github.com/Tejashmakwana/motionmaxxing): about 4,300 moves in 53 professional moments, sampled frame by frame. They are defaults to start from, not rules for every frame.

#### 3. Curves

The curve says how something gains and loses speed, and it carries more character than the duration.

| Job | Curve (from `motion-kit.md`) | cubic-bezier |
|---|---|---|
| Enter: arrives, decelerates, settles | `softLand` | `(0.22, 0.776, 0.511, 0.942)` |
| Hero entry or the closing beat: most of the travel at once | `snapSettle` | `(0.136, 1.058, 0.298, 0.943)` |
| Medium move or camera push | `glide` | `(0.524, 0.892, 0.878, 0.995)` |
| Exit: starts gently, leaves fast, still moving at the end | `accelExit` | `(0.288, 0, 0.632, 0.043)` |
| Exit into a hard cut at full speed | `crashOut` | `(0.434, 0, 0.73, 0)` |
| Opacity, blur and colour ramps | `softInOut` | `(0.345, 0.074, 0.655, 0.926)` |
| Continuous motion: drift, creep, counters | linear | `(0, 0, 1, 1)` |
| The one late lean past the mark, once per piece | `popOver` | `(0.295, 0.157, 0.309, 1.398)` |

These are fits to measured professional moves. `motion-kit.md` has their usual durations, the recipes built from them (land, arrive from oversize, press, camera snap, whip…) and how to apply them in ChatCut, Remotion and After Effects. A brand's own curve, when `BRAND.md` has one, replaces `softLand` for entries; keep the exits accelerating.

Rules of thumb:

- **Landings decelerate.** Most professional landings ease out: they cover most of the distance in the first few frames and settle. That reads as heavy and certain.
- **Exits accelerate and end on the cut.** Things leaving speed up and are still moving when the shot ends. The cut is the edit, and the next shot inherits the speed.
- **Linear is only for continuous motion.** A linear entrance looks mechanical; a linear drift looks natural.
- **Overshoot is rare, late and small.** Fewer than one move in ten overshoots, and when it does, the peak comes late (about 65–70% of the way through), as a slow lean past the mark and back, not a fast bounce. Give a piece at most one visible spring, on the payoff.
- **Springs** are an alternative to curves when the motion should feel physical. Stiffness sets how fast it returns; damping sets how much it wobbles. High stiffness with high damping feels precise; low stiffness with low damping feels elastic and playful.

#### 4. Distance and arrival

- **Arrive by moving, not by fading.** Professional work uses movement for arrivals about six times as often as fades. Opacity is a 4–6 frame helper under a move, never the move itself. A fade-up of 8–24 px is the template entrance.
- **Identity objects arrive from larger and come down.** A logo, a key word, a card or a cursor starts at 1.4–5× its size and decelerates down to rest. Nothing with identity grows from zero.
- **Spend scale once.** One oversized arrival per piece is a decision; one in every beat is a house style. Endings usually get smaller.
- **Typical travel is larger than a nudge.** The median move travels about 5% of the frame's width sideways, or 8% of its height vertically. Small nudges are for helpers, not for the protagonist.
- **Blur to focus.** 3–10 px of blur clearing over 4–8 frames, under a move, reads as a camera finding focus.

#### 5. Asymmetry: entering and leaving

Exits accelerate; entrances decelerate. In frames they are about the same length (12 in, 13–14 out), but an exit ends at speed, usually on the cut, while an entrance settles. Symmetrical in-and-out timing, with the same curve both ways, is one of the clearest signs of a template.

#### 6. Choreography

Choreography is who moves, when, and in what order. Most generic motion fails here rather than in its curves.

- **One protagonist at a time.** At any moment one thing leads. Others are still, nearly still, or clearly secondary.
- **The 60% rule.** A secondary element starts when the main movement is about 60% complete. It feels connected without competing.
- **One claim per frame.** A frame says one thing. A label above a title above a support line is a slide, not a shot.
- **Stagger with intention.** Repeated siblings (letters, rows, tiles) start 1–3 frames apart, with uneven gaps, and each move lasts about twice the gap, so the tails overlap and the group reads as one gesture. Whole words run slower, 2–5 frames apart. A call to action spreads out to about 8 frames. A uniform timer delay reads as a loading list.
- **Overlap, never gap.** The next scene begins before the last one has fully left. Dead frames and dips to black break the thread. Scenes start already moving.
- **Parenting.** When one element drives another (a line that pulls a label, a shape that carries text), let the follower lag slightly behind the leader. Lag is what makes it feel attached.
- **Continuity of identity.** If something transforms, keep it the same thing: the same particles, the same line, the same shape. Viewers follow identity across transformations, which is why morphs tell stories that cuts cannot.

#### 7. Type on screen

For silent pieces the text is the narration, so it must be legible and have time to be read.

- **Fewer words, not longer holds.** One to three display words need 0.5–1 s; a short sentence needs 1.5–2 s; a paragraph never belongs on screen. If a line needs more than 2.5 s to read, it has too many words: cut it, or let the voice carry it.
- **Do not move text while it has to be read.** It arrives, it rests with at most a slow drift, it leaves.
- **Hierarchy by scale, not by labels.** Use two sizes doing the work: large for the one word that matters, small for everything else. Weight stays in the 400–550 range; emphasis comes from scale and colour, not from bold or from an italic serif word dropped into a sans line.
- **No page furniture.** No kicker above the headline, no tracked-caps labels, no scene counters ("02 / 05"), no timecodes, no corner brand names, no crop marks or brackets. A video is not a page. See `ai-tells.md`.
- **Sizes at 1920×1080:** display 120–220 px for the one word that matters, other lines 44–64 px. Interface text shown in the video must be at least 4% of the frame height (about 43 px), magnified by the camera if needed. For vertical 1080×1920 video, scale up by about 1.3.
- **Words arrive whole.** Enter by word or line, 2–5 frames apart. Letter-by-letter typing only inside the product's own input field.
- **Place text where the picture needs it.** Usually one line near the optical centre, or a phrase split by an object. Never the same caption slot shot after shot, and never a left-aligned headline beside a box.

#### 8. Material behaviour

Motion borrows its personality from a material. Choosing one makes timing decisions consistent.

| Material | How it moves | Timing feel | Overshoot |
|---|---|---|---|
| Ink and paper | Settles, spreads, dries; marks accumulate | Slow arrivals, long holds | None |
| Glass | Precise, light, refracts what is behind it | Quick and exact | None; a slight lag in the refraction |
| Cloth | Lags behind what moves it, folds, sways after stopping | Medium, with follow-through | Soft |
| Fluid | Everything overlaps; nothing stops at once | Long, continuous | Soft, through momentum |
| Particles | Inertia plus noise; the group has a shape, individuals wander | Medium, with staggered starts | Through spring and noise |
| Metal | Heavy, decisive, short travel | Quick start, firm stop | Minimal |
| Light | Fades, blooms, travels along paths | Fast, with trails | None |
| Paper cutout | Flat layers, crisp moves, slight shadow | Snappy | Small |

These are starting points to adjust by eye, not physics.

#### 9. Physics in plain words

When motion should feel physical, these are the controls and what they feel like:

- **Velocity and acceleration.** Where it is going, and how quickly that changes. Everything else is a way of changing acceleration.
- **Spring.** Pulls toward a target. Stiff springs feel tight and fast; soft springs feel loose and elastic.
- **Friction, or damping.** How much energy is lost each moment. High friction feels like honey; low friction feels like ice.
- **Mass.** Heavy things start and stop slowly and push light things around.
- **Inertia.** Things keep going after the force stops. This gives the "weight" people feel in smooth-scroll sites.
- **Noise.** Smooth randomness, such as Perlin or simplex. It makes things look alive instead of jittery.
- **Interpolation.** Blending from A to B by a value from 0 to 1, shaped by a curve. Morphing is interpolation applied to many points at once.

In rendered video every value must come from the frame number, not from the previous frame, so the same frame always looks the same (see `targets/remotion.md`).

**Checking physics in a video.** Single stills cannot show physics. Use one of these instead:

- **Watch the video at full speed.**
- **Read consecutive frames.** For the two or three movements that matter most (the protagonist's entrance, a transformation, a cursor action), take 8–12 frames in a row at the video's own frame rate and read them as a strip. `scripts/detect.py --strip <seconds>` makes the strip, and `--profile <start> <end>` prints how much the frame changes from one frame to the next.

What to look for:

| Look for | Physical | Not physical |
|---|---|---|
| Arrival | Big steps first, then smaller and smaller ones (deceleration), perhaps a small overshoot that settles | Equal steps (linear), or full speed until a dead stop |
| Mass | Bigger or heavier things take longer to start and to stop | Everything moves with the same timing whatever its size |
| Follow-through | Attached parts (labels, shadows, children) arrive a few frames after their driver | Everything stops on the same frame |
| Overlap | The next movement starts before the last one fully settles | Moves wait for each other in a queue |
| Arcs | Paths curve | Straight lines between points at constant speed |
| Secondary motion | Small reactions: a shadow tightens, a counter ticks, a card settles | Only the main object moves |

A fix for physics changes how things move. Grain, glow or blur are finish, not physics.

Recommended reading for this section: Daniel Shiffman, *The Nature of Code* (2024, p5.js), chapters 1–6.

#### 10. Classic principles, condensed

From the animation canon (Disney's twelve principles) and its adaptation to interfaces (Issara Willenskomer's UX in Motion), the ones that matter most for motion graphics:

- **Slow in and slow out.** Covered by curves.
- **Anticipation.** A small counter-move before a big move signals that something is coming.
- **Follow-through and overlapping action.** Parts stop at different times; nothing halts all at once.
- **Arcs.** Natural movement travels on curves, not straight lines.
- **Staging.** One clear idea per moment, as with one protagonist.
- **Secondary action.** Small supporting motion that enriches the main one without stealing focus.
- **Exaggeration.** Turned up and down by `energy`.
- **Offset and delay.** Related elements move together but not in lockstep.
- **Transformation.** One element becomes another instead of being replaced.
- **Masking.** Revealing through a shape that grows or wipes; a strong alternative to fading.
- **Parallax and dimensionality.** Depth through different speeds and through folding or flipping.
- **Dolly and zoom.** Moving the camera through the scene rather than moving the scene past the camera.

## Embedded: references/motion-kit.md

### Motion kit: measured values, ready to paste

`principles.md` says why things move the way they do. This file gives the numbers to paste, so a tool builds measured motion instead of improvising average motion. Use the curve names in the storyboard's "What moves" column ("words land, softLand 12 f, from 5% H below"), and `export` translates them into each tool.

Source: curve shapes, durations, offsets and ratios are measured frame by frame on about 4,300 moves in 53 professional moments by the motionmaxxing project (Apache-2.0, github.com/Tejashmakwana/motionmaxxing). The cubic-bezier fits, recipes and code here are Unrushed's own.

Durations are in frames at 30 fps (f). At 24 fps multiply by 0.8; at 60 fps by 2. H is the frame height, W the width.

#### Contents

1. The curves
2. Recipes
3. In ChatCut
4. In Remotion
5. In After Effects
6. What not to do

#### 1. The curves

Each curve is a cubic-bezier fitted to the median of a cluster of real moves. The shape column gives how much of the travel is done at 10, 25, 50 and 75% of the time.

| Name | cubic-bezier | Shape at 10/25/50/75% | Frames (usual) | Use it for |
|---|---|---|---|---|
| `softLand` | `(0.22, 0.776, 0.511, 0.942)` | 30 / 59 / 85 / 95 | 12 (6–21) | Entries: text rising, panels sliding, scale-ins. The workhorse |
| `snapSettle` | `(0.136, 1.058, 0.298, 0.943)` | 54 / 84 / 96 / 98 | 11 (6–29) | Hero entries and the closing beat: most of the travel at once, then a soft tail |
| `glide` | `(0.524, 0.892, 0.878, 0.995)` | 16 / 39 / 69 / 91 | 10 (7–18) | Medium moves, camera pushes, blur to focus |
| `whip` | `(0.375, 0.947, 0.721, 1.0)` | 23 / 52 / 83 / 97 | 8 (7–13) | Big fast moves; the arriving half of a whip |
| `softInOut` | `(0.345, 0.074, 0.655, 0.926)` | 4 / 17 / 50 / 83 | 9 (6–16) | Opacity, blur, colour and ground ramps |
| `gentleIn` | `(0.252, 0, 0.595, 0.161)` | 1 / 6 / 24 / 55 | 9 (6–17) | The start of a fade-out; a slow push running into a cut |
| `accelExit` | `(0.288, 0, 0.632, 0.043)` | 0 / 3 / 17 / 47 | 13 (9–19) | Exits off frame and scale exits: peak speed near the end |
| `crashOut` | `(0.434, 0, 0.73, 0)` | 0 / 1 / 8 / 35 | 17 (11–31) | An exit or camera pull that ends at full speed on a hard cut |
| `cruise` | linear | 10 / 25 / 50 / 75 | 9, or 26+ for drift | Drift, camera creep, counters, fades |
| `popOver` | `(0.295, 0.157, 0.309, 1.398)` | 10 / 46 / 96 / 108 | 15 (11–27) | The one late lean past the mark (peak 1.08 at 72% of the time). Once per piece |

How often professionals reach for each: linear about 18%, `glide` and `softInOut` 14% each, `softLand` 9%, `gentleIn` 9%, `snapSettle` and `whip` 6% each, `accelExit` 5%, `crashOut` 4%, `popOver` 2%. Two curves that overshoot hard, a slam that passes its mark early and a big bounce, appear in about 1% of moves and are left out of the kit on purpose.

#### 2. Recipes

Each recipe is a move in numbers. Combine them; do not stack more than two channels on one element.

| Move | Values | Notes |
|---|---|---|
| **Land** | `softLand` 12 f; words from 3–7% H below their slot or 3% W beside it; cards from below the frame; opacity 0.2 → 1 over the first 4–6 f only | Arrive by moving. Opacity alone is the template entrance |
| **Hero entry** | `snapSettle` 11 f; for a logo or wordmark 18–30 f | One per scene at most |
| **Arrive from oversize** | identity objects (logo, key word, card, cursor) start at 1.4–5× and come down on `snapSettle` 18 f; a calm brand 1.1–1.9× | Never grow them from zero. Spend the big version once |
| **Blur to focus** | 3–6 px for type, 8–12 px for a status word, up to 18 px for a logo; to 0 over 4–8 f on `glide` | A helper under a move, not a look |
| **Leave** | `accelExit` 13 f, still moving on the last frame; into a hard cut `crashOut` 17 f | The cut is the edit; the next shot inherits the speed |
| **Siblings** (letters, rows, tiles) | starts 1–3 f apart with uneven gaps (3, 2, 2, 3, 2…); each move about twice the gap | A wave under 0.6 s reads as one gesture |
| **Words** | whole words 2–4 f apart in a hook, 4–6 in a headline, 8–12 when they follow a voice; a closing stack about 8 f | Words arrive whole. Letter by letter only inside the product's own input |
| **Hold alive** | linear drift 1–3 px per frame, or a 0.5–1% scale creep, a caret, light moving on the ground | Only the payoff may be fully still, for under ~1 s |
| **Camera push** | multiplier by duration: 1.25× for a 6 f punch, 1.4× for 12–18 f, 1.5× for 20–45 f, up to 2.4× for a slow drift; `glide` or linear | Move the whole interface as one group, never its parts separately |
| **Reveal snap** | the camera covers about 60% of the change in one frame (ratio 0.56–0.77), then settles over 9–18 f on `softLand` | The jump has the punch of a cut; the tail lets the frame be read |
| **Camera pull** | about 1.8× on `accelExit`, ~17 f | Pulls accelerate; pushes decelerate |
| **Whip** | 7–8 f; arriving half `whip`, departing half `accelExit`; the cut lands at peak speed and the new shot continues the direction | An object riding the whip keeps its size |
| **Cursor** | enters off frame at 1.5–2× and comes down; travels on an arc and decelerates (`softLand`); parks still for about 0.1 s before acting | A cursor that glides straight at one speed has no hand behind it |
| **Press** | cursor to 0.85–0.9 in 2 f; the target to 0.76–0.8 over ~6 f, starting 1 f after the cursor; release slower, ~10 f on `softLand`, or `popOver` for a +5% rebound; the target brightens | No ripple ring, no white flash |
| **Counter** | a new value every frame, with steps shrinking (`softLand`) over 7–23 f; lands on a round number for a claim, a specific one for a data field | Only after the cause that triggers it |
| **The one spring** | `popOver` 15 f on the payoff, or snap to 0.9× and settle to 1.0 over ~5 f with a small wobble | Once per piece. Overshoot on everything is the AI default |
| **Cut on motion** | scenes start already moving on frame 0 and end mid-move | A cut on a still frame reads as a slide change |

#### 3. In ChatCut

**Motion graphics generated by the agent.** The agent writes the animation code, so give it curves and numbers, not adjectives. Put the kit's values in the "Motion fundamentals" block of the prompt (`targets/chatcut.md`):

> Entries move and decelerate: cubic-bezier(0.22, 0.776, 0.511, 0.942) over 12 frames at 30 fps, words from 5% of the height below their place, opacity from 0.2 to 1 in the first 5 frames only. Exits accelerate: cubic-bezier(0.288, 0, 0.632, 0.043) over 13 frames and are still moving on the last frame. Whole words start 4–6 frames apart, uneven. No overshoot except one late lean on the payoff: cubic-bezier(0.295, 0.157, 0.309, 1.398) over 15 frames. Held frames keep one thing drifting 1–2 px per frame.

Name the recipe for each scene in one line ("the card arrives from 1.6× on snapSettle, 18 frames"), not the whole table.

**Zooms (`builtin:zoom`).** Choose the magnification from the length, as in the camera push recipe: about 1.25 for a 6–8 frame punch, 1.3–1.4 for 12–18 frames, 1.5 for 20–45 frames. A reveal works best as `instant` plus a short ease-out tail. Which curve ChatCut applies inside its ease-in and ease-out frames is not documented: after applying a zoom, measure it with `scripts/detect.py <export> --profile <start> <end>` and write the real behaviour down in `targets/chatcut.md`, "Saving what worked".

**Checking.** Export, run `detect.py --profile` on the two or three key moves and `--strip` to see them frame by frame. A landing should show steps that shrink; an exit, steps that grow.

#### 4. In Remotion

Copy `assets/remotion/unrushed-motion.ts` into `src/` and use its functions instead of writing curves by hand:

```tsx
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {land, leave, arrive, stagger, press, revealSnap, ease} from './unrushed-motion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const title = land(frame, 10, {from: 48, fps});      // {offset, opacity}
const logo = arrive(frame, 90, {from: 1.6, fps});     // scale, 1.6 → 1
const wordStart = (i: number) => 20 + stagger(i, [5, 4, 6, 4], fps);
const click = press(frame, 140, {fps});              // {cursor, target, pressed}
const camera = revealSnap(frame, 60, {from: 2.2, fps});
```

Every function is a pure function of the frame, so renders are deterministic. `ease.<name>` gives the raw curves for `interpolate(..., {easing: ease.softLand})` and for `@remotion/transitions` timings.

#### 5. In After Effects

Animate with two linear keyframes, then paste this expression on the property. It reshapes the motion between the keyframes with one of the kit's curves:

```js
// Unrushed curve: set c to a cubic-bezier from references/motion-kit.md
var c = [0.22, 0.776, 0.511, 0.942]; // softLand
function bx(s){ return 3*(1-s)*(1-s)*s*c[0] + 3*(1-s)*s*s*c[2] + s*s*s; }
function by(s){ return 3*(1-s)*(1-s)*s*c[1] + 3*(1-s)*s*s*c[3] + s*s*s; }
function curve(t){ var lo = 0, hi = 1; for (var i = 0; i < 30; i++){ var m = (lo + hi) / 2; if (bx(m) < t) lo = m; else hi = m; } return by((lo + hi) / 2); }
if (numKeys > 1 && time > key(1).time && time < key(2).time) {
  var t = (time - key(1).time) / (key(2).time - key(1).time);
  key(1).value + (key(2).value - key(1).value) * curve(t);
} else value;
```

Plugins that take a cubic-bezier (such as Flow) accept the same four numbers.

#### 6. What not to do

- One curve for everything, usually expo-out for every move. Landings and exits use different curves.
- Overshoot on every arrival, or a bounce that peaks early. Overshoot is rare, late and small.
- Durations of 20–30 frames for every move. The professional median is 10 frames; slow is a choice for one move, not a default.
- Identical stagger gaps. Uneven gaps read as separate bodies; a fixed delay reads as a loading list.
- Animating the camera by moving the interface's pieces one by one. One group, one transform.

## Embedded: references/visual-explanation.md

### Explaining visually

How to make a viewer understand something by watching it happen, instead of reading about it beside a decorative animation. Read this file for `storyboard`, `export` and `critique`, and for `style` when the piece shows a product.

#### Contents

1. The slide test
2. Devices
3. Which device for which idea
4. Interface simulation
5. Design systems: real components, not invented ones
6. Cursor choreography
7. Building notes
8. Finding the real product
9. The product demo script

#### 1. The slide test

Pause any frame. If it reads as a slide (a label, a title and a paragraph beside a box with a small demo), the scene is presenting, not explaining. Motion professionals explain inside the scene: the camera moves to the idea, objects carry over from one beat to the next, and the explanation happens on the thing itself.

Signs of a slide:

- The same template every scene: label, title, support line, demo area.
- Demos in fixed boxes or split panels that never change shape.
- Text carries the idea and the image decorates it.
- Each scene starts from an empty frame and ends in an empty frame.
- The camera never moves.

Text can stay. Short titles anchor a silent piece. But the text should name what the viewer is already seeing, not describe what they cannot see.

#### 2. Devices

Each device below is a way of making an idea visible. Use a different one for neighbouring beats.

**Interface simulation.** A cursor operates a real-looking interface (a graph editor, a timeline, a slider, a property panel, a code field) and the result changes live beside it or behind it. Best for "how it works", "you control this", and any product. See sections 4–6.

**Ghosts and onion skin.** The moving object leaves 6–12 copies of itself at fixed time intervals, fading out. The spacing between ghosts shows the easing: even spacing is linear, bunched-up spacing at the end is ease-out. This is the animator's own tool, and the clearest way to show curves, speed and timing. A spacing chart, ticks along the path at equal time steps, is the minimal version.

**Same space, two behaviours.** Instead of two panels side by side, the generic version plays, rewinds, and the crafted version plays on the same spot, or both run superimposed with the generic one as a translucent ghost. The difference is read directly, without the eye jumping between halves.

**Curve and motion in sync.** A value graph draws while the object moves, with a playhead linking the two. The viewer sees the shape of the curve become the feel of the motion.

**Time remap.** Slow motion or a freeze frame in the middle of a movement, with an annotation on the frozen state, then release back to speed. It works best on a moment that is too fast to notice at full speed: an overshoot, a squash, a stagger.

**Camera push to detail.** The camera dives into one part of the frame (a pixel, a keyframe, a word) to show what matters, then pulls back to context.

**One canvas.** All beats live on one large plane, and the camera travels between them. Transitions become camera moves, and the piece feels like one continuous world rather than a deck. See `transitions.md`.

**Building diagram.** A diagram or chart assembles in the order of the explanation: the parts first, then the connections, then the result. The data-graph technique in `techniques.md` is one form.

**Physical analogy.** The idea is enacted by a material with known behaviour, such as ink that settles, a spring that overshoots or cloth that lags. It uses `material` from `STYLE.md`.

**Type as actor.** Words move as the idea: "slow down" decelerates, "overlap" overlaps. Use it for a single key phrase, not for every line.

**Product footage with overlays.** A real screen recording with focus masks, zooms and callouts. It is the most honest proof for a product.

#### 3. Which device for which idea

| To explain… | Strongest devices |
|---|---|
| A curve, easing, speed | ghosts and onion skin, curve and motion in sync, interface simulation (graph editor) |
| Timing, order, stagger | timeline in interface simulation, time remap |
| Before and after, generic and crafted | same space with two behaviours, a ghost superimposed, rewind |
| How a product works | interface simulation with the real design system, product footage |
| A parameter and its effect | interface simulation (slider or field) with the result changing live |
| A process with steps | one canvas with the camera travelling between steps, building diagram |
| Quality, material, feel | physical analogy, camera push to detail, time remap |
| A number or a trend | building diagram, data graph with a following camera |
| A single key phrase | type as actor |

#### 4. Interface simulation

The interface is a stage, not a screenshot. Treat it as a set built for camera:

- **Scale it up.** Interfaces at 1:1 are unreadable in video. Show them at 1.5–2× and crop to the region that matters.
- **Simplify.** Keep the panels the beat needs and remove the rest. A focused interface reads better than a complete one.
- **Direct the eye.** Dim or blur what does not matter, push the camera toward the control being used, and keep one active control at a time (one protagonist).
- **Use real content.** Real labels, real values, real data that the brief supports. Never lorem ipsum or "Button".
- **Show cause and effect.** Every interaction produces a visible result within 100–300 ms, as real software would.
- **Hold the result.** After the change, give the viewer time to see what happened before the cursor moves on.
- **A camera move over a still screen is not a demo.** Pushing into, sliding across or pulling out of a screenshot shows where things are, not what the product does. Use camera travel to connect beats. Each key beat of a demo still needs an action and its result on screen (§9).

#### 5. Design systems: real components, not invented ones

Invented interfaces read as fake: wrong proportions, made-up controls, inconsistent icons. Use the components and icons of a real, recognisable system, chosen by context:

| Context | Use |
|---|---|
| You can see the product (code, Storybook, Figma, screenshots) | Its own components, tokens, fonts and icons. The highest fidelity, and the only right choice for a product video. |
| A web SaaS, dashboard or developer tool, with no access | shadcn/ui components (MIT) with Lucide icons (ISC). The current de facto look of web apps. |
| A Google product or an Android app | Material Design 3 with Material Symbols (Apache 2.0). |
| A Microsoft or enterprise product | Fluent 2 with Fluent System Icons (MIT). |
| An app for Apple platforms | Apple's Human Interface Guidelines. Apple's design resources and SF Symbols are licensed only for mock-ups of software that runs on Apple platforms, so check the licence before using them in any other piece. |
| A creative tool (video editor, motion tool, design tool) | The conventions those tools share: a dark interface, a timeline with keyframes, a layers list, an inspector, a graph editor. Build them from shadcn/ui primitives on a dark theme and Lucide icons. |

Rules:

- **Use the real anatomy.** Sizes, radii, spacing, states (hover, active, focus) and type scale from the system's documentation or code. Do not approximate a button; use the button.
- **One system per piece.** Do not mix Material controls with shadcn/ui cards.
- **Generic over branded unless it is theirs.** Show a real company's interface, logo or name only when the piece is for that company or the person has the right to show it. Otherwise build the generic version of the kind of tool, with no real product names or logos.
- **Keep licences.** Note the licence of every component and icon set in `STYLE.md`.

#### 6. Cursor choreography

A cursor that teleports or moves in straight lines at constant speed is an AI tell. A human hand:

- **Travels on a slight arc** with ease-in-out, at roughly 600–1,200 px per second at 1080p.
- **Decelerates onto the target** and may overshoot by a few pixels, then settles.
- **Pauses 150–300 ms** before clicking: the hand aims.
- **Gives feedback on click:** the control shows its pressed state, and a small press scale or ring on the cursor (90–95%, about 100 ms) is optional.
- **Drags with weight:** the dragged value lags the cursor slightly and settles when released.
- **Rests while the result plays.** The cursor is still, or moves aside, so it does not compete with the result.
- **Uses the system's cursor:** an arrow for pointing, a hand for links, resize or grab cursors for handles.

#### 7. Building notes

- **Remotion and other React targets** can render the design system directly: shadcn/ui components, Tailwind tokens and `lucide-react` icons work inside compositions. Drive every state (hover, pressed, the value of a slider) from the frame number, never from real events.
- **ChatCut** builds motion graphics with code. Name the system and the components in the prompt ("a shadcn/ui Slider and Card in dark theme, Lucide icons"), and give the token values (radius, colours, font) so it does not approximate.
- **After Effects and similar tools:** import the real components from Figma community kits of the chosen system, or vector exports of the product, rather than drawing controls by hand.
- **Ghosts and onion skin:** render the object at earlier times (frame − k × step) with decreasing opacity; in code it is the same component drawn several times.

#### 8. Finding the real product

When a piece shows a product, the interface must come from the product. Look for it **before** designing any screen, and never invent one quietly because nobody offered the source.

**Where to look, in order:**

1. **The project itself.**
   - Files in the working folder, uploaded media and the editor's asset library: screen recordings, screenshots, exported frames.
   - An existing video's frames, which show the real screens and copy.
2. **The code.**
   - A repository in the working folder.
   - A repository reachable through the tools you have: git, the GitHub CLI, a GitHub or GitLab connector.
   - Any link the person has shared. If you know the product's name but not its repository, ask for it.
3. **The design files.** Figma, or a Storybook or component library, through a connector or a link.
4. **The running product.** A URL, staging or a local build, opened in a browser to read real screens, copy and states.

If none of these is reachable, ask once, in the same round as the other intake questions, for the repository, the design file or a link. Only then fall back to a design system (§5), and mark every screen built that way as **approximate** in the plan and the report.

**What to read in a repository.** Read with a purpose; you are not auditing the code.

| Look for | Usually in | Use it for |
|---|---|---|
| Design tokens: colours, radii, spacing, fonts | `tailwind.config.*`, `globals.css`, `theme.*`, `tokens.*`, CSS variables | exact values instead of approximations |
| The components in the flow you will show | `components/`, `ui/`, `app/` or `pages/` routes | real anatomy and states (table rows, cards, badges, buttons, toasts) |
| Routes and screens | the router (`app/`, `pages/`, `routes.*`) | which screens exist, and their order in the flow |
| Real interface copy | the components, `i18n`/`locales` files | labels, statuses, empty states, error texts |
| States | conditional rendering, status enums, badge variants | before and after for each step (loading, empty, error, success, validated) |
| Icons and fonts | `package.json` (`lucide-react`, `@radix-ui`, font packages) | the right icon set and type |

**Rules:**

- **Write down what you looked at.** List the sources in `VIDEO.md` under "Product sources": the repository and the paths read, the files, the URLs. Note what each screen in the plan is built from. `critique` treats a demo without this list as unverified.
- **Use realistic sample data**, never real customer data, emails, names or numbers from production. Respect what the person says must not be shown.
- **Do not reproduce source code** in the video. Use it to rebuild the interface faithfully.

#### 9. The product demo script

A product demo is a short story in which a person does something and the product responds. Write it before the storyboard, from the real flow. One row per step:

| Step | Who acts | Action (cursor, typing, an event) | Product response (state change) | Screen and components (source) | Hold |
|---|---|---|---|---|---|
| 1 | a customer email arrives | the email lands in the inbox | the unread counter goes 41 → 42 | Inbox, `MailRow` (repo `src/components/inbox`) | 0.6 s |
| 2 | the AI | reads the email | the email becomes ticket REC-1104, priority and type filled in | Ticket card, `TicketCard` | 1.2 s |

The example is illustrative. The rules:

- **Find the "aha" moment**, the step where the product does what nothing else does. Give it the longest hold and the biggest transition into it.
- **Every key step has an action and a visible response** within 100–300 ms (§4). If a step has no action, it is narration: cut it or show the cause.
- **The cursor follows §6.** A system event, such as an email arriving or a job finishing, needs a visible cause too: a notification, a counter, a row appearing.
- **States come from the product.** Use the real statuses, badges and copy found in §8.
- **Camera moves connect steps.** They never replace a step.

## Embedded: references/transitions.md

### Transitions

A transition is a connector between two ideas, like "and then", "because", "but" or "zoom in on this". Choosing it by the relation between beats, not by habit, is what separates an edited piece from a slideshow. Read this file for `storyboard`, `export` and `critique`.

#### Contents

1. Choose by relation
2. The catalogue
3. Rules
4. Hiding the seam
5. Building notes

#### 1. Choose by relation

First name how the two beats relate, then pick the transition that says that.

| Relation between beat A and beat B | Transitions that say it |
|---|---|
| B continues A (same subject, next step) | match on action, carry-over element, camera travel on one canvas |
| A becomes B (cause and effect, transformation) | morph, dissolve into material |
| B is a detail of A | zoom-through, camera push |
| A is part of B (context, the bigger picture) | pull-out reveal |
| B looks like A but means something else | graphic match cut |
| B contrasts with A | hard cut on the beat, smash cut |
| B opens a new chapter | object-led mask, fold or page turn |
| Time passes between A and B | dissolve into material, a slow camera travel |
| B answers a question A raised | object-led mask from the questioned element, zoom-through |

#### 2. The catalogue

Durations are at `energy` 4–6; scale with the dial.

**Hard cut on the beat.** Instant. The most used transition in professional editing, and a legitimate one. Cut on a beat, on an impact, or when a movement peaks. A cut is not a dip to black: the rule against dips does not forbid cuts. *Risk:* cutting between two static frames feels like a slide change.

**Match on action.** A movement that starts in A finishes in B: an object thrown in one scene lands in the next. Cut at the moment of highest speed. *Says:* continuation.

**Graphic match cut.** A shape, colour or position in A matches one in B: a circle becomes a planet, a cursor becomes a star. Align the two shapes exactly in position and size. *Says:* these two things are related. *Risk:* a forced match reads as a pun.

**Morph.** The object in A transforms into the object in B, over 1,200–2,000 ms with cubic in-out. *Techniques:* `particle-morph`, `metaballs`, `fluid-text`. *Says:* A becomes B. Keep identity: the same particles, the same line, the same shape.

**Dissolve into material.** A breaks into particles, threads, pixels or ink, and that material assembles B. 1,000–1,800 ms. *Techniques:* `particle-morph`, `unwoven`, `pixel-voxel-drop`, `fluid-text`, `gpu-io-ink-fluid`. *Says:* transformation, time passing, memory.

**Zoom-through.** The camera pushes into an element of A (a letter, a dot, a window, a pixel) until it fills the frame and becomes the ground of B. 700–1,200 ms, accelerating in and decelerating out, with motion blur at peak speed. *Techniques:* `canvas-grid-zoom`, `scroll-graph`. *Says:* look closer, this contains that.

**Pull-out reveal.** The reverse: the camera pulls back from a detail to show it is part of something bigger. 900–1,500 ms with expo-out. *Says:* context, the bigger picture.

**Camera travel on one canvas.** All beats live on one plane; the camera pans, dollies or arcs from one to the next. 700–1,500 ms with cubic in-out. *Says:* this is one continuous world. It is the strongest cure for the slideshow feel.

**Whip pan.** A camera move so fast it becomes a blur, 250–400 ms, cut at peak blur into B moving in the same direction. *Says:* energy, a jump to elsewhere. Use it sparingly, once or twice per piece.

**Carry-over element.** One element (a line, a cursor, a word, a particle cloud) keeps moving while the world around it changes. *Says:* this thread connects everything. It is often the through-line itself. It must move, scale or change role at every seam; parked at the same coordinates shot after shot, it reads as a pinned label.

**Object-led mask.** An element of A grows, slides or opens to become a window onto B: a circle that expands, a card that becomes full frame, a shape that wipes. 500–900 ms with expo-out. *Techniques:* `editorial-reveal-system` (circular reveal), `page-transitions` (inset and polygon masks, blurred covering shapes), `liquid-lens`. *Says:* a new chapter, an answer. The mask should come from something in A, not appear from nowhere.

**Fold, flip or page turn.** A folds, flips or turns like paper or a card in 3D to reveal B. 700–1,100 ms. *Techniques:* `fold`, `duo-lenticular`. *Says:* the other side, a new chapter. *Risk:* dated if the fold is flat and shadowless; give it light.

**Smash cut.** An abrupt cut from intensity to calm, or the reverse, often from sound to silence. *Says:* contrast, a punchline. Once per piece.

**Text bridge.** A line of text from A stays while the image changes beneath it, or the next line arrives before the image changes. *Says:* the thought continues. Useful in silent pieces to keep reading continuous.

**Line or object wipe.** A line or object crosses the frame and leaves B behind it. 600–900 ms with cubic in-out. *Says:* a clean change. It works once or twice; as the only transition of a piece, it is a template.

**Light transition.** A bloom, flare or exposure flash covers the cut. *Says:* revelation, light itself. Only when the content is about light; otherwise it is a tell (see `ai-tells.md`).

#### 3. Rules

- **The default join is a hard cut on motion.** Professionals cut far more than they transition: in about 96% of measured professional moments the joins are hard cuts, roughly 20 per moment, landed while something moves (measured by the motionmaxxing project, Apache-2.0). Scenes start already moving, and clips end mid-move.
- **A designed transition is the exception.** A morph, a mask, a camera travel or a carry-over goes only where the relation between beats needs it, usually one to three per minute. Write the relation next to it ("B is a detail of A → zoom-through"). There is no quota of kinds: asking for variety produces a showreel of transitions.
- **No dissolve or fade between scenes by default.** A dissolve says time passes; used everywhere, it says nobody decided.
- **Never the same designed transition twice in a row.** Repeated hard cuts are normal; a repeated wipe is a template.
- **Save the biggest transition for the payoff.** The most elaborate join leads into the strongest image, not into the second scene.
- **A carried element travels.** A thread object moves, scales or changes role at every seam. Parked at the same place for more than two shots, it becomes a pinned label.
- **Overlap, never gap.** No empty frames, no dips to black.
- **Respect reading time.** Never transition while a line is still being read.

#### 4. Hiding the seam

- **Eye trace.** Put the focal point of B where the eye already is at the end of A. If the viewer was looking at the top right, B's protagonist starts at the top right. This is the most important rule of invisible editing.
- **Cut on motion.** Cuts hide best at the peak of a movement, when the eye is following speed instead of detail.
- **Continue the direction.** Movement leaving A to the right enters B from the left, at the same speed.
- **Motion blur at peak speed.** Fast camera moves and whips need blur, equivalent to a 180° shutter (blur over half the frame interval). Without it they strobe.
- **Match the light.** A sudden change of exposure or colour temperature makes the seam visible unless the contrast is the point.

#### 5. Building notes

- **One canvas in code.** Lay every beat out on one large container and animate a camera transform (translate and scale) on it. Beats keep their own local time; the camera has its own timeline.
- **Remotion.** `@remotion/motion-blur` provides camera-style blur for fast moves. Masks are CSS `clip-path` driven by the frame number. Morphs and dissolves are canvas or WebGL scenes like the techniques they borrow from.
- **ChatCut.** Name the transition, its relation, the duration and the curve in the prompt, and ask it to keep the two scenes in a single motion graphic when the transition needs both on screen at once (morphs, carry-overs, camera travel).
- **After Effects and similar tools.** A camera layer over 3D layers for one canvas and zoom-through; track mattes for object-led masks; pixel motion blur for whips.

## Embedded: references/effects.md

### Effects, zooms and transitions from an editor's library

Video editors such as ChatCut ship a library of ready-made effects, zooms and transitions. This file tells you which ones to use, when, how strongly, and when to leave them out. It also gives the equivalent in Remotion and After Effects, so a storyboard stays portable.

The default is **no effect**. An effect earns its place by doing a job the cut, the framing or the graphics cannot do alone. Write that job down: it is the "Why" column of the storyboard, and `critique` checks it.

#### Contents

1. Choose by intent
2. Tiers
3. Catalogue: blur and sharpen; masks and keying; transform and distort; stylize
4. Zoom
5. Transitions from the library
6. Sound accents
7. Budgets and stacking
8. Applying it in ChatCut
9. Rebuilding it in Remotion and After Effects

#### 1. Choose by intent

Start from what the beat needs, never from the effect list.

| The beat needs to… | Reach for | Not for this |
|---|---|---|
| Guide the eye to one region | Mask, Magnifying Glass, Dome Magnifier, Gaussian Blur on the rest, a slow push | Glow on everything, camera shake |
| Stress one line of speech | One zoom (Quick Zoom In or Instant) on the stressed word | A zoom on every sentence, Flash |
| Hide or protect something (faces, emails, plates, a mistake) | Local Mosaic, Gaussian Blur inside a mask | Cartoon or Posterize as a "disguise" |
| Separate the speaker from the background (text behind the person, grade the room only) | Person Regions as a matte | Hair Regions on its own |
| Show how a machine sees | Sobel Edges, Body Landmarks, Hand Landmarks, Heat Map, Threshold | Laser Eyes, ASCII Rain |
| Mark another time or medium (archive, VHS, print, zine) | CRT Retro, Analog TV Sync, Dither, Color Halftone, Photocopy | Stacking three looks |
| Put a UI or image on a real screen | Corner Pin | A flat overlay that ignores perspective |
| Change mode (a story inside the explainer, a flashback, a quote) | Letterbox, one consistent look for that whole section | Switching looks every shot |
| Fix the footage | Lens Correction, Sharpen (light), Flip (eyeline or continuity) | Fixes used as a style |

#### 2. Tiers

- **A · workhorse.** Safe by default when the intent fits. Use freely within budget.
- **B · situational.** Right for one kind of moment or one section. It needs a reason in the storyboard.
- **C · gimmick.** Reads as template or meme, and it is one of the reasons edits look "made with AI". Use it only when the brief asks for that register (meme, parody, retro, a single comic beat), at most once per piece, and with a written reason. If you are unsure, leave it out.

#### 3. Catalogue

Names are as the ChatCut library shows them. Availability differs between ChatCut Web and Desktop, and the library changes. Always discover what exists before applying it (see §8).

##### Blur and sharpen

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Gaussian Blur | Soft, even blur | Background behind a title or card; blur everything outside a mask to guide the eye; privacy | Blurring the subject the viewer must read | A | `blur()`, `regionBlur()` | Gaussian Blur |
| Box Blur | Cheaper, squarer blur | Frosted panel behind text | Beauty shots, which it makes muddy | B | `blur()` | Fast Box Blur |
| Mosaic Blur | Pixel blocks over the frame | A deliberate pixel motif; a censor look over a whole shot | Hiding a face in an otherwise clean edit (use Local Mosaic) | B | `pixelate()` | Mosaic |
| Sharpen | Edge contrast | A light fix on soft footage | Pushing it until halos show | A (fix) | `contrast()` with a custom pass, or `createEffect()` | Unsharp Mask |
| Tilt-Shift | Blurs top and bottom, sharp band | Overhead shots of cities, desks or setups (miniature look) | Talking heads | C | `linearProgressiveBlur()` | Camera Lens Blur with a gradient blur map |

##### Masks and keying

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Mask (rectangle, circle, linear) | Shows only a region | Reveals, picture-in-picture, isolating a UI region to explain | Hard edges on organic subjects (feather them) | A | CSS `clip-path` or mask on a layer; `iris()` for reveals | Masks, Track Matte |
| Local Mosaic | Pixelates one region | Faces, emails, licence plates, secrets | As decoration | A | `pixelate()` inside a mask | Mosaic + mask, tracked |
| Auto Threshold | Pure black and white by luminance | Making a matte; a stark poster beat | A whole piece | B | `createEffect()` (threshold) | Threshold |
| Black Overlay (Screen) | Black layer in Screen mode | Laying light leaks or particles on black over footage | — | B | `mixBlendMode: 'screen'` | Screen blend mode |

##### Transform and distort

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Corner Pin | Maps a layer to four points | Putting a UI, slide or image onto a real screen in the shot | Without tracking on a moving camera | A | `cornerPin()` | Corner Pin + tracker |
| Magnifying Glass | Circular lens over a region | Explaining a small UI detail; a figure inside a dense chart | Faces | A | `fisheye()` inside a circular mask | CC Lens inside a mask |
| Dome Magnifier | Bulges a region | Calling attention to one element for a beat | Constant pulsing | B | `fisheye()`, `sphere()` | Bulge |
| Lens Correction | Removes barrel distortion | Fixing wide-angle footage and screen recordings shot with a phone | — | A (fix) | `barrelDistortion()` with a negative amount | Optics Compensation (reverse) |
| Lens Distortion | Adds barrel or pincushion | A subtle wide-lens feel on a graphic | Strong amounts on people | B | `barrelDistortion()` | Optics Compensation |
| Letterbox | Black bars to a cinema ratio | Marking a section as "story mode"; a chapter shift | Toggling it on and off within a section | B | Two black `AbsoluteFill` bars | Solids or a crop |
| Flip | Mirrors the shot | Fixing eyeline or screen direction for continuity | Shots with readable text | A (fix) | `mirror()` or `scaleX(-1)` | Transform scale −100 |
| Elastic Scale | Scale with overshoot | A cartoon register | Serious or brand pieces (it is a bounce) | C | `spring()` with low damping | Scale with an overshoot expression |
| Camera Shake | Random shake | A physical hit you can hear (a slam, a drop), for 4–8 frames | Long durations, or "energy" with no impact on screen | C | `random()`-driven translate on a parent | Wiggle expression |
| Analog TV Sync | Vertical roll and sync error | A beat that changes channel or era | As a transition you reuse | C | `wave()`, `xyTranslate()`, `noise()` | Offset + Wave Warp + Noise |

##### Stylize

Some of these need person, face, hand or hair detection (marked •). Outside ChatCut they need precomputed masks or landmarks, for example from MediaPipe. Without those, do not promise them in a Remotion or After Effects export.

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Person Regions • | Segments the person | A matte: text behind the speaker, grading only the background, a cut-out | As a coloured tint for its own sake | A (as matte) | Precomputed alpha + `<OffthreadVideo>` | Roto Brush |
| Sobel Edges | Edge detection | "How a model sees": computer vision, detection, AI explainers | Decoration | B | `createEffect()` (Sobel) | Find Edges |
| Body Landmarks • | Draws the pose skeleton | Explaining posture, motion or tracking | Decoration | B | Precomputed landmarks drawn as SVG | Third-party, or tracking plus shape layers |
| Hand Landmarks • | Draws hand keypoints | Gesture interfaces, sign or hand tutorials | Decoration | B | Same as above | Same as above |
| Heat Map | False colour by luminance | Showing attention, temperature or intensity as data | A look | B | `thermalVision()` | Colorama |
| Threshold, Two-Level, Three-Level | Two or three tone bands | Poster beats, mattes | Long sections (it is tiring to watch) | B | `createEffect()`, `levels()` | Threshold, Posterize |
| Posterize | Fewer colour steps | A graphic print section | Skin close-ups | B | `createEffect()` | Posterize |
| Dither | Patterned dots instead of gradients | Lo-fi or bitmap texture that matches a pixel or LED language | Mixed with Halftone in the same piece | B | `dotGrid()`, `createEffect()` | Posterize + Noise, or third-party |
| Color Halftone | Print dots per channel | Print or comic era | With small text on screen | B | `halftone()` | Third-party (no native) |
| Photocopy | High-contrast grain | Zine or punk section | Product shots | B | `createEffect()`, `noise()` | Threshold + Noise |
| CRT Retro | Scanlines, curvature, glow | Archive, retro tech, "old screen" | As a default look | B | `HtmlInCanvas` CRT shader, `barrelDistortion()` | Venetian Blinds + Optics Compensation + Glow |
| Glow | Bloom on highlights | A subtle lift on light sources; LED or neon subjects | Everything glowing | B | `glow()` | Glow |
| Soft Glow | Diffusion | A gentle beauty or dream section | Talking-head default | B | `glow()` with a low threshold, `blur()` blend | Glow + Gaussian Blur in Screen |
| Color Distance | Isolates one colour | Keep one colour, grey the rest; colour mattes | — | B | `colorKey()` | Color Range, Leave Color |
| Hair Regions • | Segments hair | A matte for a hair-colour demo | A look | B | Precomputed matte | Roto Brush |
| Edge Glow | Glowing edges | — | Almost always | C | `createEffect()` + `glow()` | Find Edges + Glow |
| Emboss | Relief | — | Almost always | C | `emboss()` | Emboss |
| Cartoon | Flattens into cartoon | Parody | Brand or explainer pieces | C | `createEffect()` | Cartoon |
| Primary Colors | Reduces to primaries | Pop parody | — | C | `createEffect()` | Colorama |
| NDVI False Color | Vegetation index colours | Literal NDVI or remote-sensing content | Anything else | C | `createEffect()` | Colorama |
| RGB Split | Channel offset | One glitch beat, 2–4 frames | As a transition every time | C | `chromaticAberration()` | Shift Channels + Transform |
| ASCII Rain | Matrix-style characters | A Matrix reference the brief asks for | "Tech" as a theme | C | `HtmlInCanvas` shader | Third-party |
| Laser Eyes, Face Laser Eyes • | Beams from the eyes | Memes | Any other register | C | Precomputed face landmarks + SVG | Face Tracker + Glow |

#### 4. Zoom

In ChatCut the zoom is one effect, `builtin:zoom`, with these properties:

| Property | Range | Default | Meaning |
|---|---|---|---|
| `magnification` | 1–4 | 1.5 | Zoom factor |
| `focalPointX`, `focalPointY` | 0–1 | 0.5 | Where to zoom to |
| `focalMode` | `auto` / `manual` | `auto` | `auto` picks the subject; use `manual` for a UI detail |
| `shape` | `punch` / `hold` / `slow-push` / `instant` | `hold` | Animation curve |
| `easeInFrames`, `easeOutFrames` | 0–60 | 8 | Ramp length |

The library shows six presets: Slow Push, Slow Pull Out, Instant, Quick Zoom In, Quick Zoom Out, Zoom In + Out. How each preset maps to `shape` is not documented. After applying one, read it back with `inspect_item` and write down the real values. The table below lists the intent of each preset; the starting values are Unrushed's defaults, not ChatCut's.

| Preset | Says | Start with | Relation (transitions.md) |
|---|---|---|---|
| Slow Push | "This matters more and more": tension, a confession, the key claim | 1.08–1.2 over the whole line | B is a detail of A, slowly |
| Slow Pull Out | "Here is the bigger picture": reveal context, end a section | From 1.2 back to 1.0 | A is part of B |
| Instant | A second camera angle: emphasis without visible motion | 1.15–1.3, no ramp | Hard cut on the beat |
| Quick Zoom In | Stress one word | 1.25 for a 6–8 frame punch, up to 1.4 for 12–18 frames; ease-in 4–6 frames | — |
| Quick Zoom Out | Release after a punch, a joke landing | Back to 1.0 in 6–10 frames | — |
| Zoom In + Out | Stress a single phrase, then return | 1.2–1.35, hold for the phrase | — |

Rules:

- Tie every zoom to a word or line in the script. Write it in the storyboard: `zoom: Quick Zoom In on "never"`.
- Use `manual` focus for UI and screen recordings. `auto` follows faces and will miss the button you are talking about.
- Above 2× the footage softens. Use it only when it reveals a detail, and check the pixels.
- Alternate the scale between consecutive zooms (for example 1.0 → 1.25 → 1.0 → 1.15) so they do not feel stamped.
- A zoom and a transition inside the same 10 frames fight each other. Choose one.

#### 5. Transitions from the library

Choose by the relation between the two beats, as in `transitions.md`. This table maps the library's transitions onto those relations.

| Library transition | Relation it can say | Tier | Notes | Remotion | After Effects |
|---|---|---|---|---|---|
| Cross Dissolve | Time passes; A becomes B, softly | B | Only when time passes. 8–16 frames; more than 24 feels like a slideshow. A dissolve between every scene is a tell. | `fade()` | Opacity cross-fade |
| Dip to Black | End of a chapter; a large time skip; a tonal reset | B | At most once per piece, and never mid-piece between ideas | `fade()` through a black solid | Dip to Black |
| Soft Wipe | B continues A in space, sideways | B | Match the wipe direction to motion in the shot | `wipe()` with a feathered edge (custom) | Linear Wipe, feathered |
| Clean Line Wipe | B opens a new chapter; list items in an editorial style | B | The line must belong to the design language (rule, cursor, divider) | `wipe()` + a 2 px line layer | Linear Wipe + stroke |
| Luma Blend | A becomes B through light: bright areas lead | B | Works when both shots share bright regions | Custom HTML-in-canvas shader | Gradient Wipe using a luma layer |
| Rack Focus | Attention shifts between planes; B is a detail of A | B | Reads as camera language, so it is good for documentary | `blur()` keyframed across a `fade()` | Camera Lens Blur keyframed |
| Whip Pan | B continues A with energy; a location jump | B | Both shots should move, or seem to, in the same direction; add a whoosh | `slide()` + `zoomBlur()`, or a directional-blur shader | Transform + Directional Blur |
| Organic Light Dissolve | Memory, mood, a dream | C | Reads as a template; a plain dissolve is usually better | `lightLeak()` over `fade()` | Gradient Wipe with Fractal Noise + Glow |
| Anticipation Zoom | B is a detail of A, with energy | C | Only if the cut lands exactly on a beat | `zoomBlur()`, `zoomInOut()` | Scale + CC Radial Fast Blur |
| Impact Shake | Contrast; a punchline on a hit | C | 4–8 frames, with a sound you can hear | `pushCut()` + shake | Wiggle burst |
| Flash | Contrast; a camera flash inside the story | C | A white flash is a strong AI tell. Prefer a hard cut. | `pushCut()` | White solid, 2–4 frames |
| Page Curl | A document or page turns, literally | C | Only when paper is on screen | `pageTurn()` | CC Page Turn |

In ChatCut a library transition needs two adjacent clips on the same track with spare media on both sides (handles). If it is refused, use the duration the editor suggests, trim to expose handles, or keep the hard cut. A hard cut is a valid choice, and usually the best one.

#### 6. Sound accents

The cheapest way to connect ideas and mark emphasis is often a sound placed at the right frame, not a visual effect.

- Pair sounds with motion that has a direction or an impact: whoosh with Whip Pan, a soft riser with Slow Push, a click or tick with a UI cursor, a low hit with Impact Shake.
- Place the sound at the motion's peak, not its start. A whoosh peaks at the midpoint of the pan.
- Keep accents out of music ducking, and set the volume per item.
- One to three hand-placed accents in the whole piece: the click, the name, the turn. A hit on every cut is a tell.
- Silence before a key line is also a sound decision. Pull the music down before the biggest move.

#### 7. Budgets and stacking

Per piece:

- **Tier C:** at most one, with a written reason. A second one fails `critique`.
- **Stylize:** at most one look per section, and at most two looks in the whole piece.
- **Zoom in talking heads:** roughly one per 8–12 seconds, never two in a row on consecutive sentences. Screen recordings may use more, since there each zoom is an explanation.
- **Transitions:** the same library transition never on three cuts in a row. Most cuts stay hard.

Per shot:

- Never stack two distortions (for example Lens Distortion and Dome Magnifier).
- Never put a stylize effect on top of a zoom and a transition within the same second.
- Text on screen beats texture: drop Halftone, Dither or CRT where small text must be read.
- The brand accent rule still applies: one focus per frame.

#### 8. Applying it in ChatCut

##### With the ChatCut MCP (Claude Code or Codex agent plugin)

1. **Discover.** Call `browse_library` with a category or query, for example `browse_library(category: "transitions", query: "dissolve")`. Built-ins have stable global ids. Do not hard-code ids other than `builtin:zoom`. Read each asset's editable properties before setting them.
2. **Locate.** Get clip ids and frame ranges with `preview_timeline({views:["timeline"], tracks:["V1"]})`. Use `inspect_item` when you need full detail.
3. **Apply** with `edit_item`. There are three shapes:

   ```text
   # Effect on a whole clip
   edit_item(json: '{"adds":[{"type":"effect","assetId":"<id>","targetItemId":"<clip-id>","propertyOverrides":{...}}]}')

   # Effect or zoom on a range of frames
   edit_item(json: '{"adds":[{"type":"effect","assetId":"builtin:zoom","mode":"track-bound","trackId":"<track>","trackBoundFrom":90,"trackBoundDurationInFrames":24,"propertyOverrides":{"magnification":1.3,"shape":"punch"}}]}')

   # Transition between two adjacent clips
   edit_item(json: '{"adds":[{"type":"transition","assetId":"<id>","outgoingItemId":"<a>","incomingItemId":"<b>","durationInFrames":12}]}')
   ```

   Send only the properties you change.
4. **Verify.** Confirm with `preview_timeline` that the effect sits on the right clip and range, then look at composed frames (`views:["viewer"]`). Never report success from the `edit_item` response alone.
5. **Custom shader only as a last resort.** Use `submit_shader` only when nothing in the library fits the intent. Write the brief like a director:
   - eased progress, never linear;
   - both clips take part in a transition;
   - the first and last frames match the clips exactly;
   - an `intensity` or `amount` control, plus `softness` for transitions, with 2–5 controls in total.

   Generation creates a library asset and may cost credits. Apply it only when the plan calls for it.

ChatCut's agent does not add effects nobody asked for. Unrushed's job is to ask for them explicitly, cue by cue, from the storyboard.

##### Without the MCP (a prompt in ChatCut's chat)

Write one sentence per cue, with five parts:

1. the target;
2. the effect;
3. the time range;
4. the intensity;
5. what must stay unchanged.

For example:

> On the clip at 00:42–00:45, add Quick Zoom In to 1.3× on the word "never", focus manual at the laptop screen, ease-in 5 frames. Keep the captions and the lower third unchanged.

"Make it cinematic" is not a cue.

#### 9. Rebuilding it in Remotion and After Effects

- **Remotion.**
  - `@remotion/effects` applies effects through the `effects` prop of `<Video>`, `<Img>`, `<Solid>`, `<HtmlInCanvas>` and others, in the order listed.
  - Custom effects use `createEffect()`.
  - Library-style transitions come from `@remotion/transitions` (`fade`, `slide`, `wipe`, `flip`, `clockWipe`, `iris`, `pushCut`, `zoomBlur`, `zoomInOut`, `pageTurn`, …). Custom ones are HTML-in-canvas presentations; shaders from gl-transitions.com (MIT) can be ported.
  - WebGL effects need `--gl=angle` when rendering.
- **After Effects.** The tables above give the native effect. Person, face, hand and hair effects need Roto Brush, the Face Tracker or third-party plug-ins.
- **Detection effects (•).** These are not portable for free. If the target is not ChatCut, either supply precomputed masks or landmarks, or choose a different device.

## Embedded: references/ai-tells.md

### AI tells in motion and video

The patterns that make a video read as generated by default, why they read that way, and what to do instead. Use this list in `style` (to write the forbidden list), in `export` (to pass it to the tool) and in `critique` (to count what is present).

A tell is not wrong in itself. Each became a tell because it is the path of least resistance, so it appears everywhere without a reason. Any of them can be used on purpose; a choice made for a stated reason is not a tell.

#### Motion

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Everything fades in and slides up 20–40 px with the same duration | The default entrance of every template | Arrive by moving, with opacity only as a 4–6 frame helper; identity objects come down from larger; median move about 10 frames (`principles.md`) |
| The same stagger on every group | Rhythm with no hierarchy | Tight stagger for words, looser for objects; let the order carry meaning |
| Dip or fade to black between scenes | Hides the lack of a transition idea | Overlap scenes; transform one figure into the next; use a mask or a cut on movement |
| A designed transition, or a crossfade, between every scene | A template, not an edit | Hard cuts on motion by default; a designed transition only where the relation between beats needs it (`transitions.md`) |
| Ease-in-out on everything, or linear entrances | No distinction between arriving, leaving and moving | Entrances decelerate, exits accelerate, linear only for continuous motion |
| Bouncy overshoot on headlines | Playfulness applied to the wrong element | Overshoot only on small accents, and only when `energy` allows |
| Slow zoom on every shot | Movement used to hide a static idea | Move the camera only when the move reveals something |
| Everything moving at once | No protagonist; the eye does not know where to go | One protagonist at a time; the 60% rule |
| Typewriter or letter-by-letter text to mean "technology" | A cliché standing in for an idea | Enter by word or line; keep kinetic type for pieces about language |
| Floating parallax layers that drift for no reason | Depth as decoration | Parallax only when depth is part of the story |
| Glitch, RGB split or light-leak transitions as filler | Effects covering a weak cut | Use them once, where the content is about failure or noise |
| Text moving while it must be read | Motion competing with reading | Animate in, rest, animate out |
| A punch-in zoom on every sentence of a talking head | The auto-edit signature; emphasis everywhere means emphasis nowhere | One zoom per stressed word, roughly one per 8–12 s, with alternating scale (`effects.md`) |
| Camera shake, impact shake or a white flash to add "energy" | Library effects covering a cut with no idea | A hard cut on the beat; shake only on a physical hit you can hear, for 4–8 frames |
| Meme effects in a serious piece (laser eyes, ASCII rain, cartoon, heat map as a look) | Reaching for the library instead of the story | Leave them out, or use one, once, when the brief asks for that register |
| Several stylize looks stacked or swapped shot to shot (CRT, then halftone, then dither) | A filter tour, not a style | One look per section, two per piece at most; looks never replace a through-line |
| Page curl, organic light dissolve or anticipation zoom as the default transition | Template transitions from editors' libraries | Choose by relation (`transitions.md`); a dissolve or a hard cut is usually better |

#### Visual

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Purple to blue gradients, cyan and magenta neon on navy or black | The house style of AI products | A palette drawn from the material and the subject; at most one accent with a stated job |
| Inter, Poppins or Montserrat for everything | Default fonts with no voice | A pairing with roles; a display face chosen for the subject |
| Monospace as shorthand for "technical" | Signals a genre instead of a role | Monospace only when it has a role, such as dates, data or code |
| Glass panels by default | The current trend, and soon the next cliché | Glass only when transparency or looking through means something |
| A network of dots joined by lines | The 2015 "tech startup" background | Particles that form something specific and change for a reason |
| Glowing brains, robots, circuit boards, falling green code, holographic interfaces | Stock metaphors for AI and technology | Concrete images from the actual story: objects, documents, people, places |
| Soft 3D blobs and gradient-mesh backgrounds | Decoration that fills space | A ground with texture, such as paper grain or film grain, and space left empty on purpose |
| Centred title and subtitle in every scene | Same layout, no composition | A stable text zone plus a composition that changes with the figure |
| Icons in rounded squares, emojis | Template components | Drawn marks consistent with the material |
| Perfectly clean digital rendering | Nothing physical to hold onto | Grain, motion blur, self-shadowing, refraction: light and material carry quality |
| A static grain overlay, or grain added as "depth" | Reads as a filter laid on top, not as film or paper | Texture only when it belongs to the material or the captured surface, and then renewed every two frames |
| Grain, glow or blur offered as the fix for flat motion or a weak demo | A finish standing in for the missing work | Fix the motion itself, or the demo itself; finish comes last |
| A showcase where every style shares the same ground and palette | The viewer sees one style with different shapes | Give each style its own world: ground, palette and light |

#### Page and template

These come from web pages and slide decks, and they are the loudest tells of all. A study of rejected AI-made films ranked them at the top, and found that several were caused by the wording of the skill that made the films (motionmaxxing, Apache-2.0). Unrushed's own first brand system used several of them, which is why they are listed here plainly.

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Corner furniture: a brand name or title in tracked caps, a timecode, FPS or resolution text, corner brackets or crop marks | The urge to look "designed"; it frames the video as a page | Nothing. The frame is the claim, the product, and the logo once |
| Scene or chapter counters ("02 / 05", "01 — The problem"), progress bars | Decks have page numbers | A chapter is a change of world plus a carried object, never a label |
| A kicker above the headline, a left-aligned headline beside a box or device | Web and keynote layouts | One line near the optical centre, or a phrase split by an object |
| Label chips naming the scene or app ("Messages", "Editor") | Looks informative | The interface shows which app it is |
| A flat colour ground that changes per scene | Brand hex values read as swatches | A world with light, depth and a surface; flat only for a flood under 1 s |
| A stat slide: a big centred number with a small label | Numbers signal credibility | A number only inside an action that causes it, or show the thing instead |
| A feature tour: card plus caption, repeated at the same coordinates | The completeness reflex | One proof, one object per frame, beats of unequal length |
| An element pinned at the same place through several shots | A "recurring element" taken literally | A carried element moves, scales or changes role at every seam |
| A different effect in every beat | Showing range instead of an idea | One idea and only the effects it needs |
| Near-black ground with a warm glow, vignette and lens flare | "Premium dark mode" averaged | Light with a source, a ground that belongs to the brand; a light ground is as premium as a dark one |
| One italic serif word inside a sans line | A recent SaaS-reel habit | One family; scale carries emphasis |
| A tracked-caps tagline | Looks editorial | No tagline |
| An end card with logo, tagline, button and URL | A landing page's call to action | The name, or one action, held 0.6–1.4 s, still alive |
| Ghost decoration: huge words at 3–9% opacity, hairline rules, dot grids, grain as depth | A renderer's house style | None; texture only from a real surface |
| A giant single word on a flat ground | Scale used as a slide | Spend scale once, and give the word a surface or a cause |
| Gradient-filled text, or a glow or blur wider than about 24 px around type | Decoration standing in for hierarchy; it also blurs the letters | Solid ink; emphasis by scale; light only from a source in the world |


#### Words on screen

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| "Meet X", "Introducing", "Unlock", "the future of", "supercharge", "seamless", "in seconds", "AI-powered" | Stock launch copy; the cheapest tell there is | The brand's own phrasing, quoted exactly, or a plain sentence a person would say |
| "Not just X. It's Y." and three one-word sentences in a row ("Fast. Simple. Yours.") | A copywriting template | One sentence with one claim |
| A number with no source ("10x faster", "95% of teams") | Confident and unverifiable | A number only from `VIDEO.md` with its source, shown inside the action that causes it |
| A URL or handle on screen | A web page's footer | Put it in the post copy or the description |
| A headline typed letter by letter with a caret | Typing belongs to an input | Typing only inside the product's own field; headlines arrive as whole words |

#### Structure

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Every scene built the same way | Monotony; the template shows through | Apply `variance`: change composition, rhythm or entrance between neighbours |
| Image and text saying different things | The visual was chosen without reading the line | Make the figure enact the line |
| Effects with no meaning | A demo reel instead of a story | A through-line: one transformation that carries the message |
| Dates, statistics or names that nobody checked | Confident and wrong | Every fact sourced or marked `[verify]` |
| Even pacing from start to end | No climax, no rest | Build tension, release it, and give the ending a hold |
| A logo sting with sparkles at the end | Ending by habit | End on the idea; let the last frame breathe |
| Every scene is a slide: label, title, support line and a demo box | Presenting instead of explaining; a deck with motion | Explain inside the scene with a device from `visual-explanation.md`; pass the slide test |
| Side-by-side panels that never change shape | A comparison layout used as a crutch | Same space with two behaviours, a ghost overlay, or a rewind |
| Every beat the same length | No rhythm; a template ticking along | A beat map with at least three beat lengths (`narrative.md`) |
| Invented interface: made-up controls, "Button", lorem ipsum | Reads as fake immediately | Real components from the product or a recognised design system (`visual-explanation.md`) |
| A cursor that teleports or glides in straight lines at constant speed | No hand behind it | Arcs, deceleration onto the target, a pause before clicking |
| A product demo made of camera moves over still screens (push in, slide, pull out) | It shows where things are, not what the product does | A demo script from the real flow: each step an action and the product's visible response (`visual-explanation.md` §9) |
| A made-up or approximate interface when the product's code or design files were reachable | Nobody looked; the viewer senses it is not the real product | Find the product first (`visual-explanation.md` §8) and build from its tokens, components and copy |
| Everything glides at one speed and stops on the same frame | No mass, no follow-through, no settle | Heavier things start and stop slower; attached parts arrive a few frames late; check with frame strips (`principles.md` §9) |

#### What can be detected automatically

`scripts/detect.py` finds some tells in an exported video without any judgment involved:

- **The gates** (`SKILL.md`, "Looking honestly"): a blank or still render, a length that does not match the plan, missing sound, more than 3 flat frames in a row, a final hold longer than 1.4 s, a final shot longer than a quarter of the piece.
- **Motion against human-made films**: the average change between frames, compared with the band measured on human work (median 6.8, middle half 4.4–9.8 on its scale). It is a question, not a gate: calm brands sit below it on purpose.

- **Fades and dips to black**: stretches where the frame goes almost completely dark.
- **Frozen stretches**: long holds where nothing changes anywhere in the frame, which are sometimes intended and sometimes a render that stalled.
- **Cut rhythm**: hard cuts and the average shot length. Many hard cuts in a piece meant to flow are a sign that transitions were not designed.
- **Words and furniture in the plan**, with `--storyboard`: counters, URLs, slogan words and unsourced numbers in the on-screen text, and page furniture named in the visual column. In a rendered video they cannot be found in pixels yet; check them on the contact sheet (`--sheet`).
- **The planned rhythm**, with `--storyboard STORYBOARD.md`: scene lengths that are all alike, and the same transition type back to back.
- **The cue sheet**, from the same file. The detector checks the budgets in `effects.md`:
  - cues without a reason or tier;
  - more than one tier C cue, or more than two stylize looks;
  - zooms per minute;
  - the same library transition on three cuts in a row;
  - a zoom within 10 frames of a transition;
  - stacked distortions.

Everything else needs eyes: use the tables above.

## Embedded: references/techniques.md (condensed)

### Index by meaning

| The scene needs to say… | Techniques |
|---|---|
| **Something becomes something else** | particle-morph, pixel-voxel-drop, metaballs, fluid-text |
| **Revealing, discovering, looking through** | liquid-lens, editorial-reveal-system, canvas-grid-zoom, scroll-graph |
| **Dissolving, memory, time passing, letting go** | unwoven, fluid-text, the-spirit |
| **Connection, network, flow of information** | data-tunnel, truchet-tiles, volumetric-flow, connected-vertices (with care) |
| **Growth, progress, a story told with data** | scroll-graph |
| **Breaking, the digital becoming physical** | pixel-voxel-drop, touch |
| **Two sides, before and after, a change of view** | duo-lenticular |
| **Alive, organic, an invisible presence** | the-spirit, metaballs, ascii-noise-field |
| **Contact, the human touch, tension and release** | touch, cursor-line-wobble, holocloth |
| **Calm, order, precision (a background that supports)** | wave-grid, truchet-tiles, ascii-noise-field, sine-cosine |
| **Premium, material, product** | fold, glass-icon, liquid-glass, fluid-glass, holocloth, glass-xylophone |
| **Lightness, fragility, play** | bubbles, sphere-packing, glass-xylophone |
| **Heat, energy, intensity** | doom-fire, gpu-fluid-particles, particles-cursor |
| **Ink, writing, craft, calm** | gpu-io-ink-fluid, particle-morph (ink on paper) |
| **Explaining, teaching a principle** | sine-cosine, scroll-graph, connected-vertices |
| **Emphasis on a word** | line-hover-styles |
| **A gallery, a portfolio, many images** | unwoven, inertia-slider, canvas-grid-zoom |
| **Rhythm with sound** | glass-xylophone |
| **A change of chapter between scenes** | page-transitions, editorial-reveal-system, unwoven |
| **Structure, the technical becoming soft** | cloth-wireframe, particle-morph |
| **A digital trace, the retro-digital** | fluid-pixel, ascii-logo, doom-fire |

### Two lessons

- **Light and material carry the quality**, more than the technique. The pieces that felt premium relied on motion blur, self-shadowing, refraction, grain and bloom. When a technique looks flat, add material before adding motion.
- **The same physics can say opposite things.** A fluid in neon on black reads as tech energy; the same fluid as ink on paper reads as calm craft. Palette and ground decide the meaning.

### Entries (condensed; sources and links in the full file)

- **particle-morph** (built in the first Unrushed test, a silent video on the history of AI, made in both ChatCut and Remotion). One set of thousands of particles travels through the whole piece, reorganising into a new figure for each scene: a neuron, a question mark, words, a network, falling snow, a board, an eye, a human profile. *Params:* 6,000–12,000 particles of 1.5–3 px; 1.2–1.8 s per transformation with cubic in-out; per-particle delay of 0–35% of the transition; mid-transition noise with amplitude sin(π·progress); ordered pairing by angle from the centre; low-amplitude simplex drift at rest; text enters at 60% of the morph. *Build:* ChatCut (proven: 8,000 particles rendered with delays and noise) · Code (proven in Remotion) · Blender (possible, harder). *In video:* time drives everything; each transformation is a beat of 1.2–1.8 s. Works as the through-line or as a morph transition between scenes. *Note:* the figures carry the meaning. Hard figures (an eye, a face) need clean source shapes. Sample them from SVG paths or images, not by hand. Avoid making every scene the same structure.
- **the-spirit** (Edan Kwan, *The Spirit*). A smoke-like cloud of particles flowing in curls and following the cursor. Each particle is born, lives and dies. *Params:* 4k to 4M particles; speed; dieSpeed (lifespan); radius; curlSize (size of the swirls); attraction to a target. Post: motion blur, bloom, shadows. *Build:* Code (GPU particles) · Blender (particles plus a turbulence field) · Record (attraction follows the cursor; animate the target instead). *In video:* replace the cursor with an animated attractor that travels a path, or with the simulated cursor of an interface scene; the cloud follows it. Hero shot of 4–8 s, or a living ground behind text. *Note:* the volume comes from motion blur and shadow. Without a form or a reason it becomes abstract smoke.
- **touch** (Edan Kwan, *Touch*). A stream of up to millions of particles pours like sand or water and collides with a 3D hand. *Params:* count; gravity; drop height; drop radius; bounce off the hand; hand force. Post: motion blur, bloom, vignette. *Build:* Blender (particles with collision; the strongest route) · Code. *In video:* the hand pose and the pour are keyframed; the stream starts mid-pour (hook) and ends on the hand at rest. Hero shot of 4–6 s. *Note:* the solid object is the idea; without it, it is just falling sand.
- **volumetric-flow** (David Li, *Volumetric Particle Flow*). A ribbon of particles flowing with turbulence and casting shadow on itself. *Params:* 66k to 2M particles; speed; turbulence; colour. *Build:* Code · Blender. *In video:* time only; slow camera orbit around the ribbon. Ground or bridge between sections, 3–6 s. *Note:* the self-shadowing makes it, not the flow. Without it, it looks flat.
- **particles-cursor** (Kevin Levron, *Particles Cursor*). A trail of coloured particles following the cursor; when idle, the trail orbits on its own. *Params:* ~262k particles; colours; noise intensity; point size; point decay (how long the trail lasts); an idle orbit radius and speed. *Build:* Record (has a built-in idle orbit) · Code. *In video:* a scripted path replaces the cursor, drawn as a gesture (a signature, an arrow to the next element), or the trail follows a simulated cursor. 2–4 s accent. *Note:* a library component that looks the same everywhere. Check the licence.
- **connected-vertices** (Louis Hoebregts, *Connected Vertices – How to*). A step-by-step teaching piece for the network of dots joined by lines when they are closer than 250 px, with line opacity falling with distance. *Params:* count; speed; radius; link distance (250 px); opacity by distance. *Build:* ChatCut · Code · any tool. *In video:* time only; link distance or count animates to show a network forming. Short ground, 3–5 s; never the hero. *Note:* this is the classic "tech startup" background and is listed in `ai-tells.md`. Use it to learn distance-based rules, or only when something essential changes: the form, the rhythm, the meaning.
- **fold** (Mr.doob, *Codevember 2026 / 01 / Fold*). A translucent plastic sheet falls and folds like cloth, and can be dragged. *Params:* stiffness 0.5; material transmission 1, index of refraction 1.46, thickness 0.35, roughness 0; ambient occlusion and colour grading. *Build:* Blender (cloth plus glass material; the natural route) · Code. *In video:* the drop and fold are simulated or keyframed; the grab is a simulated hand or cursor pulling a corner. Transition (fold away) or product reveal, 1–3 s. *Note:* half of the effect is the material, refraction and light, not the physics.
- **holocloth** (*Holocloth*). A holographic cloth with rainbow bands and sparkles that can be pulled and pressed. *Params:* material holo intensity ~3.8, iridescence ~0.8, roughness ~0.6, metalness 1, bump; physics viscosity 0.6, stiffness 1, 14 solver iterations. *Build:* Blender (cloth plus iridescent material) · Record (exports stills only). *In video:* an invisible force or a simulated cursor presses and pulls the cloth; light moves across to show the bands. Accent of 2–4 s. *Note:* very eye-catching and tiring; use it in short doses.
- **cloth-wireframe** (nemutas, *Cloth Simulation*). A curtain made of points and lines that hangs, moves in the wind, falls to the floor and can be dragged. *Params:* distance constraints between points; gravity; wind. *Build:* Blender (cloth with wireframe render) · Code. *In video:* wind and gravity over time; a sudden gust or the rod releasing makes the beat. Hero or transition (the curtain falls to reveal B), 3–5 s. *Note:* the lines are the cloth. A natural partner for particle-morph when a wireframe should feel physical.
- **sphere-packing** (Kevin Levron, *Sphere Packing*). Hundreds of coloured spheres push against each other, fall with gravity and move away from the cursor. *Params:* 300 spheres; size 0.3–1; gravity 0.5, which can be switched off. *Build:* Blender (rigid bodies, native) · Code. *In video:* time and gravity; spheres pour in or a container tilts. Accent or ground, 3–5 s. *Note:* licensed CC BY-NC-SA, so it cannot be used commercially as is. Rebuild the idea instead.
- **bubbles** (oimo.io, *Bubbles*). Soap bubbles drawn in thin iridescent lines: blown from a wand, deforming, splitting and popping. *Params:* surface tension, splitting and popping; exact values not visible. *Build:* Record · Code (surface tension is hard). *In video:* time; bubbles split and pop on beats, or a simulated pointer pops them. Light accent, 2–4 s. *Note:* a minimal aesthetic, fine line on white, the opposite of neon. Only partly inspected.
- **cursor-line-wobble** (GreenSock, *Cursor Line Wobble*). A line that can be grabbed and stretched like a string, and springs back when released. *Params:* a quadratic curve whose middle control point follows the pointer; release over 0.9 s on an elastic curve (amplitude 1, period 0.3). *Build:* ChatCut · Code · After Effects · any tool. *In video:* a simulated cursor or an object plucks the line; the elastic release is the beat. Underline or divider accent, under 1.5 s. *Note:* a well-tuned elastic ease gives the feeling of physics without simulating anything.
- **gpu-fluid-particles** (haxiomic, *WebGL Fluid Experiment*). An invisible fluid carries about 262k glowing particles; dragging creates jets and swirls of light. *Params:* particle count; simulation quality; solver iterations. *Build:* Code · Blender (smoke or fluid plus particles). *In video:* splats from a scripted path or a simulated cursor; let the flow continue after the force stops. Ground or energetic bridge, 3–6 s. *Note:* a classic of creative coding. Neon on black is recognisable and can look dated.
- **gpu-io-ink-fluid** (Amanda Ghassaei, *gpu-io fluid example*). On a paper-coloured ground, dark particles leave trails as a fluid carries them, like ink. *Params:* trail length; render modes for the fluid, its pressure or its velocity. *Build:* Record (saves images; can be captured) · Code. *In video:* time plus a few scripted splats on beats; ink trails settle on paper. Ground for calm sections or a dissolve-into-material transition, 4–8 s. *Note:* proof that a fluid does not have to be neon. The colour and ground change its whole character.
- **fluid-pixel** (nestorrig, *Fluid Pixel Cursor*). An invisible fluid follows the cursor and is drawn as large coloured pixels, optionally as ASCII characters. *Params:* simulation resolution 150; pixel size 16; velocity dissipation 0.77; density dissipation 0.95; 10 pressure iterations; splat force 18, radius 2.1; colour by speed; an ASCII ramp. *Build:* Code · Record (animate the pointer). *In video:* scripted splats at large pixel size; the pixels make the motion read at video resolution. Transition or retro accent, 2–4 s. *Note:* its identity comes from mixing two families, fluid physics and pixel aesthetics.
- **fluid-text** (Ksenia Kondrashova, *WebGL Fluid Simulation With Your Text*). The text itself is the fluid's ink; moving through it deforms, mixes and dissolves the words. *Params:* font, weight, size (80), text, pointer size, colour, plus the shared fluid controls. *Build:* Code · Record. *In video:* a scripted force sweeps across the word at the beat when its meaning changes. Transition (the word dissolves into the next scene), 1.5–3 s. *Note:* message and effect become one. Use it with words that mean something when they dissolve.
- **liquid-lens** (Angelo Libero, *Liquid Lens*). Seven soft bodies chase the pointer and merge into one shape that reveals a blurred image behind; a click makes it ripple. *Params:* body size 0.455; corners 3.4; merge level 0.35; coast wander and coast grain (how irregular the edge is); blurred depth and blur strength; ripple strength, speed, width and life; size wander, drift reach, overall speed; a "moves on its own" mode. *Build:* Record (has an autonomous mode) · Blender (metaballs) · Code. *In video:* autonomous mode or a scripted path moves the soft bodies; let the lens merge over the key part of the image. Reveal or object-led mask, 2–4 s. *Note:* its controls are named in design language, not code. It is a model for how to describe motion.
- **glass-icon** (Nikita Filippov, *Glass*). A tool that turns a logo into a glass icon with prism-like colour dispersion, optionally reacting to sound. *Params:* presets Studio, Melt, Prism, Lens, Night; refraction; blend; logo size; light, dark or transparent ground. *Build:* Record (exports 1080p, 4-second video and PNG directly; the fastest route in the library). *In video:* export the glass logo and rotate it slowly with a moving light. Product or logo hero, 2–4 s. *Note:* very much in fashion; as a default it will look generic.
- **liquid-glass** (jeantimex, *Glass Effect WebGPU*). A study of liquid glass in the style of current operating-system interfaces: shapes that refract, magnify and blur what is behind, with bright edges and a springy deformation when touched. *Params:* bezel width 60; glass thickness 50; refractive index 1.5; refraction level; magnifying scale; blur and progressive blur; chromatic dispersion; specular rims; spring deformation. The shape is a distance field (SDF). *Build:* Record (accepts video as background) · Blender. *In video:* a simulated drag moves the glass element over content; refraction shows on what passes beneath. Interface accent inside an interface simulation, 2–4 s. *Note:* excellent to learn from; copied as is, it is the most fashionable look of the moment.
- **fluid-glass** (chiuhans111, *Fluid Glass*). Large dark glass circles with rims of light; dragging lets a fluid deform the surface, and refraction draws highlights. *Params:* fluid velocity and pressure; surface normal; refraction. No visible controls. *Build:* Record · Blender (glass plus rim light). *In video:* time plus a moving light; rims catch the light as shapes deform. Premium ground, 3–6 s. *Note:* almost all you see is rim light, a very restrained device. Only partly inspected.
- **glass-xylophone** (Codrops, *Interactive Glass Xylophone with Three.js*). Iridescent glass bars in a spiral that play notes when touched. *Params:* material transmission, thickness, index of refraction, iridescence, dispersion; sound through Web Audio. *Build:* Blender or Code, timed to music. *In video:* hits on the beats of the soundtrack; in a silent piece, hits on motion beats with visible vibration. Rhythm sequence, 3–6 s. *Note:* the sound is half the effect. In video, time every hit to the soundtrack.
- **metaballs** (Jaume Sánchez, *Bumpy metaballs 2026*). 3D drops that move, merge and separate like mercury or jelly, with a bumpy surface and dozens of materials (ice, opal, gummy, nacre). *Params:* 20 blobs; isolation 80 (the surface threshold); speed; drift; smoothing; twist on three axes; ~50 material presets. *Build:* Blender (native metaballs; the material is the real work) · Code. *In video:* time; blobs merge on the beat when two ideas combine. Morph transition or organic hero, 2–5 s. *Note:* the form is simple and the material gives the character. Some materials (flesh, gills) can disturb, depending on the message.
- **pixel-voxel-drop** (Junichi Kasahara, *Pixel-Voxel-Drop*). An image or video pixelates, the pixels become 3D cubes with colour separation, then they fall and pile up with physics. *Params:* grid columns and spacing; cube or random box shape; count; duration; organic variation; pixelation; RGB shift; spread; depth; drop delay. *Build:* Record (load your own image) · Blender (rigid bodies) · Code. *In video:* the image pixelates on a beat, then cubes fall with gravity; the camera tilts to show depth. Transition (the digital becomes physical), 2–3 s. *Note:* three effects chained (pixel, voxel, fall) make a small choreography. A model of a transition with structure.
- **doom-fire** (Niklas Knaack, *Pixel Flame Canvas – Doom Fire*). Pixel fire. Each pixel takes heat from the one below, loses a little at random and rises. *Params:* pixel size 2; a fire palette from white to black; wind strength and direction; random decay. *Build:* ChatCut · Code · any tool. *In video:* time; wind or intensity animate with the energy of the section. Ground or accent, 2–4 s. *Note:* the classic fire algorithm from the game *Doom*. A very simple rule that produces something organic.
- **ascii-logo** (Edoardo Lunardi, *ASCII Logo*). A 3D shape drawn with text characters, rotatable, with light and dark themes. *Params:* a character ramp by brightness; cell size; colour; theme. *Build:* Code · Record (animate the rotation). *In video:* time; slow rotation of the 3D form, or a reveal from noise to shape. Logo or object hero, 3–5 s. *Note:* ASCII is a trend. It works when the shape means something, not as a filter.
- **ascii-noise-field** (Codrops, *ASCII Shader with OGL*). An animated noise field drawn with coloured characters, like a landscape that breathes. *Params:* frequency (noise scale); speed; lightness; Perlin noise underneath. *Build:* Code · Record · ChatCut (likely). *In video:* time; field speed rises with tension. Ground behind titles, any length. *Note:* a good ground behind titles. The same noise gives particles their life.
- **canvas-grid-zoom** (Tom Miller, *Canvas Grid Mouse Effect*). A photo divided into a grid of squares with dots at the corners; near the pointer, each square zooms into its own piece of the image. *Params:* square size 85; optional fade; dots and dot colour; pointer follows on a 1 s expo curve; scale by distance. *Build:* Code · Record (animate the pointer) · ChatCut (likely). *In video:* a camera move replaces the pointer: the camera travels across the grid and squares zoom as it passes, ending in a zoom-through into one image. Gallery or transition, 2–4 s. *Note:* a simple idea with a big effect. It works best with highly textured photos.
- **truchet-tiles** (Rafa, *Truchet Tiles*). A grid of tiles with quarter-circle arcs that turn 90°, at random or on hover, forming curved paths that keep changing, on a plane tilted in perspective. *Params:* 64 px tiles; 90° turns over 0.6 s with ease-in-out; random intervals of 1–42 s; tilted 28° with 1000 px perspective. *Build:* ChatCut · After Effects · Code. *In video:* time; tiles turn on a slow random rhythm, or a wave of turns crosses the grid on a beat. Ground, any length. *Note:* a classic pattern. The perspective and the slow random rhythm make it.
- **wave-grid** (Franky, *3D Wave Grid*). A grid of pale 3D columns that ripple gently behind text. *Params:* grid size; wave height and speed (a sine of position and time). *Build:* Blender · Code · ChatCut (likely). *In video:* time; a ripple crosses on beats or follows the text entering. Ground behind text, any length. *Note:* a model of restraint, where 3D supports the text without stealing focus.
- **data-tunnel** (sabosugi, *Data Tunnel*). About 80 fine lines fan out from a point like a tunnel and ripple, while signals of light with trails travel along them. *Params:* 80 lines; spread; curve length and power; wave speed and height; line opacity; 94 signals; global speed; trail length 3; bloom strength 3; up to three signal colours. *Build:* Record · Code. *In video:* time; signals travel on the beats; the camera flies through the tunnel for a transition. Bridge or zoom-through, 2–4 s. *Note:* lines of light on black are very common in tech. Change the ground, the colour or the meaning.
- **duo-lenticular** (ycw, *duo*). A zigzag folded surface, like an accordion, with one photo on each face, so each side of the view shows a different image. *Params:* a finely subdivided grid; zigzag depth 0.5; two side lights; a camera that orbits. *Build:* Blender (straightforward) · Code. *In video:* a camera orbit replaces the viewer moving: as the camera passes, the surface flips from A to B. Before-and-after transition, 1.5–3 s. *Note:* the idea of lenticular postcards. Very strong for any message about duality.
- **sine-cosine** (schwiiiii, *[Pure CSS] Sine & Cosine Visualized*). A dot moving in a circle, with its horizontal and vertical components shown as two waves at its sides. *Params:* 4 s per cycle; a sine curve, cubic-bezier(0.37, 0, 0.63, 1); two motions offset by half a cycle; alternating, infinite. *Build:* any tool. *In video:* time; one full cycle per idea, with the waves drawing as the dot turns. Teaching beat, 4–6 s. *Note:* the mathematics in one image: circular motion is two waves out of phase.
- **editorial-reveal-system** (Prolibu website). A coherent motion system for a dark editorial site, combining smooth inertial scrolling, short and precise entrances, blur-to-focus, a circular mask reveal and asymmetric exits. *Params:* entrances of 8–32 px over 0.6–1.2 s on quint-out (0.22, 1, 0.36, 1), with opacity shorter than movement (0.5 s against 0.8 s); blur-to-focus from 8 px blur and 0.8 scale on expo-out (0.16, 1, 0.3, 1); exits of 0.32 s on (0.7, 0, 0.84, 0); overshoot (0.34, 1.56, 0.64, 1) only on small elements; stagger of 80–180 ms; a circle that grows from the centre as a mask between big ideas. *Build:* ChatCut · After Effects · Code. *In video:* time on scroll-equivalent beats: each element reveals as if scrolled into view, with the camera or the page moving up. A whole system for text-led sections, and the circular mask as a transition. *Note:* the value is the system, not any single effect. Small distances, fast exits, overshoot kept for small things.
- **unwoven** (Clément Grellier, *Unwoven*). An endless carousel of photos where, near the edges, each image unravels into fluttering threads, like fabric coming undone. *Params:* 26 threads per image; 20 segments for the flutter; 95 px/s drift; unravelling begins 26% in from the edge; corner radius 20; aspect 0.75. *Build:* Record (moves on its own; load your images) · Code. *In video:* time drives the unravelling; the camera pans across the images as if scrolling. Gallery or dissolve-into-material transition, 3–5 s. *Note:* the fabric metaphor makes it a transition with meaning, not decoration.
- **scroll-graph** (Tom Miller, *Scroll-Driven SVG Graph Animation with GSAP*). A line chart draws itself while the camera follows its tip and zooms out, and the data points pop in one after another. *Params:* the line draws along its length; the camera follows the line's tip; scale from 2 to 0.4 on expo in-out; points appear with a 0.1 stagger. For video, drive it by time instead of scroll. *Build:* ChatCut · After Effects · Code. *In video:* scroll becomes time: the line draws while the camera follows its tip and pulls back. Data beat or pull-out reveal, 4–8 s. *Note:* a camera that follows the data turns a chart into a narrative. Ideal for explainers.
- **page-transitions** (Iqbal, *Page Transitions in Astro with Barba.js & GSAP*, design credited to cielrose.tv). On each page change, soft blurred shapes cover the screen and the new content is revealed through masks. *Params:* inset masks from the bottom up and polygon masks; durations of 0.5–1.4 s; power and expo curves plus custom curves. *Build:* ChatCut · After Effects · Code. *In video:* time; the covering shapes and masks run between two beats. Object-led mask transition, 0.5–1.4 s. *Note:* the value is the system: every transition has a considered duration and curve.
- **line-hover-styles** (Codrops, *Underline Hover Styles for Links*). Fifteen animated underlines: lines that grow, slide, glitch or draw themselves. *Params:* 0.3–0.4 s; curves (0.7, 0, 0.2, 1), (0.2, 1, 0.8, 1) and (0.4, 1, 0.8, 1). *Build:* ChatCut · After Effects · any tool. *In video:* a simulated cursor hovers the word, or the underline plays on the beat of emphasis. Emphasis accent, under 0.5 s. *Note:* a catalogue of micro-motion with exact values. Use one style per piece, consistently.
- **inertia-slider** (ReGGae, *Infinite draggable WebGL slider*). An endless image carousel dragged with inertia; images rescale through a shader as they move. *Params:* speed 2; drag threshold 50; easing 0.075 per frame (the inertia); image scale from 0.65 to 1. *Build:* Code · Record. *In video:* a simulated drag throws the slider and inertia carries it; or the camera moves with the same inertia. Gallery or portfolio sequence, 3–5 s. *Note:* inertia, easing toward a target a little every frame, is the same idea as a spring with friction.

## Embedded: references/targets/chatcut.md

### Target: ChatCut

ChatCut is a video editor driven by an AI agent. Its motion graphics are generated by the agent and built from code behind the scenes, so it can follow technical specifications (particle counts, curves, milliseconds), not only descriptions. Its documented features include Design Styles, which keep generated graphics consistent, and Skills, which are reusable workflows.

What follows was learned in practice (November 2026). Tools change, so confirm anything that matters with a small test.

#### Three ways to work with ChatCut

Choose by where Unrushed is running.

1. **Unrushed inside ChatCut.** ChatCut's agent runs on Claude Code and loads the skills in the person's Claude account, so Unrushed can run directly in ChatCut's AI composer. The person writes "use unrushed to…", and the agent runs `brief`, `style` and `storyboard`, creates the Design Style and builds the piece in the project. No export or copy and paste is needed. When you run inside ChatCut, skip the "What to deliver" section below: apply its contents directly by creating the Design Style and building the scenes, still piloting first. In this host the skill may be installed as a single file, so read "References" in `SKILL.md`.
2. **Unrushed in Claude Code, with the ChatCut plugin.** ChatCut publishes an agent plugin that connects Claude Code (and other agents) to ChatCut projects through an MCP server (setup instructions at chatcut.io/claude). With both installed, plan with Unrushed and build through the ChatCut tools.
3. **Unrushed elsewhere, ChatCut by hand.** When Unrushed runs in a host without access to ChatCut, `export chatcut` produces the two-part deliverable below for the person to paste.

#### What to deliver

For route 3, an export for ChatCut has two parts. In routes 1 and 2, the same two parts are what you create directly.

##### 1. Design Style block

Fill the Design Style fields once, and every later graphic in the project follows them. Create it under the AI composer, in Design Style → New design style, or customise a featured style into a personal copy.

| Field | What to put |
|---|---|
| Design guide | Start from `BRAND.md` when it exists: its rules go first, marked as brand rules. Then plain-language rules: layout and text zone, spacing, type hierarchy, the motion fundamentals as numbers (durations, curves, distances, stagger, exit timing), the material, the signature move, and the forbidden list |
| Colors | Each hex value with its role, taken from `BRAND.md` when it exists: ground, ink, accent and what the accent is for |
| Fonts | Each family with its role and sizes |
| Logo | Only if the piece carries a brand: the version, minimum size and clear space from `BRAND.md` |
| Reference images | Stills that show material and texture; describe in the guide what each one is for |

Reference images are static, so motion has to be described in the design guide, in words and numbers.

##### 2. Agent prompt

Paste this into the AI composer, with the Design Style selected. Structure it like this:

1. **Deliverable**: duration, resolution, frame rate, sound or none.
2. **Concept**: the through-line in two sentences.
3. **Storyboard**: the table from `STORYBOARD.md`, with exact text, the beat each scene serves, its device and its transition written as relation and type ("B is a detail of A → zoom-through, 900 ms, expo"). Durations come from the beat map; do not even them out.
4. **Motion fundamentals**: repeat the key numbers even if they are in the Design Style. The agent follows what is in front of it. Use the paste-ready block in `motion-kit.md` §3 and the curve names from the storyboard, each with its cubic-bezier and frames.
5. **Interfaces**: when a scene simulates a product or a tool, name the design system and components ("shadcn/ui Slider and Card, dark theme, Lucide icons", or the product's own), with radius, colours and font, and the cursor behaviour from `visual-explanation.md`.
6. **Continuity**: if one element carries through the piece, such as particles or a line, say that every transformation starts from the exact end state of the previous scene, with no cuts between clips, and that it may build the whole sequence as a single motion graphic if needed.
7. **Cues**: the cue sheet from `STORYBOARD.md`, one sentence per cue (see "Library effects, zooms and sound" below). State that these are the only effects, zooms and library transitions wanted, so the agent adds nothing else.
8. **Process**: build in passes (`SKILL.md`, "Building in passes"). Pass 0 is the hardest beat, usually the payoff: build it alone, check it, and report before building the rest. Then blocking, type, motion and finish, with `preview_timeline` frames after each pass.
9. **Never ship**: paste the Never ship list from `SKILL.md` and say none of it may be added: no labels, counters, chips, stat slides, invented screens, slogan lines or end card with a URL.
10. **Report**: ask it to list what it could not do, which frames it checked with one sentence each, the real timings, and the real parameters of every cue it applied. Ask for numbers and descriptions, not a verdict such as "looks great".

#### Library effects, zooms and sound

ChatCut's library holds effects, zooms, transitions, LUTs and sound effects that attach to clips, ranges or cuts. Choose them in `storyboard` with `references/effects.md`, then apply the cue sheet. ChatCut's own agent does not add effects nobody asked for, so every cue must be requested explicitly.

**Routes 1 and 2, with ChatCut's tools.** Apply the cue sheet cue by cue:

1. `browse_library` finds the asset id by name or category. Do not hard-code ids other than `builtin:zoom`.
2. `preview_timeline` gives the clip ids and frame ranges.
3. `edit_item` applies the cue: an effect on a clip or a range, the zoom with its properties, or a transition between two adjacent clips with `durationInFrames`.
4. `preview_timeline` with the viewer checks the composed frames.

When the editor refuses a transition for lack of handles, use its suggested duration or keep the hard cut, and note it in the report. Generate a custom shader (`submit_shader`) only when nothing in the library fits, with the brief rules in `effects.md` §8.

**Route 3, by prompt.** Write one sentence per cue, with five parts:

1. the target;
2. the library name;
3. the time range;
4. the intensity or parameters;
5. what must stay unchanged.

For example:

> At 00:42–00:45 on the talking-head clip, add Quick Zoom In to 1.3× on the word "never", manual focus on the laptop screen, ease-in 5 frames; keep captions and the lower third unchanged.

After the agent applies them, ask it to read back the real parameters, because the mapping of zoom presets to the zoom's internal `shape` values is not documented.

#### Improving an existing ChatCut project

`improve` inside ChatCut, or through its tools, follows the same steps as anywhere else. ChatCut adds sources for the intake:

- **Read the project before asking.** `read_project` and `preview_timeline` show the structure, clips, captions and motion graphics. `browse_assets` shows uploaded media: screen recordings, screenshots, logos, brand images. The transcript gives the script.
- **Look for the product outside ChatCut too.** ChatCut's agent runs on Claude Code, so it can use the host's tools: git and the GitHub CLI, connectors, and a browser for the running product. Read the repository as described in `visual-explanation.md` §8 before rebuilding any demo screen. If nothing is reachable, ask for the repository or link in the intake round.
- **Rebuild demos as motion graphics from the real components.** Pass the tokens (colours, radii, fonts), the component anatomy, the real copy and the states from the repository, plus the demo script with the cursor's actions. Do not animate a screenshot when the real interface can be rebuilt.
- **Keep the previous timeline** and build the new version on a copy, so the before and after can be compared.
- **Verify the export with the gates.** Export, then run `scripts/detect.py <export> --expect <seconds> --sheet` and `detect.py <export> --expect <seconds> --storyboard STORYBOARD.md`. Quote the gate results in the report.
- **Verify with the viewer.** Use `preview_timeline` with `views:["viewer"]` on consecutive frames around each movement, as a strip, to check physics, and around each demo step to check the action and its response.

#### Working with the agent

- **Pilot first.** Generation uses credits, and a full piece costs much more than a pilot. One scene plus the closing shows whether the agent follows the spec.
- **Read its report sceptically.** The agent checks individual frames, not continuous playback. Smoothness, rhythm and monotony across scenes have to be judged by watching the export.
- **Name the clip and the change when revising**: "in the 1974 scene, the particles should stop mid-fall and stay suspended, not pile up". Vague notes produce vague changes.
- **Editable fields.** Generated graphics expose some parameters, such as text, in a panel. Small text fixes do not need a new generation.
- **Earlier projects leak in.** The agent may reuse motion graphics from the person's earlier projects that look similar. That is efficient, but say so in the report, and check that the new piece still follows its own `STYLE.md`.

#### Saving what worked

When a piece comes out well, keep it in two places:

- **The Design Style**, saved under My Styles, for the look and motion rules.
- **A ChatCut Skill**, created from the AI composer's Skills menu with "Save this editing process as a Skill", for the process. ChatCut asks a few questions and summarises the workflow before saving.

#### Known limits

- Motion cannot be shown to the agent through images; it has to be described in words and numbers.
- Real 3D materials, such as physically based glass, cloth simulation or volumetric light, may be better rendered elsewhere, for example in Blender, and imported as clips.

## Embedded: taste/verdicts.md

### Verdicts

What the author of Unrushed said about real pieces made with it, with context. Read it before proposing an idea, a style or a fix. These are reactions to specific pieces, not universal rules: generalise each one only as far as its context goes.

Each project keeps its own `TASTE.md` (template in `assets/TASTE.md`) for the person it is made for. This file is the shared example and the reason behind several of the skill's rules. Quotes stay in the language they were said in, with a translation.

#### How to add a verdict

When the person reacts to a piece, append an entry to the project's `TASTE.md`: date, piece and version, the quote, what they were reacting to (scene, time, frame), and the narrowest lesson it supports. Never rewrite an earlier entry; add a new one that refines it.

#### Rejected

**Before 0.4 · Unrushed 0.3, a run inside ChatCut on a new piece.**
- Quote: "no me pidió reglas para trabajar, imágenes de marca, no sé, algo para el guion, solo se asumió apenas lo inicié" (it asked for no working rules, brand images or anything for the script; it just assumed as soon as I started it).
- Reacting to: the skill starting to build with no intake.
- Lesson: no visual work before the intake; if the person skips the questions, write the assumptions down where they can be corrected. Became "Context before creation" in 0.4.

**Before 0.4 · Unrushed 0.3, run on a video made without the skill.**
- Quote: "cuando hizo cambios fueron poco estrictos, y muy perezosos" (the changes it made were lax and very lazy).
- Reacting to: small cosmetic changes (a duration here, grain or a camera move there) instead of treating the problems the critique named.
- Lesson: every fix has an acceptance test, and a fix cannot be swapped for a cheaper one. Became the fix contract in `improve`.

**Before 0.4 · Same run, the product demo.**
- Quote: "no hizo el mínimo esfuerzo por revisar el repositorio del producto para proponer interfaces reales del producto" (it made no effort to check the product's repository to propose its real interfaces).
- Reacting to: invented screens moved around by camera pushes.
- Lesson: find the real product first (code, design files, running app) and build the demo from its components; a camera move over a still screen is not a demo step.

**2026-11-23 · Unrushed 0.4, pieces built after the 0.4 changes.**
- Quote: "se ven ruidosos, poco cuidados en la información, no está siendo el protagonista la animación sino que sigue sintiéndose muy AI" (they look noisy, careless with information; the animation is not the protagonist and it still feels very AI).
- Reacting to: scenes crowded with labels and text, every beat equally loud, motion as decoration around the text.
- Lesson: the skill's own rules and example were prescribing page furniture (labels, counters, a long end card with a URL) and a quota of transition kinds. Removed in 0.5; added the Never ship list, the importance budget and "what each beat buys".

**2026-11-23 · Same pieces, the research.**
- Quote: "investigamos físicas, técnicas, pero nada de eso se aplica" (we researched physics and techniques, but none of it is applied).
- Reacting to: measured curves and techniques that lived in prose and never reached the built motion.
- Lesson: motion values must arrive as numbers the tool executes (the motion kit and its Remotion file), and a render must be checked by script (the gates), not by the agent's own description.

#### Preferred

**2026-11-23 · How to learn from another project.**
- Quote: "hay que tomar las cosas buenas que sí hace motionmaxxing… para conservar nuestro objetivo pero con los aprendizajes de motionmaxxing" (we should take the good things motionmaxxing does, to keep our goal but with its lessons).
- Lesson: keep Unrushed's job (directing motion inside the person's own editor, with their footage and their real product) and adopt measured values, gates and honest review; do not become a second film generator.

**Standing preference · Working style.**
- The author wants a plan for long tasks, executed in parts, with a critical voice rather than agreement, and questions when something is unclear. Pieces built with Unrushed should follow the same rhythm: pass 0 first, shown before the rest is built.

#### Measured on our own work (not a verdict, but evidence)

**2026-11-23 · The 2-minute Unrushed video made in Remotion during 0.2.** `detect.py` reports: 21 flat frames in three runs (G2 fails), a final hold of 5.7 s (G3 fails), 13% of frames changing, motion 0.3 against a human median of 6.8. It is the clearest example of "the animation is not the protagonist".
