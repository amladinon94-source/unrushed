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

Size and distance set duration. Larger things and longer journeys take longer, as they would in the physical world.

| What moves | Typical duration | At 30 fps |
|---|---|---|
| Micro details: an underline, a dot, a tick | 150–300 ms | 5–9 frames |
| Small elements: labels, icons, single words | 300–500 ms | 9–15 frames |
| Text blocks: titles and support lines | 500–900 ms | 15–27 frames |
| Large shapes and panels | 700–1200 ms | 21–36 frames |
| Scene transitions | 900–1600 ms | 27–48 frames |
| Transformations: morphs and reassemblies | 1200–2000 ms | 36–60 frames |

Video tolerates longer durations than interface animation, because nobody is waiting to click. It does not tolerate empty time: a long transition must have something happening throughout.

**Holds.** After an element arrives, let it rest. A hold is where meaning lands. Typical holds run from 1.5 s for a single word to the full reading time for a sentence (section 7).

## 3. Curves

The curve says how something gains and loses speed, and it carries more character than the duration.

| Job | Curve | cubic-bezier |
|---|---|---|
| Enter: arrives fast, settles gently | expo-out | `(0.16, 1, 0.3, 1)` |
| Enter, softer | quint-out | `(0.22, 1, 0.36, 1)` |
| Exit: starts gently, leaves fast | expo-in | `(0.7, 0, 0.84, 0)` |
| Move on screen from A to B | cubic in-out | `(0.65, 0, 0.35, 1)` |
| Gentle oscillation and breathing | sine in-out | `(0.37, 0, 0.63, 1)` |
| Playful arrival with overshoot | back-out | `(0.34, 1.56, 0.64, 1)` |
| Continuous motion: drift, rotation, marquee | linear | `(0, 0, 1, 1)` |

Rules of thumb:

- **Entrances decelerate.** Things arriving should spend most of their time settling, which reads as confidence.
- **Exits accelerate.** Things leaving should get out of the way.
- **Linear is only for continuous motion.** A linear entrance looks mechanical; a linear drift looks natural.
- **Overshoot is spice.** Use it on small accents, never on headlines or long text, and less of it at low `energy`.
- **Springs** are an alternative to curves when the motion should feel physical. Stiffness sets how fast it returns; damping sets how much it wobbles. High stiffness with high damping feels precise; low stiffness with low damping feels elastic and playful.

## 4. Distance

Small distances look intentional; large ones look like a template.

- Text and small elements: 8–24 px of travel at 1080p. Most of the effect comes from the curve and the fade together, not from the distance.
- The protagonist of a scene may travel far, because it is the thing the viewer is meant to follow.
- Scale changes: 0.92 → 1 reads as "arriving"; 0.6 → 1 reads as "appearing from far away". Use large scale changes only when depth is part of the idea.
- A blur-to-focus entrance (8 px of blur to 0 with a slight scale-up) feels like a camera finding focus and is a good alternative to the overused fade-up.

## 5. Asymmetry: entering and leaving

Exits should take roughly half to two thirds of the entrance duration and use an accelerating curve. A 700 ms entrance pairs with a 300–450 ms exit. The viewer has already read what is leaving; lingering exits feel sluggish, and symmetrical in-and-out timing is one of the clearest signs of a template.

## 6. Choreography

Choreography is who moves, when, and in what order. Most generic motion fails here rather than in its curves.

- **One protagonist at a time.** At any moment one thing leads. Others are still, nearly still, or clearly secondary.
- **The 60% rule.** A secondary element starts when the main movement is about 60% complete. It feels connected without competing.
- **Order carries meaning.** Year → title → support line reads as context → claim → detail. Typical offsets: 150 ms between year and title, 300–400 ms between title and support line.
- **Stagger with intention.** 40–120 ms between items in a group. Vary it with what the items are: words in a headline get a tighter stagger than cards in a grid. A uniform stagger on everything is a tell.
- **Overlap, never gap.** The next scene begins before the last one has fully left. Dead frames and dips to black break the thread.
- **Parenting.** When one element drives another (a line that pulls a label, a shape that carries text), let the follower lag slightly behind the leader. Lag is what makes it feel attached.
- **Continuity of identity.** If something transforms, keep it the same thing: the same particles, the same line, the same shape. Viewers follow identity across transformations, which is why morphs tell stories that cuts cannot.

## 7. Type on screen

For silent pieces the text is the narration, so it must be legible and have time to be read.

- **Reading time:** about 1 second per 3 words, plus 1 second of settling. A 12-word line needs about 5 seconds fully visible. Short titles need at least 1.5 seconds.
- **Do not move text while it has to be read.** Animate it in, let it rest, animate it out.
- **Sizes at 1920×1080:** titles 72–110 px, support lines 26–34 px, labels 18–24 px with wide tracking. For vertical 1080×1920 video meant for phones, increase support text to at least 40 px.
- **At most two lines** of support text per scene. If it needs more, it needs another scene.
- **Enter by word or by line.** Letter-by-letter entrances only when kinetic type is the concept itself.
- **Keep text away from the protagonist.** Pick a stable text zone, such as the lower left third, so the eye always knows where to read.

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

Recommended reading for this section: Daniel Shiffman, *The Nature of Code* (2024, p5.js), chapters 1–6.

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
