# Motion kit: measured values, ready to paste

`principles.md` says why things move the way they do. This file gives the numbers to paste, so a tool builds measured motion instead of improvising average motion. Use the curve names in the storyboard's "What moves" column ("words land, softLand 12 f, from 5% H below"), and `export` translates them into each tool.

Source: curve shapes, durations, offsets and ratios are measured frame by frame on about 4,300 moves in 53 professional moments by the motionmaxxing project (Apache-2.0, github.com/Tejashmakwana/motionmaxxing). The cubic-bezier fits, recipes and code here are Unrushed's own.

Durations are in frames at 30 fps (f). At 24 fps multiply by 0.8; at 60 fps by 2. H is the frame height, W the width.

## Contents

1. The curves
2. Recipes
3. In ChatCut
4. In Remotion
5. In After Effects
6. What not to do

## 1. The curves

Each curve is a cubic-bezier fitted to the median of a cluster of real moves. The shape column gives how much of the travel is done at 10, 25, 50 and 75% of the time.

| Name | cubic-bezier | Shape at 10/25/50/75% | Frames (usual) | Use it for |
|---|---|---|---|---|
| `softLand` | `(0.22, 0.776, 0.511, 0.942)` | 30 / 59 / 85 / 95 | 12 (6–21) | Entries: text rising, panels sliding, scale-ins. The workhorse |
| `snapSettle` | `(0.136, 1.058, 0.298, 0.943)` | 54 / 84 / 96 / 98 | 11 (6–29) | Hero entries and the closing beat: most of the travel at once, then a soft tail |
| `glide` | `(0.524, 0.892, 0.878, 0.995)` | 16 / 39 / 69 / 91 | 10 (7–18) | Medium moves, camera pushes, blur to focus |
| `whip` | `(0.375, 0.947, 0.721, 1.0)` | 23 / 52 / 83 / 97 | 8 (7–13) | Big fast moves; the arriving half of a whip |
| `softInOut` | `(0.345, 0.074, 0.655, 0.926)` | 4 / 17 / 50 / 83 | 9 (6–16) | Opacity, blur, colour and ground ramps |
| `gentleIn` | `(0.252, 0, 0.595, 0.161)` | 1 / 6 / 24 / 55 | 9 (6–17) | The start of a fade-out; a slow push running into a cut |
| `accelExit` | `(0.288, 0, 0.632, 0.043)` | 0 / 3 / 17 / 47 | 13 (9–19) | Exits off frame and scale exits: peak speed near the end |
| `crashOut` | `(0.434, 0, 0.73, 0)` | 0 / 1 / 8 / 35 | 17 (11–31) | An exit or camera pull that ends at full speed on a hard cut |
| `cruise` | linear | 10 / 25 / 50 / 75 | 9, or 26+ for drift | Drift, camera creep, counters, fades |
| `popOver` | `(0.295, 0.157, 0.309, 1.398)` | 10 / 46 / 96 / 108 | 15 (11–27) | The one late lean past the mark (peak 1.08 at 72% of the time). Once per piece |

How often professionals reach for each: linear about 18%, `glide` and `softInOut` 14% each, `softLand` 9%, `gentleIn` 9%, `snapSettle` and `whip` 6% each, `accelExit` 5%, `crashOut` 4%, `popOver` 2%. Two curves that overshoot hard, a slam that passes its mark early and a big bounce, appear in about 1% of moves and are left out of the kit on purpose.

## 2. Recipes

Each recipe is a move in numbers. Combine them; do not stack more than two channels on one element.

| Move | Values | Notes |
|---|---|---|
| **Land** | `softLand` 12 f; words from 3–7% H below their slot or 3% W beside it; cards from below the frame; opacity 0.2 → 1 over the first 4–6 f only | Arrive by moving. Opacity alone is the template entrance |
| **Hero entry** | `snapSettle` 11 f; for a logo or wordmark 18–30 f | One per scene at most |
| **Arrive from oversize** | identity objects (logo, key word, card, cursor) start at 1.4–5× and come down on `snapSettle` 18 f; a calm brand 1.1–1.9× | Never grow them from zero. Spend the big version once |
| **Blur to focus** | 3–6 px for type, 8–12 px for a status word, up to 18 px for a logo; to 0 over 4–8 f on `glide` | A helper under a move, not a look |
| **Leave** | `accelExit` 13 f, still moving on the last frame; into a hard cut `crashOut` 17 f | The cut is the edit; the next shot inherits the speed |
| **Siblings** (letters, rows, tiles) | starts 1–3 f apart with uneven gaps (3, 2, 2, 3, 2…); each move about twice the gap | A wave under 0.6 s reads as one gesture |
| **Words** | whole words 2–4 f apart in a hook, 4–6 in a headline, 8–12 when they follow a voice; a closing stack about 8 f | Words arrive whole. Letter by letter only inside the product's own input |
| **Hold alive** | linear drift 1–3 px per frame, or a 0.5–1% scale creep, a caret, light moving on the ground | Only the payoff may be fully still, for under ~1 s |
| **Camera push** | multiplier by duration: 1.25× for a 6 f punch, 1.4× for 12–18 f, 1.5× for 20–45 f, up to 2.4× for a slow drift; `glide` or linear | Move the whole interface as one group, never its parts separately |
| **Reveal snap** | the camera covers about 60% of the change in one frame (ratio 0.56–0.77), then settles over 9–18 f on `softLand` | The jump has the punch of a cut; the tail lets the frame be read |
| **Camera pull** | about 1.8× on `accelExit`, ~17 f | Pulls accelerate; pushes decelerate |
| **Whip** | 7–8 f; arriving half `whip`, departing half `accelExit`; the cut lands at peak speed and the new shot continues the direction | An object riding the whip keeps its size |
| **Cursor** | enters off frame at 1.5–2× and comes down; travels on an arc and decelerates (`softLand`); parks still for about 0.1 s before acting | A cursor that glides straight at one speed has no hand behind it |
| **Press** | cursor to 0.85–0.9 in 2 f; the target to 0.76–0.8 over ~6 f, starting 1 f after the cursor; release slower, ~10 f on `softLand`, or `popOver` for a +5% rebound; the target brightens | No ripple ring, no white flash |
| **Counter** | a new value every frame, with steps shrinking (`softLand`) over 7–23 f; lands on a round number for a claim, a specific one for a data field | Only after the cause that triggers it |
| **The one spring** | `popOver` 15 f on the payoff, or snap to 0.9× and settle to 1.0 over ~5 f with a small wobble | Once per piece. Overshoot on everything is the AI default |
| **Cut on motion** | scenes start already moving on frame 0 and end mid-move | A cut on a still frame reads as a slide change |

## 3. In ChatCut

**Motion graphics generated by the agent.** The agent writes the animation code, so give it curves and numbers, not adjectives. Put the kit's values in the "Motion fundamentals" block of the prompt (`targets/chatcut.md`):

> Entries move and decelerate: cubic-bezier(0.22, 0.776, 0.511, 0.942) over 12 frames at 30 fps, words from 5% of the height below their place, opacity from 0.2 to 1 in the first 5 frames only. Exits accelerate: cubic-bezier(0.288, 0, 0.632, 0.043) over 13 frames and are still moving on the last frame. Whole words start 4–6 frames apart, uneven. No overshoot except one late lean on the payoff: cubic-bezier(0.295, 0.157, 0.309, 1.398) over 15 frames. Held frames keep one thing drifting 1–2 px per frame.

Name the recipe for each scene in one line ("the card arrives from 1.6× on snapSettle, 18 frames"), not the whole table.

**Zooms (`builtin:zoom`).** Choose the magnification from the length, as in the camera push recipe: about 1.25 for a 6–8 frame punch, 1.3–1.4 for 12–18 frames, 1.5 for 20–45 frames. A reveal works best as `instant` plus a short ease-out tail. Which curve ChatCut applies inside its ease-in and ease-out frames is not documented: after applying a zoom, measure it with `scripts/detect.py <export> --profile <start> <end>` and write the real behaviour down in `targets/chatcut.md`, "Saving what worked".

**Checking.** Export, run `detect.py --profile` on the two or three key moves and `--strip` to see them frame by frame. A landing should show steps that shrink; an exit, steps that grow.

## 4. In Remotion

Copy `assets/remotion/unrushed-motion.ts` into `src/` and use its functions instead of writing curves by hand:

```tsx
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {land, leave, arrive, stagger, press, revealSnap, ease} from './unrushed-motion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const title = land(frame, 10, {from: 48, fps});      // {offset, opacity}
const logo = arrive(frame, 90, {from: 1.6, fps});     // scale, 1.6 → 1
const wordStart = (i: number) => 20 + stagger(i, [5, 4, 6, 4], fps);
const click = press(frame, 140, {fps});              // {cursor, target, pressed}
const camera = revealSnap(frame, 60, {from: 2.2, fps});
```

Every function is a pure function of the frame, so renders are deterministic. `ease.<name>` gives the raw curves for `interpolate(..., {easing: ease.softLand})` and for `@remotion/transitions` timings.

## 5. In After Effects

Animate with two linear keyframes, then paste this expression on the property. It reshapes the motion between the keyframes with one of the kit's curves:

```js
// Unrushed curve: set c to a cubic-bezier from references/motion-kit.md
var c = [0.22, 0.776, 0.511, 0.942]; // softLand
function bx(s){ return 3*(1-s)*(1-s)*s*c[0] + 3*(1-s)*s*s*c[2] + s*s*s; }
function by(s){ return 3*(1-s)*(1-s)*s*c[1] + 3*(1-s)*s*s*c[3] + s*s*s; }
function curve(t){ var lo = 0, hi = 1; for (var i = 0; i < 30; i++){ var m = (lo + hi) / 2; if (bx(m) < t) lo = m; else hi = m; } return by((lo + hi) / 2); }
if (numKeys > 1 && time > key(1).time && time < key(2).time) {
  var t = (time - key(1).time) / (key(2).time - key(1).time);
  key(1).value + (key(2).value - key(1).value) * curve(t);
} else value;
```

Plugins that take a cubic-bezier (such as Flow) accept the same four numbers.

## 6. What not to do

- One curve for everything, usually expo-out for every move. Landings and exits use different curves.
- Overshoot on every arrival, or a bounce that peaks early. Overshoot is rare, late and small.
- Durations of 20–30 frames for every move. The professional median is 10 frames; slow is a choice for one move, not a default.
- Identical stagger gaps. Uneven gaps read as separate bodies; a fixed delay reads as a loading list.
- Animating the camera by moving the interface's pieces one by one. One group, one transform.
