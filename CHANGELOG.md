# Changelog

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
