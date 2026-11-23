/**
 * Steering as trails: arrival on an arc, a route with a corner, a flow field and a flock.
 * Run from the repository root:  bun examples/physics-kit/steering.ts
 */
import {writeFileSync} from 'node:fs';
import {agents, align, arrive, body, cohere, flowAt, follow, followPath, gaussian, heading, rng, scale, separate, vec, type Body, type Vec} from '../../assets/remotion/unrushed-physics';

const INK = '#1c2430', PINK = '#D8285E', GREY = '#5b6672';
const dots = (pts: Vec[], r = 5) => pts.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${PINK}"/>`).join('');
const line = (pts: Vec[], w = 1.5, o = 1) => `<polyline points="${pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}" fill="none" stroke="${PINK}" stroke-width="${w}" stroke-opacity="${o}"/>`;
const cross = (p: Vec) => `<path d="M${p.x - 12} ${p.y}H${p.x + 12}M${p.x} ${p.y - 12}V${p.y + 12}" stroke="${INK}" stroke-width="2.5"/>`;

// A. From A to B. Left: a curve (softLand, 24 f) on a straight line. Right: `arrive`, entering with sideways speed.
const FROM = vec(60, 60), TO = vec(560, 300);
const softLand = (x: number) => 1 - Math.pow(1 - Math.min(1, x), 3);
const curvePts = Array.from({length: 25}, (_, f) => vec(FROM.x + (TO.x - FROM.x) * softLand(f / 24), FROM.y + (TO.y - FROM.y) * softLand(f / 24)));
const arr = agents({init: [body(FROM.x, FROM.y, 1, 0, 700)], maxSpeed: 900, steer: (b) => [arrive(b, TO, 900, 3000, 200)]});
const arrPts = Array.from({length: 46}, (_, f) => arr(f)[0].pos);

// B. A route with a corner: the path and the track of the thing following it.
const ROUTE = [vec(40, 60), vec(420, 60), vec(420, 320), vec(620, 320)];
const car = agents({init: [body(40, 60, 1, 300, 0)], maxSpeed: 420, steer: (b) => [followPath(b, ROUTE, 420, 2200, {radius: 12})]});
const carPts = Array.from({length: 110}, (_, f) => car(f)[0].pos);

// C. A flow field: 160 things released on a grid, each following the field for 70 frames.
const field = agents({
	init: Array.from({length: 160}, (_, i) => { const r = rng(i + 3); return body(r() * 1340, r() * 360, 1); }),
	maxSpeed: 150,
	steer: (b, _all, frame) => [follow(b, flowAt(b.pos, frame, {scale: 320, pace: 240, seed: 2}), 150, 900)],
});
const trails = Array.from({length: 160}, (_, i) => Array.from({length: 36}, (_, k) => field(k * 2)[i].pos));

// D. A flock: 70 bodies with random headings, at three moments.
const flock = agents({
	init: Array.from({length: 70}, (_, i) => { const r = rng(i + 1); const a = r() * 6.283; return body(120 + r() * 220, 100 + r() * 220, 1, Math.cos(a) * 200, Math.sin(a) * 200); }),
	maxSpeed: 240,
	steer: (b, all) => [scale(separate(b, all, 240, 900, 30), 1.6), align(b, all, 240, 500, 110), cohere(b, all, 240, 300, 110)],
});
const bird = (b: Body) => `<path transform="translate(${b.pos.x.toFixed(1)} ${b.pos.y.toFixed(1)}) rotate(${heading(b.vel).toFixed(1)})" d="M9 0L-7 5L-4 0L-7 -5Z" fill="${PINK}"/>`;
const flockAt = (f: number, ox: number) => {
	const bs = flock(f);
	const cx = bs.reduce((s, b) => s + b.pos.x, 0) / bs.length, cy = bs.reduce((s, b) => s + b.pos.y, 0) / bs.length;
	return `<g transform="translate(${ox - cx + 220} ${-cy + 210})">${bs.map(bird).join('')}</g><text x="${ox + 220}" y="430" text-anchor="middle" font-size="18" fill="${GREY}">f ${f}</text>`;
};

const title = (y: number, t: string) => `<text x="50" y="${y}" font-size="26" font-weight="700" fill="${INK}">${t}</text>`;
const sub = (x: number, y: number, t: string) => `<text x="${x}" y="${y}" font-size="18" fill="${GREY}">${t}</text>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1900" viewBox="0 0 1440 1900" font-family="Helvetica, Arial, sans-serif">
<rect width="1440" height="1900" fill="#F2F0EB"/>
${title(60, 'A · De un punto a otro: un punto por cuadro')}
<g transform="translate(50 90)">${sub(0, 20, 'Curva sobre una recta (24 f)')}<g transform="translate(0 30)">${dots(curvePts)}${cross(TO)}</g></g>
<g transform="translate(740 90)">${sub(0, 20, 'arrive: entra con velocidad hacia abajo y llega en arco (43 f)')}<g transform="translate(0 30)">${dots(arrPts)}${cross(TO)}</g></g>
${title(540, 'B · Una ruta con esquinas (followPath): la corta con peso y se detiene al final')}
<g transform="translate(50 570)"><polyline points="${ROUTE.map((p) => `${p.x},${p.y}`).join(' ')}" fill="none" stroke="${INK}" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="6 6"/>${dots(carPts, 4)}</g>
<g transform="translate(790 570)">${sub(0, 20, 'Los puntos se juntan al frenar en la esquina')}${sub(0, 48, 'y al llegar: la velocidad se lee en el espaciado.')}</g>
${title(1010, 'C · Campo de flujo (flowAt + follow): 160 estelas de 70 cuadros')}
<clipPath id="box"><rect x="0" y="0" width="1340" height="380"/></clipPath><g transform="translate(50 1040)" clip-path="url(#box)">${trails.map((t) => line(t, 1.6, 0.7)).join('')}</g>
${title(1470, 'D · Bandada (separate + align + cohere): del desorden a un rumbo común')}
<g transform="translate(50 1440)">${flockAt(0, 0)}${flockAt(30, 450)}${flockAt(120, 900)}</g>
</svg>`;
writeFileSync(new URL('./steering.svg', import.meta.url), svg);
