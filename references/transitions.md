# Transitions

A transition is a connector between two ideas, like "and then", "because", "but" or "zoom in on this". Choosing it by the relation between beats, not by habit, is what separates an edited piece from a slideshow. Read this file for `storyboard`, `export` and `critique`.

## Contents

1. Choose by relation
2. The catalogue
3. Rules
4. Hiding the seam
5. Building notes

## 1. Choose by relation

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

## 2. The catalogue

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

**Carry-over element.** One element (a line, a cursor, a word, a particle cloud) stays in place or keeps moving while the world around it changes. *Says:* this thread connects everything. It is often the through-line itself.

**Object-led mask.** An element of A grows, slides or opens to become a window onto B: a circle that expands, a card that becomes full frame, a shape that wipes. 500–900 ms with expo-out. *Techniques:* `editorial-reveal-system` (circular reveal), `page-transitions` (inset and polygon masks, blurred covering shapes), `liquid-lens`. *Says:* a new chapter, an answer. The mask should come from something in A, not appear from nowhere.

**Fold, flip or page turn.** A folds, flips or turns like paper or a card in 3D to reveal B. 700–1,100 ms. *Techniques:* `fold`, `duo-lenticular`. *Says:* the other side, a new chapter. *Risk:* dated if the fold is flat and shadowless; give it light.

**Smash cut.** An abrupt cut from intensity to calm, or the reverse, often from sound to silence. *Says:* contrast, a punchline. Once per piece.

**Text bridge.** A line of text from A stays while the image changes beneath it, or the next line arrives before the image changes. *Says:* the thought continues. Useful in silent pieces to keep reading continuous.

**Line or object wipe.** A line or object crosses the frame and leaves B behind it. 600–900 ms with cubic in-out. *Says:* a clean change. It works once or twice; as the only transition of a piece, it is a template.

**Light transition.** A bloom, flare or exposure flash covers the cut. *Says:* revelation, light itself. Only when the content is about light; otherwise it is a tell (see `ai-tells.md`).

## 3. Rules

- **Never use the same transition type twice in a row.** In any piece over 60 s, use at least four kinds.
- **The transition carries the relation.** Write the relation in the storyboard next to the transition ("B is a detail of A → zoom-through").
- **Overlap, never gap.** The next beat starts before the last one has fully left (`principles.md`). No empty frames, no dips to black.
- **Cut more than you think.** Not every change needs a crafted transition. Crafted transitions mark the important turns; clean cuts keep the rhythm between them.
- **Save the biggest transition for the payoff.** The most elaborate transition should lead into the strongest image, not be spent in the first ten seconds.
- **Respect reading time.** Never transition while a line is still being read.

## 4. Hiding the seam

- **Eye trace.** Put the focal point of B where the eye already is at the end of A. If the viewer was looking at the top right, B's protagonist starts at the top right. This is the most important rule of invisible editing.
- **Cut on motion.** Cuts hide best at the peak of a movement, when the eye is following speed instead of detail.
- **Continue the direction.** Movement leaving A to the right enters B from the left, at the same speed.
- **Motion blur at peak speed.** Fast camera moves and whips need blur, equivalent to a 180° shutter (blur over half the frame interval). Without it they strobe.
- **Match the light.** A sudden change of exposure or colour temperature makes the seam visible unless the contrast is the point.

## 5. Building notes

- **One canvas in code.** Lay every beat out on one large container and animate a camera transform (translate and scale) on it. Beats keep their own local time; the camera has its own timeline.
- **Remotion.** `@remotion/motion-blur` provides camera-style blur for fast moves. Masks are CSS `clip-path` driven by the frame number. Morphs and dissolves are canvas or WebGL scenes like the techniques they borrow from.
- **ChatCut.** Name the transition, its relation, the duration and the curve in the prompt, and ask it to keep the two scenes in a single motion graphic when the transition needs both on screen at once (morphs, carry-overs, camera travel).
- **After Effects and similar tools.** A camera layer over 3D layers for one canvas and zoom-through; track mattes for object-led masks; pixel motion blur for whips.
