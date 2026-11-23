/**
 * Curve against simulation: three weights dropped into a liquid.
 * Run from the repository root:  bun examples/physics-kit/drop-into-liquid.ts
 * Writes drop-into-liquid.svg next to this file: one ghost per frame, and the speed of each weight.
 */
import {writeFileSync} from 'node:fs';
import {body, drag, gravity, gravityFor, simulate, springTo, step, vec, viscous, type Force} from '../../assets/remotion/unrushed-physics';

const FPS = 30;
const FRAMES = 44;
const TOP = 90, SURFACE = 420, FLOOR = 760;
const G = gravityFor(SURFACE - TOP, 12, FPS); // "falls to the surface in 12 f"
// Same size, different weight: cork, glass, lead.
const WEIGHTS = [{mass: 1, r: 34, name: 'liviana'}, {mass: 4, r: 34, name: 'media'}, {mass: 16, r: 34, name: 'pesada'}];

// cubic-bezier easing, for the curve version
const bezier = (x1: number, y1: number, x2: number, y2: number) => (x: number) => {
	let lo = 0, hi = 1;
	for (let i = 0; i < 40; i++) {
		const t = (lo + hi) / 2;
		const bx = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
		if (bx < x) lo = t; else hi = t;
	}
	const t = (lo + hi) / 2;
	return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
};
const gravityCurve = bezier(0.11, 0, 0.5, 0);
const softLand = bezier(0.22, 0.776, 0.511, 0.942);

// A: what a careful agent writes with curves. Fall 12 f on a gravity curve, then softLand 12 f to rest.
const curveY = (frame: number, r: number) => {
	const rest = FLOOR - r;
	if (frame <= 12) return TOP + (SURFACE - TOP) * gravityCurve(frame / 12);
	return SURFACE + (rest - SURFACE) * softLand(Math.min(1, (frame - 12) / 12));
};

// B: the same scene as forces. One gravity for the world; the liquid resists; the floor is a soft contact.
const simY = WEIGHTS.map(({mass, r}) => {
	const run = simulate({
		init: body(0, TOP, mass),
		fps: FPS,
		substeps: 8,
		step: (b, dt) => {
			const forces: Force[] = [gravity(b, G)];
			if (b.pos.y > SURFACE) forces.push(drag(0.5));
			if (b.pos.y > FLOOR - r) forces.push(springTo(b, vec(0, FLOOR - r), 900 * mass), viscous(60 * mass));
			return step(b, forces, dt);
		},
	});
	return (frame: number) => run(frame).pos.y;
});

const panel = (ox: number, title: string, ys: ((f: number) => number)[]) => {
	let out = `<text x="${ox}" y="50" font-size="30" font-weight="700" fill="#1c2430">${title}</text>`;
	out += `<rect x="${ox}" y="${SURFACE}" width="620" height="${FLOOR - SURFACE}" fill="#9cc7d6" opacity="0.35"/>`;
	out += `<line x1="${ox}" x2="${ox + 620}" y1="${FLOOR}" y2="${FLOOR}" stroke="#1c2430" stroke-width="3"/>`;
	WEIGHTS.forEach(({r, name}, i) => {
		const cx = ox + 110 + i * 200;
		out += `<text x="${cx}" y="${FLOOR + 28}" font-size="18" text-anchor="middle" fill="#5b6672">${name}</text>`;
		for (let fr = 0; fr <= FRAMES; fr++) {
			const last = fr === FRAMES;
			out += `<circle cx="${cx}" cy="${ys[i](fr).toFixed(1)}" r="${r}" fill="${last ? '#D8285E' : 'none'}" stroke="#D8285E" stroke-opacity="${last ? 1 : 0.55}" stroke-width="1.5"/>`;
		}
	});
	// speed per frame, px per frame
	const py = 880, ph = 150;
	out += `<text x="${ox}" y="${py - 14}" font-size="18" fill="#5b6672">velocidad por cuadro (px) · cuadros 0–${FRAMES}</text>`;
	out += `<line x1="${ox}" x2="${ox + 620}" y1="${py + ph}" y2="${py + ph}" stroke="#aab2bb"/>`;
	out += `<line x1="${ox + (12 / FRAMES) * 620}" x2="${ox + (12 / FRAMES) * 620}" y1="${py}" y2="${py + ph}" stroke="#aab2bb" stroke-dasharray="4 4"/>`;
	WEIGHTS.forEach((w, i) => {
		const pts: string[] = [];
		for (let fr = 1; fr <= FRAMES; fr++) {
			const v = Math.abs(ys[i](fr) - ys[i](fr - 1));
			pts.push(`${(ox + (fr / FRAMES) * 620).toFixed(1)},${(py + ph - Math.min(ph, v * 1.9)).toFixed(1)}`);
		}
		out += `<polyline points="${pts.join(' ')}" fill="none" stroke="#1c2430" stroke-width="${1.5 + i * 1.5}" stroke-opacity="${0.45 + i * 0.25}"/>`;
	});
	return out;
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1060" viewBox="0 0 1400 1060" font-family="Helvetica, Arial, sans-serif">
<rect width="1400" height="1060" fill="#F2F0EB"/>
${panel(50, 'A · Curvas (gravedad 12 f + softLand 12 f)', WEIGHTS.map(({r}) => (fr: number) => curveY(fr, r)))}
${panel(730, 'B · Fuerzas (gravedad + arrastre del líquido)', simY)}
</svg>`;
writeFileSync(new URL('./drop-into-liquid.svg', import.meta.url), svg);

for (const [name, ys] of [['A', WEIGHTS.map(({r}) => (fr: number) => curveY(fr, r))], ['B', simY]] as const) {
	WEIGHTS.forEach((w, i) => {
		const steps = Array.from({length: 24}, (_, k) => Math.round(Math.abs(ys[i](k + 1) - ys[i](k))));
		console.log(name, `mass ${w.mass}`, steps.join(' '));
	});
}
