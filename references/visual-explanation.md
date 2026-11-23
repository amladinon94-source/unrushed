# Explaining visually

How to make a viewer understand something by watching it happen, instead of reading about it beside a decorative animation. Read this file for `storyboard`, `export` and `critique`, and for `style` when the piece shows a product.

## Contents

1. The slide test
2. Devices
3. Which device for which idea
4. Interface simulation
5. Design systems: real components, not invented ones
6. Cursor choreography
7. Building notes
8. Finding the real product
9. The product demo script

## 1. The slide test

Pause any frame. If it reads as a slide (a label, a title and a paragraph beside a box with a small demo), the scene is presenting, not explaining. Motion professionals explain inside the scene: the camera moves to the idea, objects carry over from one beat to the next, and the explanation happens on the thing itself.

Signs of a slide:

- The same template every scene: label, title, support line, demo area.
- Demos in fixed boxes or split panels that never change shape.
- Text carries the idea and the image decorates it.
- Each scene starts from an empty frame and ends in an empty frame.
- The camera never moves.

Text can stay. Short titles anchor a silent piece. But the text should name what the viewer is already seeing, not describe what they cannot see.

## 2. Devices

Each device below is a way of making an idea visible. Use a different one for neighbouring beats.

**Interface simulation.** A cursor operates a real-looking interface (a graph editor, a timeline, a slider, a property panel, a code field) and the result changes live beside it or behind it. Best for "how it works", "you control this", and any product. See sections 4–6.

**Ghosts and onion skin.** The moving object leaves 6–12 copies of itself at fixed time intervals, fading out. The spacing between ghosts shows the easing: even spacing is linear, bunched-up spacing at the end is ease-out. This is the animator's own tool, and the clearest way to show curves, speed and timing. A spacing chart, ticks along the path at equal time steps, is the minimal version.

**Same space, two behaviours.** Instead of two panels side by side, the generic version plays, rewinds, and the crafted version plays on the same spot, or both run superimposed with the generic one as a translucent ghost. The difference is read directly, without the eye jumping between halves.

**Curve and motion in sync.** A value graph draws while the object moves, with a playhead linking the two. The viewer sees the shape of the curve become the feel of the motion.

**Time remap.** Slow motion or a freeze frame in the middle of a movement, with an annotation on the frozen state, then release back to speed. It works best on a moment that is too fast to notice at full speed: an overshoot, a squash, a stagger.

**Camera push to detail.** The camera dives into one part of the frame (a pixel, a keyframe, a word) to show what matters, then pulls back to context.

**One canvas.** All beats live on one large plane, and the camera travels between them. Transitions become camera moves, and the piece feels like one continuous world rather than a deck. See `transitions.md`.

**Building diagram.** A diagram or chart assembles in the order of the explanation: the parts first, then the connections, then the result. The data-graph technique in `techniques.md` is one form.

**Physical analogy.** The idea is enacted by a material with known behaviour, such as ink that settles, a spring that overshoots or cloth that lags. It uses `material` from `STYLE.md`.

**Type as actor.** Words move as the idea: "slow down" decelerates, "overlap" overlaps. Use it for a single key phrase, not for every line.

**Product footage with overlays.** A real screen recording with focus masks, zooms and callouts. It is the most honest proof for a product.

## 3. Which device for which idea

| To explain… | Strongest devices |
|---|---|
| A curve, easing, speed | ghosts and onion skin, curve and motion in sync, interface simulation (graph editor) |
| Timing, order, stagger | timeline in interface simulation, time remap |
| Before and after, generic and crafted | same space with two behaviours, a ghost superimposed, rewind |
| How a product works | interface simulation with the real design system, product footage |
| A parameter and its effect | interface simulation (slider or field) with the result changing live |
| A process with steps | one canvas with the camera travelling between steps, building diagram |
| Quality, material, feel | physical analogy, camera push to detail, time remap |
| A number or a trend | building diagram, data graph with a following camera |
| A single key phrase | type as actor |

## 4. Interface simulation

The interface is a stage, not a screenshot. Treat it as a set built for camera:

- **Scale it up.** Interfaces at 1:1 are unreadable in video. Show them at 1.5–2× and crop to the region that matters.
- **Simplify.** Keep the panels the beat needs and remove the rest. A focused interface reads better than a complete one.
- **Direct the eye.** Dim or blur what does not matter, push the camera toward the control being used, and keep one active control at a time (one protagonist).
- **Use real content.** Real labels, real values, real data that the brief supports. Never lorem ipsum or "Button".
- **Show cause and effect.** Every interaction produces a visible result within 100–300 ms, as real software would.
- **Hold the result.** After the change, give the viewer time to see what happened before the cursor moves on.
- **A camera move over a still screen is not a demo.** Pushing into, sliding across or pulling out of a screenshot shows where things are, not what the product does. Use camera travel to connect beats. Each key beat of a demo still needs an action and its result on screen (§9).

## 5. Design systems: real components, not invented ones

Invented interfaces read as fake: wrong proportions, made-up controls, inconsistent icons. Use the components and icons of a real, recognisable system, chosen by context:

| Context | Use |
|---|---|
| You can see the product (code, Storybook, Figma, screenshots) | Its own components, tokens, fonts and icons. The highest fidelity, and the only right choice for a product video. |
| A web SaaS, dashboard or developer tool, with no access | shadcn/ui components (MIT) with Lucide icons (ISC). The current de facto look of web apps. |
| A Google product or an Android app | Material Design 3 with Material Symbols (Apache 2.0). |
| A Microsoft or enterprise product | Fluent 2 with Fluent System Icons (MIT). |
| An app for Apple platforms | Apple's Human Interface Guidelines. Apple's design resources and SF Symbols are licensed only for mock-ups of software that runs on Apple platforms, so check the licence before using them in any other piece. |
| A creative tool (video editor, motion tool, design tool) | The conventions those tools share: a dark interface, a timeline with keyframes, a layers list, an inspector, a graph editor. Build them from shadcn/ui primitives on a dark theme and Lucide icons. |

Rules:

- **Use the real anatomy.** Sizes, radii, spacing, states (hover, active, focus) and type scale from the system's documentation or code. Do not approximate a button; use the button.
- **One system per piece.** Do not mix Material controls with shadcn/ui cards.
- **Generic over branded unless it is theirs.** Show a real company's interface, logo or name only when the piece is for that company or the person has the right to show it. Otherwise build the generic version of the kind of tool, with no real product names or logos.
- **Keep licences.** Note the licence of every component and icon set in `STYLE.md`.

## 6. Cursor choreography

A cursor that teleports or moves in straight lines at constant speed is an AI tell. A human hand:

- **Travels on a slight arc** with ease-in-out, at roughly 600–1,200 px per second at 1080p.
- **Decelerates onto the target** and may overshoot by a few pixels, then settles.
- **Pauses 150–300 ms** before clicking: the hand aims.
- **Gives feedback on click:** the control shows its pressed state, and a small press scale or ring on the cursor (90–95%, about 100 ms) is optional.
- **Drags with weight:** the dragged value lags the cursor slightly and settles when released.
- **Rests while the result plays.** The cursor is still, or moves aside, so it does not compete with the result.
- **Uses the system's cursor:** an arrow for pointing, a hand for links, resize or grab cursors for handles.

## 7. Building notes

- **Remotion and other React targets** can render the design system directly: shadcn/ui components, Tailwind tokens and `lucide-react` icons work inside compositions. Drive every state (hover, pressed, the value of a slider) from the frame number, never from real events.
- **ChatCut** builds motion graphics with code. Name the system and the components in the prompt ("a shadcn/ui Slider and Card in dark theme, Lucide icons"), and give the token values (radius, colours, font) so it does not approximate.
- **After Effects and similar tools:** import the real components from Figma community kits of the chosen system, or vector exports of the product, rather than drawing controls by hand.
- **Ghosts and onion skin:** render the object at earlier times (frame − k × step) with decreasing opacity; in code it is the same component drawn several times.

## 8. Finding the real product

When a piece shows a product, the interface must come from the product. Look for it **before** designing any screen, and never invent one quietly because nobody offered the source.

**Where to look, in order:**

1. **The project itself.**
   - Files in the working folder, uploaded media and the editor's asset library: screen recordings, screenshots, exported frames.
   - An existing video's frames, which show the real screens and copy.
2. **The code.**
   - A repository in the working folder.
   - A repository reachable through the tools you have: git, the GitHub CLI, a GitHub or GitLab connector.
   - Any link the person has shared. If you know the product's name but not its repository, ask for it.
3. **The design files.** Figma, or a Storybook or component library, through a connector or a link.
4. **The running product.** A URL, staging or a local build, opened in a browser to read real screens, copy and states.

If none of these is reachable, ask once, in the same round as the other intake questions, for the repository, the design file or a link. Only then fall back to a design system (§5), and mark every screen built that way as **approximate** in the plan and the report.

**What to read in a repository.** Read with a purpose; you are not auditing the code.

| Look for | Usually in | Use it for |
|---|---|---|
| Design tokens: colours, radii, spacing, fonts | `tailwind.config.*`, `globals.css`, `theme.*`, `tokens.*`, CSS variables | exact values instead of approximations |
| The components in the flow you will show | `components/`, `ui/`, `app/` or `pages/` routes | real anatomy and states (table rows, cards, badges, buttons, toasts) |
| Routes and screens | the router (`app/`, `pages/`, `routes.*`) | which screens exist, and their order in the flow |
| Real interface copy | the components, `i18n`/`locales` files | labels, statuses, empty states, error texts |
| States | conditional rendering, status enums, badge variants | before and after for each step (loading, empty, error, success, validated) |
| Icons and fonts | `package.json` (`lucide-react`, `@radix-ui`, font packages) | the right icon set and type |

**Rules:**

- **Write down what you looked at.** List the sources in `VIDEO.md` under "Product sources": the repository and the paths read, the files, the URLs. Note what each screen in the plan is built from. `critique` treats a demo without this list as unverified.
- **Use realistic sample data**, never real customer data, emails, names or numbers from production. Respect what the person says must not be shown.
- **Do not reproduce source code** in the video. Use it to rebuild the interface faithfully.

## 9. The product demo script

A product demo is a short story in which a person does something and the product responds. Write it before the storyboard, from the real flow. One row per step:

| Step | Who acts | Action (cursor, typing, an event) | Product response (state change) | Screen and components (source) | Hold |
|---|---|---|---|---|---|
| 1 | a customer email arrives | the email lands in the inbox | the unread counter goes 41 → 42 | Inbox, `MailRow` (repo `src/components/inbox`) | 0.6 s |
| 2 | the AI | reads the email | the email becomes ticket REC-1104, priority and type filled in | Ticket card, `TicketCard` | 1.2 s |

The example is illustrative. The rules:

- **Find the "aha" moment**, the step where the product does what nothing else does. Give it the longest hold and the biggest transition into it.
- **Every key step has an action and a visible response** within 100–300 ms (§4). If a step has no action, it is narration: cut it or show the cause.
- **The cursor follows §6.** A system event, such as an email arriving or a job finishing, needs a visible cause too: a notification, a counter, a row appearing.
- **States come from the product.** Use the real statuses, badges and copy found in §8.
- **Camera moves connect steps.** They never replace a step.

