# Changelog

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
