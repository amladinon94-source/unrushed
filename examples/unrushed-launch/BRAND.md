# BRAND — Unrushed

- **Source:** brandbook (`Unrushed-Brandbook-v1.pdf`, 20 pages, November 2026)
- **Owner who approves changes:** Andrés Ladino

## Non-negotiable vs open
- **Fixed by the brand:** palette and proportions, Stack Sans + JetBrains Mono + PT Serif Italic, the `>` dot-matrix symbol and its rules, one orange dot per frame, expo-out motion, voice.
- **Open for each piece:** material of the scene, composition, devices, the signature move within the dot-matrix language.

## Logo
| Version | Use | Minimum size | Clear space |
|---|---|---|---|
| A · horizontal (symbol with grid + `unrushed` in JetBrains Mono Medium) | intro, end card | 160 px | 3 cells |
| B · vertical | 9:16 and 1:1 | 96 px | 3 cells |
| C · no grid | over textured or image grounds | 160 px | 3 cells |
| D · text signature `> unrushed` (orange `>`) | credits, lower thirds, README | 12 pt | — |
| E · symbol only (full 13×13 grid) | avatar, watermark | 64 px | 3 cells |
| E · symbol only, compact (7×7) | 48 px or less | 16 px | 1 cell |

- **On video:** a corner watermark under 64 px uses the compact symbol.
- **Logo animation (24 fps):**
  - frame 0: the dim grid appears from the centre;
  - frame 12: the arrow lights from tail to tip, 2 frames per dot;
  - frame 24: the tip turns orange;
  - frame 36: `unrushed` types in with an orange cursor.
- **Never:**
  - two orange dots;
  - a coloured grid;
  - no halftone;
  - rotation;
  - a flat grid;
  - low contrast.

## Colour
| Name | Hex | Role | Notes |
|---|---|---|---|
| Carbón | #1E1E1E | ground | screen |
| Crema | #EDE6DA | ink on carbón, paper ground | |
| Señal | #FF5F1F | accent | one focus per frame; ≤5% of the area |
| Grafito | #343434 | unlit LEDs, lines | |
| Tinta | #181818 | text on crema | |
| Arena | #DED6C8 | unlit LEDs on crema | |
| Piedra | #625E57 | secondary text on crema | |
| Gris | #8C8880 | secondary text on carbón | |
| Señal profunda | #B33A0B | orange text on crema | |
| Fósforo | #7FA7FF | data and diagrams only | |

- **Proportion per piece:** 60 carbón / 25 crema / 10 grafito or arena / ≤5 señal
- **Text pairs that pass 4.5:1:**
  - crema on carbón: 13.4
  - tinta on crema: 14.3
  - señal on carbón: 5.5
  - gris on carbón: 4.7
  - piedra on crema: 5.2
  - señal profunda on crema: 4.8
- **Pairs never used for text:** señal on crema (2.4)

## Type
| Family | Role | Sizes at 1920×1080 | Licence |
|---|---|---|---|
| Stack Sans Headline Medium | titles, figures | display 140–180, title 72–96 | OFL |
| Stack Sans Text | body, subtitles | 36–44 | OFL |
| JetBrains Mono | labels, code, wordmark, timecode | 22–26 caps +10%, code 32–48 | OFL |
| PT Serif Italic | quotes | 56–72 | OFL |

## Graphic elements
- **LED matrix:** grounds and data, made of dots.
- **Crop marks:** frame what matters.
- **◇ bullet:** the active item in orange.
- **Dotted leader:** joins a name and its value.
- **Chamfered card:** a 45° corner, 1/12 of the side.
- **Numbering:** 001.
- **Frame ruler:** 24 fps, with an orange playhead.
- **Prompt:** `> command █`.

## Imagery
- **Yes:**
  - macro shots;
  - real materials;
  - side light;
  - a blurred background;
  - one orange light.
- **No:**
  - robots;
  - glowing brains;
  - hologram hands;
  - blue neon;
  - generic "AI" stock.

## Motion
| Token | Value | Use |
|---|---|---|
| Base curve | expo-out `cubic-bezier(0.16, 1, 0.3, 1)` | everything that arrives |
| Durations | 200 / 400 / 800 ms | micro / element / scene or brand |
| Stagger | 2 frames per dot | dot reveals |
| Base transition | hard cut | most cuts |
| Brand transition | dot sweep (the grid lights or dims) | intro and close only |
| Forbidden | bounce, linear, zoom transitions, generic ease-in-out | |

## Effects library
- **Allowed looks:**
  - Dither, for the brand's LED and bitmap language;
  - Glow, subtle, on lit dots only.
- **Allowed for function:**
  - Mask;
  - Magnifying Glass;
  - Corner Pin;
  - Local Mosaic;
  - Person Regions as a matte;
  - zooms tied to words.
- **Never:**
  - Flash;
  - Camera Shake;
  - Impact Shake;
  - Laser Eyes;
  - ASCII Rain;
  - Cartoon;
  - Page Curl;
  - Elastic Scale (it bounces).

## Voice
- **We sound:** precise, calm, critical.
- **Words we use:** beat, rhythm, focus, arrival, pause, cut, hold.
- **Words we avoid:** epic, magic, revolutionary, "in seconds", "AI-powered".

## Video templates
| Piece | Format | Composition |
|---|---|---|
| Cover | 16:9 | black with a grafito dot field, symbol (no grid) top left, `EP 001` in mono, title in Headline, orange dot bars |
| End card | 16:9 | crema, full symbol centred, `unrushed` in mono, the GitHub URL in piedra |
| Lower third | — | crema chamfered card, a 14 px señal bar on the left, name in Headline, role in mono caps |
| Social post | 4:5 | crema card, a PT Serif Italic quote, the compact symbol with its accent |

## Safe areas
- 1920×1080: 96 px at the sides, 64 px at the top and bottom.
- Vertical: 64 px at the sides.
