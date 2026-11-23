/**
 * Follow-through, a soft body and a burst, as ghosts of chosen frames.
 * Run from the repository root:  bun examples/physics-kit/joined-and-particles.ts
 */
import {writeFileSync} from 'node:fs';
import {blob, body, drag, emitter, gaussian, gravity, gravityFor, joined, lifeCurve, pathThrough, rope, vec} from '../../assets/remotion/unrushed-physics';

const G = gravityFor(330, 12);
const INK = '#1c2430', PINK = '#D8285E';
const softLand = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3); // stand-in for the kit curve

// 1. A tag on a cord. The card slides 300 px in 14 f and stops. Each cell is one frame, card centred.
const cardX = (f: number) => 300 * softLand(f / 14);
const cord = joined({...rope(vec(0, 150), vec(0, 360), 8), g: G, damping: 0.02, pins: {0: (f) => vec(cardX(f), 150)}});
const TAG_FRAMES = [0, 3, 6, 9, 12, 15, 18, 22, 28, 40];
const tagRow = (rigid: boolean) => TAG_FRAMES.map((f, k) => {
	const x = cardX(f);
	const pts = (rigid ? rope(vec(x, 150), vec(x, 360), 8).points : cord(f)).map((p) => vec(p.x - x, p.y));
	const tip = pts[pts.length - 1];
	return `<g transform="translate(${70 + k * 142} 0)">
<rect x="-45" y="116" width="90" height="34" rx="6" fill="${INK}"/>
<path d="${pathThrough(pts)}" fill="none" stroke="${INK}" stroke-width="2.5"/>
<circle cx="${tip.x.toFixed(1)}" cy="${tip.y.toFixed(1)}" r="18" fill="${PINK}"/>
<text x="0" y="410" text-anchor="middle" font-size="18" fill="#5b6672">f ${f}</text></g>`;
}).join('');

// 2. A soft drop falling on a surface.
const FLOOR = 330;
const soft = joined({...blob(vec(0, 0), 60, 20, 0.6), g: G, floor: FLOOR, damping: 0.2});
const BLOB_FRAMES = [8, 12, 14, 16, 18, 22, 30, 60];
const blobs = BLOB_FRAMES.map((f, k) => `<g transform="translate(${90 + k * 165} 0)"><path d="${pathThrough(soft(f), true)}" fill="${PINK}"/>
<text x="0" y="${FLOOR + 34}" text-anchor="middle" font-size="18" fill="#5b6672">f ${f}</text></g>`).join('');

// 3. A burst: 3 frames of emission, then gravity and air.
const burst = emitter({
	seed: 9, rate: (f) => (f < 3 ? 26 : 0), life: [34, 7],
	spawn: (rand) => {
		const a = gaussian(rand, -Math.PI / 2, 0.55), v = Math.abs(gaussian(rand, 900, 260));
		return body(0, 0, 1, Math.cos(a) * v, Math.sin(a) * v);
	},
	forces: (p) => [gravity(p, G), drag(0.0025)],
});
const BURST_FRAMES = [2, 6, 12, 20, 30];
const bursts = BURST_FRAMES.map((f, k) => `<g transform="translate(${150 + k * 270} 300)">${burst(f).map((p) =>
	`<circle cx="${p.pos.x.toFixed(1)}" cy="${p.pos.y.toFixed(1)}" r="${(2 + 7 * lifeCurve(p.age)).toFixed(1)}" fill="${PINK}"/>`).join('')}
<text x="0" y="60" text-anchor="middle" font-size="18" fill="#5b6672">f ${f} · ${burst(f).length} vivas</text></g>`).join('');

const title = (y: number, t: string) => `<text x="50" y="${y}" font-size="26" font-weight="700" fill="${INK}">${t}</text>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1900" viewBox="0 0 1500 1900" font-family="Helvetica, Arial, sans-serif">
<rect width="1500" height="1900" fill="#F2F0EB"/>
${title(60, 'A · La etiqueta va pegada a la tarjeta (solo curva). La tarjeta se mueve hasta f 14')}
<g transform="translate(50 0)">${tagRow(true)}</g>
${title(500, 'B · La etiqueta cuelga de una cuerda (joined): llega tarde, se pasa y vuelve')}
<g transform="translate(50 440)">${tagRow(false)}</g>
${title(960, 'C · Cuerpo blando que cae (blob, presión 0.6): se aplasta, se ensancha y se recupera')}
<g transform="translate(50 1010)"><line x1="0" x2="1400" y1="${FLOOR}" y2="${FLOOR}" stroke="${INK}" stroke-width="3"/>${blobs}</g>
${title(1470, 'D · Ráfaga (emitter): 3 cuadros de emisión, gravedad y aire; cada partícula nace y muere')}
<g transform="translate(50 1470)">${bursts}</g>
</svg>`;
writeFileSync(new URL('./joined-and-particles.svg', import.meta.url), svg);
console.log('tip offset from card, px', TAG_FRAMES.map((f) => `${f}:${(cord(f)[8].x - cardX(f)).toFixed(0)}`).join(' '));
