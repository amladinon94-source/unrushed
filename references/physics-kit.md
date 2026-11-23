# Physics kit: forces, springs and noise, ready to paste

`motion-kit.md` gives the measured curves for moves that go from A to B. This file is for things that move because something acts on them: they fall, sink, hang, swing, are pushed or drift. The code is in `assets/remotion/unrushed-physics.ts`; it has no dependencies and runs in Remotion and inside a ChatCut motion graphic.

Source: standard mechanics, organised the way Daniel Shiffman teaches them in *The Nature of Code* (2012; text CC BY-NC 3.0). This file and the code restate the ideas in Unrushed's own words and code (MIT); nothing is copied from the book.

Lengths are in px, durations in frames at 30 fps (f), speeds in px per second unless a line says px per frame.

## Contents

1. Curve or force
2. One world, one gravity
3. The pieces
4. Materials in numbers
5. What a strip should show
6. In ChatCut and Remotion
7. Limits

## 1. Curve or force

Read the verb in the storyboard's "Visual" column.

| The thing… | Use | Why |
|---|---|---|
| enters, exits, slides, scales, is pressed; any interface element | a curve from `motion-kit.md` | It was measured on professional work; a simulated panel looks loose |
| falls, drops, pours, sinks, floats, is thrown | forces (`simulate`, `gravity`, `drag`) | Speed must carry across the whole move, and weight must show |
| settles after arriving, wobbles, hangs, swings, is plucked | `spring` | One exact function, with the arrival speed handed in |
| sways, breathes, drifts, flickers while it waits | `noise1`, `noise2`, `wind` | Random values jump; noise wanders |
| is one of many similar things | `rng` and `gaussian` for size, delay and start | Identical siblings read as a template |
| goes somewhere on purpose: a cursor, a hand, a vehicle, a creature | `arrive`, `followPath` | It turns with a limit, so it travels on arcs and brakes before it stops |
| is carried by wind or a current, or moves as a group | `flowAt` + `follow`; `separate`, `align`, `cohere` | Neighbours move alike without moving identically |

If a scene has no such verb, it needs no physics. Do not simulate what a curve does better.

**A chain of curves is not a force.** Two curves in a row meet at different speeds, and the eye reads the joint. In `examples/physics-kit/drop-into-liquid.ts`, a 12 f gravity curve followed by `softLand` makes a ball speed up from 53 to 78 px per frame at the moment it enters the liquid, and three balls of different weight move identically. With forces, the same ball drops from 53 to 5, 15 or 31 px per frame on entry depending on its weight, and sinks at 3, 6 or 12.

## 2. One world, one gravity

Set gravity once per piece and write it in `STYLE.md` beside the motion tokens. Derive it from the fall the storyboard already specifies: `gravityFor(distance, frames)` returns the g that makes a thing dropped from rest cover that distance in that time ("falls 330 px in 12 f" gives 4,125 px/s²). Every object then shares it. An object with its own private gravity is the physical version of a mismatched font.

Weight shows only when something resists. In a vacuum heavy and light fall together; under `drag` or `viscous` the heavy one keeps more of its speed. So give things a mass when they meet air, liquid, a spring or each other, and let size and mass agree: a big thing that starts and stops as fast as a small one reads as weightless.

## 3. The pieces

| Piece | What it gives | Numbers to start from |
|---|---|---|
| `rng(seed)`, `gaussian(rand, mean, sd)` | Repeatable variation. Never `Math.random()`: frames render in any order | sd of 10–20% of the mean for sizes and delays |
| `noise1(frame / pace, seed)`, `noise2(x, y, seed)` | A value that wanders between about −1 and 1 | pace 20–40 f alive, 90+ breathing; amplitude 1–3 px or 0.5–1° on a hold; a different seed per object |
| `gravityFor`, `fall` | Exact free fall and the speed at any frame | — |
| `spring(frame, start, {from, to, period, damping, v0})` | An exact settle. `v0` is the arrival speed from the move before | see the table below |
| `simulate({init, step})` with `step(body, forces, dt)` | Any mix of forces, replayed from frame 0 and cached | 4 substeps; 8 with stiff springs |
| `gravity`, `springTo`, `attract`, `wind` | Pushes | `attract` clamps distance to 20–400 px |
| `friction(mu, normal)`, `drag(c)`, `viscous(c)` | Brakes. Applied exactly, so a strong brake never reverses the motion | below |
| `emitter({rate, life, spawn, forces})`, `lifeCurve(age)` | Many short-lived things from one source; each is born, ages 0 to 1 and dies | steady: rate × life particles alive; a burst is 2–3 f of high rate, then 0 |
| `agents({init, steer, maxSpeed})` with `seek`, `arrive`, `flee`, `wander`, `follow`, `followPath`, `separate`, `align`, `cohere`; `flowAt`; `heading` | Bodies that steer: a wanted velocity, and a limit on how hard they can turn | `maxForce` from 0.1× `maxSpeed` (a ship) to 5× (an insect); `arrive` slow radius ≈ `maxSpeed` × 0.2 s |
| `joined({...rope(…) \| cloth(…) \| blob(…), g, pins})`, `pathThrough(points)` | Things held together: a cord, a sheet, a soft body. `pins` tie points to a driver that moves | `damping` 0.02–0.6; `blob` pressure 0.3–0.9 |

Spring, with `period` 18 f (verified by `spring` itself):

| `damping` | Feels like | Overshoot | Settles within 1% in |
|---|---|---|---|
| 0.3 | rubber, jelly | 37% | 42 f |
| 0.6 | a firm settle | 9% | 18 f |
| 1 | the fastest arrival with no overshoot | none | 20 f |
| 1.5 | honey, resin | none | 36 f |

Change `period` to make the whole thing faster or slower; the overshoot stays the same.

**Follow-through comes from joining, not from a delay.** Hang the secondary thing from its driver with `joined` and `pins`: it leaves late, swings past where the driver stops and returns, with a cord that bends on the way (`examples/physics-kit/joined-and-particles.ts`, rows A and B). A copy of the driver's move delayed by 3 f does none of that. How far it swings depends on how hard the driver moves against gravity: a 300 px slide in 14 f throws a 210 px cord almost level with its anchor. For a calmer trail, slow the driver, shorten the cord or raise g for that mesh.

`damping` in `joined` is the share of speed kept each second. A swing keeps roughly the square root of that, so 0.02 is quiet within a second and 0.5 is still swinging after six. Start low.

**A soft body needs its area kept.** `blob` holds the length of its outline and the area inside it, so it flattens, bulges sideways, rises and settles as a dome (row C: 120 px across in the air, 177 × 52 two frames after contact, 146 × 82 at rest). It rebounds, so it is jelly or a water balloon. It is not a liquid: it never spreads, wets or splits.

**Particles are born and die.** Size and opacity come from `lifeCurve(age)`, never from a pop. Directions and speeds come from `gaussian`, so the burst is dense in the middle and thin at the edges; an even fan reads as a diagram. Emit for 2–3 frames, not one, or the burst looks like a ring.

**Intent is a limit on turning.** A steered body wants a velocity and can only change the one it has so fast. That one limit gives arcs, banking into corners and braking before a stop, with nothing keyframed (`examples/physics-kit/steering.ts`). Use it where a curve on a straight line would look pushed rather than driven.

- `arrive` is the arrival of anything that knows where it is going. It needs room to brake: at least `maxSpeed`² / (2 × `maxForce`). Its last pixels are slow by nature, about 1 px per frame; if the landing must end on a beat, finish with `spring` or a kit curve.
- `followPath` cuts each corner on the inside by roughly its look-ahead distance and stops at the last point. A cursor wants 3–4 f of look-ahead, a vehicle 6–10.
- Draw the body turned to `heading(vel)`. A shape that slides sideways along an arc undoes the effect.
- A flock with only `separate`, `align` and `cohere` settles into an even lattice after a few seconds, which looks mechanical. Add a little `wander` per body, or cut before it settles.
- A flow field gathers its followers into a few streams. Release them over time with `emitter`-style births, or the frame empties except for those streams.

## 4. Materials in numbers

`STYLE.md` names one material. These are its starting values; tune by eye on a strip, then write the final ones in the motion tokens.

| Material | Settle (`damping`, `period`) | In flight | On contact |
|---|---|---|---|
| Metal, glass, stone | 1, 10–12 f | no visible drag | stops; a heavy one shakes its neighbours 2–3 px |
| Paper, card, leaf | 0.7, 16 f | strong `drag`, plus `wind` so it never falls straight | lands late and flat, slides 1–2 f |
| Cloth, ribbon, hair | 0.4–0.5, 20–24 f | lags its driver by 3–5 f | swings past and returns once |
| Rubber, jelly | 0.3, 14–18 f | none | squashes on contact, 2–3 visible swings |
| Water | 0.5, 14 f | `drag` on anything entering it | entering things lose most of their speed in 2–3 f |
| Honey, resin, syrup | 1.5 or more, 24–36 f | `viscous`; never bounces | spreads fast at first, creeps for a long time, no overshoot |
| Smoke, dust, pollen | none | `wind` and a weak upward push; `gaussian` lifetimes | fades, never lands |

## 5. What a strip should show

Check the move with `scripts/detect.py --strip` and `--profile`, never from one still (`principles.md` §9).

| Move | The per-frame steps should… | It is wrong when… |
|---|---|---|
| Free fall | grow by the same amount every frame (2, 7, 12, 16, 21…) | they are equal, or they shrink before the impact |
| Entering a liquid | collapse within 2–3 frames, then hold a steady small value | the thing speeds up, or stops dead at the surface |
| Spring settle | shrink, cross zero and return as many times as the damping allows | it stops on one frame, or swings with a constant size |
| Honey or resin | shrink smoothly and never change sign | there is any bounce |
| Two things of different weight | differ in timing under the same force | they move in step |
| A hold with noise | change every frame by a small, uneven amount | they repeat with a visible period, or all objects sway together |

## 6. In ChatCut and Remotion

**Remotion.** Copy `assets/remotion/unrushed-physics.ts` into `src/` beside `unrushed-motion.ts`. Build every simulation once, outside the component, and read it with the frame.

**ChatCut, and any host where only this file is installed.** The agent writes the motion graphic's code, so the code has to travel in the prompt. Paste this core into the "Motion fundamentals" block, or into the motion graphic itself; it gives the same numbers as the full file. For particles, cords, soft bodies and steering, fetch the full file from `https://raw.githubusercontent.com/amladinon94-source/unrushed/main/assets/remotion/unrushed-physics.ts`.

```ts
// Unrushed physics core (MIT). Frames render in any order: no Math.random(), no state kept between frames.
type V = {x: number; y: number};
type B = {pos: V; vel: V; mass: number};
type Brake = {constant?: number; linear?: number; quad?: number}; // friction, thick liquid, air or water

export const rng = (seed: number) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

// Smooth wander, about -1..1. noise1(frame / 30, seed): one seed per object.
const hash = (i: number, seed: number) => { let h = Math.imul(i | 0, 374761393) ^ Math.imul(seed | 0, 2147483647); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
export const noise1 = (x: number, seed = 0) => { const i = Math.floor(x), t = x - i, f = t * t * t * (t * (t * 6 - 15) + 10); const a = (hash(i, seed) * 2 - 1) * t, b = (hash(i + 1, seed) * 2 - 1) * (t - 1); return (a + (b - a) * f) * 2; };

// g that makes a thing dropped from rest cover `distance` px in `frames`. One g for the whole piece.
export const gravityFor = (distance: number, frames: number, fps = 30) => (2 * distance) / (frames / fps) ** 2;

// Exact damped spring. period in frames; damping 0.3 rubber, 0.6 firm, 1 no overshoot, 1.5 honey. v0 = arrival speed, px/s.
export const spring = (frame: number, start: number, o: {from?: number; to?: number; period?: number; damping?: number; v0?: number; fps?: number} = {}) => {
	const fps = o.fps ?? 30, to = o.to ?? 1, a = (o.from ?? 0) - to, v0 = o.v0 ?? 0, z = o.damping ?? 0.6;
	const t = Math.max(0, frame - start) / fps, w = (2 * Math.PI) / ((o.period ?? 18) / fps);
	if (z < 0.999) { const wd = w * Math.sqrt(1 - z * z); return to + Math.exp(-z * w * t) * (a * Math.cos(wd * t) + ((v0 + z * w * a) / wd) * Math.sin(wd * t)); }
	if (z < 1.001) return to + Math.exp(-w * t) * (a + (v0 + w * a) * t);
	const r = w * Math.sqrt(z * z - 1), r1 = -z * w + r, r2 = -z * w - r, c2 = (v0 - r1 * a) / (r2 - r1);
	return to + (a - c2) * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);
};

// One step: pushes are summed and divided by mass; brakes only ever slow, so they cannot flip the motion.
export const step = (b: B, pushes: V[], brakes: Brake[], dt: number): B => {
	let vx = b.vel.x, vy = b.vel.y;
	for (const p of pushes) { vx += (p.x / b.mass) * dt; vy += (p.y / b.mass) * dt; }
	const speed = Math.hypot(vx, vy);
	if (speed > 1e-9) {
		let s = speed;
		for (const k of brakes) { s *= Math.exp((-(k.linear ?? 0) / b.mass) * dt); s /= 1 + ((k.quad ?? 0) / b.mass) * s * dt; s = Math.max(0, s - ((k.constant ?? 0) / b.mass) * dt); }
		vx *= s / speed; vy *= s / speed;
	}
	return {pos: {x: b.pos.x + vx * dt, y: b.pos.y + vy * dt}, vel: {x: vx, y: vy}, mass: b.mass};
};

// Build once outside the component; read any frame. `next` returns a NEW state.
export const simulate = <S,>(init: S, next: (s: S, dt: number, frame: number) => S, fps = 30, substeps = 4) => {
	const cache: S[] = [init];
	return (frame: number): S => {
		const target = Math.max(0, Math.floor(frame));
		while (cache.length <= target) { let s = cache[cache.length - 1]; for (let k = 0; k < substeps; k++) s = next(s, 1 / (fps * substeps), cache.length - 1 + k / substeps); cache.push(s); }
		return cache[target];
	};
};

// Example: a weight falls 330 px to a liquid in 12 f, is braked by it, and its label settles like honey.
// const G = gravityFor(330, 12);
// const drop = simulate({pos: {x: 540, y: 90}, vel: {x: 0, y: 0}, mass: 4}, (b, dt) =>
//   step(b, [{x: 0, y: G * b.mass}], b.pos.y > 420 ? [{quad: 0.5}] : [], dt));
// const y = drop(frame).pos.y;
// const labelY = spring(frame, 12, {from: 40, to: 0, period: 30, damping: 1.5});
```

Then name the forces per scene in one line, as with curves: "the weight falls under G, is braked by the liquid (quad 0.5) below y 420; its label settles on a spring, period 30 f, damping 1.5".

## 7. Limits

- **This is motion, not picture.** A drop that falls correctly and is drawn as a circle with a highlight still looks drawn. Material and light are a separate job.
- **No fluids.** There is no liquid surface, splash, spreading or merging here. `drag` and `viscous` describe how a solid thing moves through a liquid, `blob` is a soft solid, and particles can stand in for spray. A liquid that looks like liquid needs a shader or footage.
- **Not for many thousands of bodies.** `simulate` replays from frame 0 in each render process. Beyond a few thousand bodies, precompute positions to a file. Groups that look at each other (`separate`, `align`, `cohere`) cost the square of their count: keep them under about 300.
- **Stepped results are approximate.** At 4 substeps, a fall lands about 2% long and a terminal speed about 4% low. Where a number must be exact (a landing on a beat), use the closed forms `fall` and `spring`.
