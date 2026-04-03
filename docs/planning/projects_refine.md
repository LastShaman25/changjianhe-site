# Phase 5A — Pinned Scroll Sequences: Project Story Pages
> This plan covers three project pages: Elementization, ALOA, and AI Learning Assistant. Each gets a full pinned scroll sequence where the page stops while a multi-chapter story plays out through scroll, then releases. Each project has a distinct motion language designed to communicate what the project actually does. Read this entire document before writing any code.

---

## Standing Constraints

- **No new npm packages.** GSAP + ScrollTrigger is already installed and handles everything here.
- **No design system changes.** Use existing tokens, type classes, and component primitives throughout.
- **Only animate `transform` and `opacity`.** No layout properties.
- **`will-change: transform`** on every pinned or animated element.
- **Reduced motion:** If `useHydratedReducedMotion` returns `true`, disable all pinned sequences. Chapters should still be readable — render them as a normal vertically scrolling page with the existing `ScrollFadeIn` entrance behavior. No pinning, no dispersed assembly.
- **Mobile:** Disable pinned sequences on touch devices (`hover: none`). Render as normal scroll on mobile. The pinned experience is desktop-only.
- **Bilingual:** All chapter content must be passed as props from the locale data layer. No hardcoded English strings in animation components.
- **Confirm each project builds and works correctly before moving to the next.**

---

## The Shared Technical Pattern

All three projects use the same underlying GSAP structure. Build this as a reusable component first, then apply it to each project.

### `StoryPin` Component

Create `src/components/story/StoryPin.tsx`.

This component receives an array of chapter objects and:
1. Pins a container element for the full scroll duration of the sequence
2. Creates a GSAP timeline scrubbed to scroll position
3. For each chapter transition, plays the exit animation of the current chapter overlapping with the entrance animation of the next
4. Releases the pin after the final chapter's animation completes

```tsx
// src/components/story/StoryPin.tsx
// Props shape — implement the full component from this interface

type StoryChapter = {
  id: string
  content: React.ReactNode
  enterAnimation: (el: HTMLElement, tl: gsap.core.Timeline) => void
  exitAnimation: (el: HTMLElement, tl: gsap.core.Timeline) => void
}

type StoryPinProps = {
  chapters: StoryChapter[]
  scrubDuration?: number  // scroll pixels per chapter — default 600
}
```

**Pin setup:**
```ts
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: `+=${chapters.length * scrubDuration}`,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  invalidateOnRefresh: true,
  animation: masterTimeline,
})
```

`pinSpacing: true` is critical — it pushes content below the pinned section down by the pin duration so the rest of the page appears after the sequence completes naturally.

**Chapter rendering:** All chapters are rendered simultaneously in the DOM, stacked at `position: absolute, inset: 0`. Their visibility is controlled entirely by the GSAP timeline — they start at `opacity: 0` and their enter/exit animations control when they appear. Only one chapter is visible at any point in the timeline.

**Cleanup:** On unmount, kill the ScrollTrigger and the master timeline. Use `gsap.context()` scoped to the container ref so all child tweens are cleaned up together.

**Reduced motion / mobile fallback:** If either condition is true, render chapters as a standard vertical stack with `ScrollFadeIn` on each one. Do not mount the pin logic at all.

---

## Project 1 — Elementization

**Page:** `src/app/[locale]/projects/elementization/page.tsx` and its story components

**Motion metaphor: Vector Crystallization**

Raw data symbols enter chaotically, pass through a transformation gate, and re-emerge as clean geometric shapes. The original data form is never seen again after the gate. By the final chapter, everything that remains is ordered, geometric, and deployable.

### Chapter Structure

Replace the current story navigation and section anchors with these five pinned chapters. The sidebar anchor nav is removed. The existing MDX project notes section below the story remains unchanged and appears after the pin releases.

---

**Chapter 1 — Data World**
*"The raw state is rich, unstable, and operationally difficult."*

Entrance animation — Dispersed assembly:
- 12–16 small text glyphs (single characters, numbers, short strings like `"user_id"`, `"0.847"`, `"[NULL]"`, `"raw_log"`) are scattered at random positions across the viewport, each at a random rotation (±25deg), opacity 0
- On chapter enter: each glyph animates from its random position to a loose cloud formation in the center-left of the screen. `opacity: 0 → 0.6`, positions converge but remain irregular. Duration staggered 0–0.4s across all glyphs. Easing `power2.out`
- The chapter headline and body text fade up from below simultaneously: `opacity: 0, y: 20 → opacity: 1, y: 0`, 0.5s, starting 0.2s after glyphs begin

Exit animation:
- Glyphs scatter outward in all directions simultaneously: `opacity: 0.6 → 0`, random `x/y` offsets ±200px, 0.3s
- Headline fades out: `opacity: 1 → 0`, 0.25s

---

**Chapter 2 — Transformation Gate**
*"Conversion starts when the system imposes rails, gates, and selective flow."*

Entrance animation — The gate sweeps:
- A thin vertical line (2px, `--color-accent`) draws from top to bottom of the viewport: `scaleY: 0 → 1`, transform-origin top, 0.4s
- The raw glyphs from Chapter 1 re-enter from the left side, moving rightward toward the line
- As each glyph crosses the line, it immediately transforms: the text glyph is replaced by a small geometric shape (circle or square, 8–12px, filled `--color-accent`). Use `opacity` crossfade between the two versions
- Glyphs that have not crossed the line remain as text; those that have become shapes
- Chapter headline assembles: each word slides up from `y: 30 → 0` with 80ms stagger

Exit animation:
- The gate line fades: `opacity: 1 → 0`, 0.3s
- Geometric shapes remain and carry into Chapter 3
- Headline fades out

---

**Chapter 3 — Transposed Layer**
*"A trainable representation emerges as the system becomes more ordered."*

Entrance animation — Vector field arrangement:
- The geometric shapes (carrying over from Chapter 2) move from their irregular post-gate positions into a structured grid arrangement — a 4×4 or 5×3 grid of evenly spaced shapes
- Each shape animates to its grid position: smooth `x/y` translation, 0.5s, stagger 30ms. Easing `power3.inOut`
- As they settle into the grid, each shape gains a subtle connecting line to its nearest neighbors (SVG lines drawn with `strokeDashoffset` animation)
- Chapter headline fades up

Exit animation:
- Connecting lines fade out first
- Grid shapes compress toward the center into a tight cluster

---

**Chapter 4 — Trust Boundary**
*"The raw domain is explicitly locked out rather than implicitly trusted."*

Entrance animation — The dividing line:
- A horizontal line draws across the full width of the viewport at the vertical midpoint: `scaleX: 0 → 1`, transform-origin left, 0.5s, `--color-accent`
- Above the line: the raw text glyphs from Chapter 1 reappear, faded and greyed out (`opacity: 0.2`), slightly blurred (`filter: blur(1px)`)
- Below the line: the geometric vector shapes from Chapter 3 sit clean and sharp at full opacity
- A small label appears at the left edge of the line: `"TRUST BOUNDARY"` in section-label styling, fading in 0.3s after the line completes
- Chapter headline assembles word by word

Exit animation:
- The line, labels, and raw glyphs above it all fade out together
- Vector shapes below remain and carry into Chapter 5

---

**Chapter 5 — Deployable AI**
*"What remains is a cleaner, more governable path to real deployment."*

Entrance animation — Final crystallization:
- The remaining vector shapes move outward from center into a final arrangement that suggests a system diagram — an organized constellation of nodes
- As they reach their final positions, each shape pulses once: `scale: 1 → 1.15 → 1`, 0.3s
- The chapter headline is the largest typography moment in the sequence — animate each word individually with `y: 40 → 0`, stagger 100ms, duration 0.7s
- After the headline settles, three small label badges appear sequentially (`"TRAINABLE"`, `"GOVERNED"`, `"DEPLOYABLE"`) sliding in from the right with 150ms stagger

Exit animation — none. This is the final chapter. After it completes, the pin releases and the page scrolls normally into the MDX notes section below.

---

## Project 2 — ALOA

**Page:** `src/app/[locale]/projects/aloa/page.tsx` and its story components

**Motion metaphor: The Probe**

Two separate towers start mirrored and apart. An attacker probes the field between them. The signals that respond to the probe reveal membership. The attack converges into a decision.

**Paper link:** Place a persistent `"Read the Paper →"` link anchored to the bottom-right corner of the pinned viewport throughout all chapters. It should be visible at all times during the sequence — `position: absolute` relative to the pin container, `z-index` above all chapter content. This ensures the paper link is never buried by the sequence.

### Chapter Structure

---

**Chapter 1 — Two-Tower Architecture**
*"The user side and item side begin apart, but their representations are designed to meet in retrieval space."*

Entrance animation — Mirrored arrival:
- Two columns of elements (5–6 small rectangles each, representing encoded vectors) slide in from the left and right edges of the viewport simultaneously
- Left column: `x: -120 → -60` (final resting position, left of center)
- Right column: `x: 120 → 60` (final resting position, right of center)
- Both columns stagger their internal items top-to-bottom, 60ms between items
- A gap remains between the two columns — they are separate, symmetric, not touching
- Chapter headline slides up

Exit animation:
- Both columns reduce opacity to 0.4 and compress slightly toward their respective edges — they stay visible but recede as Chapter 2 takes focus

---

**Chapter 2 — Embedding Field**
*"Latent space turns architecture into geometry."*

Entrance animation — Field scatter:
- The column rectangles from Chapter 1 dissolve and re-emerge as individual points (4px circles) scattered across the viewport in a loose field pattern
- Points animate from their column positions to their scattered positions: `x/y` translate, `borderRadius` transition from 0% to 50% (rectangle → circle), 0.5s, stagger 20ms
- Points are colored in two subtle groups — left-tower origin slightly warmer tint, right-tower origin slightly cooler — both within existing color palette
- Chapter headline fades in

Exit animation:
- Points remain in place but reduce opacity to 0.5, becoming the background field for Chapter 3

---

**Chapter 3 — Perturbation**
*"Probes disturb the field and expose response behavior."*

Entrance animation — The probe moves:
- A distinct probe element (a small diamond shape, `--color-accent`, slightly larger than the field points) appears at the left edge and moves horizontally across the field
- As the probe passes near each field point, that point ripples: `scale: 1 → 1.6 → 1`, slight position shift ±4px, then settles. Each ripple triggers when the probe is within ~80px of the point
- Points that ripple more strongly (simulating training members) become slightly brighter; points that barely react remain dim
- The probe movement is tied to scroll progress via scrub — it moves proportionally as you scroll through this chapter
- Chapter headline fades in after the probe has traveled approximately 30% across the viewport

Exit animation:
- Probe fades out
- Reacting points retain their brightness into Chapter 4

---

**Chapter 4 — Inference**
*"Attack logic converges when confidence begins to take shape as a decision signal."*

Entrance animation — Convergence:
- The brightest/most-reactive points from Chapter 3 begin moving toward a vertical center line
- Less-reactive points fade out: `opacity: 0.5 → 0.1`
- The center line draws in: `scaleY: 0 → 1`, 0.4s, thin, `--color-accent`
- Points that converge stack along the line — the decision boundary forming
- A confidence score counter animates up from `0.00` to `0.73` as the points converge — GSAP counter animation, 0.8s
- Chapter headline fades in

Exit animation:
- Points along the boundary line remain; others fade out completely
- Line stays visible into Chapter 5

---

**Chapter 5 — Findings**
*"The narrative closes by returning to evidence, metrics, and interpretation."*

Entrance animation — Results assemble:
- The decision line from Chapter 4 remains as the spine
- Two formula expressions assemble along the line from scattered character tokens:
  - `score(x) → confidence` assembles left of center
  - `probe(x + δ) → shift` assembles right of center
  - Each token drifts from a random position to its correct position, 0.4s, stagger 30ms per token
- Below the formulas, two metric panel elements slide up from `y: 40 → 0` with 150ms stagger, using the existing `hero-metric-panel` class
- Chapter headline fades in last

Exit animation — none. Final chapter. Pin releases into the MDX notes section.

---

## Project 3 — AI Learning Assistant

**Page:** `src/app/[locale]/projects/ai-learning-assistant/page.tsx`

**This page requires content restructuring before motion can be added.** The current page is a short product description. Replace it with a 5-chapter story structure using `StoryPin`, then add the MDX notes section below as with the other projects.

**Motion metaphor: Calibration Loop**

Multiple signals arrive scattered, converge into a processing engine, branch into organized outputs, adapt dynamically, and loop back. The viewer watches the system calibrate itself as they scroll.

### Chapter Content to Write Into Locale Data

Write these into the page's locale data files for both `/en` and `/zh`. Keep body text concise — the motion carries the meaning.

**Chapter 1 — The Signal**
- Heading: *"Learning generates more signal than most systems know how to use."*
- Body: Student activity — quiz results, time on task, module completion — arrives as scattered, unstructured behavioral data. The system's first job is to receive it all.

**Chapter 2 — The Engine**
- Heading: *"Five dimensions describe how a student actually learns."*
- Body: Raw signals pass through the Learning Pace & Handling Evaluation Engine. They resolve into five structured dimensions: Learning Pace, Handling Stability, Concept Mastery, Knowledge Load Capacity, and Risk Signals.

**Chapter 3 — Adaptation**
- Heading: *"The system adjusts instruction, not just content."*
- Body: Evaluation outputs drive three adaptive responses: recitation frequency, knowledge intensity, and teaching action selection. Every session is different because every student profile is different.

**Chapter 4 — The Loop**
- Heading: *"Every interaction recalibrates the system."*
- Body: Outputs feed back as new inputs. The loop — Evaluate, Adjust, Observe, Recalibrate — runs continuously. The system does not converge to a fixed state. It keeps moving with the student.

**Chapter 5 — Institutional Fit**
- Heading: *"Designed to work inside real academic environments."*
- Body: Instructor analytics, completion forecasting, and risk alerts ensure the system supports human oversight. Deployable where it matters most: inside institutions that cannot afford to get learning wrong.

### Chapter Animations

---

**Chapter 1 — The Signal**

Entrance animation — Signals arrive:
- 5 labeled signal tokens (`QUIZ RESULTS`, `TIME ON TASK`, `MODULE COMPLETION`, `DISCUSSION ACTIVITY`, `PAGE VIEWS`) start scattered at random positions, rotations ±20deg, opacity 0
- They drift inward from scattered positions toward a convergence zone at center, opacity rising to 0.8
- Each token has a thin trailing line that draws behind it as it moves, like a signal trace
- Chapter headline assembles word by word from `y: 30`

Exit animation:
- Signal tokens continue inward and compress to a single point at center, disappearing into it
- Trailing lines retract

---

**Chapter 2 — The Engine**

Entrance animation — Dimensions branch:
- From the center convergence point, five labeled streams branch outward in a star pattern:
  - `LEARNING PACE` — up-left
  - `HANDLING STABILITY` — up-right
  - `CONCEPT MASTERY` — right
  - `KNOWLEDGE LOAD` — down-right
  - `RISK SIGNALS` — down-left
- Each stream: a thin line extends from center to the label position (`strokeDashoffset` animation, 0.4s), then the label fades in at the end. 80ms stagger between branches.
- Chapter headline fades in after all five branches are visible

Exit animation:
- Labels compress back toward center along their lines
- Lines retract

---

**Chapter 3 — Adaptation**

Entrance animation — Outputs assemble:
- Three output blocks (`RECITATION ADJUSTMENT`, `KNOWLEDGE INTENSITY`, `TEACHING STRATEGY`) slide in from below, stagger 120ms, `y: 50 → 0`, opacity 0 → 1
- Thicker connecting lines (3px) draw from center point to each block
- Each block has a sub-label that fades in 200ms after the block:
  - RECITATION: `"frequency · interval · recall"`
  - INTENSITY: `"density · compression · load"`
  - STRATEGY: `"explain · quiz · recommend"`
- Chapter headline fades in

Exit animation:
- The three blocks slide down and out: `y: 0 → 40`, opacity 1 → 0
- Connecting lines fade

---

**Chapter 4 — The Loop**

Entrance animation — The cycle draws itself:
- Four nodes appear sequentially at compass positions of an invisible circle:
  - Top: `EVALUATE`
  - Right: `ADJUST`
  - Bottom: `OBSERVE`
  - Left: `RECALIBRATE`
- Each node: `scale: 0.6 → 1`, opacity 0 → 1, 0.3s, 200ms stagger
- After all four are visible, connecting arcs draw clockwise between them — SVG paths with `strokeDashoffset`, 0.4s per arc, 100ms stagger
- When the fourth arc closes the loop, all four nodes pulse once: `scale: 1 → 1.1 → 1`
- Chapter headline fades in above the loop

Exit animation:
- All nodes and arcs scale down to center point simultaneously, 0.4s

---

**Chapter 5 — Institutional Fit**

Entrance animation — Oversight expands:
- From the contracted loop point, three outcome blocks expand outward:
  - `IDENTIFY STRUGGLING STUDENTS` — left
  - `ADJUST INSTRUCTION & PACING` — center
  - `MONITOR CLASS PROGRESS` — right
- Each: `scale: 0 → 1`, opacity 0 → 1, 0.4s, 120ms stagger
- Above them, label `INSTRUCTOR OVERSIGHT` fades in with an underline that draws left to right
- Chapter headline fades in

Exit animation — none. Final chapter. Pin releases into MDX notes section.

---

## Implementation Order

Work strictly in this order. Do not move to the next step until the current one builds and renders correctly in the browser.

1. Build `StoryPin.tsx` as the shared reusable component. Test it with placeholder chapters before connecting real content.
2. Implement Elementization chapters 1–5.
3. Implement ALOA chapters 1–5. Add the persistent paper link.
4. Write AI Learning Assistant chapter content into locale data files. Implement chapters 1–5.

---

## Verification Checklist

**StoryPin behavior:**
- [ ] The pin holds for the full duration — page does not scroll while the sequence is active
- [ ] After the final chapter, the pin releases and MDX notes scroll in naturally below
- [ ] `pinSpacing: true` is working — content below the pin does not overlap the pinned section
- [ ] Scrubbing backward (scrolling up) reverses animations correctly
- [ ] No jump or flash when the pin first engages

**Elementization:**
- [ ] Raw data glyphs visible in Chapter 1, fully absent by Chapter 5
- [ ] Transformation gate in Chapter 2 visibly converts text glyphs to geometric shapes as they cross
- [ ] Grid in Chapter 3 reads as organized and structured
- [ ] Trust boundary line in Chapter 4 clearly separates the two visual languages
- [ ] Chapter 5 feels like resolution — animation settles

**ALOA:**
- [ ] Paper link visible in all five chapters without obscuring content
- [ ] Two towers in Chapter 1 are visibly separate and symmetric
- [ ] Probe in Chapter 3 moves proportionally to scroll speed
- [ ] Confidence counter in Chapter 4 reads as a real metric
- [ ] Formula tokens in Chapter 5 assemble into readable expressions

**AI Learning Assistant:**
- [ ] Chapter content loaded from locale data — no hardcoded strings
- [ ] Loop in Chapter 4 closes completely before the pulse triggers
- [ ] Chinese locale renders all chapter content correctly with identical animations

**Cross-cutting:**
- [ ] With `prefers-reduced-motion: reduce` emulated: all three pages render as normal vertical scroll with ScrollFadeIn. No pinning. No JS errors.
- [ ] On mobile/touch device: same as reduced motion — normal scroll, no pinning.
- [ ] `npm run build` completes with zero errors.
- [ ] Navigating away from a project page mid-sequence and returning resets the sequence to Chapter 1.

---

## What Is Out of Scope

- Home page redesign — that is Phase 5B
- Parallax on project pages — Phase 4 was home page only
- Any changes to the projects index page
- Any new npm packages
- Any changes to existing MDX content in the notes sections