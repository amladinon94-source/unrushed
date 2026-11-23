# Verdicts

What the author of Unrushed said about real pieces made with it, with context. Read it before proposing an idea, a style or a fix. These are reactions to specific pieces, not universal rules: generalise each one only as far as its context goes.

Each project keeps its own `TASTE.md` (template in `assets/TASTE.md`) for the person it is made for. This file is the shared example and the reason behind several of the skill's rules. Quotes stay in the language they were said in, with a translation.

## How to add a verdict

When the person reacts to a piece, append an entry to the project's `TASTE.md`: date, piece and version, the quote, what they were reacting to (scene, time, frame), and the narrowest lesson it supports. Never rewrite an earlier entry; add a new one that refines it.

## Rejected

**Before 0.4 · Unrushed 0.3, a run inside ChatCut on a new piece.**
- Quote: "no me pidió reglas para trabajar, imágenes de marca, no sé, algo para el guion, solo se asumió apenas lo inicié" (it asked for no working rules, brand images or anything for the script; it just assumed as soon as I started it).
- Reacting to: the skill starting to build with no intake.
- Lesson: no visual work before the intake; if the person skips the questions, write the assumptions down where they can be corrected. Became "Context before creation" in 0.4.

**Before 0.4 · Unrushed 0.3, run on a video made without the skill.**
- Quote: "cuando hizo cambios fueron poco estrictos, y muy perezosos" (the changes it made were lax and very lazy).
- Reacting to: small cosmetic changes (a duration here, grain or a camera move there) instead of treating the problems the critique named.
- Lesson: every fix has an acceptance test, and a fix cannot be swapped for a cheaper one. Became the fix contract in `improve`.

**Before 0.4 · Same run, the product demo.**
- Quote: "no hizo el mínimo esfuerzo por revisar el repositorio del producto para proponer interfaces reales del producto" (it made no effort to check the product's repository to propose its real interfaces).
- Reacting to: invented screens moved around by camera pushes.
- Lesson: find the real product first (code, design files, running app) and build the demo from its components; a camera move over a still screen is not a demo step.

**2026-11-23 · Unrushed 0.4, pieces built after the 0.4 changes.**
- Quote: "se ven ruidosos, poco cuidados en la información, no está siendo el protagonista la animación sino que sigue sintiéndose muy AI" (they look noisy, careless with information; the animation is not the protagonist and it still feels very AI).
- Reacting to: scenes crowded with labels and text, every beat equally loud, motion as decoration around the text.
- Lesson: the skill's own rules and example were prescribing page furniture (labels, counters, a long end card with a URL) and a quota of transition kinds. Removed in 0.5; added the Never ship list, the importance budget and "what each beat buys".

**2026-11-23 · Same pieces, the research.**
- Quote: "investigamos físicas, técnicas, pero nada de eso se aplica" (we researched physics and techniques, but none of it is applied).
- Reacting to: measured curves and techniques that lived in prose and never reached the built motion.
- Lesson: motion values must arrive as numbers the tool executes (the motion kit and its Remotion file), and a render must be checked by script (the gates), not by the agent's own description.

## Preferred

**2026-11-23 · How to learn from another project.**
- Quote: "hay que tomar las cosas buenas que sí hace motionmaxxing… para conservar nuestro objetivo pero con los aprendizajes de motionmaxxing" (we should take the good things motionmaxxing does, to keep our goal but with its lessons).
- Lesson: keep Unrushed's job (directing motion inside the person's own editor, with their footage and their real product) and adopt measured values, gates and honest review; do not become a second film generator.

**Standing preference · Working style.**
- The author wants a plan for long tasks, executed in parts, with a critical voice rather than agreement, and questions when something is unclear. Pieces built with Unrushed should follow the same rhythm: pass 0 first, shown before the rest is built.

## Measured on our own work (not a verdict, but evidence)

**2026-11-23 · The 2-minute Unrushed video made in Remotion during 0.2.** `detect.py` reports: 21 flat frames in three runs (G2 fails), a final hold of 5.7 s (G3 fails), 13% of frames changing, motion 0.3 against a human median of 6.8. It is the clearest example of "the animation is not the protagonist".
