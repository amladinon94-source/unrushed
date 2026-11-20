# Target: Remotion

Remotion makes video with React: each frame is a render of a function of the frame number, and the whole sequence is rendered to a video file. Coding agents such as Claude Code can build a Remotion project from a prompt. Use this target when the piece needs things a video editor cannot do (custom particle systems, data-driven graphics, exact programmatic control), or when the person wants the result as code they own.

## What to deliver

A prompt for a coding agent, structured in these sections:

1. **Deliverable**: output path, codec (H.264 MP4 by default), resolution, frame rate, duration, and audio or none. Ask for a `stills/` folder with one key frame per scene.
2. **Stack**: Remotion; `@remotion/three` when there is 3D or more than a few thousand particles; fonts through `@remotion/google-fonts`. Ask the agent to install Remotion's official agent skills first: `npx skills add remotion-dev/skills`.
3. **Concept and storyboard**: from the project files, with exact text and the instruction to add no facts.
4. **Visual system and motion fundamentals**: from `STYLE.md`, as numbers.
5. **Technique notes** for anything non-trivial, such as morphing (below).
6. **Technical rules** (below).
7. **Phases with checkpoints** (below).
8. **Checklist**: the `critique` questions, applied to each still.

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

1. **Plan**: project setup, theme file, `STORYBOARD.md`, one still per scene with `npx remotion still`. Stop and show the stills.
2. **System and first scenes**: build the core system plus the first two or three scenes. Render stills at the start, the middle of each transition, and at rest. Check them against the checklist and fix before continuing.
3. **Remaining scenes and closing**, with the same check.
4. **Final render.** Report the real duration and anything that could not be done.

## Licence note

Remotion is free for individuals and small teams. Larger companies need a paid company licence. Mention it when the piece is for an organisation.
