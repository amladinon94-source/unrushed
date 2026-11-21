# STORYBOARD

**Total duration**:  · **Format**:  · **Frame rate**:  · **Sound**: 

| # | In | Duration | Beat (spine part) | Text (exact) | Visual / figure | Device (from visual-explanation.md) | Technique (from techniques.md) | What moves (token, duration, curve, distance) | Transition to next (relation → type) | Cues (see cue sheet) | Reading time OK? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | | Hook | | | | | | | | |

## Scene notes
Per scene, the order of events with offsets. For example: "transform starts at 0; year enters at 60% of the transform; title +150 ms; support line +400 ms; text exits 300 ms before the next transform".

## Cue sheet
Library effects, zooms, library transitions and sound accents (see `references/effects.md`). The default is none: each row needs a reason. Ranges are in frames from the start of the piece, at the frame rate above.

| Cue | Scene | Kind | Library name | From | Frames | Target | Parameters | Tied to (word, line or event) | Why | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | 1 | zoom | Quick Zoom In | | | clip / track / cut A→B | magnification 1.3, focal manual (0.62, 0.40), ease-in 5 | "never" | stress the refusal | A |

- **Kind:** `effect`, `zoom`, `transition` or `sound`.
- **Target:** the clip, a range on a track, or the cut between two clips. A library transition needs handles on both clips.
- **Parameters:** only what differs from the library default.

**Budget check:**
- Tier C: _ / 1
- Stylize looks: _ / 2
- Zooms per minute (talking head): _
- Same transition on three cuts in a row: no
- Stacked distortions: no
- Zoom and transition within 10 frames: no

## Whole-piece check
- [ ] Neighbouring scenes differ in composition, rhythm or entrance (variance)
- [ ] Neighbouring beats use different devices; no paused frame reads as a slide
- [ ] No transition type repeats back to back; at least four kinds over 60 s; the biggest leads into the payoff
- [ ] Any interface uses real components (the product's or its design system), with a human cursor
- [ ] Every figure enacts its line of text
- [ ] Each technique was chosen for its meaning, not as decoration
- [ ] Every cue has a reason and a tier, and the budgets hold
- [ ] Nothing contradicts BRAND.md
- [ ] Every fact is in VIDEO.md with a source
- [ ] There is a build and a release, and the ending holds
