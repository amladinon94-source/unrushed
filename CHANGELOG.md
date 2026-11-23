# Changelog

## 0.6 — 2026-11-23

After 0.5, a pass 0 built in ChatCut still looked the same with and without the skill (see `taste/verdicts.md`). One half of that verdict was motion: the fall, the spread and the highlights were shapes interpolated on curves. The skill recommended reading about physics and gave none of it as code.

### Added
- **Physics kit** (`references/physics-kit.md`, `assets/remotion/unrushed-physics.ts`): seeded randomness and smooth noise; exact free fall and damped springs; gravity, friction, drag, viscosity, attraction and wind in a stepped simulation that gives the same frame in any render order; particles with a lifetime; cords, cloth and soft bodies; steering (seek, arrive, flee, wander, follow a path, flow fields, separation, alignment, cohesion). Brakes are applied exactly, so a thick liquid cannot flip a body's direction.
- **Curve or force**: a rule for which one a move needs, one gravity per piece, starting numbers per material, and the signature each forced move should show on a strip.
- **A paste-ready core** (50 lines) for hosts where only one file travels, such as ChatCut.
- `examples/physics-kit/`: three scripts that draw a curve against a force, follow-through, a soft body and steering, and the climax of the piece from the verdict before and after, rendered by ChatCut.
- **Material kit** (`references/material-kit.md`): when a material is needed, the primitives test for telling a computed surface from a drawn one, a five-step recipe (thickness, normals, absorption, one light with a shape, the ground), the shader that produced the example, and six defects by name. `examples/material-kit/` has the scene and a before and after.
- **Gate G6**, by eye: when the protagonist is a substance, its surface is computed.
- `scripts/test_physics.ts`: 61 numeric tests of the physics kit, including that the paste-ready core published in the reference matches the full file. Run with `bun scripts/test_physics.ts`.

### Changed
- **Pass 0 starts with a hero frame.** One still of the hero moment with its finished material, rendered in the target tool, is approved before any motion. Material is no longer left to pass 4, where it arrived after the person had approved the flat version.
- The "custom shader only as a last resort" rule now says what it covers: effects over footage, not the code that draws a motion graphic's protagonist.
- `storyboard` writes a force instead of a curve when the visual has a thing that falls, sinks, hangs, swings, drifts or steers. Pass 3 and the Physics row of `critique` check the signatures.

### Not done
- Both kits were applied by their author. Neither has been tested by a fresh agent that has only the skill, which is the test that matters.
- The material recipe was rendered for one material (resin, pigmented and clear) from one angle. The example is close to candy.
- The physics kit's table of materials holds starting values, not measurements.

## 0.5 — 2026-11-23

After 0.4, pieces still looked noisy, careless with information and "very AI", with the motion as decoration instead of the protagonist, and the researched physics never reached the build. Part of the cause was Unrushed itself: its rules and its example prescribed page furniture, a quota of transition kinds and a long end card. This version removes what prescribed slop, turns the research into numbers and checks, and adopts lessons from motionmaxxing (Apache-2.0) while keeping Unrushed's job: directing motion inside your own editor, with your footage and your real product.

### Removed
- The quota of "at least four transition kinds"; hard cuts on motion are now the default, with 1–3 designed transitions per minute.
- The 4 s closing hold. The final frame holds 0.6–1.4 s, and the URL goes in the post copy.
- Page furniture from the example brand and storyboard: labels, counters, crop marks, episode numbers, serif italic on screen, the end card with a URL.

### Added
- **Never ship**: eleven patterns that make a piece unfinished, whatever else scores well.
- **Looking honestly**: run the gates, describe every frame of a contact sheet in one sentence, check Never ship, watch key moves as strips, fix in a fixed order, report numbers and never certify.
- **Gates** in `detect.py` on any export: G0 piece exists, G2 no empty frames, G3 short ending, with G1, G4 and G5 judged by eye; `--expect`, `--expect-audio`, `--strict`; notes on loudness and motion against human-made films; `--sheet` for a contact sheet and the frames around every cut.
- **Plan checks** in `detect.py --storyboard`: counters, URLs, slogan copy, numbers missing from `VIDEO.md`, page furniture in the visual plan, what each beat buys and the importance budget.
- **Information discipline** (`narrative.md` §5): the one true thing, the brand inventory and the cover-the-logo test, "what each beat buys", importance 1–3 with at most a quarter emphasised, show then say, words on screen, real content.
- **Motion kit** (`motion-kit.md`, `assets/remotion/unrushed-motion.ts`): ten measured curves as cubic-beziers, recipes in numbers, and how to apply them in ChatCut, Remotion and After Effects.
- **Building in passes**: the hardest beat first, then blocking, type, motion and finish, with a check after each.
- **Taste**: `TASTE.md` per project, `taste/` with the author's verdicts and edits, and `blind_review.py`.
- New AI tells: page and template patterns, words on screen, gradient text and wide glows.

### Changed
- Durations, holds, stagger, overshoot and arrivals in `principles.md`, and the energy table in `SKILL.md`, follow the measured values (median move 10 frames).
- The curve table uses the measured curves; the early-overshoot back-out curve is gone.
- Library effects: Cross Dissolve and Dip to Black are situational, not workhorses; sound accents are 1–3 hand-placed hits per piece.

## 0.4 — 2026-11-23

Lessons from a real test in ChatCut. Asked to "improve the whole video" of a product launch made without Unrushed, the agent:

- ran `critique` without asking anything about the brand, the script or the product;
- never looked at the product's repository;
- judged motion from single stills;
- turned "material" into grain and the demo into camera moves over still screens;
- applied the easy fixes and left the hard ones.

This version closes each of those gaps.

### Added
- **`improve`**, for videos and projects that already exist:
  1. intake;
  2. baseline critique;
  3. `REVISION.md` with an acceptance test per fix;
  4. approval;
  5. rebuild, heavy fixes first;
  6. re-score, with each fix reported as done, partial or not done, with evidence.

  The **fix contract** forbids swapping a fix for a cheaper one or turning an approved fix into an option.
- **Context before creation**: `style`, `storyboard`, `export` and `improve` never run on assumptions. The intake extracts what it can, finds the product, and asks one round of questions about brand, script, product demo and constraints. Skipped questions become a visible Assumptions list.
- **Finding the real product** (`visual-explanation.md` §8):
  - where to look: project, repository, design files, running app;
  - what to read in a repository: tokens, components, routes, copy, states;
  - a list of the sources used, and approximate screens marked as such.
- **The product demo script** (`visual-explanation.md` §9): each step has an action and the product's visible response, with the "aha" moment held longest. Camera moves connect steps but never replace them.
- **`critique` gains Physics and Product demo** criteria:
  - Physics is scored from consecutive frames, a motion profile or playback, never from single stills.
  - Every criterion scored 2 or less gets a fix.
  - Every fix carries an acceptance test and a weight.
  - A focus argument narrows the review: `critique physics`, `critique demo`, and others.
- **`detect.py --strip`** writes consecutive frames as one image. **`--profile`** prints the per-frame change of a movement as a rough speed curve, with a reading (decelerates, linear, dead stop, settle).
- Physics checks in `principles.md` §9.
- A Product section in `VIDEO.md` (sources, flow, "aha" moment, sample data, the demo script).
- `REVISION.md` template.
- New AI tells:
  - a demo made of camera moves over still screens;
  - an approximate interface when the real one was reachable;
  - motion that glides at one speed and stops dead;
  - finish (grain, glow, blur) offered as the fix for motion or a demo.

### Changed
- Requests to improve an existing video route to `improve`, not `critique`.
- `brief` looks for the product instead of only asking about it, and writes the demo script for product pieces.
- `storyboard` builds demo scenes from the demo script and marks approximate screens.
- The ChatCut target explains how to improve an existing project: read the project and assets, look for the product with the host's tools, rebuild demos from real components, keep the previous timeline, and verify with frame strips in the viewer.

## 0.3 — 2026-11-21

Editors such as ChatCut now ship libraries of effects, zooms, transitions and sound. An agent with no criteria uses them everywhere, which is exactly the "AI edit" look. This version teaches Unrushed to direct the library, and to start from the brand.

### Added
- `references/effects.md`, covering every effect, zoom preset, transition and sound accent in ChatCut's library:
  - choosing by intent;
  - three tiers (workhorse, situational, gimmick);
  - when never to use each one;
  - its Remotion and After Effects equivalents;
  - zoom parameters and grammar;
  - library transitions mapped to the relations in `transitions.md`;
  - sound accents and budgets;
  - how to apply cues through ChatCut's MCP tools (`browse_library`, `edit_item`, `preview_timeline`) or by prompt.
- `BRAND.md`, a new project file with its template. `brief` asks for the brandbook or style sheet, extracts it, and proposes the video rules brandbooks lack (motion, logo animation, transitions, lower thirds, end card) as proposals. With no brandbook, it builds a short one in the conversation.
- A cue sheet in `STORYBOARD.md`: each cue with kind, library name, frames, target, parameters, the word it is tied to, its reason and its tier, plus a budget check.
- `detect.py --storyboard` checks the cue sheet:
  - missing reasons or tiers;
  - more than one gimmick or two stylize looks;
  - zooms per minute;
  - the same library transition three times in a row;
  - zooms within 10 frames of a transition;
  - stacked distortions.
- New AI tells: a punch-in on every sentence, shake or flash for "energy", meme effects in serious pieces, filter tours, and template transitions as the default.
- `examples/unrushed-launch/`: a worked example with `BRAND.md`, `VIDEO.md` and a `STORYBOARD.md` whose cue sheet passes the detector.

### Changed
- `style` works inside the brand: directions vary only what `BRAND.md` leaves open.
- `storyboard` adds library cues only when they do a job the cut cannot, ties each zoom and sound to a word, and checks budgets and the brand.
- `export` carries the brand rules and the cue sheet. The ChatCut target applies cues directly or writes one sentence per cue and asks the agent to add nothing else. The Remotion target translates each kind of cue. The generic target maps cues to After Effects.
- `critique` adds an Effects criterion, and Consistency checks `BRAND.md`.
- The single-file edition embeds `effects.md`.

## 0.2 — 2026-11-20

Lessons from the first test: a two-minute explainer about Unrushed built from the same storyboard in ChatCut and in Remotion. Both looked like animated slides, used one kind of transition, ticked along at an even rhythm and showed every style on the same paper. The cause was the plan, not the tools, so this version teaches the plan.

### Added
- `references/narrative.md`: the spine (hook, promise, proof, payoff, ask), hooks that work in the first second, structures by type of piece, beats, the beat map and the tension curve, and guidance for pieces that sell a product.
- `references/visual-explanation.md`: the slide test, eleven devices that make an idea visible, interface simulation with real components (the product's own or its design system: shadcn/ui with Lucide, Material 3, Fluent 2, Apple's HIG within its licence), and cursor choreography.
- `references/transitions.md`: transitions chosen by the relation between beats, a catalogue of sixteen with durations and the library techniques that build them, rules against repetition, and eye trace.
- An **In video** line for each of the 38 techniques: what replaces the mouse or scroll, and the kind of shot it makes.
- `detect.py --storyboard`: flags even scene lengths and repeated transitions in a plan, with or without a video.
- New AI tells: slide scenes, static split panels, even beat lengths, invented interfaces, robotic cursors, one transition type for the whole piece, static grain, showcases where every style shares one ground.

### Changed
- `brief` proposes the spine, the through-line and a beat map.
- `style` proposes two or three directions that differ in material and ground, with styleframes when possible, never reuses an earlier project's look unasked, adds light and finish, and gives each style its own world in showcase pieces.
- `storyboard` gives each beat a device and each transition a relation, and ends with checks for the spine, rhythm, transitions, the slide test and variance.
- `critique` adds Story, Rhythm, Explanation and Transitions, and can review a plan before anything is built.
- `detect.py` finds still stretches on a block grid, so a moving cursor or thin lines count as motion.
- The ChatCut prompt structure carries beats, devices, transitions and interface systems, and pilots the hook and the payoff.
- The single-file edition embeds the three new references.

## 0.1 — 2026-11

First release: commands `brief`, `style`, `storyboard`, `recipe`, `export`, `critique`; dials; principles; AI tells; 38 techniques; ChatCut, Remotion and generic targets; `detect.py`; single-file edition.
