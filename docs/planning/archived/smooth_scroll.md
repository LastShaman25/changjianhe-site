# Remaining Animation Work — changjianhe.com
> This document describes the animation and motion work that still needs to be implemented. Read it in full before writing any code. Some of the work described here already partially exists in the codebase — where that is the case, the instructions say so explicitly. Do not duplicate what is already there; extend or apply it.

---

## Standing Constraints — Read These First

These apply to every task in this document without exception.

- **No new npm packages.** Everything needed is already installed: `gsap`, `@gsap/react`, `framer-motion`, `lenis`, `react-intersection-observer`.
- **No visual design changes.** Do not change colors, typography, spacing, layout, or any existing CSS. Motion only.
- **Use `useHydratedReducedMotion`** from `src/components/motion/useHydratedReducedMotion` as the single source of truth for reduced-motion preference. Do not create a new hook for this.
- **Reduced motion must be respected everywhere.** If `useHydratedReducedMotion` returns `true`, all animations must be instant or disabled. No exceptions.
- **Bilingual routes share all animation logic.** Do not write any animation code that is conditional on locale (`/en` vs `/zh`). Both routes get identical behavior.
- **Only animate `transform` and `opacity`.** Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` — these cause layout reflow and drop frames.
- **Confirm each task builds without errors before starting the next one.**

---

## Task 1 — Hero Entrance Stagger (Page Load)

**File:** `src/components/home/HeroSection.tsx`

**What to build:**  
When the home page first loads, the hero content animates in from a resting invisible state. This is a one-shot entrance triggered by mount, not by scroll.

**Exact behavior:**
- The h1 name ("Changjian "CJ" He") splits into individual words. Each word animates from `opacity: 0, y: 24px` to `opacity: 1, y: 0`.
- Stagger between words: 80ms. Duration per word: 0.6s. Easing: `[0.22, 1, 0.36, 1]`.
- The subtitle line ("AI Researcher, Applied Mathematician & Founder") follows 200ms after the last name word completes. Same `opacity` + `y` animation, no split needed.
- The two CTA buttons fade in together 300ms after the subtitle. Add a subtle `scale: 0.96 → 1` in addition to the opacity.
- Use Framer Motion `variants` with `staggerChildren` on a wrapper `motion.div`. This is a component-level entrance, not scroll-triggered.

**Reduced motion:** If `useHydratedReducedMotion` returns `true`, skip all of the above — render all elements at full opacity immediately with no transform.

**Check before moving on:** Load the home page in the browser. The name words should animate in sequentially on arrival. Refreshing the page should replay the entrance.

---

## Task 2 — Hero Ambient Background Pulse (Idle)

**File:** Create `src/components/home/HeroGrid.tsx`, import it into `HeroSection.tsx`

**What to build:**  
A faint decorative SVG behind the hero text that breathes slowly on an infinite loop. It should evoke a mathematical coordinate system or data field — not a decorative flourish.

**Exact behavior:**
- The SVG renders as `position: absolute`, `inset: 0`, `z-index: 0`, `pointer-events: none`, behind all hero text content.
- Draw either a subtle grid (thin horizontal and vertical lines) or concentric arcs. Use `stroke` color set to `var(--color-accent)` at `opacity: 0.05`. Stroke width: `0.5px`.
- Animate the SVG element: `scale(0.97) → scale(1.03)`, looping infinitely, 6s, `ease-in-out`. Use a CSS `@keyframes` animation — no JS needed.
- The animation origin is the SVG center: `transform-origin: center center`.

**Reduced motion:** If `prefers-reduced-motion: reduce` is set in CSS media query, set `animation: none` on the SVG via the media query directly in the component's CSS or a `<style>` tag. This one can be handled entirely in CSS without the hook.

**Check before moving on:** The hero background should show a barely-visible pulsing pattern. It should not be distracting. If it draws attention away from the text, reduce the opacity further.

---

## Task 3 — Hero Cursor-Tracking Tilt (Desktop Only)

**File:** `src/components/home/HeroSection.tsx`

**What to build:**  
On desktop, the hero text block responds to mouse position with a very subtle 3D tilt — no more than ±2deg on either axis. This should feel like the content has gentle physical weight, not like a game effect.

**Exact behavior:**
- Listen for `mousemove` on the hero section container.
- Map the cursor position to `rotateX` (vertical axis, ±2deg) and `rotateY` (horizontal axis, ±2deg).
- Apply `perspective: 800px` to the container and update `rotateX`/`rotateY` on the inner text wrapper via a `useRef` and direct style mutation (not React state — state updates on every mouse move will cause performance issues).
- Add a transition: `transform 0.1s ease-out` on the text wrapper so it doesn't feel snappy.
- On `mouseleave`, animate back to `rotateX(0) rotateY(0)` with `transform 0.5s ease-out`.

**Disable entirely when:**
- `useHydratedReducedMotion` returns `true`
- The device is touch-only: check `window.matchMedia('(hover: none)')` inside `useEffect`

**Check before moving on:** Move the mouse across the hero on desktop. The text block should tilt slightly toward the cursor. It should not be visible at all on mobile.

---

## Task 4 — About Page: Counter Animation on Stat Numbers

**File:** `src/app/[locale]/about/page.tsx` or the component that renders the stat numbers

**What to build:**  
The About page shows three key stats: "4" (Core Areas), "3" (Flagship Tracks), and "Builder + Researcher" (Operating Style). The two numeric values should count up from 0 when they scroll into view.

**Exact behavior:**
- Use GSAP to animate an object's numeric value from 0 to the final number.
- Trigger on scroll enter via `ScrollTrigger` with `start: "top 80%"`, one-shot (not scrubbed).
- Duration: 1.2s. Easing: `power2.out`.
- Update the DOM text content on each GSAP tick via `onUpdate`.
- Round to nearest integer during the count — no decimals.

```ts
// Pattern to follow:
const obj = { val: 0 };
gsap.to(obj, {
  val: 4,
  duration: 1.2,
  ease: 'power2.out',
  onUpdate: () => {
    el.textContent = String(Math.round(obj.val));
  },
  scrollTrigger: {
    trigger: el,
    start: 'top 80%',
    once: true,
  },
});
```

**Reduced motion:** If `useHydratedReducedMotion` returns `true`, skip the GSAP animation and render the final number immediately.

**Check before moving on:** Scroll to the stats on the About page. The numbers "4" and "3" should count up from zero when they enter the viewport.

---

## Task 5 — About Page: Focus Area Left-Border Draw

**File:** The component rendering the three focus area blocks ("Research framing", "Infrastructure thinking", "Founder execution")

**What to build:**  
Each focus area block has a thin left-border accent line that draws downward when the block scrolls into view. This is a single visual detail that reinforces the section structure.

**Exact behavior:**
- Add a `::before` pseudo-element or an explicit `<span>` to each focus area card that acts as a left border line.
- Style: `width: 2px`, `background: var(--color-accent)`, `height: 100%`, `position: absolute`, `left: 0`, `top: 0`.
- On scroll enter (use `react-intersection-observer`, threshold 0.3), animate: `scaleY(0) → scaleY(1)`, `transform-origin: top`.
- Duration: 0.4s. Use Framer Motion since these are React components. Use the existing `ScrollFadeIn` component as a reference for how the intersection observer pattern is already implemented in this codebase.
- Stagger the three cards: 100ms between each one.

**Reduced motion:** Render the border line at full `scaleY(1)` immediately with no animation.

**Check before moving on:** Scroll to the Focus Areas section on the About page. The left border on each card should draw downward in sequence.

---

## Task 6 — About Page: "Next Surfaces" Cards Slide In

**File:** The component rendering the "Project narratives" and "Research direction" navigation cards at the bottom of the About page

**What to build:**  
The two "Next Surfaces" navigation cards slide in from opposite sides when they scroll into view.

**Exact behavior:**
- Left card ("Project narratives"): animates from `x: -30, opacity: 0` to `x: 0, opacity: 1`.
- Right card ("Research direction"): animates from `x: 30, opacity: 0` to `x: 0, opacity: 1`.
- Both trigger when the container enters the viewport (threshold 0.2).
- Duration: 0.6s. Easing: `[0.22, 1, 0.36, 1]`. They animate simultaneously — no stagger.
- On hover: `y: -3px`, transition 0.2s. Use Framer Motion `whileHover`.

**Reduced motion:** Render both cards at full opacity and position with no animation. Disable `whileHover` as well.

**Check before moving on:** Scroll to the bottom of the About page. Both cards should slide in from opposite sides simultaneously.

---

## Verification Pass — Run After All Tasks Are Complete

After all six tasks are implemented and building cleanly, run through this checklist:

**Home page:**
- [ ] Hero name words stagger in on page load
- [ ] Refreshing the page replays the entrance
- [ ] Subtitle and CTAs follow in sequence
- [ ] Faint grid/arc SVG is visible behind hero text, breathing slowly
- [ ] Mouse movement on desktop tilts the hero text block slightly
- [ ] No tilt effect visible on mobile

**About page:**
- [ ] Stat numbers count up from 0 on scroll enter
- [ ] Focus area left borders draw downward in sequence
- [ ] "Next Surfaces" cards slide in from opposite sides

**Cross-cutting:**
- [ ] In browser DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` — all animations are instant or absent. No JS errors.
- [ ] Navigate Home → About → Projects → back. No layout shifts, no stuck animations, no console errors.
- [ ] Visit `/en/projects/elementization`. The story scroll animations still work correctly and feel smoother than before.
- [ ] Switch language (EN → 中文). All animations work identically in both routes.
- [ ] `npm run build` completes with zero errors.

---

## What Is Out of Scope for This Document

Do not implement the following. They are either already done or not planned:

- Research keyword marquee — already implemented in `ResearchTicker.tsx`
- Headline line-by-line reveal — already implemented in `HeadlineReveal.tsx`
- Project card stagger and hover lift — already implemented in `ProjectCards.tsx`
- Contact blur-in and CTA pulse — already implemented in `ContactFocusMotion.tsx`
- ScrollFadeIn on bio paragraphs — already implemented in `ScrollFadeIn.tsx`; confirm it is applied to the About page bio text and apply it if not
- Any changes to the navigation bar, language switcher, or footer
- Any new npm packages
- Any layout, color, or typography changes