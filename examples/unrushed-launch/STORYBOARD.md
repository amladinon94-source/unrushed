# STORYBOARD

**Total duration**: 39 s · **Format**: 1920×1080 · **Frame rate**: 24 · **Sound**: voice + quiet music bed

| # | In | Duration | Beat (spine part) | Buys (the viewer believes…) | Importance (1–3) | Text (exact) | Visual / figure | Device (from visual-explanation.md) | Technique (from techniques.md) | What moves (token, duration, curve, distance) | Transition to next (relation → type) | Cues (see cue sheet) | Reading time OK? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 5 s | Hook | I have seen this over-edited look, and it is cheap | 2 | — | The talking head as an "AI edit": four punch-ins and a white flash. This is a pre-rendered clip (`bad-edit.mp4`), shown as content, not applied as cues. An orange dot jumps to each punch. | ghosts | — | the orange dot hops between punches, 200 ms expo-out | B contrasts A → hard cut on the beat | — | n/a |
| 2 | 0:05 | 2 s | Hook | something is about to judge that edit | 1 | `> unrushed critique` | Freeze frame dimmed to 40%; the prompt types over it | interface simulation (terminal) | — | type 2 frames per character; orange cursor blinks at 2 Hz | B answers a question A raised → hard cut on the cursor's last blink | C1 | yes |
| 3 | 0:07 | 5 s | Promise | my cut needs fewer effects, not more | 2 | "Your editor's library has 50 effects. Your cut needs about three." | Talking head, clean framing; a grafito dot ruler at the bottom fills to 50, then 3 dots stay lit | same space, two behaviours | dot matrix | the ruler fills in 18 frames, dims to 3 in 10 | B is a detail of A → zoom-through into the laptop screen | — | yes, 2 lines over 5 s |
| 4 | 0:12 | 6 s | Proof | each effect gets a job I can name | 2 | "Intent first: explain this control." | ChatCut screen recording, library open, zoom panel | interface simulation (ChatCut's own UI), human cursor | — | the cursor arcs to the zoom panel, decelerating 400 ms | B continues A → match on action (the cursor carries) | C2 | yes |
| 5 | 0:18 | 8 s | Proof | zooms follow the words, not the clock | 2 | "Every zoom is tied to a word." | Talking head; the cue sheet types in beside the speaker, the C3 row lit orange | one canvas | — | rows enter at 2 frames each; one row lit | B contrasts A → hard cut on the beat | C3 | yes |
| 6 | 0:26 | 5 s | Proof | the tool catches the gimmick before I ship it | 3 | `Cue sheet: C2 (flash) has no reason.` | Terminal running `detect.py --storyboard`; the flag line appears | interface simulation (terminal) | — | output lines at 3 frames each; the flag holds | A becomes B → dot sweep (the brand transition) | C4, C5, C6 | yes, 1 line held 3 s |
| 7 | 0:31 | 6 s | Payoff | the same talk, edited calmly, is better | 3 | "…and it should never feel rushed." | A 1 s breath on the clean frame, then the same talking head re-edited with three cues; the orange dot settles on "never" | before/after on one canvas | — | one zoom on "never"; nothing else moves | B continues A → hard cut on the dot's last move (the dot carries) | C7 | yes |
| 8 | 0:37 | 2 s | Ask | I can install it now, in one line | 1 | `> npx skills add unrushed` | The orange dot becomes the symbol's accent; the symbol and the wordmark assemble around it | — | logo animation (brand) | the dot travels 10 frames and lands decelerating; the command arrives whole at frame 14; final frame held 1.2 s with the cursor blinking | — | — | yes, one line over 2 s |

## Scene notes
- **Scene 2:** the freeze lands on the flash frame. The prompt starts 4 frames after the cut.
- **Scene 7:** the zoom is the only motion. Captions stay still.
- **Scene 8:** the URL is in the post copy, not on screen. The cursor blink keeps the held frame alive.

## Cue sheet

| Cue | Scene | Kind | Library name | From | Frames | Target | Parameters | Tied to (word, line or event) | Why | Tier |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | 2 | sound | Keyboard click | 130 | 30 | A2 | −14 dB | the prompt typing | the critique starts as an action the viewer hears | A |
| C2 | 4 | effect | Magnifying Glass | 312 | 72 | screen-recording clip | manual focal point on the zoom panel (0.71, 0.38) | "this control" | explain one control without cutting away | A |
| C3 | 5 | zoom | Quick Zoom In | 498 | 14 | talking-head clip | magnification 1.25, focal auto, ease-in 5 | "word" | stress the rule | A |
| C4 | 6 | sound | Soft tick | 660 | 6 | A2 | −16 dB | the flag line appears | mark the finding | A |
| C5 | 6 | effect | Dither | 624 | 114 | terminal clip | intensity 0.4 | the detector scene | the brand's bitmap language, on the one machine-view beat | B |
| C6 | 6 | transition | custom: dot sweep | 738 | 16 | cut 6→7 | expo-out, 2 frames per dot | entering the payoff | the brand transition, kept for the biggest cut | B |
| C7 | 7 | zoom | Zoom In + Out | 826 | 30 | re-edited clip | magnification 1.2, hold the phrase | "never" | the payoff lands on one word | A |

**Budget check:**
- Tier C: 0 / 1
- Stylize looks: 1 / 2
- Zooms per minute: 3.1
- Same transition on three cuts in a row: no
- Stacked distortions: no
- Zoom and transition within 10 frames: no
