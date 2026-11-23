# Motion principles

The working numbers and rules behind every Unrushed decision. Values are starting points for 1920×1080 at 30 fps; scale distances with resolution and adjust durations with the `energy` dial.

## Contents

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

## 1. Why anything moves

A movement earns its place by doing at least one of these jobs:

- **Direct attention**: tell the eye where to look next.
- **Show a relationship**: this came from that, these belong together, this causes that.
- **Show a change of state**: something appeared, grew, broke or was replaced.
- **Give character**: the way a thing moves says what it is made of and what it feels like.

If a movement does none of them, remove it. Stillness is part of the vocabulary: a held frame after a lot of motion reads as emphasis.

## 2. Duration

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

## 3. Curves

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

## 4. Distance and arrival

- **Arrive by moving, not by fading.** Professional work uses movement for arrivals about six times as often as fades. Opacity is a 4–6 frame helper under a move, never the move itself. A fade-up of 8–24 px is the template entrance.
- **Identity objects arrive from larger and come down.** A logo, a key word, a card or a cursor starts at 1.4–5× its size and decelerates down to rest. Nothing with identity grows from zero.
- **Spend scale once.** One oversized arrival per piece is a decision; one in every beat is a house style. Endings usually get smaller.
- **Typical travel is larger than a nudge.** The median move travels about 5% of the frame's width sideways, or 8% of its height vertically. Small nudges are for helpers, not for the protagonist.
- **Blur to focus.** 3–10 px of blur clearing over 4–8 frames, under a move, reads as a camera finding focus.

## 5. Asymmetry: entering and leaving

Exits accelerate; entrances decelerate. In frames they are about the same length (12 in, 13–14 out), but an exit ends at speed, usually on the cut, while an entrance settles. Symmetrical in-and-out timing, with the same curve both ways, is one of the clearest signs of a template.

## 6. Choreography

Choreography is who moves, when, and in what order. Most generic motion fails here rather than in its curves.

- **One protagonist at a time.** At any moment one thing leads. Others are still, nearly still, or clearly secondary.
- **The 60% rule.** A secondary element starts when the main movement is about 60% complete. It feels connected without competing.
- **One claim per frame.** A frame says one thing. A label above a title above a support line is a slide, not a shot.
- **Stagger with intention.** Repeated siblings (letters, rows, tiles) start 1–3 frames apart, with uneven gaps, and each move lasts about twice the gap, so the tails overlap and the group reads as one gesture. Whole words run slower, 2–5 frames apart. A call to action spreads out to about 8 frames. A uniform timer delay reads as a loading list.
- **Overlap, never gap.** The next scene begins before the last one has fully left. Dead frames and dips to black break the thread. Scenes start already moving.
- **Parenting.** When one element drives another (a line that pulls a label, a shape that carries text), let the follower lag slightly behind the leader. Lag is what makes it feel attached.
- **Continuity of identity.** If something transforms, keep it the same thing: the same particles, the same line, the same shape. Viewers follow identity across transformations, which is why morphs tell stories that cuts cannot.

## 7. Type on screen

For silent pieces the text is the narration, so it must be legible and have time to be read.

- **Fewer words, not longer holds.** One to three display words need 0.5–1 s; a short sentence needs 1.5–2 s; a paragraph never belongs on screen. If a line needs more than 2.5 s to read, it has too many words: cut it, or let the voice carry it.
- **Do not move text while it has to be read.** It arrives, it rests with at most a slow drift, it leaves.
- **Hierarchy by scale, not by labels.** Use two sizes doing the work: large for the one word that matters, small for everything else. Weight stays in the 400–550 range; emphasis comes from scale and colour, not from bold or from an italic serif word dropped into a sans line.
- **No page furniture.** No kicker above the headline, no tracked-caps labels, no scene counters ("02 / 05"), no timecodes, no corner brand names, no crop marks or brackets. A video is not a page. See `ai-tells.md`.
- **Sizes at 1920×1080:** display 120–220 px for the one word that matters, other lines 44–64 px. Interface text shown in the video must be at least 4% of the frame height (about 43 px), magnified by the camera if needed. For vertical 1080×1920 video, scale up by about 1.3.
- **Words arrive whole.** Enter by word or line, 2–5 frames apart. Letter-by-letter typing only inside the product's own input field.
- **Place text where the picture needs it.** Usually one line near the optical centre, or a phrase split by an object. Never the same caption slot shot after shot, and never a left-aligned headline beside a box.

## 8. Material behaviour

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

## 9. Physics in plain words

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

These controls exist as code, with numbers per material and the signatures to look for, in `physics-kit.md` and `assets/remotion/unrushed-physics.ts`. Use them; do not re-derive a spring or a fall by hand.

## 10. Classic principles, condensed

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
