---
name: unrushed
description: Motion direction for videos and animated pieces that must not look AI-generated. Use it to brief, style, storyboard, export or critique motion graphics, explainer and promo videos, animated titles, kinetic typography, transitions, particle and morph sequences, and prompts for video tools such as ChatCut, Remotion, After Effects or Claude Code. Use it as well when someone says a video looks generic, cheap or "made with AI", wants better animations or transitions, shares a site or clip whose motion they want to reproduce, or asks for a storyboard or a motion style guide, even if they never say "motion design".
---

# Unrushed

> **Single-file edition.** The reference files are embedded at the end of this file, each under a heading "Embedded: <path>". Whenever an instruction says to read a file in `references/`, read that section instead of looking for the file on disk. Files not embedded (`targets/remotion.md`, `targets/generic.md`, the templates, `scripts/detect.py`) can be read from https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>.

Generic motion comes from defaults: every element fades up the same 30 px in the same half second, scenes dip to black, the palette is neon on navy, and nothing moves for a reason. Unrushed replaces adjectives with decisions. Every movement gets a purpose, a duration, a curve, a distance and a place in the order of things. "Smooth and modern" is not a direction; "enters over 700 ms on an expo-out curve, 16 px, 150 ms after the year" is.

The name is the stance: calm, deliberate motion that gives the viewer time to read and feel. Unrushed does not mean slow. A fast piece can be unrushed if every beat is chosen.

## How to work with it

Unrushed is a set of commands around one loop: **context → create → review → steer**. The person directs; you execute and advise. Run the command they ask for. If they ask for something without naming a command, pick the one that fits and say which one you used. Suggest the next step at the end of each command, but do not run a chain of commands on your own: the human judgment between steps is the point.

Reply in the person's language. Command names stay in English.

**Where the files are.** Commands read files in `references/`. If that folder is not next to this file, read "References" at the end of this file before opening anything: it says where else to find them.

### Project files

Commands share three files in the project folder. Read whichever exist before any command.

| File | Written by | Holds |
|---|---|---|
| `VIDEO.md` | `brief` | What the piece is: topic, message, audience, format, sound, through-line, facts to verify |
| `STYLE.md` | `style` | How it looks and moves: material, palette, type, dials, signature move, forbidden list |
| `STORYBOARD.md` | `storyboard` | Scene by scene: exact text, figure, motion, timing, transition |

Templates are in `assets/`. If a command needs a file that does not exist, say so and offer to run the command that creates it, rather than inventing its contents.

## Dials

Four settings shape every decision. Defaults suit most explainers; the person can change them at any time ("energy 7").

| Dial | Range | Default | What it changes |
|---|---|---|---|
| `energy` | 1–10 | 4 | Durations, distances, how much overshoot is allowed, how many things may move at once |
| `density` | 1–10 | 3 | Elements per frame, words per scene, how much empty space surrounds the protagonist |
| `variance` | 1–10 | 5 | How much scenes differ from one another in layout, rhythm and structure |
| `material` | a word | chosen in `style` | The physical behaviour motion borrows: ink, paper, glass, cloth, fluid, particles, metal, light |

How `energy` maps to numbers, as a starting point:

| energy | Text entrance | Scene transition | Overshoot | Moving at once |
|---|---|---|---|---|
| 1–3 | 800–1200 ms | 1400–2000 ms | none | 1 |
| 4–6 | 500–900 ms | 900–1500 ms | small elements only | 1–2 |
| 7–8 | 300–600 ms | 500–900 ms | allowed on accents | 2–3 |
| 9–10 | 150–400 ms | 250–600 ms | expressive | many, but choreographed |

`variance` guards against the most common failure of a long piece: every scene built the same way. Above 4, vary at least one of composition, rhythm or entrance pattern between neighbouring scenes.

`material` matters more than it looks. Across dozens of reference pieces, what made motion feel premium was rarely the technique; it was light and material: motion blur, self-shadowing, refraction, grain. Choose the material first and let it decide how things accelerate, settle and overlap.

## Commands

| Group | Command | Does | Reads | Writes |
|---|---|---|---|---|
| Context | `brief` | Captures what the piece is and its one visual idea | — | `VIDEO.md` |
| Context | `style` | Defines the visual and motion system | `VIDEO.md` | `STYLE.md` |
| Create | `storyboard` | Breaks the piece into timed scenes | `VIDEO.md`, `STYLE.md` | `STORYBOARD.md` |
| Create | `recipe <reference>` | Turns a site, clip or screenshot into reusable motion values | — | a recipe in the reply |
| Deliver | `export <target>` | Compiles everything into a prompt or spec for one tool | all three files | the deliverable |
| Review | `critique` | Scores frames or a video and lists what to fix | `STYLE.md` if it exists | a report in the reply |

### `brief`

Ask only what you cannot infer from the conversation or files, and at most five questions at once:

1. Topic and the one sentence the viewer should leave with.
2. Audience, platform, aspect ratio and duration.
3. Sound: silent, music only, or voice. A silent piece carries its whole narrative in on-screen text, which changes the timing rules.
4. Facts the piece states (dates, names, figures). List them; each needs a source or is marked `[verify]`.
5. The through-line.

The through-line is the single visual idea that carries the whole piece, and it is the most important decision in the brief. Propose two or three options and recommend one. A piece about the history of AI made of nine unrelated effects reads as a demo reel; the same piece where one set of particles travels from a neuron to a human profile reads as a story. A good through-line is a transformation that means something.

Write `VIDEO.md` from the template.

### `style`

Read `references/principles.md` and `references/ai-tells.md` first.

1. **Material.** Choose it before colour. It sets the motion personality: ink settles, glass is precise, fluid overlaps, cloth lags behind its driver.
2. **Palette.** A ground, an ink and at most one accent with a stated job ("the accent marks the present day"). Give hex values and roles.
3. **Type.** Two families at most, each with a role and sizes for the target resolution. Avoid the defaults listed in `ai-tells.md` unless the person asks for them.
4. **Dials.** Set `energy`, `density` and `variance`, and say why.
5. **Signature move.** One recurring motion that identifies the piece, such as particles that reassemble or a mask that always opens from the bottom. Look in `references/techniques.md` for techniques whose meaning matches the through-line and whose behaviour matches the material, and say which entry you started from.
6. **Forbidden list.** The generic choices this piece in particular is tempted by.

Write `STYLE.md`. Include a ready-to-paste style block for the likely target (for ChatCut, the Design Style fields; see `references/targets/`).

### `storyboard`

Build a table with one row per scene: start time, duration, exact on-screen text, the figure or visual, the technique, what moves (with curve, duration and distance), and the transition into the next scene.

- Choose each scene's technique from the line's meaning. Read the index by meaning in `references/techniques.md`, pick the entry whose image enacts the line, and adapt its key parameters to `STYLE.md`. Name the entry in the table so `export` can carry its build notes. Keep the signature move as the thread; techniques serve it, not the other way round.
- One protagonist at a time. Text enters when the main movement is about 60% complete, never during it.
- Check reading time for every line of text with the rule in `principles.md`. For silent pieces, flag any line held for less than its reading time.
- Use only facts from `VIDEO.md`. Anything not there is marked `[verify]`.
- Read the storyboard as a whole before finishing: if every scene has the same structure, apply `variance` and say what you changed.
- Make sure the image and the text say the same thing. If the line says "funding freezes", the figure should freeze, not pile up.

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

- states motion as numbers (ms, curve values, px, counts) next to the intent behind them, because tools follow numbers more reliably than adjectives, and generalise better when they know why;
- for each technique named in the storyboard, carries its key parameters and build notes from `references/techniques.md`, so the tool knows how to build it and not only what it should look like;
- includes the forbidden list from `STYLE.md`;
- asks the tool to pilot the first scene and the closing before building the rest, and to report what it could not do;
- ends with the review checklist from `critique`, so the tool checks its own frames.

### `critique`

Read `references/ai-tells.md`, and `STYLE.md` if it exists.

If you have a video file and `ffmpeg`, run `python scripts/detect.py <video>` first: it reports fades to black, frozen stretches and cut rhythm, which are hard to judge from stills. Then look at frames.

Score each criterion from 1 to 5 with one line of evidence:

| Criterion | Question |
|---|---|
| Concept | Is the figure understood without reading the text? |
| Hierarchy | Does the eye know where to go first, second, third? |
| Legibility | Can every line be read in the time it is on screen? |
| Choreography | One protagonist at a time, overlap instead of dead frames? |
| Timing | Do entrances decelerate, exits run faster, holds feel intended? |
| Material and light | Does the piece have texture, depth, a physical feel? |
| Distinctiveness | How many AI tells are present? |
| Consistency | Does it follow `STYLE.md`? |

Then list the AI tells you found, and the three fixes with the most impact. Write each fix as an instruction ready to paste into the tool. When a scene looks generic because of its technique, suggest an alternative from `references/techniques.md` that says the same thing better. Be specific about what stills cannot show: motion, fluidity and rhythm need the video.

## References

Read only what the current command needs.

The reference files live in a `references/` folder next to this file. Some hosts install a skill as this single file: Claude accounts, and agents that load those skills, such as ChatCut's. If the folder is missing, read the same files from the public repository, replacing the path below:

`https://raw.githubusercontent.com/amladinon94-source/unrushed/main/<path>`

If you cannot reach them either, work from the embedded essentials in the single-file edition, if this is that edition, and say that the full references were not available.

| File | Read for |
|---|---|
| `references/principles.md` | Timing, curves, distances, choreography, type timing, material behaviour. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/ai-tells.md` | What makes motion and video read as AI-generated, and what to do instead. `style`, `export`, `critique` |
| `references/techniques.md` | 38 techniques from real reference pieces, indexed by meaning and by family, with key parameters and build routes. `style`, `storyboard`, `recipe`, `export`, `critique` |
| `references/targets/chatcut.md` | Exporting to ChatCut |
| `references/targets/remotion.md` | Exporting to Remotion, through Claude Code or any coding agent |
| `references/targets/generic.md` | Any other tool, or a spec for a human animator |
| `scripts/detect.py` | Automatic checks on an exported video |


---

# Embedded references (single-file edition)

This edition embeds the essentials so the skill works where only one file is installed. The full files, with every source link, are in the repository: https://github.com/amladinon94-source/unrushed. `targets/remotion.md`, `targets/generic.md`, the templates and `scripts/detect.py` are only there.

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

#### 3. Curves

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

#### 4. Distance

Small distances look intentional; large ones look like a template.

- Text and small elements: 8–24 px of travel at 1080p. Most of the effect comes from the curve and the fade together, not from the distance.
- The protagonist of a scene may travel far, because it is the thing the viewer is meant to follow.
- Scale changes: 0.92 → 1 reads as "arriving"; 0.6 → 1 reads as "appearing from far away". Use large scale changes only when depth is part of the idea.
- A blur-to-focus entrance (8 px of blur to 0 with a slight scale-up) feels like a camera finding focus and is a good alternative to the overused fade-up.

#### 5. Asymmetry: entering and leaving

Exits should take roughly half to two thirds of the entrance duration and use an accelerating curve. A 700 ms entrance pairs with a 300–450 ms exit. The viewer has already read what is leaving; lingering exits feel sluggish, and symmetrical in-and-out timing is one of the clearest signs of a template.

#### 6. Choreography

Choreography is who moves, when, and in what order. Most generic motion fails here rather than in its curves.

- **One protagonist at a time.** At any moment one thing leads. Others are still, nearly still, or clearly secondary.
- **The 60% rule.** A secondary element starts when the main movement is about 60% complete. It feels connected without competing.
- **Order carries meaning.** Year → title → support line reads as context → claim → detail. Typical offsets: 150 ms between year and title, 300–400 ms between title and support line.
- **Stagger with intention.** 40–120 ms between items in a group. Vary it with what the items are: words in a headline get a tighter stagger than cards in a grid. A uniform stagger on everything is a tell.
- **Overlap, never gap.** The next scene begins before the last one has fully left. Dead frames and dips to black break the thread.
- **Parenting.** When one element drives another (a line that pulls a label, a shape that carries text), let the follower lag slightly behind the leader. Lag is what makes it feel attached.
- **Continuity of identity.** If something transforms, keep it the same thing: the same particles, the same line, the same shape. Viewers follow identity across transformations, which is why morphs tell stories that cuts cannot.

#### 7. Type on screen

For silent pieces the text is the narration, so it must be legible and have time to be read.

- **Reading time:** about 1 second per 3 words, plus 1 second of settling. A 12-word line needs about 5 seconds fully visible. Short titles need at least 1.5 seconds.
- **Do not move text while it has to be read.** Animate it in, let it rest, animate it out.
- **Sizes at 1920×1080:** titles 72–110 px, support lines 26–34 px, labels 18–24 px with wide tracking. For vertical 1080×1920 video meant for phones, increase support text to at least 40 px.
- **At most two lines** of support text per scene. If it needs more, it needs another scene.
- **Enter by word or by line.** Letter-by-letter entrances only when kinetic type is the concept itself.
- **Keep text away from the protagonist.** Pick a stable text zone, such as the lower left third, so the eye always knows where to read.

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

## Embedded: references/ai-tells.md

### AI tells in motion and video

The patterns that make a video read as generated by default, why they read that way, and what to do instead. Use this list in `style` (to write the forbidden list), in `export` (to pass it to the tool) and in `critique` (to count what is present).

A tell is not wrong in itself. Each became a tell because it is the path of least resistance, so it appears everywhere without a reason. Any of them can be used on purpose; a choice made for a stated reason is not a tell.

#### Motion

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Everything fades in and slides up 20–40 px with the same duration | The default entrance of every template | Vary the entrance by role; use small distances, blur-to-focus or masks; keep timing asymmetric |
| The same stagger on every group | Rhythm with no hierarchy | Tight stagger for words, looser for objects; let the order carry meaning |
| Dip or fade to black between scenes | Hides the lack of a transition idea | Overlap scenes; transform one figure into the next; use a mask or a cut on movement |
| Ease-in-out on everything, or linear entrances | No distinction between arriving, leaving and moving | Entrances decelerate, exits accelerate, linear only for continuous motion |
| Bouncy overshoot on headlines | Playfulness applied to the wrong element | Overshoot only on small accents, and only when `energy` allows |
| Slow zoom on every shot | Movement used to hide a static idea | Move the camera only when the move reveals something |
| Everything moving at once | No protagonist; the eye does not know where to go | One protagonist at a time; the 60% rule |
| Typewriter or letter-by-letter text to mean "technology" | A cliché standing in for an idea | Enter by word or line; keep kinetic type for pieces about language |
| Floating parallax layers that drift for no reason | Depth as decoration | Parallax only when depth is part of the story |
| Glitch, RGB split or light-leak transitions as filler | Effects covering a weak cut | Use them once, where the content is about failure or noise |
| Text moving while it must be read | Motion competing with reading | Animate in, rest, animate out |

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

#### Structure

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Every scene built the same way | Monotony; the template shows through | Apply `variance`: change composition, rhythm or entrance between neighbours |
| Image and text saying different things | The visual was chosen without reading the line | Make the figure enact the line |
| Effects with no meaning | A demo reel instead of a story | A through-line: one transformation that carries the message |
| Dates, statistics or names that nobody checked | Confident and wrong | Every fact sourced or marked `[verify]` |
| Even pacing from start to end | No climax, no rest | Build tension, release it, and give the ending a hold |
| A logo sting with sparkles at the end | Ending by habit | End on the idea; let the last frame breathe |

#### What can be detected automatically

`scripts/detect.py` finds some tells in an exported video without any judgment involved:

- **Fades and dips to black**: stretches where the frame goes almost completely dark.
- **Frozen stretches**: long holds with no change at all, which are sometimes intended and sometimes a render that stalled.
- **Cut rhythm**: hard cuts and the average shot length. Many hard cuts in a piece meant to flow are a sign that transitions were not designed.

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

- **particle-morph** (built in the first Unrushed test, a silent video on the history of AI, made in both ChatCut and Remotion). One set of thousands of particles travels through the whole piece, reorganising into a new figure for each scene: a neuron, a question mark, words, a network, falling snow, a board, an eye, a human profile. *Params:* 6,000–12,000 particles of 1.5–3 px; 1.2–1.8 s per transformation with cubic in-out; per-particle delay of 0–35% of the transition; mid-transition noise with amplitude sin(π·progress); ordered pairing by angle from the centre; low-amplitude simplex drift at rest; text enters at 60% of the morph. *Build:* ChatCut (proven: 8,000 particles rendered with delays and noise) · Code (proven in Remotion) · Blender (possible, harder). *Note:* the figures carry the meaning. Hard figures (an eye, a face) need clean source shapes. Sample them from SVG paths or images, not by hand. Avoid making every scene the same structure.
- **the-spirit** (Edan Kwan, *The Spirit*). A smoke-like cloud of particles flowing in curls and following the cursor. Each particle is born, lives and dies. *Params:* 4k to 4M particles; speed; dieSpeed (lifespan); radius; curlSize (size of the swirls); attraction to a target. Post: motion blur, bloom, shadows. *Build:* Code (GPU particles) · Blender (particles plus a turbulence field) · Record (attraction follows the cursor; animate the target instead). *Note:* the volume comes from motion blur and shadow. Without a form or a reason it becomes abstract smoke.
- **touch** (Edan Kwan, *Touch*). A stream of up to millions of particles pours like sand or water and collides with a 3D hand. *Params:* count; gravity; drop height; drop radius; bounce off the hand; hand force. Post: motion blur, bloom, vignette. *Build:* Blender (particles with collision; the strongest route) · Code. *Note:* the solid object is the idea; without it, it is just falling sand.
- **volumetric-flow** (David Li, *Volumetric Particle Flow*). A ribbon of particles flowing with turbulence and casting shadow on itself. *Params:* 66k to 2M particles; speed; turbulence; colour. *Build:* Code · Blender. *Note:* the self-shadowing makes it, not the flow. Without it, it looks flat.
- **particles-cursor** (Kevin Levron, *Particles Cursor*). A trail of coloured particles following the cursor; when idle, the trail orbits on its own. *Params:* ~262k particles; colours; noise intensity; point size; point decay (how long the trail lasts); an idle orbit radius and speed. *Build:* Record (has a built-in idle orbit) · Code. *Note:* a library component that looks the same everywhere. Check the licence.
- **connected-vertices** (Louis Hoebregts, *Connected Vertices – How to*). A step-by-step teaching piece for the network of dots joined by lines when they are closer than 250 px, with line opacity falling with distance. *Params:* count; speed; radius; link distance (250 px); opacity by distance. *Build:* ChatCut · Code · any tool. *Note:* this is the classic "tech startup" background and is listed in `ai-tells.md`. Use it to learn distance-based rules, or only when something essential changes: the form, the rhythm, the meaning.
- **fold** (Mr.doob, *Codevember 2026 / 01 / Fold*). A translucent plastic sheet falls and folds like cloth, and can be dragged. *Params:* stiffness 0.5; material transmission 1, index of refraction 1.46, thickness 0.35, roughness 0; ambient occlusion and colour grading. *Build:* Blender (cloth plus glass material; the natural route) · Code. *Note:* half of the effect is the material, refraction and light, not the physics.
- **holocloth** (*Holocloth*). A holographic cloth with rainbow bands and sparkles that can be pulled and pressed. *Params:* material holo intensity ~3.8, iridescence ~0.8, roughness ~0.6, metalness 1, bump; physics viscosity 0.6, stiffness 1, 14 solver iterations. *Build:* Blender (cloth plus iridescent material) · Record (exports stills only). *Note:* very eye-catching and tiring; use it in short doses.
- **cloth-wireframe** (nemutas, *Cloth Simulation*). A curtain made of points and lines that hangs, moves in the wind, falls to the floor and can be dragged. *Params:* distance constraints between points; gravity; wind. *Build:* Blender (cloth with wireframe render) · Code. *Note:* the lines are the cloth. A natural partner for particle-morph when a wireframe should feel physical.
- **sphere-packing** (Kevin Levron, *Sphere Packing*). Hundreds of coloured spheres push against each other, fall with gravity and move away from the cursor. *Params:* 300 spheres; size 0.3–1; gravity 0.5, which can be switched off. *Build:* Blender (rigid bodies, native) · Code. *Note:* licensed CC BY-NC-SA, so it cannot be used commercially as is. Rebuild the idea instead.
- **bubbles** (oimo.io, *Bubbles*). Soap bubbles drawn in thin iridescent lines: blown from a wand, deforming, splitting and popping. *Params:* surface tension, splitting and popping; exact values not visible. *Build:* Record · Code (surface tension is hard). *Note:* a minimal aesthetic, fine line on white, the opposite of neon. Only partly inspected.
- **cursor-line-wobble** (GreenSock, *Cursor Line Wobble*). A line that can be grabbed and stretched like a string, and springs back when released. *Params:* a quadratic curve whose middle control point follows the pointer; release over 0.9 s on an elastic curve (amplitude 1, period 0.3). *Build:* ChatCut · Code · After Effects · any tool. *Note:* a well-tuned elastic ease gives the feeling of physics without simulating anything.
- **gpu-fluid-particles** (haxiomic, *WebGL Fluid Experiment*). An invisible fluid carries about 262k glowing particles; dragging creates jets and swirls of light. *Params:* particle count; simulation quality; solver iterations. *Build:* Code · Blender (smoke or fluid plus particles). *Note:* a classic of creative coding. Neon on black is recognisable and can look dated.
- **gpu-io-ink-fluid** (Amanda Ghassaei, *gpu-io fluid example*). On a paper-coloured ground, dark particles leave trails as a fluid carries them, like ink. *Params:* trail length; render modes for the fluid, its pressure or its velocity. *Build:* Record (saves images; can be captured) · Code. *Note:* proof that a fluid does not have to be neon. The colour and ground change its whole character.
- **fluid-pixel** (nestorrig, *Fluid Pixel Cursor*). An invisible fluid follows the cursor and is drawn as large coloured pixels, optionally as ASCII characters. *Params:* simulation resolution 150; pixel size 16; velocity dissipation 0.77; density dissipation 0.95; 10 pressure iterations; splat force 18, radius 2.1; colour by speed; an ASCII ramp. *Build:* Code · Record (animate the pointer). *Note:* its identity comes from mixing two families, fluid physics and pixel aesthetics.
- **fluid-text** (Ksenia Kondrashova, *WebGL Fluid Simulation With Your Text*). The text itself is the fluid's ink; moving through it deforms, mixes and dissolves the words. *Params:* font, weight, size (80), text, pointer size, colour, plus the shared fluid controls. *Build:* Code · Record. *Note:* message and effect become one. Use it with words that mean something when they dissolve.
- **liquid-lens** (Angelo Libero, *Liquid Lens*). Seven soft bodies chase the pointer and merge into one shape that reveals a blurred image behind; a click makes it ripple. *Params:* body size 0.455; corners 3.4; merge level 0.35; coast wander and coast grain (how irregular the edge is); blurred depth and blur strength; ripple strength, speed, width and life; size wander, drift reach, overall speed; a "moves on its own" mode. *Build:* Record (has an autonomous mode) · Blender (metaballs) · Code. *Note:* its controls are named in design language, not code. It is a model for how to describe motion.
- **glass-icon** (Nikita Filippov, *Glass*). A tool that turns a logo into a glass icon with prism-like colour dispersion, optionally reacting to sound. *Params:* presets Studio, Melt, Prism, Lens, Night; refraction; blend; logo size; light, dark or transparent ground. *Build:* Record (exports 1080p, 4-second video and PNG directly; the fastest route in the library). *Note:* very much in fashion; as a default it will look generic.
- **liquid-glass** (jeantimex, *Glass Effect WebGPU*). A study of liquid glass in the style of current operating-system interfaces: shapes that refract, magnify and blur what is behind, with bright edges and a springy deformation when touched. *Params:* bezel width 60; glass thickness 50; refractive index 1.5; refraction level; magnifying scale; blur and progressive blur; chromatic dispersion; specular rims; spring deformation. The shape is a distance field (SDF). *Build:* Record (accepts video as background) · Blender. *Note:* excellent to learn from; copied as is, it is the most fashionable look of the moment.
- **fluid-glass** (chiuhans111, *Fluid Glass*). Large dark glass circles with rims of light; dragging lets a fluid deform the surface, and refraction draws highlights. *Params:* fluid velocity and pressure; surface normal; refraction. No visible controls. *Build:* Record · Blender (glass plus rim light). *Note:* almost all you see is rim light, a very restrained device. Only partly inspected.
- **glass-xylophone** (Codrops, *Interactive Glass Xylophone with Three.js*). Iridescent glass bars in a spiral that play notes when touched. *Params:* material transmission, thickness, index of refraction, iridescence, dispersion; sound through Web Audio. *Build:* Blender or Code, timed to music. *Note:* the sound is half the effect. In video, time every hit to the soundtrack.
- **metaballs** (Jaume Sánchez, *Bumpy metaballs 2026*). 3D drops that move, merge and separate like mercury or jelly, with a bumpy surface and dozens of materials (ice, opal, gummy, nacre). *Params:* 20 blobs; isolation 80 (the surface threshold); speed; drift; smoothing; twist on three axes; ~50 material presets. *Build:* Blender (native metaballs; the material is the real work) · Code. *Note:* the form is simple and the material gives the character. Some materials (flesh, gills) can disturb, depending on the message.
- **pixel-voxel-drop** (Junichi Kasahara, *Pixel-Voxel-Drop*). An image or video pixelates, the pixels become 3D cubes with colour separation, then they fall and pile up with physics. *Params:* grid columns and spacing; cube or random box shape; count; duration; organic variation; pixelation; RGB shift; spread; depth; drop delay. *Build:* Record (load your own image) · Blender (rigid bodies) · Code. *Note:* three effects chained (pixel, voxel, fall) make a small choreography. A model of a transition with structure.
- **doom-fire** (Niklas Knaack, *Pixel Flame Canvas – Doom Fire*). Pixel fire. Each pixel takes heat from the one below, loses a little at random and rises. *Params:* pixel size 2; a fire palette from white to black; wind strength and direction; random decay. *Build:* ChatCut · Code · any tool. *Note:* the classic fire algorithm from the game *Doom*. A very simple rule that produces something organic.
- **ascii-logo** (Edoardo Lunardi, *ASCII Logo*). A 3D shape drawn with text characters, rotatable, with light and dark themes. *Params:* a character ramp by brightness; cell size; colour; theme. *Build:* Code · Record (animate the rotation). *Note:* ASCII is a trend. It works when the shape means something, not as a filter.
- **ascii-noise-field** (Codrops, *ASCII Shader with OGL*). An animated noise field drawn with coloured characters, like a landscape that breathes. *Params:* frequency (noise scale); speed; lightness; Perlin noise underneath. *Build:* Code · Record · ChatCut (likely). *Note:* a good ground behind titles. The same noise gives particles their life.
- **canvas-grid-zoom** (Tom Miller, *Canvas Grid Mouse Effect*). A photo divided into a grid of squares with dots at the corners; near the pointer, each square zooms into its own piece of the image. *Params:* square size 85; optional fade; dots and dot colour; pointer follows on a 1 s expo curve; scale by distance. *Build:* Code · Record (animate the pointer) · ChatCut (likely). *Note:* a simple idea with a big effect. It works best with highly textured photos.
- **truchet-tiles** (Rafa, *Truchet Tiles*). A grid of tiles with quarter-circle arcs that turn 90°, at random or on hover, forming curved paths that keep changing, on a plane tilted in perspective. *Params:* 64 px tiles; 90° turns over 0.6 s with ease-in-out; random intervals of 1–42 s; tilted 28° with 1000 px perspective. *Build:* ChatCut · After Effects · Code. *Note:* a classic pattern. The perspective and the slow random rhythm make it.
- **wave-grid** (Franky, *3D Wave Grid*). A grid of pale 3D columns that ripple gently behind text. *Params:* grid size; wave height and speed (a sine of position and time). *Build:* Blender · Code · ChatCut (likely). *Note:* a model of restraint, where 3D supports the text without stealing focus.
- **data-tunnel** (sabosugi, *Data Tunnel*). About 80 fine lines fan out from a point like a tunnel and ripple, while signals of light with trails travel along them. *Params:* 80 lines; spread; curve length and power; wave speed and height; line opacity; 94 signals; global speed; trail length 3; bloom strength 3; up to three signal colours. *Build:* Record · Code. *Note:* lines of light on black are very common in tech. Change the ground, the colour or the meaning.
- **duo-lenticular** (ycw, *duo*). A zigzag folded surface, like an accordion, with one photo on each face, so each side of the view shows a different image. *Params:* a finely subdivided grid; zigzag depth 0.5; two side lights; a camera that orbits. *Build:* Blender (straightforward) · Code. *Note:* the idea of lenticular postcards. Very strong for any message about duality.
- **sine-cosine** (schwiiiii, *[Pure CSS] Sine & Cosine Visualized*). A dot moving in a circle, with its horizontal and vertical components shown as two waves at its sides. *Params:* 4 s per cycle; a sine curve, cubic-bezier(0.37, 0, 0.63, 1); two motions offset by half a cycle; alternating, infinite. *Build:* any tool. *Note:* the mathematics in one image: circular motion is two waves out of phase.
- **editorial-reveal-system** (Prolibu website). A coherent motion system for a dark editorial site, combining smooth inertial scrolling, short and precise entrances, blur-to-focus, a circular mask reveal and asymmetric exits. *Params:* entrances of 8–32 px over 0.6–1.2 s on quint-out (0.22, 1, 0.36, 1), with opacity shorter than movement (0.5 s against 0.8 s); blur-to-focus from 8 px blur and 0.8 scale on expo-out (0.16, 1, 0.3, 1); exits of 0.32 s on (0.7, 0, 0.84, 0); overshoot (0.34, 1.56, 0.64, 1) only on small elements; stagger of 80–180 ms; a circle that grows from the centre as a mask between big ideas. *Build:* ChatCut · After Effects · Code. *Note:* the value is the system, not any single effect. Small distances, fast exits, overshoot kept for small things.
- **unwoven** (Clément Grellier, *Unwoven*). An endless carousel of photos where, near the edges, each image unravels into fluttering threads, like fabric coming undone. *Params:* 26 threads per image; 20 segments for the flutter; 95 px/s drift; unravelling begins 26% in from the edge; corner radius 20; aspect 0.75. *Build:* Record (moves on its own; load your images) · Code. *Note:* the fabric metaphor makes it a transition with meaning, not decoration.
- **scroll-graph** (Tom Miller, *Scroll-Driven SVG Graph Animation with GSAP*). A line chart draws itself while the camera follows its tip and zooms out, and the data points pop in one after another. *Params:* the line draws along its length; the camera follows the line's tip; scale from 2 to 0.4 on expo in-out; points appear with a 0.1 stagger. For video, drive it by time instead of scroll. *Build:* ChatCut · After Effects · Code. *Note:* a camera that follows the data turns a chart into a narrative. Ideal for explainers.
- **page-transitions** (Iqbal, *Page Transitions in Astro with Barba.js & GSAP*, design credited to cielrose.tv). On each page change, soft blurred shapes cover the screen and the new content is revealed through masks. *Params:* inset masks from the bottom up and polygon masks; durations of 0.5–1.4 s; power and expo curves plus custom curves. *Build:* ChatCut · After Effects · Code. *Note:* the value is the system: every transition has a considered duration and curve.
- **line-hover-styles** (Codrops, *Underline Hover Styles for Links*). Fifteen animated underlines: lines that grow, slide, glitch or draw themselves. *Params:* 0.3–0.4 s; curves (0.7, 0, 0.2, 1), (0.2, 1, 0.8, 1) and (0.4, 1, 0.8, 1). *Build:* ChatCut · After Effects · any tool. *Note:* a catalogue of micro-motion with exact values. Use one style per piece, consistently.
- **inertia-slider** (ReGGae, *Infinite draggable WebGL slider*). An endless image carousel dragged with inertia; images rescale through a shader as they move. *Params:* speed 2; drag threshold 50; easing 0.075 per frame (the inertia); image scale from 0.65 to 1. *Build:* Code · Record. *Note:* inertia, easing toward a target a little every frame, is the same idea as a spring with friction.

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
| Design guide | Plain-language rules: layout and text zone, spacing, type hierarchy, the motion fundamentals as numbers (durations, curves, distances, stagger, exit timing), the material, the signature move, and the forbidden list |
| Colors | Each hex value with its role: ground, ink, accent and what the accent is for |
| Fonts | Each family with its role and sizes |
| Logo | Only if the piece carries a brand |
| Reference images | Stills that show material and texture; describe in the guide what each one is for |

Reference images are static, so motion has to be described in the design guide, in words and numbers.

##### 2. Agent prompt

Paste this into the AI composer, with the Design Style selected. Structure it like this:

1. **Deliverable**: duration, resolution, frame rate, sound or none.
2. **Concept**: the through-line in two sentences.
3. **Storyboard**: the table from `STORYBOARD.md`, with exact text.
4. **Motion fundamentals**: repeat the key numbers even if they are in the Design Style. The agent follows what is in front of it.
5. **Continuity**: if one element carries through the piece, such as particles or a line, say that every transformation starts from the exact end state of the previous scene, with no cuts between clips, and that it may build the whole sequence as a single motion graphic if needed.
6. **Process**: pilot the first scene and the closing first, report, then build the rest.
7. **Report**: ask it to list what it could not do, which frames it checked, and the real timings.

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
