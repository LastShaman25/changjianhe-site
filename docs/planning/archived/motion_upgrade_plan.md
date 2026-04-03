# Motion & Interaction Brief — changjianhe.com
> Adapt scroll-driven cinematic motion effects (inspired by high-end editorial/athlete sites) into the existing professional academic portfolio. **Preserve all existing design, layout, color palette, and brand tone. Add motion only.**

---

## Context & Constraints

**Site identity:** AI Researcher, Applied Mathematician & Founder — Changjian "CJ" He  
**Tone:** Rigorous, precise, builder-minded. Not flashy. Motion should feel like signal, not noise.  
**Stack already installed — do not add new libraries:**
- `gsap` + `@gsap/react` → use for all scroll-linked and timeline animations
- `framer-motion` → use for component-level entrance animations and hover states
- `lenis` → already handles smooth scroll inertia; ensure all GSAP ScrollTrigger calls use Lenis as the scroller source

**Bilingual support:** All animations must work identically in `/en` and `/zh` routes. No animation logic should be language-aware.

**Performance constraint:** All animations must respect `prefers-reduced-motion`. Wrap every GSAP context and Framer Motion variant with a reduced-motion fallback (instant, no transform).

---

## Design System — Do Not Change

Preserve all existing CSS variables and Tailwind config. The effects below should be built on top of the existing palette. Reference these token names when writing animation code:

```
--color-bg-primary       → main page background (infer from existing globals.css)
--color-bg-secondary     → section alternates
--color-text-primary     → headings
--color-text-muted       → body, captions
--color-accent           → existing accent (used for "Signal +", category labels, etc.)
--color-border           → existing border color
```

> Do NOT introduce lime/neon green, sports-brand palette, or any color not already in the design system.

---

## Section-by-Section Motion Spec

### 1. Hero — `src/app/[locale]/page.tsx` (above-the-fold)

**Current layout:** Name, subtitle ("AI Researcher, Applied Mathematician & Founder"), two CTA buttons.

**Motion to add:**

**A. Ambient background grid pulse (idle)**
- Draw a very faint SVG grid or subtle concentric arc pattern behind the hero text using the existing `--color-accent` at `opacity: 0.04–0.07`
- Animate a slow radial "breath": `scale(0.97) → scale(1.03)` on the SVG, looping, 6s ease-in-out
- This maps to the F1 site's radial portrait lines — here it evokes a data field or coordinate system, fitting the mathematical identity
- Place the SVG as `position: absolute`, `inset: 0`, `z-index: 0`, pointer-events none

**B. Name + subtitle stagger entrance (page load)**
- On initial mount, animate each word of the h1 name: `opacity: 0, y: 24px → opacity: 1, y: 0`
- Stagger: 80ms per word, duration 0.6s, easing `power2.out`
- Subtitle line follows 200ms after the last name word
- CTA buttons fade in last, 300ms after subtitle, with a subtle `scale(0.96) → scale(1)`
- Use Framer Motion `variants` with `staggerChildren` since this is a component-level entrance

**C. Subtle cursor-tracking tilt on hero block (desktop only)**
- The entire hero text block applies a very gentle `rotateX` and `rotateY` (max ±2deg) following the mouse, using CSS `perspective(800px)`
- Implemented via `mousemove` event listener updating a CSS custom property; no GSAP needed
- Disable entirely on touch devices and `prefers-reduced-motion`

---

### 2. "Positioning" / "Philosophy" Sections — Headline Scroll Reveals

**Current layout:** Section label (small caps), large h3 headline, body paragraph.

**Motion to add:**

**A. Headline line-by-line reveal**
- Wrap each line of the h3 in a `<span class="line-mask">` with `overflow: hidden`
- On scroll enter (IntersectionObserver, threshold 0.2), animate each line: `translateY(100%) → translateY(0)`, duration 0.65s, stagger 120ms between lines
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — the "slide up from clip" technique used in the reference
- The section label fades in first (200ms head-start), then the headline lines follow
- Body paragraph fades in last: `opacity: 0 → 1`, `translateY(12px) → translateY(0)`, 0.5s, after the final headline line

**B. One accent word highlight**
- Identify one semantically important word per major headline (e.g. "trustworthy" in "Powerful systems should also be trustworthy systems")
- Wrap it in `<em class="accent-word">` styled with `--color-accent`
- Animate it with a 60ms delay relative to its line's reveal, adding a brief `scale(1.03) → scale(1)` in addition to the slide-up

> This maps to the F1 site's neon keyword technique — but uses your existing accent color, keeping it on-brand.

---

### 3. Featured Work — Project Cards (`/en/projects`)

**Current layout:** 3 project cards, each with a category badge, title, and description.

**Motion to add:**

**A. Staggered card entrance**
- Cards start `opacity: 0, translateY(40px)`
- On scroll enter, animate to `opacity: 1, translateY(0)` with 150ms stagger between cards
- Duration: 0.7s, easing `power3.out`
- Use GSAP ScrollTrigger with `start: "top 80%"`

**B. Card hover lift**
- On hover: `translateY(-4px)`, `box-shadow` increase (use existing border/shadow tokens)
- Transition: 0.25s ease
- Category badge color stays as-is; no new colors
- Use Framer Motion `whileHover` since these are React components

**C. Border trace on hover (optional, low priority)**
- On hover, animate a thin `--color-accent` border drawing around the card using CSS `clip-path` or SVG `stroke-dasharray`
- Duration: 0.3s
- Only implement if it does not conflict with existing card border styling

---

### 4. "Selected Signals" / Research Keywords — Horizontal Ticker

**Current content:** Three signal statements under "Selected Signals" on the home page.

**Motion to add:**

**A. Research keyword marquee** (maps to the F1 site's continuous horizontal scroll band)
- Add a full-width horizontal marquee band between two sections (e.g. between "Philosophy" and "Selected Signals")
- Content: key research terms and technical phrases, e.g.:
  `MACHINE LEARNING SECURITY  ·  TWO-TOWER NETWORKS  ·  MEMBERSHIP INFERENCE  ·  PRIVACY-PRESERVING AI  ·  ELEMENTIZATION  ·  APPLIED MATHEMATICS  ·  DEPLOYABLE SYSTEMS  ·`
- Repeat the string twice side-by-side so the loop is seamless
- CSS animation: `translateX(0) → translateX(-50%)`, infinite, 28s linear
- Style: small caps, `--color-text-muted`, `letter-spacing: 0.15em` — subtle, not loud
- On hover, pause the animation (`animation-play-state: paused`)
- Pure CSS; no JS needed

**B. Counter animation on stat numbers**
- The About page shows numbers like "4" (core areas) and "3" (flagship tracks)
- On scroll enter, animate each number counting up from 0 to its final value
- Duration: 1.2s, easing `power2.out`
- Implement with GSAP: `gsap.to({ val: 0 }, { val: 4, onUpdate: () => el.textContent = Math.round(obj.val) })`

---

### 5. About Page — Bio Section Entrance

**Current layout:** Long-form bio text, three focus area blocks ("Research framing", "Infrastructure thinking", "Founder execution"), "Next Surfaces" navigation cards.

**Motion to add:**

**A. Bio text paragraph cascade**
- Each paragraph of the bio fades in sequentially as it enters the viewport
- `opacity: 0 → 1`, `translateY(16px) → translateY(0)`, 0.55s per paragraph, 80ms stagger
- Use `react-intersection-observer` (already in deps) — one observer per paragraph

**B. Focus area cards stagger**
- The three focus area blocks animate in with the same stagger pattern as the project cards
- Add a thin left-border accent line that draws down on entrance: `scaleY(0) → scaleY(1)`, transform-origin top, 0.4s

**C. "Next Surfaces" cards entrance**
- These two navigation cards ("Project narratives", "Research direction") slide in from opposite sides
- Left card: `translateX(-30px) → translateX(0)`
- Right card: `translateX(30px) → translateX(0)`
- Both: `opacity: 0 → 1`, 0.6s, triggered when cards enter viewport
- On hover: `translateY(-3px)` lift, 0.2s

---

### 6. Contact / Footer CTA — "Zoom to Focus" Closing

**Current layout:** Heading "Open to research, product, and infrastructure conversations." + CTA button + LinkedIn link.

**Motion to add (maps to the F1 site's "coming into focus" closing effect):**
- The entire contact section starts with `filter: blur(3px), opacity: 0.4, scale(1.03)` when it is below the fold
- As it scrolls into view via GSAP ScrollTrigger scrub, it transitions to `filter: blur(0), opacity: 1, scale(1)`
- Use `scrub: 0.8` for a smooth camera-focus feel
- The CTA button ("Get in Touch") pulses gently on idle after the section is in view: `scale(1) → scale(1.02) → scale(1)`, 3s ease-in-out loop

---

## Global Behaviors

### Smooth Scroll (Lenis)
Lenis is already installed. Ensure it is initialized in the root layout and GSAP ScrollTrigger is synced:

```ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Page Transition (route changes)
- On route exit: `opacity: 1 → 0`, `translateY(0) → translateY(-8px)`, 0.25s
- On route enter: `opacity: 0 → 1`, `translateY(8px) → translateY(0)`, 0.35s
- Implement with Framer Motion `AnimatePresence` wrapping the page in the layout

### Reduced Motion
```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// GSAP: guard all animations
if (!prefersReducedMotion) {
  gsap.from(".headline-line", { ... });
}

// Framer Motion: use no-op variants
const variants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
```

---

## Priority Order for Implementation

Implement in this order — earlier items have the highest perceived polish impact:

1. **Lenis + ScrollTrigger sync** — must be in place before any scroll animations work
2. **Hero entrance stagger** — first thing visitors see; sets the tone immediately
3. **Headline line-by-line reveal** — applies to every major section; biggest cumulative effect
4. **Project card stagger + hover lift** — highly visible on the projects page
5. **Research keyword marquee** — ambient motion between sections
6. **About page bio cascade + focus area border lines**
7. **Contact "zoom to focus" closing**
8. **Counter animation on stat numbers**
9. **Hero ambient grid pulse + cursor tilt** — polish layer, implement last

---

## What NOT to Do

- ❌ Do not add lime/neon green, glitch effects, chromatic aberration, or scattered photo layouts — those belong to the sports brand
- ❌ Do not add floating photo grids or asymmetric image layouts — the site is intentionally text-first
- ❌ Do not install new npm packages; everything needed (`gsap`, `framer-motion`, `lenis`, `react-intersection-observer`) is already in `package.json`
- ❌ Do not animate the navigation bar, language switcher, or breadcrumb elements
- ❌ Do not change font sizes, weights, colors, spacing, or layout — motion only
- ❌ Do not use full-screen overlay transitions that block content readability