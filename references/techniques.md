# Techniques library

A library of motion techniques studied from real reference pieces: what each one is, what it communicates, the parameters that control it, and how to build it in each tool. Use it to choose a technique by **meaning** first and by **family** second.

Every entry links to its source and credits its author. Entries describe techniques and record observed parameter values in our own words; no code or assets are copied. If a build route says "record or export", check the source's licence before commercial use.

## Contents

1. How to use this library
2. Index by meaning
3. Families and mental models
4. Entries
   - Particles
   - Physics and cloth
   - Fluids
   - Glass and lenses
   - Organic forms
   - Pixel and ASCII
   - Generative patterns
   - 3D and waves
   - Transitions and editorial systems

---

## 1. How to use this library

1. **Start from the line, not the effect.** Read the line of text or the idea the scene must carry, then find its meaning in the index below. The best technique *enacts* the line: if the line says something dissolves, the image dissolves.
2. **Filter by material and energy.** Prefer techniques whose behaviour matches the material in `STYLE.md` and whose pace fits the `energy` dial.
3. **Check the build route for the target tool**, and the difficulty.
4. **Read the critical note.** Many techniques are close to becoming clichés, and the note says what keeps them from looking generic.
5. **Give it a driver.** These pieces were made for the web, where the mouse or the scroll moves them. In video nothing moves them unless you choose what does: time, a scripted path, a camera move, a simulated cursor from an interface scene (`visual-explanation.md`), or the beats of the soundtrack. Each entry's **In video** line suggests one, with the kind of shot it makes.
6. **Adapt, don't paste.** The observed values are starting points. Change colour, density and timing to fit the piece, and keep the idea.

Build route labels used below:

- **ChatCut**: ChatCut builds motion graphics from code behind the scenes and has rendered thousands of particles with per-particle timing, so 2D and simple 3D techniques are often feasible. Pilot one scene first.
- **Code**: Remotion (React), with Three.js through `@remotion/three` when needed. See `targets/remotion.md`.
- **Blender**: real 3D materials, physics (cloth, rigid bodies, particles, metaballs), light. Render clips and import them.
- **Record**: the source page can run on its own or export media. Fast, but check the licence and replace the content with your own.

Difficulty: **low** (an afternoon), **medium** (a day or two, or one careful pilot), **high** (simulation or material work).

## 2. Index by meaning

| The scene needs to say… | Techniques |
|---|---|
| **Something becomes something else** | particle-morph, pixel-voxel-drop, metaballs, fluid-text |
| **Revealing, discovering, looking through** | liquid-lens, editorial-reveal-system, canvas-grid-zoom, scroll-graph |
| **Dissolving, memory, time passing, letting go** | unwoven, fluid-text, the-spirit |
| **Connection, network, flow of information** | data-tunnel, truchet-tiles, volumetric-flow, connected-vertices (with care) |
| **Growth, progress, a story told with data** | scroll-graph |
| **Breaking, the digital becoming physical** | pixel-voxel-drop, touch |
| **Two sides, before and after, a change of view** | duo-lenticular |
| **Alive, organic, an invisible presence** | the-spirit, metaballs, ascii-noise-field |
| **Contact, the human touch, tension and release** | touch, cursor-line-wobble, holocloth |
| **Calm, order, precision (a background that supports)** | wave-grid, truchet-tiles, ascii-noise-field, sine-cosine |
| **Premium, material, product** | fold, glass-icon, liquid-glass, fluid-glass, holocloth, glass-xylophone |
| **Lightness, fragility, play** | bubbles, sphere-packing, glass-xylophone |
| **Heat, energy, intensity** | doom-fire, gpu-fluid-particles, particles-cursor |
| **Ink, writing, craft, calm** | gpu-io-ink-fluid, particle-morph (ink on paper) |
| **Explaining, teaching a principle** | sine-cosine, scroll-graph, connected-vertices |
| **Emphasis on a word** | line-hover-styles |
| **A gallery, a portfolio, many images** | unwoven, inertia-slider, canvas-grid-zoom |
| **Rhythm with sound** | glass-xylophone |
| **A change of chapter between scenes** | page-transitions, editorial-reveal-system, unwoven |
| **Structure, the technical becoming soft** | cloth-wireframe, particle-morph |
| **A digital trace, the retro-digital** | fluid-pixel, ascii-logo, doom-fire |

## 3. Families and mental models

**Families**: particles · physics and cloth · fluids · glass and lenses · organic forms · pixel and ASCII · generative patterns · 3D and waves · transitions and editorial systems.

**Mental models** (how the motion is computed):

| Model | Idea | Feels | Good for video because |
|---|---|---|---|
| Simulation | Each thing remembers its position and velocity; forces update it every frame | Physical, alive, surprising | Rich, but must be made deterministic or pre-computed |
| Function of time | Position comes straight from a formula of time | Precise, rhythmic, predictable | Renders identically every time; easiest to control |
| Function of distance | Change depends on how close something is to a point, such as a cursor | Responsive, tactile | Replace the cursor with an animated path |
| Per-pixel shader | Every pixel decides its own colour from position, time and inputs | Optical: glass, light, texture | Fast, resolution-independent |
| Discrete rules | A grid or set of cells changes by simple rules | Systematic, emergent | Cheap; often feasible in any tool |

**Two lessons from the whole library:**

- **Light and material carry the quality**, more than the technique. The pieces that felt premium relied on motion blur, self-shadowing, refraction, grain and bloom. When a technique looks flat, add material before adding motion.
- **The same physics can say opposite things.** A fluid in neon on black reads as tech energy; the same fluid as ink on paper reads as calm craft. Palette and ground decide the meaning.

---

## 4. Entries

### Particles

#### particle-morph
- **Source**: built in the first Unrushed test, a silent video on the history of AI, made in both ChatCut and Remotion.
- **What**: one set of thousands of particles travels through the whole piece, reorganising into a new figure for each scene: a neuron, a question mark, words, a network, falling snow, a board, an eye, a human profile.
- **Communicates**: continuity, one thing becoming another; a story told by transformation.
- **Key parameters**: 6,000–12,000 particles of 1.5–3 px; 1.2–1.8 s per transformation with cubic in-out; per-particle delay of 0–35% of the transition; mid-transition noise with amplitude sin(π·progress); ordered pairing by angle from the centre; low-amplitude simplex drift at rest; text enters at 60% of the morph.
- **Build**: ChatCut (proven: 8,000 particles rendered with delays and noise) · Code (proven in Remotion) · Blender (possible, harder).
- **In video**: time drives everything; each transformation is a beat of 1.2–1.8 s. Works as the through-line or as a morph transition between scenes.
- **Difficulty**: medium.
- **Critical note**: the figures carry the meaning. Hard figures (an eye, a face) need clean source shapes. Sample them from SVG paths or images, not by hand. Avoid making every scene the same structure.

#### the-spirit
- **Source**: Edan Kwan, *The Spirit*. https://edankwan.com/experiments/the-spirit/
- **What**: a smoke-like cloud of particles flowing in curls and following the cursor. Each particle is born, lives and dies.
- **Communicates**: something alive and ethereal; spirit, energy, an invisible presence.
- **Key parameters**: 4k to 4M particles; speed; dieSpeed (lifespan); radius; curlSize (size of the swirls); attraction to a target. Post: motion blur, bloom, shadows.
- **Build**: Code (GPU particles) · Blender (particles plus a turbulence field) · Record (attraction follows the cursor; animate the target instead).
- **In video**: replace the cursor with an animated attractor that travels a path, or with the simulated cursor of an interface scene; the cloud follows it. Hero shot of 4–8 s, or a living ground behind text.
- **Difficulty**: high.
- **Critical note**: the volume comes from motion blur and shadow. Without a form or a reason it becomes abstract smoke.

#### touch
- **Source**: Edan Kwan, *Touch*. https://edankwan.com/experiments/touch/
- **What**: a stream of up to millions of particles pours like sand or water and collides with a 3D hand.
- **Communicates**: contact, touch, the human meeting the digital.
- **Key parameters**: count; gravity; drop height; drop radius; bounce off the hand; hand force. Post: motion blur, bloom, vignette.
- **Build**: Blender (particles with collision; the strongest route) · Code.
- **In video**: the hand pose and the pour are keyframed; the stream starts mid-pour (hook) and ends on the hand at rest. Hero shot of 4–6 s.
- **Difficulty**: high.
- **Critical note**: the solid object is the idea; without it, it is just falling sand.

#### volumetric-flow
- **Source**: David Li, *Volumetric Particle Flow*. https://david.li/flow/
- **What**: a ribbon of particles flowing with turbulence and casting shadow on itself.
- **Communicates**: continuous flow, a current, data in motion.
- **Key parameters**: 66k to 2M particles; speed; turbulence; colour.
- **Build**: Code · Blender.
- **In video**: time only; slow camera orbit around the ribbon. Ground or bridge between sections, 3–6 s.
- **Difficulty**: high.
- **Critical note**: the self-shadowing makes it, not the flow. Without it, it looks flat.

#### particles-cursor
- **Source**: Kevin Levron, *Particles Cursor*. https://codepen.io/soju22/full/KKQaGrE
- **What**: a trail of coloured particles following the cursor; when idle, the trail orbits on its own.
- **Communicates**: energy, a trace, dynamism.
- **Key parameters**: ~262k particles; colours; noise intensity; point size; point decay (how long the trail lasts); an idle orbit radius and speed.
- **Build**: Record (has a built-in idle orbit) · Code.
- **In video**: a scripted path replaces the cursor, drawn as a gesture (a signature, an arrow to the next element), or the trail follows a simulated cursor. 2–4 s accent.
- **Difficulty**: medium.
- **Critical note**: a library component that looks the same everywhere. Check the licence.

#### connected-vertices
- **Source**: Louis Hoebregts, *Connected Vertices – How to*. https://codepen.io/Mamboleoo/full/PowKoxe
- **What**: a step-by-step teaching piece for the network of dots joined by lines when they are closer than 250 px, with line opacity falling with distance.
- **Communicates**: connection, networks, community.
- **Key parameters**: count; speed; radius; link distance (250 px); opacity by distance.
- **Build**: ChatCut · Code · any tool.
- **In video**: time only; link distance or count animates to show a network forming. Short ground, 3–5 s; never the hero.
- **Difficulty**: low.
- **Critical note**: this is the classic "tech startup" background and is listed in `ai-tells.md`. Use it to learn distance-based rules, or only when something essential changes: the form, the rhythm, the meaning.

### Physics and cloth

#### fold
- **Source**: Mr.doob, *Codevember 2026 / 01 / Fold*. https://mrdoob.github.io/codevember-2026/01/
- **What**: a translucent plastic sheet falls and folds like cloth, and can be dragged.
- **Communicates**: softness, materiality, a premium product.
- **Key parameters**: stiffness 0.5; material transmission 1, index of refraction 1.46, thickness 0.35, roughness 0; ambient occlusion and colour grading.
- **Build**: Blender (cloth plus glass material; the natural route) · Code.
- **In video**: the drop and fold are simulated or keyframed; the grab is a simulated hand or cursor pulling a corner. Transition (fold away) or product reveal, 1–3 s.
- **Difficulty**: high.
- **Critical note**: half of the effect is the material, refraction and light, not the physics.

#### holocloth
- **Source**: *Holocloth*. https://holocloth.vercel.app/
- **What**: a holographic cloth with rainbow bands and sparkles that can be pulled and pressed.
- **Communicates**: futurism, luxury, novelty, something collectable.
- **Key parameters**: material holo intensity ~3.8, iridescence ~0.8, roughness ~0.6, metalness 1, bump; physics viscosity 0.6, stiffness 1, 14 solver iterations.
- **Build**: Blender (cloth plus iridescent material) · Record (exports stills only).
- **In video**: an invisible force or a simulated cursor presses and pulls the cloth; light moves across to show the bands. Accent of 2–4 s.
- **Difficulty**: medium.
- **Critical note**: very eye-catching and tiring; use it in short doses.

#### cloth-wireframe
- **Source**: nemutas, *Cloth Simulation*. https://nemutas.github.io/cloth-simulation/
- **What**: a curtain made of points and lines that hangs, moves in the wind, falls to the floor and can be dragged.
- **Communicates**: structure, fragility, the technical becoming soft.
- **Key parameters**: distance constraints between points; gravity; wind.
- **Build**: Blender (cloth with wireframe render) · Code.
- **In video**: wind and gravity over time; a sudden gust or the rod releasing makes the beat. Hero or transition (the curtain falls to reveal B), 3–5 s.
- **Difficulty**: medium.
- **Critical note**: the lines are the cloth. A natural partner for particle-morph when a wireframe should feel physical.

#### sphere-packing
- **Source**: Kevin Levron, *Sphere Packing*. https://codepen.io/soju22/full/qBezBeo
- **What**: hundreds of coloured spheres push against each other, fall with gravity and move away from the cursor.
- **Communicates**: abundance, bubbles, play, community.
- **Key parameters**: 300 spheres; size 0.3–1; gravity 0.5, which can be switched off.
- **Build**: Blender (rigid bodies, native) · Code.
- **In video**: time and gravity; spheres pour in or a container tilts. Accent or ground, 3–5 s.
- **Difficulty**: medium.
- **Critical note**: licensed CC BY-NC-SA, so it cannot be used commercially as is. Rebuild the idea instead.

#### bubbles
- **Source**: oimo.io, *Bubbles*. https://oimo.io/works/bubbles/
- **What**: soap bubbles drawn in thin iridescent lines: blown from a wand, deforming, splitting and popping.
- **Communicates**: lightness, fragility, play, childhood.
- **Key parameters**: surface tension, splitting and popping; exact values not visible.
- **Build**: Record · Code (surface tension is hard).
- **In video**: time; bubbles split and pop on beats, or a simulated pointer pops them. Light accent, 2–4 s.
- **Difficulty**: high.
- **Critical note**: a minimal aesthetic, fine line on white, the opposite of neon. Only partly inspected.

#### cursor-line-wobble
- **Source**: GreenSock, *Cursor Line Wobble*. https://codepen.io/GreenSock/full/ZYWqWeb
- **What**: a line that can be grabbed and stretched like a string, and springs back when released.
- **Communicates**: tension and release, sensitivity, play.
- **Key parameters**: a quadratic curve whose middle control point follows the pointer; release over 0.9 s on an elastic curve (amplitude 1, period 0.3).
- **Build**: ChatCut · Code · After Effects · any tool.
- **In video**: a simulated cursor or an object plucks the line; the elastic release is the beat. Underline or divider accent, under 1.5 s.
- **Difficulty**: low.
- **Critical note**: a well-tuned elastic ease gives the feeling of physics without simulating anything.

### Fluids

Fluid simulations share the same controls. **Dissipation** is how fast motion and colour fade, closer to 1 meaning longer-lasting. The **splat** is the "brush" that injects force and colour, with a strength and a radius. **Pressure iterations** set accuracy. **Resolution** sets detail. Learn them once and every fluid becomes readable.

#### gpu-fluid-particles
- **Source**: haxiomic, *WebGL Fluid Experiment*. https://haxiomic.github.io/GPU-Fluid-Experiments/html5/
- **What**: an invisible fluid carries about 262k glowing particles; dragging creates jets and swirls of light.
- **Communicates**: energy, flow, light, technology.
- **Key parameters**: particle count; simulation quality; solver iterations.
- **Build**: Code · Blender (smoke or fluid plus particles).
- **In video**: splats from a scripted path or a simulated cursor; let the flow continue after the force stops. Ground or energetic bridge, 3–6 s.
- **Difficulty**: high.
- **Critical note**: a classic of creative coding. Neon on black is recognisable and can look dated.

#### gpu-io-ink-fluid
- **Source**: Amanda Ghassaei, *gpu-io fluid example*. https://apps.amandaghassaei.com/gpu-io/examples/fluid/
- **What**: on a paper-coloured ground, dark particles leave trails as a fluid carries them, like ink.
- **Communicates**: ink, writing, craft, calm.
- **Key parameters**: trail length; render modes for the fluid, its pressure or its velocity.
- **Build**: Record (saves images; can be captured) · Code.
- **In video**: time plus a few scripted splats on beats; ink trails settle on paper. Ground for calm sections or a dissolve-into-material transition, 4–8 s.
- **Difficulty**: medium.
- **Critical note**: proof that a fluid does not have to be neon. The colour and ground change its whole character.

#### fluid-pixel
- **Source**: nestorrig, *Fluid Pixel Cursor*. https://nestorrig.github.io/Fluid-Pixel-Cursor-Effect/
- **What**: an invisible fluid follows the cursor and is drawn as large coloured pixels, optionally as ASCII characters.
- **Communicates**: a digital trace, liquid motion in a retro key.
- **Key parameters**: simulation resolution 150; pixel size 16; velocity dissipation 0.77; density dissipation 0.95; 10 pressure iterations; splat force 18, radius 2.1; colour by speed; an ASCII ramp.
- **Build**: Code · Record (animate the pointer).
- **In video**: scripted splats at large pixel size; the pixels make the motion read at video resolution. Transition or retro accent, 2–4 s.
- **Difficulty**: medium.
- **Critical note**: its identity comes from mixing two families, fluid physics and pixel aesthetics.

#### fluid-text
- **Source**: Ksenia Kondrashova, *WebGL Fluid Simulation With Your Text*. https://codepen.io/ksenia-k/full/MWMObrY
- **What**: the text itself is the fluid's ink; moving through it deforms, mixes and dissolves the words.
- **Communicates**: a word dissolving, the ephemeral, expression.
- **Key parameters**: font, weight, size (80), text, pointer size, colour, plus the shared fluid controls.
- **Build**: Code · Record.
- **In video**: a scripted force sweeps across the word at the beat when its meaning changes. Transition (the word dissolves into the next scene), 1.5–3 s.
- **Difficulty**: medium.
- **Critical note**: message and effect become one. Use it with words that mean something when they dissolve.

### Glass and lenses

Glass is the current trend and the next cliché. Use it where transparency or looking through is part of the idea.

#### liquid-lens
- **Source**: Angelo Libero, *Liquid Lens*. https://angelolibero.github.io/liquid-lens/
- **What**: seven soft bodies chase the pointer and merge into one shape that reveals a blurred image behind; a click makes it ripple.
- **Communicates**: discovering, revealing, looking through, curiosity.
- **Key parameters**: body size 0.455; corners 3.4; merge level 0.35; coast wander and coast grain (how irregular the edge is); blurred depth and blur strength; ripple strength, speed, width and life; size wander, drift reach, overall speed; a "moves on its own" mode.
- **Build**: Record (has an autonomous mode) · Blender (metaballs) · Code.
- **In video**: autonomous mode or a scripted path moves the soft bodies; let the lens merge over the key part of the image. Reveal or object-led mask, 2–4 s.
- **Difficulty**: medium.
- **Critical note**: its controls are named in design language, not code. It is a model for how to describe motion.

#### glass-icon
- **Source**: Nikita Filippov, *Glass*. https://phileeppov.com/glass/
- **What**: a tool that turns a logo into a glass icon with prism-like colour dispersion, optionally reacting to sound.
- **Communicates**: a premium product, a brand, a launch.
- **Key parameters**: presets Studio, Melt, Prism, Lens, Night; refraction; blend; logo size; light, dark or transparent ground.
- **Build**: Record (exports 1080p, 4-second video and PNG directly; the fastest route in the library).
- **In video**: export the glass logo and rotate it slowly with a moving light. Product or logo hero, 2–4 s.
- **Difficulty**: low.
- **Critical note**: very much in fashion; as a default it will look generic.

#### liquid-glass
- **Source**: jeantimex, *Glass Effect WebGPU*. https://jeantimex.github.io/glass-effect-webgpu/
- **What**: a study of liquid glass in the style of current operating-system interfaces: shapes that refract, magnify and blur what is behind, with bright edges and a springy deformation when touched.
- **Communicates**: interface, operating system, modernity.
- **Key parameters**: bezel width 60; glass thickness 50; refractive index 1.5; refraction level; magnifying scale; blur and progressive blur; chromatic dispersion; specular rims; spring deformation. The shape is a distance field (SDF).
- **Build**: Record (accepts video as background) · Blender.
- **In video**: a simulated drag moves the glass element over content; refraction shows on what passes beneath. Interface accent inside an interface simulation, 2–4 s.
- **Difficulty**: medium.
- **Critical note**: excellent to learn from; copied as is, it is the most fashionable look of the moment.

#### fluid-glass
- **Source**: chiuhans111, *Fluid Glass*. https://chiuhans111.github.io/fluidglass/
- **What**: large dark glass circles with rims of light; dragging lets a fluid deform the surface, and refraction draws highlights.
- **Communicates**: elegance, mystery, optics, a premium product.
- **Key parameters**: fluid velocity and pressure; surface normal; refraction. No visible controls.
- **Build**: Record · Blender (glass plus rim light).
- **In video**: time plus a moving light; rims catch the light as shapes deform. Premium ground, 3–6 s.
- **Difficulty**: medium.
- **Critical note**: almost all you see is rim light, a very restrained device. Only partly inspected.

#### glass-xylophone
- **Source**: Codrops, *Interactive Glass Xylophone with Three.js*. https://tympanus.net/Tutorials/Xylophone/
- **What**: iridescent glass bars in a spiral that play notes when touched.
- **Communicates**: harmony, music, play, delicacy.
- **Key parameters**: material transmission, thickness, index of refraction, iridescence, dispersion; sound through Web Audio.
- **Build**: Blender or Code, timed to music.
- **In video**: hits on the beats of the soundtrack; in a silent piece, hits on motion beats with visible vibration. Rhythm sequence, 3–6 s.
- **Difficulty**: medium.
- **Critical note**: the sound is half the effect. In video, time every hit to the soundtrack.

### Organic forms

#### metaballs
- **Source**: Jaume Sánchez, *Bumpy metaballs 2026*. https://spite.github.io/bumpy-metaballs-2026/
- **What**: 3D drops that move, merge and separate like mercury or jelly, with a bumpy surface and dozens of materials (ice, opal, gummy, nacre).
- **Communicates**: the organic, the alive, the biological, the sensory.
- **Key parameters**: 20 blobs; isolation 80 (the surface threshold); speed; drift; smoothing; twist on three axes; ~50 material presets.
- **Build**: Blender (native metaballs; the material is the real work) · Code.
- **In video**: time; blobs merge on the beat when two ideas combine. Morph transition or organic hero, 2–5 s.
- **Difficulty**: medium.
- **Critical note**: the form is simple and the material gives the character. Some materials (flesh, gills) can disturb, depending on the message.

### Pixel and ASCII

#### pixel-voxel-drop
- **Source**: Junichi Kasahara, *Pixel-Voxel-Drop*. https://tympanus.net/Tutorials/PixelVoxelDrop/
- **What**: an image or video pixelates, the pixels become 3D cubes with colour separation, then they fall and pile up with physics.
- **Communicates**: breaking apart, taking down, the digital becoming physical.
- **Key parameters**: grid columns and spacing; cube or random box shape; count; duration; organic variation; pixelation; RGB shift; spread; depth; drop delay.
- **Build**: Record (load your own image) · Blender (rigid bodies) · Code.
- **In video**: the image pixelates on a beat, then cubes fall with gravity; the camera tilts to show depth. Transition (the digital becomes physical), 2–3 s.
- **Difficulty**: medium.
- **Critical note**: three effects chained (pixel, voxel, fall) make a small choreography. A model of a transition with structure.

#### doom-fire
- **Source**: Niklas Knaack, *Pixel Flame Canvas – Doom Fire*. https://codepen.io/NiklasKnaack/full/OJKoyKd
- **What**: pixel fire. Each pixel takes heat from the one below, loses a little at random and rises.
- **Communicates**: heat, energy, retro, games.
- **Key parameters**: pixel size 2; a fire palette from white to black; wind strength and direction; random decay.
- **Build**: ChatCut · Code · any tool.
- **In video**: time; wind or intensity animate with the energy of the section. Ground or accent, 2–4 s.
- **Difficulty**: low.
- **Critical note**: the classic fire algorithm from the game *Doom*. A very simple rule that produces something organic.

#### ascii-logo
- **Source**: Edoardo Lunardi, *ASCII Logo*. https://tympanus.net/Tutorials/ASCIILogo/
- **What**: a 3D shape drawn with text characters, rotatable, with light and dark themes.
- **Communicates**: the technical, retro computing, code, the terminal.
- **Key parameters**: a character ramp by brightness; cell size; colour; theme.
- **Build**: Code · Record (animate the rotation).
- **In video**: time; slow rotation of the 3D form, or a reveal from noise to shape. Logo or object hero, 3–5 s.
- **Difficulty**: medium.
- **Critical note**: ASCII is a trend. It works when the shape means something, not as a filter.

#### ascii-noise-field
- **Source**: Codrops, *ASCII Shader with OGL*. https://tympanus.net/Tutorials/ascii-shader-ogl/
- **What**: an animated noise field drawn with coloured characters, like a landscape that breathes.
- **Communicates**: living data, signal, a digital atmosphere.
- **Key parameters**: frequency (noise scale); speed; lightness; Perlin noise underneath.
- **Build**: Code · Record · ChatCut (likely).
- **In video**: time; field speed rises with tension. Ground behind titles, any length.
- **Difficulty**: low.
- **Critical note**: a good ground behind titles. The same noise gives particles their life.

#### canvas-grid-zoom
- **Source**: Tom Miller, *Canvas Grid Mouse Effect*. https://codepen.io/creativeocean/full/emBOove
- **What**: a photo divided into a grid of squares with dots at the corners; near the pointer, each square zooms into its own piece of the image.
- **Communicates**: looking closer, detail, exploring.
- **Key parameters**: square size 85; optional fade; dots and dot colour; pointer follows on a 1 s expo curve; scale by distance.
- **Build**: Code · Record (animate the pointer) · ChatCut (likely).
- **In video**: a camera move replaces the pointer: the camera travels across the grid and squares zoom as it passes, ending in a zoom-through into one image. Gallery or transition, 2–4 s.
- **Difficulty**: low.
- **Critical note**: a simple idea with a big effect. It works best with highly textured photos.

### Generative patterns

#### truchet-tiles
- **Source**: Rafa, *Truchet Tiles*. https://codepen.io/RAFA3L/full/OJKwaar
- **What**: a grid of tiles with quarter-circle arcs that turn 90°, at random or on hover, forming curved paths that keep changing, on a plane tilted in perspective.
- **Communicates**: connections, paths, a system reorganising itself.
- **Key parameters**: 64 px tiles; 90° turns over 0.6 s with ease-in-out; random intervals of 1–42 s; tilted 28° with 1000 px perspective.
- **Build**: ChatCut · After Effects · Code.
- **In video**: time; tiles turn on a slow random rhythm, or a wave of turns crosses the grid on a beat. Ground, any length.
- **Difficulty**: low.
- **Critical note**: a classic pattern. The perspective and the slow random rhythm make it.

### 3D and waves

#### wave-grid
- **Source**: Franky, *3D Wave Grid*. https://projects.arkon.digital/threejs/wavy-cubes/
- **What**: a grid of pale 3D columns that ripple gently behind text.
- **Communicates**: calm, order, precision, professionalism.
- **Key parameters**: grid size; wave height and speed (a sine of position and time).
- **Build**: Blender · Code · ChatCut (likely).
- **In video**: time; a ripple crosses on beats or follows the text entering. Ground behind text, any length.
- **Difficulty**: low.
- **Critical note**: a model of restraint, where 3D supports the text without stealing focus.

#### data-tunnel
- **Source**: sabosugi, *Data Tunnel*. https://codepen.io/sabosugi/full/azZmLoB
- **What**: about 80 fine lines fan out from a point like a tunnel and ripple, while signals of light with trails travel along them.
- **Communicates**: data, connectivity, speed, infrastructure.
- **Key parameters**: 80 lines; spread; curve length and power; wave speed and height; line opacity; 94 signals; global speed; trail length 3; bloom strength 3; up to three signal colours.
- **Build**: Record · Code.
- **In video**: time; signals travel on the beats; the camera flies through the tunnel for a transition. Bridge or zoom-through, 2–4 s.
- **Difficulty**: medium.
- **Critical note**: lines of light on black are very common in tech. Change the ground, the colour or the meaning.

#### duo-lenticular
- **Source**: ycw, *duo*. https://codepen.io/ycw/full/xxVPMwB
- **What**: a zigzag folded surface, like an accordion, with one photo on each face, so each side of the view shows a different image.
- **Communicates**: two sides, before and after, a change of perspective.
- **Key parameters**: a finely subdivided grid; zigzag depth 0.5; two side lights; a camera that orbits.
- **Build**: Blender (straightforward) · Code.
- **In video**: a camera orbit replaces the viewer moving: as the camera passes, the surface flips from A to B. Before-and-after transition, 1.5–3 s.
- **Difficulty**: medium.
- **Critical note**: the idea of lenticular postcards. Very strong for any message about duality.

#### sine-cosine
- **Source**: schwiiiii, *[Pure CSS] Sine & Cosine Visualized*. https://codepen.io/schwiiiii/full/MWNqrMv
- **What**: a dot moving in a circle, with its horizontal and vertical components shown as two waves at its sides.
- **Communicates**: learning, explaining, rhythm, cycles.
- **Key parameters**: 4 s per cycle; a sine curve, cubic-bezier(0.37, 0, 0.63, 1); two motions offset by half a cycle; alternating, infinite.
- **Build**: any tool.
- **In video**: time; one full cycle per idea, with the waves drawing as the dot turns. Teaching beat, 4–6 s.
- **Difficulty**: low.
- **Critical note**: the mathematics in one image: circular motion is two waves out of phase.

### Transitions and editorial systems

#### editorial-reveal-system
- **Source**: Prolibu website. https://prolibu.com/es/
- **What**: a coherent motion system for a dark editorial site, combining smooth inertial scrolling, short and precise entrances, blur-to-focus, a circular mask reveal and asymmetric exits.
- **Communicates**: precision, confidence, a premium product.
- **Key parameters**: entrances of 8–32 px over 0.6–1.2 s on quint-out (0.22, 1, 0.36, 1), with opacity shorter than movement (0.5 s against 0.8 s); blur-to-focus from 8 px blur and 0.8 scale on expo-out (0.16, 1, 0.3, 1); exits of 0.32 s on (0.7, 0, 0.84, 0); overshoot (0.34, 1.56, 0.64, 1) only on small elements; stagger of 80–180 ms; a circle that grows from the centre as a mask between big ideas.
- **Build**: ChatCut · After Effects · Code.
- **In video**: time on scroll-equivalent beats: each element reveals as if scrolled into view, with the camera or the page moving up. A whole system for text-led sections, and the circular mask as a transition.
- **Difficulty**: low.
- **Critical note**: the value is the system, not any single effect. Small distances, fast exits, overshoot kept for small things.

#### unwoven
- **Source**: Clément Grellier, *Unwoven*. https://tympanus.net/Development/Unwoven/
- **What**: an endless carousel of photos where, near the edges, each image unravels into fluttering threads, like fabric coming undone.
- **Communicates**: memory, nostalgia, time passing, fading away.
- **Key parameters**: 26 threads per image; 20 segments for the flutter; 95 px/s drift; unravelling begins 26% in from the edge; corner radius 20; aspect 0.75.
- **Build**: Record (moves on its own; load your images) · Code.
- **In video**: time drives the unravelling; the camera pans across the images as if scrolling. Gallery or dissolve-into-material transition, 3–5 s.
- **Difficulty**: medium.
- **Critical note**: the fabric metaphor makes it a transition with meaning, not decoration.

#### scroll-graph
- **Source**: Tom Miller, *Scroll-Driven SVG Graph Animation with GSAP*. https://tympanus.net/Tutorials/ScrollGraph/
- **What**: a line chart draws itself while the camera follows its tip and zooms out, and the data points pop in one after another.
- **Communicates**: growth, progress, a story told with data.
- **Key parameters**: the line draws along its length; the camera follows the line's tip; scale from 2 to 0.4 on expo in-out; points appear with a 0.1 stagger. For video, drive it by time instead of scroll.
- **Build**: ChatCut · After Effects · Code.
- **In video**: scroll becomes time: the line draws while the camera follows its tip and pulls back. Data beat or pull-out reveal, 4–8 s.
- **Difficulty**: low.
- **Critical note**: a camera that follows the data turns a chart into a narrative. Ideal for explainers.

#### page-transitions
- **Source**: Iqbal, *Page Transitions in Astro with Barba.js & GSAP*, design credited to cielrose.tv. https://page-transitions-astro-barba-gsap.crnacura.workers.dev/
- **What**: on each page change, soft blurred shapes cover the screen and the new content is revealed through masks.
- **Communicates**: editorial elegance, a change of chapter.
- **Key parameters**: inset masks from the bottom up and polygon masks; durations of 0.5–1.4 s; power and expo curves plus custom curves.
- **Build**: ChatCut · After Effects · Code.
- **In video**: time; the covering shapes and masks run between two beats. Object-led mask transition, 0.5–1.4 s.
- **Difficulty**: low.
- **Critical note**: the value is the system: every transition has a considered duration and curve.

#### line-hover-styles
- **Source**: Codrops, *Underline Hover Styles for Links*. https://tympanus.net/Development/LineHoverStyles/
- **What**: fifteen animated underlines: lines that grow, slide, glitch or draw themselves.
- **Communicates**: detail, editorial care, emphasis.
- **Key parameters**: 0.3–0.4 s; curves (0.7, 0, 0.2, 1), (0.2, 1, 0.8, 1) and (0.4, 1, 0.8, 1).
- **Build**: ChatCut · After Effects · any tool.
- **In video**: a simulated cursor hovers the word, or the underline plays on the beat of emphasis. Emphasis accent, under 0.5 s.
- **Difficulty**: low.
- **Critical note**: a catalogue of micro-motion with exact values. Use one style per piece, consistently.

#### inertia-slider
- **Source**: ReGGae, *Infinite draggable WebGL slider*. https://codepen.io/ReGGae/full/povjKxV
- **What**: an endless image carousel dragged with inertia; images rescale through a shader as they move.
- **Communicates**: a gallery, a portfolio, exploration.
- **Key parameters**: speed 2; drag threshold 50; easing 0.075 per frame (the inertia); image scale from 0.65 to 1.
- **Build**: Code · Record.
- **In video**: a simulated drag throws the slider and inertia carries it; or the camera moves with the same inertia. Gallery or portfolio sequence, 3–5 s.
- **Difficulty**: medium.
- **Critical note**: inertia, easing toward a target a little every frame, is the same idea as a spring with friction.
