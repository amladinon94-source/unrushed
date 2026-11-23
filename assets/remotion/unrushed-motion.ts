/**
 * Unrushed motion kit for Remotion.
 *
 * Measured curves and the moves built from them, so a composition uses the values in
 * references/motion-kit.md instead of improvising. Copy this file into your project's src/.
 *
 * The curve shapes, durations and ratios come from frame-by-frame measurements of professional
 * motion published by the motionmaxxing project (Apache-2.0, github.com/Tejashmakwana/motionmaxxing).
 * The cubic-bezier fits and this code are Unrushed's own (MIT).
 *
 * Every function is a pure function of the frame, so renders are deterministic.
 * Durations are given in frames at 30 fps; pass `fps` from useVideoConfig() and they are rescaled.
 */
import {Easing, interpolate} from 'remotion';

type EasingFn = (t: number) => number;

/** The measured curves as cubic-bezier fits (error under 0.001 except the three that overshoot). */
export const ease = {
	/** Firm landing. Text rises, panels slide, scale-ins. The workhorse for entries. */
	softLand: Easing.bezier(0.22, 0.776, 0.511, 0.942),
	/** Hero entry and closing moves: most of the travel at once, then a soft tail. */
	snapSettle: Easing.bezier(0.136, 1.058, 0.298, 0.943),
	/** Gentle landing for medium moves and camera pushes. */
	glide: Easing.bezier(0.524, 0.892, 0.878, 0.995),
	/** Big fast decelerating moves; the arriving half of a whip. */
	whip: Easing.bezier(0.375, 0.947, 0.721, 1.0),
	/** Symmetric S for opacity, blur, colour ramps and counters tied to a control. */
	softInOut: Easing.bezier(0.345, 0.074, 0.655, 0.926),
	/** Mild acceleration: fade-out starts, slow pushes into a cut. */
	gentleIn: Easing.bezier(0.252, 0, 0.595, 0.161),
	/** The leaving curve: exits off frame, scale exits. Peak speed near the end. */
	accelExit: Easing.bezier(0.288, 0, 0.632, 0.043),
	/** Hard acceleration into a cut at full speed. */
	crashOut: Easing.bezier(0.434, 0, 0.73, 0),
	/** Linear: drift, camera creep, fades, counters. */
	cruise: Easing.linear,
	/** The one late lean past the mark (peak about 1.08 at 72% of the time). Once per piece. */
	popOver: Easing.bezier(0.295, 0.157, 0.309, 1.398),
} satisfies Record<string, EasingFn>;

export type EaseName = keyof typeof ease;

/** Median durations in frames at 30 fps for each curve's usual job. */
export const frames30: Record<EaseName, number> = {
	softLand: 12,
	snapSettle: 11,
	glide: 10,
	whip: 8,
	softInOut: 9,
	gentleIn: 9,
	accelExit: 13,
	crashOut: 17,
	cruise: 9,
	popOver: 15,
};

/** Rescale a duration measured at 30 fps to the composition's frame rate. */
export const f = (framesAt30: number, fps = 30): number => Math.max(1, Math.round((framesAt30 * fps) / 30));

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Progress 0 to 1 of a move that starts at `start` and lasts `duration` frames, shaped by a curve. */
export const progress = (frame: number, start: number, duration: number, curve: EasingFn = ease.softLand): number =>
	interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {...clamp, easing: curve});

/**
 * Land: an element arrives by moving and decelerating. Returns the offset to apply (px or any unit)
 * and an opacity that is only a short helper under the move (4-6 frames), never the move itself.
 * Typical offsets: words 3-7% of the height; cards from below the frame.
 */
export const land = (
	frame: number,
	start: number,
	opts: {from?: number; duration?: number; curve?: EaseName; fps?: number} = {},
) => {
	const fps = opts.fps ?? 30;
	const duration = f(opts.duration ?? frames30.softLand, fps);
	const p = progress(frame, start, duration, ease[opts.curve ?? 'softLand']);
	const from = opts.from ?? 40;
	const opacity = interpolate(frame, [start, start + f(5, fps)], [0.2, 1], clamp);
	return {offset: from * (1 - p), opacity, done: p >= 1};
};

/** Leave: accelerate away and still be moving on the last frame, so the cut inherits the speed. */
export const leave = (
	frame: number,
	start: number,
	opts: {to?: number; duration?: number; intoCut?: boolean; fps?: number} = {},
) => {
	const fps = opts.fps ?? 30;
	const curve = opts.intoCut ? 'crashOut' : 'accelExit';
	const duration = f(opts.duration ?? frames30[curve], fps);
	const p = progress(frame, start, duration, ease[curve]);
	return {offset: (opts.to ?? 200) * p, progress: p};
};

/**
 * Arrive from oversize: identity objects (a logo, a key word, a card, a cursor) start larger and come
 * down to rest. Never grow them from zero. Spend the big version once per piece; a calm brand uses 1.1-1.9.
 */
export const arrive = (
	frame: number,
	start: number,
	opts: {from?: number; duration?: number; fps?: number} = {},
): number => {
	const fps = opts.fps ?? 30;
	const duration = f(opts.duration ?? 18, fps);
	const p = progress(frame, start, duration, ease.snapSettle);
	return interpolate(p, [0, 1], [opts.from ?? 1.6, 1]);
};

/** Blur to focus: px of blur that resolves to 0 (type 3-6, status words 8-12, a logo up to 18). */
export const focus = (frame: number, start: number, opts: {from?: number; duration?: number; fps?: number} = {}) =>
	(opts.from ?? 6) * (1 - progress(frame, start, f(opts.duration ?? 6, opts.fps ?? 30), ease.glide));

/**
 * Uneven stagger: the start frame of the i-th sibling. Siblings (letters, rows, tiles) start 1-3 frames
 * apart with uneven gaps; whole words 2-5 (hook 2-4, headline 4-6, voice-led 8-12); a closing stack about 8.
 * Each move should last about twice the gap, so tails overlap.
 */
export const stagger = (i: number, gaps: number[] = [3, 2, 2, 3, 2, 2], fps = 30): number => {
	let at = 0;
	for (let k = 0; k < i; k++) at += gaps[k % gaps.length];
	return Math.round((at * fps) / 30);
};

/** Drift: keep a held frame alive. Linear, 1-3 px per frame, or a 0.5-1% scale creep. */
export const drift = (frame: number, start: number, pxPerFrame = 1.5): number =>
	Math.max(0, frame - start) * pxPerFrame;

/**
 * Press: the cursor parks, presses fast and releases slower; the target answers a frame later.
 * Returns scales for the cursor and the target, and whether the target is in its pressed state.
 */
export const press = (
	frame: number,
	at: number,
	opts: {cursorDepth?: number; targetDepth?: number; down?: number; up?: number; rebound?: boolean; fps?: number} = {},
) => {
	const fps = opts.fps ?? 30;
	const down = f(opts.down ?? 2, fps);
	const up = f(opts.up ?? 10, fps);
	const lag = f(1, fps);
	const curve = (s: number, depth: number, d: number) => {
		if (frame < s) return 1;
		if (frame < s + d) return interpolate(frame, [s, s + d], [1, depth], {...clamp, easing: ease.glide});
		const back = opts.rebound ? ease.popOver : ease.softLand;
		return interpolate(frame, [s + d, s + d + up], [depth, 1], {...clamp, easing: back});
	};
	return {
		cursor: curve(at, opts.cursorDepth ?? 0.85, down),
		target: curve(at + lag, opts.targetDepth ?? 0.8, f(6, fps)),
		pressed: frame >= at + lag,
	};
};

/**
 * Push multiplier for a camera move of a given length, from the measured pairings:
 * about 1.25 for a 6-frame punch, 1.4 for 12-18 frames, 1.5 for 20-45 frames, up to 2.4 for a slow drift.
 */
export const pushFor = (durationAt30: number): number => {
	if (durationAt30 <= 6) return 1.25;
	if (durationAt30 <= 18) return 1.4;
	if (durationAt30 <= 45) return 1.5;
	return 2.0;
};

/**
 * Reveal snap: the camera jumps most of the way in one frame (the punch of a cut), then settles over
 * a decelerating tail so the frame can be read. Returns the camera scale.
 */
export const revealSnap = (
	frame: number,
	at: number,
	opts: {from?: number; to?: number; jump?: number; tail?: number; fps?: number} = {},
): number => {
	const from = opts.from ?? 2.2;
	const to = opts.to ?? 1;
	const mid = from + (to - from) * (opts.jump ?? 0.6);
	if (frame < at) return from;
	if (frame === at) return mid;
	return interpolate(frame, [at, at + f(opts.tail ?? 14, opts.fps ?? 30)], [mid, to], {...clamp, easing: ease.softLand});
};

/**
 * Counter: values that step every frame with decaying steps, landing on a round value for a claim
 * or a specific value for a data field. Returns the integer to display.
 */
export const count = (frame: number, start: number, from: number, to: number, duration = 16): number =>
	Math.round(interpolate(frame, [start, start + duration], [from, to], {...clamp, easing: ease.softLand}));
