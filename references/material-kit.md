# Material kit: a surface that is computed, not drawn

`motion-kit.md` and `physics-kit.md` decide how things move. This file decides how the protagonist's surface is drawn, because a thing that moves correctly and is drawn as a flat shape with a highlight still looks generated.

Source: Unrushed's own. Built and corrected over four rendered passes on a real piece in ChatCut (`examples/material-kit/`, with a before and after). The shading model is standard: a height field, its normals, absorption by thickness, a reflected light source.

## Contents

1. When a material is needed
2. The hero frame comes first
3. The primitives test
4. The recipe
5. The code
6. Defects, by name
7. In ChatCut and Remotion
8. Limits

## 1. When a material is needed

Ask what the piece's protagonist is made of. If the answer is a substance (liquid, resin, glass, metal, wax, paper with weight, cloth), the substance must be rendered. If the answer is an interface, a diagram or type, it must not: flat is correct there, and a glossy button is the older cliché.

Start from the real thing when there is one. Ask in `brief` for photos or footage of the actual material or product, and prefer them as the ground or as the subject itself over anything computed. A computed material is for when the real thing cannot be shot or must transform on screen.

## 2. The hero frame comes first

Before any motion is built, render one still of the hardest moment with the finished material, in the tool that will make the piece, and show it. The person approves the picture or rejects it. Motion built on a rejected picture is wasted, and a pass 0 that shows "simple drawing for now" gets the wrong thing approved.

- It is the moment the piece exists for, not an easier scene.
- It is rendered by the target tool, not mocked up elsewhere.
- Show the transforming state as well as the settled one. A liquid mid-spread shows its material far better than the finished block.
- Say what is still wrong with it (§6). Never present it as finished.

## 3. The primitives test

Before showing any frame, write one line per protagonist object: what is it made of in the code?

| The line reads | Verdict |
|---|---|
| "a circle, a darker circle and a white ellipse" · "a rounded rectangle with a gradient and a blurred copy below" · "a rotated white gradient that slides across" | Drawn. It will read as generated. Rebuild it with §4 |
| "a thickness field; normals from its slope; colour absorbed through the thickness; the reflection of a window; a shadow tinted by what the light passed through" | Computed |

The test is about cause. In a computed material every light and dark area follows from a shape, a thickness and a light. In a drawn one each was placed by hand, and three of them are all there is.

## 4. The recipe

Five decisions, in this order. Each has one number to tune.

1. **Thickness.** A height field over the object's outline: rises at the edge like a meniscus, nearly flat inside. Round the field at corners (a smooth minimum of the wall distances), or the corners show diagonal creases and the object becomes a bevelled button. *Tune:* the meniscus width, 20–40 px at 1080 wide.
2. **Normals** from the slope of the thickness. Add a slow, smooth swell while the thing is liquid and let it die as it sets. Two octaves of smooth noise at most: fine noise shatters every reflection into glitter. *Tune:* swell amplitude, 0.5 falling to 0.03.
3. **Colour by absorption.** What is underneath, multiplied by `exp(-absorb × thickness)`, with `absorb` derived from the target colour. Thin edges come out lighter and translucent, the body deep, with no gradient authored. Let colour reach full depth within 5–10 px of the edge, or the edge blurs into a cushion. *Tune:* a slow variation of density (pigment that drifts while liquid and freezes when set) at ±10%.
4. **One light with a shape.** A window, a softbox, a strip: something with edges, reflected through the normals from a camera at a finite distance, so the reflection lands in one place and bends where the surface curves. Plus a thin specular line on the edge that faces the light, and the opposite edge a little darker. *Tune:* the size of the reflection: under about a fifth of the object it reads as a sticker.
5. **What it does to the ground.** A shadow offset away from the light, tinted by the colour the light passed through, tight (under 10 px of softness), with a dark contact line where the material touches. The ground itself needs a surface: fibre in paper, veins in stone.

Refraction (sampling the ground at a position pushed along the normal) belongs to step 3 for clear materials, and is what shows there is something underneath.

## 5. The code

A fragment shader. These functions are the ones that produced `examples/material-kit/before-after.jpg`; `resin-hero.html` in the same folder is the complete scene as a ChatCut motion graphic.

```glsl
precision highp float;
uniform float uTime;
const vec2 CAMERA_XY = vec2(430.0, 560.0); const float CAMERA_DIST = 1500.0;   // in the scene's px

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float a = 0.5, s = 0.0; for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.03 + 17.1; a *= 0.5; } return s; }
float sdBox(vec2 p, vec2 c, vec2 h, float r){ vec2 d = abs(p-c) - h + r; return length(max(d,0.0)) + min(max(d.x,d.y),0.0) - r; }

float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0); return mix(b, a, h) - k*h*(1.0-h); }
// depth inside a box with no diagonal crease at the corners (surface tension rounds them)
float boxDepth(vec2 p, vec2 c, vec2 h){ vec2 q = h - abs(p - c); return smin(q.x, q.y, 70.0); }

float height(float depth, vec2 p, float wob){
  float m = 1.0 - exp(-max(depth,0.0) / 30.0);
  vec2 rp = p*0.0065 + vec2(uTime*0.30, -uTime*0.18);
  float ripple = wob * ((vnoise(rp) - 0.5) + 0.35*(vnoise(rp*2.1 + 4.0) - 0.5)) * 0.9;
  return max(0.0, m * (1.0 + ripple));
}

// the light source: a window up and to the left, seen in the reflection
float window(vec3 r){
  vec2 s = r.xy - vec2(-0.185, -0.060);
  float c = cos(-0.30), sn = sin(-0.30); s = vec2(c*s.x - sn*s.y, sn*s.x + c*s.y);
  vec2 d = abs(s) - vec2(0.150, 0.062);
  float box = smoothstep(0.030, -0.012, max(d.x, d.y));
  float bars = 1.0 - 0.5*smoothstep(0.010, 0.003, abs(s.x)) * 1.0 - 0.35*smoothstep(0.008, 0.002, abs(s.y));   // the window's crossbars
  return box * bars;
}
// the camera is at a finite distance, so the window's reflection lands in one place, not everywhere
vec3 viewAt(vec2 p){ return normalize(vec3((CAMERA_XY - p) / CAMERA_DIST, 1.0)); }   // e.g. vec2(430.,560.) and 1500.
// resin over whatever lies beneath it
vec3 resin(vec2 p, float h, vec2 grad, vec3 absorb, vec3 under, float density, float scatter){
  vec3 n = normalize(vec3(-grad * 30.0, 1.0));
  float thick = 1.0 - pow(1.0 - min(h, 1.0), 6.0);   // colour reaches full depth a few px in from the edge
  vec3 trans = exp(-absorb * thick * density);
  vec3 col = under * trans;
  vec3 pigment = exp(-absorb * 0.9);
  float lambert = clamp(dot(n, normalize(vec3(-0.45, -0.55, 0.70))), 0.0, 1.0);
  col = mix(col, pigment * (0.86 + 0.20*lambert), scatter * smoothstep(0.0, 0.5, thick));
  col *= 1.0 + 0.10 * exp(-pow((h - 0.22)/0.10, 2.0));   // a light line just inside the edge, where light gathers
  vec3 r = reflect(-viewAt(p), n);
  float fres = 0.04 + 0.96 * pow(1.0 - clamp(n.z, 0.0, 1.0), 5.0);
  float sky = 0.35 + 0.65*smoothstep(0.6, -0.6, r.x + r.y);
  // a lit edge: a thin specular line on the light's side, the far side slightly darker
  vec3 L = normalize(vec3(-0.45, -0.55, 0.70));
  float spec = pow(max(dot(n, normalize(L + viewAt(p))), 0.0), 110.0);
  col *= 1.0 - 0.16 * clamp(dot(n.xy, normalize(vec2(0.45, 0.55))) * 3.0, 0.0, 1.0);
  col += vec3(1.0, 0.99, 0.97) * (window(r) * 0.30 + spec * 0.85 + sky * fres * 0.18) * smoothstep(0.0, 0.08, h);
  return col;
}
```

The ground's side of it, in `main` before the object is drawn, with `d` the object's signed distance sampled at `p - vec2(9.0, 13.0)` (away from the light) and `d0` at `p`:

```glsl
ground *= mix(vec3(1.0), tint, smoothstep(9.0, -7.0, d) * 0.8);        // tint: the object's colour, lightened
ground *= 1.0 - 0.22 * exp(-max(d0, 0.0) / 2.5) * step(0.0, d0);       // the contact line
```

The function block (not these two ground lines), with a 20-line `main` and a different colour, was pasted from the single-file edition into a new ChatCut motion graphic and rendered on the first try.

Per object, in `main`: compute its depth (for a box, `boxDepth`; for a free shape, the negative of its signed distance; combine with `smin` where a liquid front meets a wall), take `h = height(depth, p, swell)`, the gradient of `h` by central differences 1.5 px apart, the ground sampled at `p - grad * h * 420.0` for refraction, then `resin(...)`. `absorb` for a target colour `c` over a ground of brightness 0.98 is `-log(c / 0.98)` per channel.

## 6. Defects, by name

Each of these appeared on the way to the example. Look for them in every hero frame and name the ones present.

| Defect | Looks like | Cause | Fix |
|---|---|---|---|
| Bevelled button | Diagonal creases from each corner, one side light and one dark | Height taken from a box distance; strong diffuse shading | Smooth minimum of the wall distances; keep diffuse contrast under 20% |
| Glitter | The reflection breaks into specks | Fine or discontinuous noise in the normals | Two smooth octaves; quintic interpolation |
| Sticker | A tiny crisp shape of light | The light source is too small, or the camera is at infinity | Enlarge the source; give the camera a distance |
| Cushion | A wide pale blur around the edge, a glow outside it | Colour follows the full meniscus; a wide symmetric shadow | Colour to full depth in 5–10 px; a tight, offset shadow |
| Candy | Thick, glossy, saturated: a sweet or nail polish | Too much height and reflection for the substance | Lower the slope and the reflection until it reads as a pour, not a dome |
| Label on top | Text sits over the reflection | The text is a separate layer above the surface | Put the text in the scene under the surface, or keep the reflection clear of it |

A shader removes none of these by itself. Each was removed by rendering, looking and naming it.

## 7. In ChatCut and Remotion

**ChatCut.** Use the HTML runtime with `three`: one full-screen plane with a `ShaderMaterial`, uniforms set in `render({timeSeconds})`. Verified in `resin-hero.html`. Two things found the hard way: a font named in the stylesheet does not load inside a 2D canvas, so text drawn to a canvas texture falls back to a serif (use page elements positioned with the same camera transform); and the linked source reloads when the file changes, so a hero frame can be revised and re-inspected without importing again. This is drawing a motion graphic's own picture. It is not the paid custom effect of `effects.md` §"Custom shader", which stays a last resort.

**Remotion.** The same shader in a canvas with a WebGL context, rendered with `--gl=angle`. Not yet run there.

## 8. Limits

- **Tested on one material, from one angle.** Pigmented and clear resin, seen from above. Glass, metal, cloth and wax follow the same five decisions with other numbers, and none has been rendered.
- **It is still not a fluid.** The outline comes from the motion (`physics-kit.md`); the surface is shaded as if it were liquid. There are no waves, splashes or merging.
- **Angle matters more than shading.** Seen straight from above, thickness shows only through light. A raking view shows it through shape. Choose the angle in `storyboard`.
- **The example is close to candy.** It is thicker and glossier than a real pour. It shows the method, not a finished look.
