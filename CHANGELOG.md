# Changelog

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
