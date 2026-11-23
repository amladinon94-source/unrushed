/**
 * Unrushed physics kit: forces, springs and noise for rendered video.
 *
 * Use it when a thing should move because something acts on it (it falls, hangs, sinks, swings,
 * is pushed) instead of travelling from A to B on a curve. For interface moves, keep the measured
 * curves in unrushed-motion.ts. See references/physics-kit.md for when to use which.
 *
 * Rendered video computes each frame on its own, in any order. A live sketch that adds velocity to
 * position on every draw call does not survive that. Everything here is therefore one of two kinds:
 *   - closed form: a pure function of the frame (`fall`, `spring`, `noise1`, `noise2`);
 *   - stepped: `simulate()` replays fixed steps from frame 0 and caches them, so frame 137 is
 *     the same on every machine and in every render order.
 * Randomness always comes from `rng(seed)`. Never call Math.random() in a composition.
 *
 * Units: pixels, seconds and frames. Forces are in px·mass/s². No dependencies; copy into src/.
 * Runs anywhere TypeScript does, so it also works inside a ChatCut motion graphic.
 *
 * The ideas (accumulate forces, divide by mass, integrate; drag, friction, attraction, springs,
 * smooth noise) are standard mechanics, organised the way Daniel Shiffman teaches them in
 * The Nature of Code. This code is Unrushed's own (MIT) and copies none of the book's.
 */

// ---------------------------------------------------------------------------------------------
// Seeded randomness
// ---------------------------------------------------------------------------------------------

/** A repeatable random source: the same seed gives the same sequence. Returns numbers in [0, 1). */
export const rng = (seed: number): (() => number) => {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

/**
 * A value from a bell curve: most results near `mean`, few far away. Use it for sizes, delays and
 * start angles of many similar things; uniform randomness looks scattered, this looks grown.
 */
export const gaussian = (rand: () => number, mean = 0, sd = 1): number => {
	const u = Math.max(rand(), 1e-12);
	const v = rand();
	return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

// ---------------------------------------------------------------------------------------------
// Smooth noise: values that wander instead of jumping
// ---------------------------------------------------------------------------------------------

const hash = (x: number, y: number, seed: number): number => {
	let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 2147483647);
	h = Math.imul(h ^ (h >>> 13), 1274126177);
	return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Smooth noise along one axis, about -1 to 1. Feed it time: `noise1(frame / 40, seed)`.
 * The divisor is the pace: 20-40 frames per unit feels alive, 90+ feels like breathing.
 * Give every object its own seed, or they all sway together.
 */
export const noise1 = (x: number, seed = 0): number => {
	const i = Math.floor(x);
	const t = x - i;
	const g0 = hash(i, 0, seed) * 2 - 1;
	const g1 = hash(i + 1, 0, seed) * 2 - 1;
	return lerp(g0 * t, g1 * (t - 1), fade(t)) * 2;
};

/** Smooth noise over a plane, about -1 to 1. Use it for flow directions, surfaces and uneven edges. */
export const noise2 = (x: number, y: number, seed = 0): number => {
	const xi = Math.floor(x);
	const yi = Math.floor(y);
	const tx = x - xi;
	const ty = y - yi;
	const dot = (ix: number, iy: number, dx: number, dy: number): number => {
		const a = hash(ix, iy, seed) * Math.PI * 2;
		return Math.cos(a) * dx + Math.sin(a) * dy;
	};
	const top = lerp(dot(xi, yi, tx, ty), dot(xi + 1, yi, tx - 1, ty), fade(tx));
	const bottom = lerp(dot(xi, yi + 1, tx, ty - 1), dot(xi + 1, yi + 1, tx - 1, ty - 1), fade(tx));
	return lerp(top, bottom, fade(ty)) * 1.41;
};

// ---------------------------------------------------------------------------------------------
// Vectors
// ---------------------------------------------------------------------------------------------

export type Vec = {x: number; y: number};
export const vec = (x = 0, y = 0): Vec => ({x, y});
export const add = (a: Vec, b: Vec): Vec => ({x: a.x + b.x, y: a.y + b.y});
export const sub = (a: Vec, b: Vec): Vec => ({x: a.x - b.x, y: a.y - b.y});
export const scale = (a: Vec, s: number): Vec => ({x: a.x * s, y: a.y * s});
export const mag = (a: Vec): number => Math.hypot(a.x, a.y);
export const unit = (a: Vec): Vec => {
	const m = mag(a);
	return m > 1e-9 ? {x: a.x / m, y: a.y / m} : {x: 0, y: 0};
};
/** Cap a vector's length: a top speed, or a limit on how hard something can steer. */
export const limit = (a: Vec, max: number): Vec => (mag(a) > max ? scale(unit(a), max) : a);
/** The angle a moving thing should face, in degrees, so it points where it is going. */
export const heading = (v: Vec): number => (Math.atan2(v.y, v.x) * 180) / Math.PI;

// ---------------------------------------------------------------------------------------------
// Closed form: pure functions of the frame
// ---------------------------------------------------------------------------------------------

/**
 * The gravity that makes a thing dropped from rest cover `distance` px in `frames` frames.
 * Storyboards say "falls 600 px in 12 f"; this turns that into the g every other object in the
 * scene must share. One world, one gravity: do not give each object its own.
 */
export const gravityFor = (distance: number, frames: number, fps = 30): number =>
	(2 * distance) / Math.pow(frames / fps, 2);

/** Free fall: distance travelled and speed, `frame - start` frames after release. No air, no floor. */
export const fall = (frame: number, start: number, opts: {g: number; v0?: number; fps?: number}) => {
	const t = Math.max(0, frame - start) / (opts.fps ?? 30);
	const v0 = opts.v0 ?? 0;
	return {distance: v0 * t + 0.5 * opts.g * t * t, speed: v0 + opts.g * t};
};

/**
 * A damped spring from `from` to `to`, solved exactly, so there is no step error and no state.
 *
 * `period` is the length of one full swing in frames (stiffness, in the unit a storyboard uses).
 * `damping` is how fast the swing dies: 0.2-0.4 rubber and jelly, 0.5-0.7 a firm settle with one
 * small overshoot, 1 the fastest arrival with none, above 1 honey and resin (slow, never passes).
 * `v0` is the speed on arrival in px/s; pass the speed of the move that came before, so the
 * handoff from a fall or a throw into the settle has no kink.
 */
export const spring = (
	frame: number,
	start: number,
	opts: {from?: number; to?: number; period?: number; damping?: number; v0?: number; fps?: number} = {},
) => {
	const from = opts.from ?? 0;
	const to = opts.to ?? 1;
	const t = Math.max(0, frame - start) / (opts.fps ?? 30);
	const w = (2 * Math.PI) / ((opts.period ?? 18) / (opts.fps ?? 30));
	const z = Math.max(0, opts.damping ?? 0.6);
	const a = from - to;
	const v0 = opts.v0 ?? 0;
	let x: number;
	let v: number;
	if (z < 1 - 1e-6) {
		const wd = w * Math.sqrt(1 - z * z);
		const b = (v0 + z * w * a) / wd;
		const e = Math.exp(-z * w * t);
		const c = Math.cos(wd * t);
		const s = Math.sin(wd * t);
		x = e * (a * c + b * s);
		v = e * ((b * wd - z * w * a) * c - (a * wd + z * w * b) * s);
	} else if (z < 1 + 1e-6) {
		const b = v0 + w * a;
		const e = Math.exp(-w * t);
		x = e * (a + b * t);
		v = e * (b - w * (a + b * t));
	} else {
		const r = w * Math.sqrt(z * z - 1);
		const r1 = -z * w + r;
		const r2 = -z * w - r;
		const c2 = (v0 - r1 * a) / (r2 - r1);
		const c1 = a - c2;
		x = c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);
		v = c1 * r1 * Math.exp(r1 * t) + c2 * r2 * Math.exp(r2 * t);
	}
	return {value: to + x, velocity: v};
};

/** Frames until a spring stays within `within` (a fraction of its travel) of its target. */
export const springSettle = (opts: {period?: number; damping?: number; fps?: number} = {}, within = 0.01): number => {
	const total = 600;
	let last = 0;
	for (let fr = 0; fr <= total; fr++) {
		if (Math.abs(spring(fr, 0, {...opts, from: 1, to: 0}).value) > within) last = fr;
	}
	return last + 1;
};

// ---------------------------------------------------------------------------------------------
// Forces: each returns the push on one body, in px·mass/s²
// ---------------------------------------------------------------------------------------------

export type Body = {pos: Vec; vel: Vec; mass: number};
export const body = (x: number, y: number, mass = 1, vx = 0, vy = 0): Body => ({pos: vec(x, y), vel: vec(vx, vy), mass});

/** Weight. Scaled by mass, so heavy and light things fall together until something resists them. */
export const gravity = (b: Body, g: number): Vec => vec(0, g * b.mass);

/**
 * A resistance: something that only ever slows a body down. `step` applies these exactly instead of
 * as ordinary forces, so a strong brake can never flip the direction of travel or blow up, whatever
 * the frame rate. (Applied as plain forces, thick liquids do exactly that.)
 */
export type Resist = {constant?: number; linear?: number; quad?: number};
export type Force = Vec | Resist;

/**
 * Sliding friction: a constant brake, the same at any speed, that brings a thing to a full stop.
 * `mu` 0.02 is ice, 0.3 is felt. `normal` is how hard the surface presses back, usually mass × g.
 */
export const friction = (mu: number, normal: number): Resist => ({constant: mu * normal});

/**
 * Resistance of air or thin liquid: grows with the square of the speed, so fast things are braked
 * hard and slow things barely. This is what makes a thing entering water lose most of its speed in
 * two or three frames and then sink at a steady pace. Top speed while falling is sqrt(mass × g / c),
 * so the heavy thing sinks faster. `c` scales with the size facing the flow.
 */
export const drag = (c: number): Resist => ({quad: c});

/**
 * Thick-liquid resistance: grows in step with the speed. Slow creeping flow (resin, syrup, honey),
 * and the damping that stops a spring from swinging for ever. Top speed while falling is mass × g / c.
 */
export const viscous = (c: number): Resist => ({linear: c});

/**
 * A spring tied to an anchor. `rest` is its relaxed length. Pair it with `viscous(c)` or the body
 * swings for ever. With rest > 0 and gravity this is a thing hanging from a cord.
 */
export const springTo = (b: Body, anchor: Vec, k: number, rest = 0): Vec => {
	const d = sub(b.pos, anchor);
	return scale(unit(d), -k * (mag(d) - rest));
};

/**
 * Attraction toward a point or another body (negative `strength` repels). The distance is clamped
 * so the pull neither explodes at contact nor fades to nothing far away.
 */
export const attract = (
	b: Body,
	to: Vec,
	strength: number,
	opts: {toMass?: number; min?: number; max?: number} = {},
): Vec => {
	const d = sub(to, b.pos);
	const dist = Math.min(opts.max ?? 400, Math.max(opts.min ?? 20, mag(d)));
	return scale(unit(d), (strength * b.mass * (opts.toMass ?? 1)) / (dist * dist));
};

/** Wind and currents: a push whose direction wanders smoothly over space and time. */
export const wind = (b: Body, frame: number, strength: number, opts: {scale?: number; pace?: number; seed?: number} = {}): Vec => {
	const s = opts.scale ?? 400;
	const a = noise2(b.pos.x / s + frame / (opts.pace ?? 60), b.pos.y / s, opts.seed ?? 0) * Math.PI * 2;
	return vec(Math.cos(a) * strength, Math.sin(a) * strength);
};

/**
 * Advance one body by `dt` seconds under its forces and resistances. Acceleration is force over
 * mass, which is where weight comes from: the same push moves a heavy body less.
 */
export const step = (b: Body, forces: Force[], dt: number): Body => {
	let fx = 0;
	let fy = 0;
	let constant = 0;
	let linear = 0;
	let quad = 0;
	for (const fr of forces) {
		if ('x' in fr) {
			fx += fr.x;
			fy += fr.y;
		} else {
			constant += fr.constant ?? 0;
			linear += fr.linear ?? 0;
			quad += fr.quad ?? 0;
		}
	}
	let vx = b.vel.x + (fx / b.mass) * dt;
	let vy = b.vel.y + (fy / b.mass) * dt;
	let speed = Math.hypot(vx, vy);
	if (speed > 1e-9) {
		let slowed = speed * Math.exp((-linear / b.mass) * dt);
		slowed = slowed / (1 + (quad / b.mass) * slowed * dt);
		slowed = Math.max(0, slowed - (constant / b.mass) * dt);
		vx *= slowed / speed;
		vy *= slowed / speed;
	}
	return {pos: vec(b.pos.x + vx * dt, b.pos.y + vy * dt), vel: vec(vx, vy), mass: b.mass};
};

// ---------------------------------------------------------------------------------------------
// Stepped simulation, safe for out-of-order rendering
// ---------------------------------------------------------------------------------------------

/**
 * Build a simulation once, outside the component, and read any frame from it:
 *
 *   const drop = simulate({
 *     init: body(540, 200, 2),
 *     fps: 30,
 *     step: (b, dt, t) => step(b, [gravity(b, G), b.pos.y > SURFACE ? drag(0.02) : vec()], dt),
 *   });
 *   const {pos} = drop(frame);
 *
 * `step` receives the state, the step length in seconds and the time in seconds, and returns the
 * NEW state without changing the old one. `substeps` are the physics steps per frame: 4 is enough
 * for falls and drag, use 8 for stiff springs. The state can be one body or a whole array.
 *
 * Each render process replays from frame 0 once and caches. Keep it under a few thousand bodies,
 * or precompute the positions to a file.
 */
export const simulate = <S>(opts: {
	init: S;
	step: (state: S, dt: number, t: number) => S;
	fps?: number;
	substeps?: number;
}): ((frame: number) => S) => {
	const fps = opts.fps ?? 30;
	const sub = opts.substeps ?? 4;
	const dt = 1 / (fps * sub);
	const cache: S[] = [opts.init];
	return (frame: number): S => {
		const target = Math.max(0, Math.floor(frame));
		while (cache.length <= target) {
			let s = cache[cache.length - 1];
			const base = (cache.length - 1) * sub;
			for (let k = 0; k < sub; k++) s = opts.step(s, dt, (base + k) * dt);
			cache.push(s);
		}
		return cache[target];
	};
};

// ---------------------------------------------------------------------------------------------
// Particles: many short-lived things from one source
// ---------------------------------------------------------------------------------------------

export type Particle = Body & {
	/** Stable index: use it as the React key and as the seed for anything that varies per particle. */
	id: number;
	/** 0 at birth, 1 at death. Drive size and opacity from it so nothing pops in or out. */
	age: number;
	/** Lifetime in frames, fixed at birth. */
	life: number;
};

/**
 * A source that emits particles, moves them under forces and retires them.
 *
 *   const dust = emitter({
 *     seed: 4, rate: 3, life: [40, 8],
 *     spawn: (rand) => body(540 + gaussian(rand, 0, 12), 900, 1, gaussian(rand, 0, 60), -gaussian(rand, 500, 80)),
 *     forces: (p, frame) => [gravity(p, G), drag(0.002), wind(p, frame, 40)],
 *   });
 *   dust(frame).map((p) => <circle key={p.id} cx={p.pos.x} cy={p.pos.y} r={6 * (1 - p.age)} />)
 *
 * `rate` is particles per frame and may be a fraction or a function of the frame (a burst is a rate
 * that is high for 2-3 frames and then 0). `life` is [mean, spread] in frames. `spawn` receives a
 * random source that belongs to that particle alone. Vary speed and angle with `gaussian`: a fan of
 * evenly spaced directions reads as a diagram. `until` stops emission at that frame.
 */
export const emitter = (opts: {
	seed?: number;
	rate: number | ((frame: number) => number);
	life: [number, number];
	spawn: (rand: () => number, id: number, frame: number) => Body;
	forces?: (p: Particle, frame: number) => Force[];
	until?: number;
	fps?: number;
	substeps?: number;
}): ((frame: number) => Particle[]) => {
	const fps = opts.fps ?? 30;
	const sub = opts.substeps ?? 2;
	const seed = opts.seed ?? 1;
	type State = {parts: Particle[]; next: number; owed: number; frame: number};
	const birth = (s: State): State => {
		if (opts.until !== undefined && s.frame >= opts.until) return s;
		const rate = typeof opts.rate === 'function' ? opts.rate(s.frame) : opts.rate;
		let owed = s.owed + Math.max(0, rate);
		let next = s.next;
		const parts = s.parts.slice();
		while (owed >= 1) {
			const rand = rng(seed * 7919 + next * 104729);
			const life = Math.max(2, Math.round(gaussian(rand, opts.life[0], opts.life[1])));
			parts.push({...opts.spawn(rand, next, s.frame), id: next, age: 0, life});
			next++;
			owed -= 1;
		}
		return {...s, parts, next, owed};
	};
	const run = simulate<State>({
		init: birth({parts: [], next: 0, owed: 0, frame: 0}),
		fps: fps,
		substeps: 1,
		step: (s) => {
			const dt = 1 / (fps * sub);
			const moved: Particle[] = [];
			for (const p of s.parts) {
				const age = p.age + 1 / p.life;
				if (age >= 1) continue;
				let b: Body = p;
				for (let k = 0; k < sub; k++) b = step(b, opts.forces ? opts.forces({...p, ...b}, s.frame) : [], dt);
				moved.push({...b, id: p.id, age, life: p.life});
			}
			return birth({...s, parts: moved, frame: s.frame + 1});
		},
	});
	return (frame: number) => run(frame).parts;
};

/** Size or opacity over a particle's life: quick in, slow out, zero at both ends. */
export const lifeCurve = (age: number, peak = 0.2): number =>
	age < peak ? age / peak : Math.max(0, 1 - (age - peak) / (1 - peak));

// ---------------------------------------------------------------------------------------------
// Joined things: cords, cloth and soft bodies (position-based, so they cannot blow up)
// ---------------------------------------------------------------------------------------------

export type Link = {a: number; b: number; rest: number; stiffness?: number};
export type Mesh = {
	points: Vec[];
	links: Link[];
	/** Indices of a closed outline whose enclosed area is kept, so a soft body bulges where it is squeezed. */
	ring?: number[];
	/** How firmly the area is kept, 0-1 per frame. */
	pressure?: number;
};

/** A cord of `segments` links from `from` to `to`. Pin point 0 (and the last one for a hanging line). */
export const rope = (from: Vec, to: Vec, segments: number, slack = 1): Mesh => {
	const points: Vec[] = [];
	for (let i = 0; i <= segments; i++) points.push(vec(lerp(from.x, to.x, i / segments), lerp(from.y, to.y, i / segments)));
	const rest = (mag(sub(to, from)) / segments) * slack;
	const links: Link[] = [];
	for (let i = 0; i < segments; i++) links.push({a: i, b: i + 1, rest});
	return {points, links};
};

/** A sheet of cols × rows points, `gap` px apart, top-left at `origin`. Point index = row × cols + col. */
export const cloth = (origin: Vec, cols: number, rows: number, gap: number): Mesh => {
	const points: Vec[] = [];
	const links: Link[] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			points.push(vec(origin.x + c * gap, origin.y + r * gap));
			const i = r * cols + c;
			if (c > 0) links.push({a: i - 1, b: i, rest: gap});
			if (r > 0) links.push({a: i - cols, b: i, rest: gap});
		}
	}
	return {points, links};
};

/**
 * A soft body: a closed outline of `n` points that keeps its length and the area inside it. Dropped
 * on a floor it flattens, bulges sideways and recovers. `pressure` 0.3 is a water balloon, 0.6 a
 * thick drop, 0.9 firm jelly. Draw it with `pathThrough(points, true)`.
 */
export const blob = (centre: Vec, radius: number, n = 20, pressure = 0.6): Mesh => {
	const points: Vec[] = [];
	const links: Link[] = [];
	const ring: number[] = [];
	for (let i = 0; i < n; i++) {
		const a = (i / n) * Math.PI * 2;
		points.push(vec(centre.x + Math.cos(a) * radius, centre.y + Math.sin(a) * radius));
		ring.push(i);
	}
	const side = 2 * radius * Math.sin(Math.PI / n);
	for (let i = 0; i < n; i++) links.push({a: i, b: (i + 1) % n, rest: side});
	return {points, links, ring, pressure};
};

/**
 * Move a mesh under gravity and its links.
 *
 *   const cord = joined({
 *     ...rope(vec(540, 300), vec(540, 700), 12),
 *     g: G,
 *     pins: {0: (frame) => vec(anchorX(frame), 300)},   // the first point follows a driver
 *   });
 *   const pts = cord(frame);
 *
 * `pins` fixes points to a position that may move with the frame: that is how a tag hangs from a
 * sliding card, or a curtain from a rail. `damping` is the speed kept per second: 0.9 swings for a
 * long time, 0.3 is heavy cloth or a cord in honey. `floor` stops points at that y. `forces` adds a
 * push per point (wind). More `iterations` make the links stiffer.
 */
export const joined = (opts: Mesh & {
	g?: number;
	pins?: Record<number, Vec | ((frame: number) => Vec)>;
	forces?: (p: Vec, i: number, frame: number) => Vec;
	damping?: number;
	floor?: number;
	iterations?: number;
	fps?: number;
	substeps?: number;
}): ((frame: number) => Vec[]) => {
	const fps = opts.fps ?? 30;
	const sub = opts.substeps ?? 4;
	const iterations = opts.iterations ?? 6;
	const keep = Math.pow(Math.min(1, Math.max(0, opts.damping ?? 0.6)), 1 / (fps * sub));
	const pinAt = (i: number, frame: number): Vec | null => {
		const p = opts.pins?.[i];
		if (!p) return null;
		return typeof p === 'function' ? p(frame) : p;
	};
	// A link's stiffness is the share of its error corrected per frame, whatever the step counts are.
	const soft = (k: number): number => (k >= 1 ? 1 : 1 - Math.pow(1 - Math.max(0, k), 1 / (iterations * sub)));
	const areaOf = (pts: Vec[], ring: number[]): number => {
		let a = 0;
		for (let i = 0; i < ring.length; i++) {
			const p = pts[ring[i]];
			const q = pts[ring[(i + 1) % ring.length]];
			a += p.x * q.y - q.x * p.y;
		}
		return a / 2;
	};
	const restArea = opts.ring ? areaOf(opts.points, opts.ring) : 0;
	type State = {now: Vec[]; before: Vec[]};
	const run = simulate<State>({
		init: {now: opts.points, before: opts.points},
		fps,
		substeps: sub,
		step: (s, dt, t) => {
			const frame = t * fps;
			const now = s.now.map((p, i) => {
				const pin = pinAt(i, frame + 1 / sub);
				if (pin) return pin;
				const push = opts.forces ? opts.forces(p, i, frame) : vec();
				return vec(
					p.x + (p.x - s.before[i].x) * keep + push.x * dt * dt,
					p.y + (p.y - s.before[i].y) * keep + (push.y + (opts.g ?? 0)) * dt * dt,
				);
			});
			for (let k = 0; k < iterations; k++) {
				for (const l of opts.links) {
					const d = sub2(now[l.b], now[l.a]);
					const len = Math.max(1e-6, Math.hypot(d.x, d.y));
					const diff = ((len - l.rest) / len) * soft(l.stiffness ?? 1);
					const pa = pinAt(l.a, frame) !== null;
					const pb = pinAt(l.b, frame) !== null;
					if (pa && pb) continue;
					const wa = pa ? 0 : pb ? 1 : 0.5;
					const wb = pb ? 0 : pa ? 1 : 0.5;
					now[l.a] = vec(now[l.a].x + d.x * diff * wa, now[l.a].y + d.y * diff * wa);
					now[l.b] = vec(now[l.b].x - d.x * diff * wb, now[l.b].y - d.y * diff * wb);
				}
				if (opts.ring && restArea !== 0) {
					// Push every outline point along its outward normal until the enclosed area is back.
					const ring = opts.ring;
					const n = ring.length;
					const normals: Vec[] = [];
					let perimeter = 0;
					for (let i = 0; i < n; i++) {
						const prev = now[ring[(i + n - 1) % n]];
						const next = now[ring[(i + 1) % n]];
						const sign = restArea > 0 ? 1 : -1;
						normals.push(unit(vec((next.y - prev.y) * sign, -(next.x - prev.x) * sign)));
						perimeter += Math.hypot(next.x - now[ring[i]].x, next.y - now[ring[i]].y);
					}
					const lack = Math.abs(restArea) - Math.abs(areaOf(now, ring));
					const push = (lack / Math.max(1e-6, perimeter)) * soft(opts.pressure ?? 0.6);
					for (let i = 0; i < n; i++) {
						if (pinAt(ring[i], frame) !== null) continue;
						now[ring[i]] = vec(now[ring[i]].x + normals[i].x * push, now[ring[i]].y + normals[i].y * push);
					}
				}
				if (opts.floor !== undefined) {
					for (let i = 0; i < now.length; i++) if (now[i].y > opts.floor) now[i] = vec(now[i].x, opts.floor);
				}
			}
			return {now, before: s.now};
		},
	});
	return (frame: number) => run(frame).now;
};
const sub2 = sub;

/** A smooth SVG path through points (a cord, a cloth edge, a blob outline when `closed`). */
export const pathThrough = (pts: Vec[], closed = false): string => {
	if (pts.length < 2) return '';
	const n = pts.length;
	const at = (i: number): Vec => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
	let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
	const last = closed ? n : n - 1;
	for (let i = 0; i < last; i++) {
		const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
		d += ` C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
	}
	return closed ? d + ' Z' : d;
};

// ---------------------------------------------------------------------------------------------
// Things that move on purpose: steering
// ---------------------------------------------------------------------------------------------
//
// A steered thing has a speed it wants and a limit on how hard it can turn. Every behaviour below
// returns "the velocity I want minus the velocity I have", capped at `maxForce`. Because the turn is
// limited, paths curve, and a thing that starts off-course arrives on an arc instead of a straight line.
// Low maxForce (a tenth of maxSpeed per second) is a heavy ship; high (5× maxSpeed) is an insect.

// `maxForce` is in px/s². A velocity error is closed in about two frames unless that cap is reached.
const RESPONSE = 15;
const steer = (b: Body, wanted: Vec, maxForce: number): Vec =>
	scale(limit(scale(sub(wanted, b.vel), RESPONSE), maxForce), b.mass);

/** Head for a point at full speed. It overshoots and circles back; for an arrival use `arrive`. */
export const seek = (b: Body, target: Vec, maxSpeed: number, maxForce: number): Vec =>
	steer(b, scale(unit(sub(target, b.pos)), maxSpeed), maxForce);

/** Head away from a point, but only when it is nearer than `radius`. */
export const flee = (b: Body, from: Vec, maxSpeed: number, maxForce: number, radius = 200): Vec => {
	const d = sub(b.pos, from);
	return mag(d) > radius ? vec() : steer(b, scale(unit(d), maxSpeed), maxForce);
};

/**
 * Head for a point and slow down inside `slowRadius` so it stops there. This is the natural
 * deceleration of anything that knows where it is going: a hand, a cursor, a bird landing.
 * The braking distance should be at least maxSpeed² / (2 × maxForce), or it cannot stop in time.
 */
export const arrive = (b: Body, target: Vec, maxSpeed: number, maxForce: number, slowRadius = 160): Vec => {
	const d = sub(target, b.pos);
	const dist = mag(d);
	return steer(b, scale(unit(d), maxSpeed * Math.min(1, dist / slowRadius)), maxForce);
};

/** Roam with no target: the heading drifts smoothly. Give each agent its own seed. */
export const wander = (b: Body, frame: number, maxSpeed: number, maxForce: number, opts: {pace?: number; seed?: number} = {}): Vec => {
	const base = mag(b.vel) > 1e-6 ? Math.atan2(b.vel.y, b.vel.x) : 0;
	const a = base + noise1(frame / (opts.pace ?? 30), opts.seed ?? 0) * 1.2;
	return steer(b, vec(Math.cos(a) * maxSpeed, Math.sin(a) * maxSpeed), maxForce);
};

/**
 * A direction for every point of the frame, changing slowly in space and time: wind, a current,
 * the grain of a surface. `scale` is the size of its swirls in px (300-600 for broad streams,
 * 80-150 for turbulence); `pace` is how many frames it takes to change (0 freezes it).
 */
export const flowAt = (p: Vec, frame = 0, opts: {scale?: number; pace?: number; seed?: number; turns?: number} = {}): Vec => {
	const s = opts.scale ?? 400;
	const z = opts.pace ? frame / opts.pace : 0;
	const a = noise2(p.x / s + z * 0.37, p.y / s - z * 0.21, opts.seed ?? 0) * Math.PI * (opts.turns ?? 2);
	return vec(Math.cos(a), Math.sin(a));
};

/** Follow a direction (from `flowAt`, or any unit vector) at full speed. */
export const follow = (b: Body, direction: Vec, maxSpeed: number, maxForce: number): Vec =>
	steer(b, scale(unit(direction), maxSpeed), maxForce);

/**
 * Stay on a path of straight segments, within `radius` px of it. It looks ahead along its own
 * velocity, and steers back only when that future position is off the path, so it cuts corners
 * smoothly instead of tracing them, and it stops at the last point. `ahead` is how many frames it
 * looks forward: more cuts corners wider, less hugs them. Use it for anything that travels a route:
 * a cursor, a vehicle, a line that draws itself with weight.
 */
export const followPath = (
	b: Body,
	path: Vec[],
	maxSpeed: number,
	maxForce: number,
	opts: {radius?: number; ahead?: number} = {},
): Vec => {
	const ahead = opts.ahead ?? 6;
	const future = add(b.pos, scale(unit(b.vel), (mag(b.vel) * ahead) / 30));
	let best: Vec | null = null;
	let bestDist = Infinity;
	let along = vec(1, 0);
	for (let i = 0; i < path.length - 1; i++) {
		const a = path[i];
		const seg = sub(path[i + 1], a);
		const len2 = Math.max(1e-9, seg.x * seg.x + seg.y * seg.y);
		const t = Math.max(0, Math.min(1, ((future.x - a.x) * seg.x + (future.y - a.y) * seg.y) / len2));
		const foot = add(a, scale(seg, t));
		const d = mag(sub(future, foot));
		// On a tie (the foot is a shared corner) the later segment wins, so it turns instead of stalling.
		if (d <= bestDist + 1e-6) {
			bestDist = d;
			best = foot;
			along = unit(seg);
		}
	}
	if (!best) return vec();
	const end = path[path.length - 1];
	if (mag(sub(best, end)) < 1e-6) return arrive(b, end, maxSpeed, maxForce, 120);
	if (bestDist <= (opts.radius ?? 20) && mag(b.vel) > 1e-6) return follow(b, along, maxSpeed, maxForce);
	return seek(b, add(best, scale(along, 30)), maxSpeed, maxForce);
};

/** Keep a distance from neighbours nearer than `radius`: the closer they are, the harder the push. */
export const separate = (b: Body, others: Body[], maxSpeed: number, maxForce: number, radius = 40): Vec => {
	let sx = 0;
	let sy = 0;
	let n = 0;
	for (const o of others) {
		if (o === b) continue;
		const d = sub(b.pos, o.pos);
		const dist = mag(d);
		if (dist > 1e-6 && dist < radius) {
			sx += d.x / (dist * dist);
			sy += d.y / (dist * dist);
			n++;
		}
	}
	return n ? steer(b, scale(unit(vec(sx, sy)), maxSpeed), maxForce) : vec();
};

/** Turn to match the average heading of neighbours within `radius`. */
export const align = (b: Body, others: Body[], maxSpeed: number, maxForce: number, radius = 90): Vec => {
	let sx = 0;
	let sy = 0;
	let n = 0;
	for (const o of others) {
		if (o === b || mag(sub(b.pos, o.pos)) > radius) continue;
		sx += o.vel.x;
		sy += o.vel.y;
		n++;
	}
	return n ? steer(b, scale(unit(vec(sx, sy)), maxSpeed), maxForce) : vec();
};

/** Drift toward the centre of neighbours within `radius`. */
export const cohere = (b: Body, others: Body[], maxSpeed: number, maxForce: number, radius = 90): Vec => {
	let sx = 0;
	let sy = 0;
	let n = 0;
	for (const o of others) {
		if (o === b || mag(sub(b.pos, o.pos)) > radius) continue;
		sx += o.pos.x;
		sy += o.pos.y;
		n++;
	}
	return n ? seek(b, vec(sx / n, sy / n), maxSpeed, maxForce) : vec();
};

/**
 * A group of steered bodies.
 *
 *   const birds = agents({
 *     init: Array.from({length: 60}, (_, i) => { const r = rng(i); return body(r() * 1080, r() * 600, 1, 80, 0); }),
 *     maxSpeed: 260,
 *     steer: (b, all, frame) => [
 *       scale(separate(b, all, 260, 700, 34), 1.6),   // weights are where the character is
 *       align(b, all, 260, 400),
 *       cohere(b, all, 260, 300),
 *     ],
 *   });
 *   birds(frame).map((b, i) => <g key={i} transform={`translate(${b.pos.x} ${b.pos.y}) rotate(${heading(b.vel)})`} />)
 *
 * `steer` returns the pushes on one agent given all of them. Speed is capped at `maxSpeed`.
 * Cost grows with the square of the count: keep groups under about 300, or precompute.
 */
export const agents = (opts: {
	init: Body[];
	steer: (b: Body, all: Body[], frame: number, index: number) => Force[];
	maxSpeed: number;
	fps?: number;
	substeps?: number;
}): ((frame: number) => Body[]) => {
	const fps = opts.fps ?? 30;
	return simulate<Body[]>({
		init: opts.init,
		fps,
		substeps: opts.substeps ?? 2,
		step: (all, dt, t) =>
			all.map((b, i) => {
				const next = step(b, opts.steer(b, all, t * fps, i), dt);
				const vel = limit(next.vel, opts.maxSpeed);
				return {pos: add(b.pos, scale(vel, dt)), vel, mass: b.mass};
			}),
	});
};
