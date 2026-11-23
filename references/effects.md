# Effects, zooms and transitions from an editor's library

Video editors such as ChatCut ship a library of ready-made effects, zooms and transitions. This file tells you which ones to use, when, how strongly, and when to leave them out. It also gives the equivalent in Remotion and After Effects, so a storyboard stays portable.

The default is **no effect**. An effect earns its place by doing a job the cut, the framing or the graphics cannot do alone. Write that job down: it is the "Why" column of the storyboard, and `critique` checks it.

## Contents

1. Choose by intent
2. Tiers
3. Catalogue: blur and sharpen; masks and keying; transform and distort; stylize
4. Zoom
5. Transitions from the library
6. Sound accents
7. Budgets and stacking
8. Applying it in ChatCut
9. Rebuilding it in Remotion and After Effects

## 1. Choose by intent

Start from what the beat needs, never from the effect list.

| The beat needs to… | Reach for | Not for this |
|---|---|---|
| Guide the eye to one region | Mask, Magnifying Glass, Dome Magnifier, Gaussian Blur on the rest, a slow push | Glow on everything, camera shake |
| Stress one line of speech | One zoom (Quick Zoom In or Instant) on the stressed word | A zoom on every sentence, Flash |
| Hide or protect something (faces, emails, plates, a mistake) | Local Mosaic, Gaussian Blur inside a mask | Cartoon or Posterize as a "disguise" |
| Separate the speaker from the background (text behind the person, grade the room only) | Person Regions as a matte | Hair Regions on its own |
| Show how a machine sees | Sobel Edges, Body Landmarks, Hand Landmarks, Heat Map, Threshold | Laser Eyes, ASCII Rain |
| Mark another time or medium (archive, VHS, print, zine) | CRT Retro, Analog TV Sync, Dither, Color Halftone, Photocopy | Stacking three looks |
| Put a UI or image on a real screen | Corner Pin | A flat overlay that ignores perspective |
| Change mode (a story inside the explainer, a flashback, a quote) | Letterbox, one consistent look for that whole section | Switching looks every shot |
| Fix the footage | Lens Correction, Sharpen (light), Flip (eyeline or continuity) | Fixes used as a style |

## 2. Tiers

- **A · workhorse.** Safe by default when the intent fits. Use freely within budget.
- **B · situational.** Right for one kind of moment or one section. It needs a reason in the storyboard.
- **C · gimmick.** Reads as template or meme, and it is one of the reasons edits look "made with AI". Use it only when the brief asks for that register (meme, parody, retro, a single comic beat), at most once per piece, and with a written reason. If you are unsure, leave it out.

## 3. Catalogue

Names are as the ChatCut library shows them. Availability differs between ChatCut Web and Desktop, and the library changes. Always discover what exists before applying it (see §8).

### Blur and sharpen

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Gaussian Blur | Soft, even blur | Background behind a title or card; blur everything outside a mask to guide the eye; privacy | Blurring the subject the viewer must read | A | `blur()`, `regionBlur()` | Gaussian Blur |
| Box Blur | Cheaper, squarer blur | Frosted panel behind text | Beauty shots, which it makes muddy | B | `blur()` | Fast Box Blur |
| Mosaic Blur | Pixel blocks over the frame | A deliberate pixel motif; a censor look over a whole shot | Hiding a face in an otherwise clean edit (use Local Mosaic) | B | `pixelate()` | Mosaic |
| Sharpen | Edge contrast | A light fix on soft footage | Pushing it until halos show | A (fix) | `contrast()` with a custom pass, or `createEffect()` | Unsharp Mask |
| Tilt-Shift | Blurs top and bottom, sharp band | Overhead shots of cities, desks or setups (miniature look) | Talking heads | C | `linearProgressiveBlur()` | Camera Lens Blur with a gradient blur map |

### Masks and keying

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Mask (rectangle, circle, linear) | Shows only a region | Reveals, picture-in-picture, isolating a UI region to explain | Hard edges on organic subjects (feather them) | A | CSS `clip-path` or mask on a layer; `iris()` for reveals | Masks, Track Matte |
| Local Mosaic | Pixelates one region | Faces, emails, licence plates, secrets | As decoration | A | `pixelate()` inside a mask | Mosaic + mask, tracked |
| Auto Threshold | Pure black and white by luminance | Making a matte; a stark poster beat | A whole piece | B | `createEffect()` (threshold) | Threshold |
| Black Overlay (Screen) | Black layer in Screen mode | Laying light leaks or particles on black over footage | — | B | `mixBlendMode: 'screen'` | Screen blend mode |

### Transform and distort

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Corner Pin | Maps a layer to four points | Putting a UI, slide or image onto a real screen in the shot | Without tracking on a moving camera | A | `cornerPin()` | Corner Pin + tracker |
| Magnifying Glass | Circular lens over a region | Explaining a small UI detail; a figure inside a dense chart | Faces | A | `fisheye()` inside a circular mask | CC Lens inside a mask |
| Dome Magnifier | Bulges a region | Calling attention to one element for a beat | Constant pulsing | B | `fisheye()`, `sphere()` | Bulge |
| Lens Correction | Removes barrel distortion | Fixing wide-angle footage and screen recordings shot with a phone | — | A (fix) | `barrelDistortion()` with a negative amount | Optics Compensation (reverse) |
| Lens Distortion | Adds barrel or pincushion | A subtle wide-lens feel on a graphic | Strong amounts on people | B | `barrelDistortion()` | Optics Compensation |
| Letterbox | Black bars to a cinema ratio | Marking a section as "story mode"; a chapter shift | Toggling it on and off within a section | B | Two black `AbsoluteFill` bars | Solids or a crop |
| Flip | Mirrors the shot | Fixing eyeline or screen direction for continuity | Shots with readable text | A (fix) | `mirror()` or `scaleX(-1)` | Transform scale −100 |
| Elastic Scale | Scale with overshoot | A cartoon register | Serious or brand pieces (it is a bounce) | C | `spring()` with low damping | Scale with an overshoot expression |
| Camera Shake | Random shake | A physical hit you can hear (a slam, a drop), for 4–8 frames | Long durations, or "energy" with no impact on screen | C | `random()`-driven translate on a parent | Wiggle expression |
| Analog TV Sync | Vertical roll and sync error | A beat that changes channel or era | As a transition you reuse | C | `wave()`, `xyTranslate()`, `noise()` | Offset + Wave Warp + Noise |

### Stylize

Some of these need person, face, hand or hair detection (marked •). Outside ChatCut they need precomputed masks or landmarks, for example from MediaPipe. Without those, do not promise them in a Remotion or After Effects export.

| Effect | What it does | Use it for | Never | Tier | Remotion | After Effects |
|---|---|---|---|---|---|---|
| Person Regions • | Segments the person | A matte: text behind the speaker, grading only the background, a cut-out | As a coloured tint for its own sake | A (as matte) | Precomputed alpha + `<OffthreadVideo>` | Roto Brush |
| Sobel Edges | Edge detection | "How a model sees": computer vision, detection, AI explainers | Decoration | B | `createEffect()` (Sobel) | Find Edges |
| Body Landmarks • | Draws the pose skeleton | Explaining posture, motion or tracking | Decoration | B | Precomputed landmarks drawn as SVG | Third-party, or tracking plus shape layers |
| Hand Landmarks • | Draws hand keypoints | Gesture interfaces, sign or hand tutorials | Decoration | B | Same as above | Same as above |
| Heat Map | False colour by luminance | Showing attention, temperature or intensity as data | A look | B | `thermalVision()` | Colorama |
| Threshold, Two-Level, Three-Level | Two or three tone bands | Poster beats, mattes | Long sections (it is tiring to watch) | B | `createEffect()`, `levels()` | Threshold, Posterize |
| Posterize | Fewer colour steps | A graphic print section | Skin close-ups | B | `createEffect()` | Posterize |
| Dither | Patterned dots instead of gradients | Lo-fi or bitmap texture that matches a pixel or LED language | Mixed with Halftone in the same piece | B | `dotGrid()`, `createEffect()` | Posterize + Noise, or third-party |
| Color Halftone | Print dots per channel | Print or comic era | With small text on screen | B | `halftone()` | Third-party (no native) |
| Photocopy | High-contrast grain | Zine or punk section | Product shots | B | `createEffect()`, `noise()` | Threshold + Noise |
| CRT Retro | Scanlines, curvature, glow | Archive, retro tech, "old screen" | As a default look | B | `HtmlInCanvas` CRT shader, `barrelDistortion()` | Venetian Blinds + Optics Compensation + Glow |
| Glow | Bloom on highlights | A subtle lift on light sources; LED or neon subjects | Everything glowing | B | `glow()` | Glow |
| Soft Glow | Diffusion | A gentle beauty or dream section | Talking-head default | B | `glow()` with a low threshold, `blur()` blend | Glow + Gaussian Blur in Screen |
| Color Distance | Isolates one colour | Keep one colour, grey the rest; colour mattes | — | B | `colorKey()` | Color Range, Leave Color |
| Hair Regions • | Segments hair | A matte for a hair-colour demo | A look | B | Precomputed matte | Roto Brush |
| Edge Glow | Glowing edges | — | Almost always | C | `createEffect()` + `glow()` | Find Edges + Glow |
| Emboss | Relief | — | Almost always | C | `emboss()` | Emboss |
| Cartoon | Flattens into cartoon | Parody | Brand or explainer pieces | C | `createEffect()` | Cartoon |
| Primary Colors | Reduces to primaries | Pop parody | — | C | `createEffect()` | Colorama |
| NDVI False Color | Vegetation index colours | Literal NDVI or remote-sensing content | Anything else | C | `createEffect()` | Colorama |
| RGB Split | Channel offset | One glitch beat, 2–4 frames | As a transition every time | C | `chromaticAberration()` | Shift Channels + Transform |
| ASCII Rain | Matrix-style characters | A Matrix reference the brief asks for | "Tech" as a theme | C | `HtmlInCanvas` shader | Third-party |
| Laser Eyes, Face Laser Eyes • | Beams from the eyes | Memes | Any other register | C | Precomputed face landmarks + SVG | Face Tracker + Glow |

## 4. Zoom

In ChatCut the zoom is one effect, `builtin:zoom`, with these properties:

| Property | Range | Default | Meaning |
|---|---|---|---|
| `magnification` | 1–4 | 1.5 | Zoom factor |
| `focalPointX`, `focalPointY` | 0–1 | 0.5 | Where to zoom to |
| `focalMode` | `auto` / `manual` | `auto` | `auto` picks the subject; use `manual` for a UI detail |
| `shape` | `punch` / `hold` / `slow-push` / `instant` | `hold` | Animation curve |
| `easeInFrames`, `easeOutFrames` | 0–60 | 8 | Ramp length |

The library shows six presets: Slow Push, Slow Pull Out, Instant, Quick Zoom In, Quick Zoom Out, Zoom In + Out. How each preset maps to `shape` is not documented. After applying one, read it back with `inspect_item` and write down the real values. The table below lists the intent of each preset; the starting values are Unrushed's defaults, not ChatCut's.

| Preset | Says | Start with | Relation (transitions.md) |
|---|---|---|---|
| Slow Push | "This matters more and more": tension, a confession, the key claim | 1.08–1.2 over the whole line | B is a detail of A, slowly |
| Slow Pull Out | "Here is the bigger picture": reveal context, end a section | From 1.2 back to 1.0 | A is part of B |
| Instant | A second camera angle: emphasis without visible motion | 1.15–1.3, no ramp | Hard cut on the beat |
| Quick Zoom In | Stress one word | 1.25 for a 6–8 frame punch, up to 1.4 for 12–18 frames; ease-in 4–6 frames | — |
| Quick Zoom Out | Release after a punch, a joke landing | Back to 1.0 in 6–10 frames | — |
| Zoom In + Out | Stress a single phrase, then return | 1.2–1.35, hold for the phrase | — |

Rules:

- Tie every zoom to a word or line in the script. Write it in the storyboard: `zoom: Quick Zoom In on "never"`.
- Use `manual` focus for UI and screen recordings. `auto` follows faces and will miss the button you are talking about.
- Above 2× the footage softens. Use it only when it reveals a detail, and check the pixels.
- Alternate the scale between consecutive zooms (for example 1.0 → 1.25 → 1.0 → 1.15) so they do not feel stamped.
- A zoom and a transition inside the same 10 frames fight each other. Choose one.

## 5. Transitions from the library

Choose by the relation between the two beats, as in `transitions.md`. This table maps the library's transitions onto those relations.

| Library transition | Relation it can say | Tier | Notes | Remotion | After Effects |
|---|---|---|---|---|---|
| Cross Dissolve | Time passes; A becomes B, softly | B | Only when time passes. 8–16 frames; more than 24 feels like a slideshow. A dissolve between every scene is a tell. | `fade()` | Opacity cross-fade |
| Dip to Black | End of a chapter; a large time skip; a tonal reset | B | At most once per piece, and never mid-piece between ideas | `fade()` through a black solid | Dip to Black |
| Soft Wipe | B continues A in space, sideways | B | Match the wipe direction to motion in the shot | `wipe()` with a feathered edge (custom) | Linear Wipe, feathered |
| Clean Line Wipe | B opens a new chapter; list items in an editorial style | B | The line must belong to the design language (rule, cursor, divider) | `wipe()` + a 2 px line layer | Linear Wipe + stroke |
| Luma Blend | A becomes B through light: bright areas lead | B | Works when both shots share bright regions | Custom HTML-in-canvas shader | Gradient Wipe using a luma layer |
| Rack Focus | Attention shifts between planes; B is a detail of A | B | Reads as camera language, so it is good for documentary | `blur()` keyframed across a `fade()` | Camera Lens Blur keyframed |
| Whip Pan | B continues A with energy; a location jump | B | Both shots should move, or seem to, in the same direction; add a whoosh | `slide()` + `zoomBlur()`, or a directional-blur shader | Transform + Directional Blur |
| Organic Light Dissolve | Memory, mood, a dream | C | Reads as a template; a plain dissolve is usually better | `lightLeak()` over `fade()` | Gradient Wipe with Fractal Noise + Glow |
| Anticipation Zoom | B is a detail of A, with energy | C | Only if the cut lands exactly on a beat | `zoomBlur()`, `zoomInOut()` | Scale + CC Radial Fast Blur |
| Impact Shake | Contrast; a punchline on a hit | C | 4–8 frames, with a sound you can hear | `pushCut()` + shake | Wiggle burst |
| Flash | Contrast; a camera flash inside the story | C | A white flash is a strong AI tell. Prefer a hard cut. | `pushCut()` | White solid, 2–4 frames |
| Page Curl | A document or page turns, literally | C | Only when paper is on screen | `pageTurn()` | CC Page Turn |

In ChatCut a library transition needs two adjacent clips on the same track with spare media on both sides (handles). If it is refused, use the duration the editor suggests, trim to expose handles, or keep the hard cut. A hard cut is a valid choice, and usually the best one.

## 6. Sound accents

The cheapest way to connect ideas and mark emphasis is often a sound placed at the right frame, not a visual effect.

- Pair sounds with motion that has a direction or an impact: whoosh with Whip Pan, a soft riser with Slow Push, a click or tick with a UI cursor, a low hit with Impact Shake.
- Place the sound at the motion's peak, not its start. A whoosh peaks at the midpoint of the pan.
- Keep accents out of music ducking, and set the volume per item.
- One to three hand-placed accents in the whole piece: the click, the name, the turn. A hit on every cut is a tell.
- Silence before a key line is also a sound decision. Pull the music down before the biggest move.

## 7. Budgets and stacking

Per piece:

- **Tier C:** at most one, with a written reason. A second one fails `critique`.
- **Stylize:** at most one look per section, and at most two looks in the whole piece.
- **Zoom in talking heads:** roughly one per 8–12 seconds, never two in a row on consecutive sentences. Screen recordings may use more, since there each zoom is an explanation.
- **Transitions:** the same library transition never on three cuts in a row. Most cuts stay hard.

Per shot:

- Never stack two distortions (for example Lens Distortion and Dome Magnifier).
- Never put a stylize effect on top of a zoom and a transition within the same second.
- Text on screen beats texture: drop Halftone, Dither or CRT where small text must be read.
- The brand accent rule still applies: one focus per frame.

## 8. Applying it in ChatCut

### With the ChatCut MCP (Claude Code or Codex agent plugin)

1. **Discover.** Call `browse_library` with a category or query, for example `browse_library(category: "transitions", query: "dissolve")`. Built-ins have stable global ids. Do not hard-code ids other than `builtin:zoom`. Read each asset's editable properties before setting them.
2. **Locate.** Get clip ids and frame ranges with `preview_timeline({views:["timeline"], tracks:["V1"]})`. Use `inspect_item` when you need full detail.
3. **Apply** with `edit_item`. There are three shapes:

   ```text
   # Effect on a whole clip
   edit_item(json: '{"adds":[{"type":"effect","assetId":"<id>","targetItemId":"<clip-id>","propertyOverrides":{...}}]}')

   # Effect or zoom on a range of frames
   edit_item(json: '{"adds":[{"type":"effect","assetId":"builtin:zoom","mode":"track-bound","trackId":"<track>","trackBoundFrom":90,"trackBoundDurationInFrames":24,"propertyOverrides":{"magnification":1.3,"shape":"punch"}}]}')

   # Transition between two adjacent clips
   edit_item(json: '{"adds":[{"type":"transition","assetId":"<id>","outgoingItemId":"<a>","incomingItemId":"<b>","durationInFrames":12}]}')
   ```

   Send only the properties you change.
4. **Verify.** Confirm with `preview_timeline` that the effect sits on the right clip and range, then look at composed frames (`views:["viewer"]`). Never report success from the `edit_item` response alone.
5. **Custom shader only as a last resort.** Use `submit_shader` only when nothing in the library fits the intent. This is about effects and transitions laid over footage. Shader code that draws a motion graphic's own protagonist (`material-kit.md`) is not an effect and is not a last resort. Write the brief like a director:
   - eased progress, never linear;
   - both clips take part in a transition;
   - the first and last frames match the clips exactly;
   - an `intensity` or `amount` control, plus `softness` for transitions, with 2–5 controls in total.

   Generation creates a library asset and may cost credits. Apply it only when the plan calls for it.

ChatCut's agent does not add effects nobody asked for. Unrushed's job is to ask for them explicitly, cue by cue, from the storyboard.

### Without the MCP (a prompt in ChatCut's chat)

Write one sentence per cue, with five parts:

1. the target;
2. the effect;
3. the time range;
4. the intensity;
5. what must stay unchanged.

For example:

> On the clip at 00:42–00:45, add Quick Zoom In to 1.3× on the word "never", focus manual at the laptop screen, ease-in 5 frames. Keep the captions and the lower third unchanged.

"Make it cinematic" is not a cue.

## 9. Rebuilding it in Remotion and After Effects

- **Remotion.**
  - `@remotion/effects` applies effects through the `effects` prop of `<Video>`, `<Img>`, `<Solid>`, `<HtmlInCanvas>` and others, in the order listed.
  - Custom effects use `createEffect()`.
  - Library-style transitions come from `@remotion/transitions` (`fade`, `slide`, `wipe`, `flip`, `clockWipe`, `iris`, `pushCut`, `zoomBlur`, `zoomInOut`, `pageTurn`, …). Custom ones are HTML-in-canvas presentations; shaders from gl-transitions.com (MIT) can be ported.
  - WebGL effects need `--gl=angle` when rendering.
- **After Effects.** The tables above give the native effect. Person, face, hand and hair effects need Roto Brush, the Face Tracker or third-party plug-ins.
- **Detection effects (•).** These are not portable for free. If the target is not ChatCut, either supply precomputed masks or landmarks, or choose a different device.
