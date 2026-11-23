# Target: Remotion

Remotion makes video with React: each frame is a render of a function of the frame number, and the whole sequence is rendered to a video file. Coding agents such as Claude Code can build a Remotion project from a prompt. Use this target when the piece needs things a video editor cannot do (custom particle systems, data-driven graphics, exact programmatic control), or when the person wants the result as code they own.

## What to deliver

A prompt for a coding agent, structured in these sections:

1. **Deliverable**: output path, codec (H.264 MP4 by default), resolution, frame rate, duration, and audio or none. Ask for a `stills/` folder with one key frame per scene.
2. **Stack**: Remotion; `@remotion/three` when there is 3D or more than a few thousand particles; fonts through `@remotion/google-fonts`. Ask the agent to install Remotion's official agent skills first: `npx skills add remotion-dev/skills`.
3. **Concept and storyboard**: from the project files, with exact text and the instruction to add no facts.
4. **Visual system and motion fundamentals**: from `STYLE.md`, as numbers. Ask the agent to copy `assets/remotion/unrushed-motion.ts` (in the repository: `https://raw.githubusercontent.com/amladinon94-source/unrushed/main/assets/remotion/unrushed-motion.ts`) into `src/` and build every move with its functions (`land`, `leave`, `arrive`, `stagger`, `press`, `revealSnap`, `count`) and curves (`ease.softLand`…), as named in the storyboard. Hand-written easing is the most common way measured motion gets lost (`motion-kit.md` §4). When the storyboard names forces, ask for `assets/remotion/unrushed-physics.ts` beside it, with every simulation built once outside the component (`physics-kit.md` §6).
5. **Technique notes** for anything non-trivial, such as morphing (below).
6. **Cues**: the cue sheet from `STORYBOARD.md`, translated with the table below.
7. **Technical rules** (below).
8. **Phases with checkpoints** (below).
9. **Checklist**: the `critique` questions, applied to each still.

## Translating the cue sheet

The cue sheet names effects as an editor's library does. Use the Remotion column of `references/effects.md` for each one. As a summary:

| Cue kind | In Remotion |
|---|---|
| Effect on a clip or range | `@remotion/effects` through the `effects` prop of `<Video>`, `<Img>`, `<Solid>` or `<HtmlInCanvas>`, inside a `<Sequence>` for the range. Animate parameters with `interpolate()` on the frame. Custom looks use `createEffect()`. |
| Zoom | Scale a wrapper with `transform-origin` at the focal point; interpolate the scale over the cue's frames with `ease.glide` from the kit, or the brand's curve, and the multiplier from `pushFor(frames)`; a reveal uses `revealSnap`. `punch` ramps in and out; `hold` ramps in and stays; `slow-push` ramps across the whole range; `instant` jumps. |
| Library transition | `<TransitionSeries>` with the presentation from the table (`fade`, `wipe`, `slide`, `iris`, `pushCut`, `zoomBlur`, `pageTurn`…), `linearTiming` with an `Easing`, or `springTiming`. Shader transitions are custom HTML-in-canvas presentations. |
| Sound accent | `<Audio>` inside a `<Sequence>` that starts so the sound peaks on the cue's frame. |
| Detection effects (person, face, hands, hair) | Only with precomputed masks or landmarks supplied with the project. Otherwise, report that the cue cannot be built. |

Effects that use WebGL need `--gl=angle` (or `Config.setChromiumOpenGlRenderer('angle')`) when rendering.

## Technical rules to include

These prevent the most common failures:

- **Everything is a function of the frame.** Use `useCurrentFrame()`; never `requestAnimationFrame`, `Date.now()` or `Math.random()`. Use Remotion's seeded `random()`. A frame rendered twice must look the same, or the video flickers and breaks when rendered in parallel.
- **No step-by-step simulations.** Physics that depends on the previous frame (falling, colliding, cloth) must be written as a closed formula of time, or precomputed deterministically once and looked up by frame.
- **One theme file.** Colours, fonts, curves and durations live in `src/theme.ts`, so revisions touch one place.

## Morphing particles: technique notes

The sequence that worked in practice for one particle set changing into a series of figures:

- Each figure is an array of N target positions; every figure has the same N, resampled if needed.
- Pair points in order, for example sorted by angle from the centre, so the flow has a direction. Random pairing reads as chaos.
- Give each particle a seeded random delay of 0 to 35% of the transition, so they do not move as a block.
- Ease the transition with cubic in-out.
- Add noise whose amplitude follows sin(π·progress): it peaks mid-transition and vanishes at both ends, so the figure dissolves before it reassembles.
- At rest, add low-amplitude simplex-noise drift so the figure breathes.
- Sample text by rendering it to an offscreen canvas and reading its pixels. Sample line drawings by spacing points evenly along SVG paths.

## Phases with checkpoints

The phases follow "Building in passes" in `SKILL.md`.

1. **Setup**: project, theme file, the motion kit copied into `src/`, `STORYBOARD.md`.
2. **Pass 0, the hardest beat**: build only the hero moment and its hardest handoff. Render it and three stills (`npx remotion still`), run `scripts/detect.py --strip` on its key move. Stop and show it.
3. **Pass 1, blocking**: every scene with real durations, positions and cuts. Render at half resolution (`--scale=0.5`), run `detect.py <render> --expect <seconds> --sheet`, describe the sheet.
4. **Pass 2, type and information**, then **pass 3, motion** with the kit's functions, each followed by a render, the sheet and strips of the key moves.
5. **Pass 4, finish and final render**: material, cues, sound. Run `detect.py <render> --expect <seconds> --expect-audio --storyboard STORYBOARD.md` and quote the gates. Report the real duration and anything that could not be done.

## Licence note

Remotion is free for individuals and small teams. Larger companies need a paid company licence. Mention it when the piece is for an organisation.
