# REVISION

**Piece**:  · **Version reviewed**:  · **New version**:  · **Focus**: (all, or e.g. physics, demo)

## Assumptions
Only if the person asked to skip questions.

- 

## Scores
| Criterion | Baseline | Evidence | After | Evidence |
|---|---|---|---|---|
| Story | | | | |
| Rhythm | | | | |
| Explanation | | | | |
| Transitions | | | | |
| Effects | | | | |
| Concept | | | | |
| Information | | (buys, importance, real content) | | |
| Hierarchy | | | | |
| Legibility | | | | |
| Choreography | | | | |
| Timing | | | | |
| Physics | | (strip, profile or playback) | | |
| Product demo | | (sources listed?) | | |
| Material and light | | | | |
| Distinctiveness | | | | |
| Consistency | | | | |

Every criterion scored 2 or less needs at least one fix below.

## Gates
From `scripts/detect.py <video> --expect <seconds> --storyboard STORYBOARD.md`. Quote the script; write "by eye" for G1, G4 and G5 on the rendered frames.

| Gate | Baseline | After |
|---|---|---|
| G0 piece exists | | |
| G1 proof readable (by eye) | | |
| G2 no empty frames | | |
| G3 short ending | | |
| G4 one hero per frame (by eye) | | |
| G5 no page furniture | | |

Never ship items found:

- 

## Fixes
| # | Criterion | Where (scene, time) | Now (evidence) | Change (numbers) | Acceptance test | Weight | Status | Evidence after |
|---|---|---|---|---|---|---|---|---|
| F1 | | | | | | heavy / light | planned / done / partial / not done | |

**Fix contract:**
- Never swap a fix for a cheaper one: a rebuilt demo cannot become a camera move, physics cannot become grain, a new transition cannot become a slower old one.
- Heavy fixes are built first.
- Nothing approved becomes optional.
- If a fix cannot be done as planned, stop that fix, say why, and propose the closest real alternative.

## Passes
One line per pass (`SKILL.md`, "Building in passes"): what was built, what the contact sheet showed, what was fixed by frame range.

| Pass | Built | Seen (sheet, strips, gates) | Fixed (frames) |
|---|---|---|---|
| 0. Hardest beat | | | |
| 1. Blocking | | | |
| 2. Type and information | | | |
| 3. Motion | | | |
| 4. Finish | | | |

## Not verified
What could not be checked, and why.
