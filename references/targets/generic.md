# Target: generic

Use this target for any tool without its own adapter, such as After Effects, Cavalry, Rive, Motion Canvas or another AI video tool, or as a handoff spec for a human animator. The aim is a document that a person or an agent can execute without guessing.

## What to deliver

### 1. Summary

Format (resolution, frame rate, duration), sound, the through-line in two sentences, the material and the dials.

### 2. Style sheet

- Palette: hex values with roles.
- Type: families, sizes and roles.
- Motion tokens, as a table. Name each one so it can be referred to in the storyboard:

| Token | Duration | Curve | Distance | Use |
|---|---|---|---|---|
| `enter-text` | 700 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 16 px up | Titles and support lines |
| `exit-text` | 300 ms | `cubic-bezier(0.7, 0, 0.84, 0)` | 0 | All text exits |
| `transform` | 1500 ms | cubic in-out | — | Figure-to-figure changes |
| `stagger-words` | 90 ms | — | — | Words within a title |

(The values above are examples. Take the real ones from `STYLE.md`.)

- The signature move and the forbidden list.

### 3. Storyboard with timing

One row per scene, with times in both seconds and frames:

| Scene | In (s / frame) | Out (s / frame) | Text (exact) | Visual | Motion (tokens) | Transition to next |
|---|---|---|---|---|---|---|

### 4. Layer and timing notes

For each scene, the order of events with offsets: "figure transform starts at 0; year enters at 60% of the transform with `enter-text`; title at +150 ms; support line at +400 ms after the title; all text exits with `exit-text` 300 ms before the next transform."

### 5. Checklist

The `critique` criteria, so whoever builds it can check their own work.

## Adapting to a specific tool

- **Timeline tools** (After Effects, Cavalry): convert curves to the tool's easing controls. In After Effects, cubic-bezier values map to keyframe influence and speed in the graph editor; give both the curve and the intent so the animator can match it by eye.
- **AI tools that take prompts**: follow the structure of `targets/chatcut.md`. Give a style block if the tool has one, then a prompt with deliverable, concept, storyboard, motion numbers, continuity rules, a pilot step and a request to report what it could not do.
