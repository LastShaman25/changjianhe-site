# Phase 4 — Scrubbed Parallax System
> This document specifies a multi-layer scroll-driven parallax system for changjianhe.com. Every effect in this document is tied directly to scroll position — elements move continuously as the user scrolls, not just once on entry. Read the full document before writing any code.

---

## Standing Constraints

These apply to every task without exception.

- **No new npm packages.** Use `gsap`, `@gsap/react`, and `ScrollTrigger` only.
- **No visual design changes.** Do not touch colors, fonts, spacing, or layout.
- **Only animate `transform` and `opacity`.** Never `top`, `left`, `width`, `height`, `margin`, or `padding`.
- **Add `will-change: transform`** to every element that receives a scrubbed parallax animation. This promotes the element to its own GPU compositing layer and prevents paint jank.
- **Mobile:** Disable all parallax on touch devices. Check `window.matchMedia('(hover: none)')` inside `useEffect`. On mobile, elements render at their static positions with no transform at all.
- **Reduced motion:** If `useHydratedReducedMotion` returns `true`, disable all parallax. Elements render at static positions.
- **Use `invalidateOnRefresh: true`** on every `ScrollTrigger` instance so positions recalculate correctly when the browser is resized.
- **Use `scrub: 1`** as the default scrub value unless the spec says otherwise. This adds a 1-second lag between scroll position and animation position, which feels physical rather than mechanical.
- **Confirm each task builds without errors before starting the next.**

---

## The Mental Model

The page has multiple visual layers at different depths. As the user scrolls, shallower layers move faster and deeper layers move slower — exactly like looking through a window at objects at different distances.

Speed multipliers work like this:
- `0` = element does not move at all (pinned to background)
- `0.5` = element moves at half scroll speed (feels deep/distant)
- `1` = element moves at normal scroll speed (neutral)
- `1.5` = element moves faster than scroll (feels close/in front)

A negative y value means the element moves upward as you scroll down — it appears to rise as you pass it.

---

## Task 1 — Hero: Multi-Layer Depth Separation

**File:** `src/components/home/HeroSection.tsx` and `src/components/home/HeroGrid.tsx`

**What to build:**  
The hero section has five distinct visual layers. Each scrolls at a different speed as the user scrolls past the hero, creating a genuine sense of depth — the same technique used in the reference site to separate the portrait from the radial background lines.

**Layer assignments (slowest to fastest):**

| Layer | Element | Y offset over hero scroll range | Effect |
|-------|---------|-------|--------|
| 0 | HeroGrid SVG (background) | `−20px` | Rises very slowly, stays deep in background |
| 1 | Headshot image wrapper | `−50px` | Floats upward as page scrolls, hovers above content |
| 2 | MODE status badge | `−65px` | Drifts upward, slightly faster than headshot |
| 2 | STATUS status badge | `−70px` | Drifts upward, slightly faster than MODE |
| 2 | SURFACE status badge | `−60px` | Drifts upward, slightly slower than STATUS |
| 3 | Name + subtitle text block | `−40px` | Scrolls at a medium rate |
| 4 | CTA buttons | `−30px` | Moves slowest of the text elements, peels away last |

The key is that every element moves, but at noticeably different rates — this is what creates depth rather than the whole hero moving as one flat plane.

**Implementation pattern — use this for every layer:**

```ts
gsap.to(elementRef.current, {
  y: TARGET_Y_VALUE,
  ease: 'none',
  scrollTrigger: {
    trigger: heroSectionRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    invalidateOnRefresh: true,
  },
});
```

Create a single `useEffect` that sets up all layer ScrollTriggers together. Clean up all of them on unmount by collecting them in an array and calling `.kill()` on each in the cleanup function.

**Add `will-change: transform`** via inline style or className to the wrapper div of: HeroGrid SVG, headshot image, each status badge, the name/subtitle block, and the CTA wrapper.

**Check before moving on:** Scroll slowly through the hero. Each layer should visibly move at a different rate. The background grid should lag furthest behind. The headshot should float. The status badges should drift independently of each other.

---

## Task 2 — Hero: Headshot Scale and Clip on Scroll

**File:** `src/components/home/HeroSection.tsx`

**What to build:**  
As the user scrolls past the hero, the headshot subtly scales down and its container clips it from the bottom — the portrait appears to recede and get cut off as you leave the hero, the same way the Lando Norris portrait zooms and clips as you scroll past it.

**Exact behavior:**
- Wrap the headshot `<Image>` in a container with `overflow: hidden` and `will-change: transform` if not already done.
- On scroll from `top top` to `bottom top` of the hero section:
  - The image scales from `1.08 → 1.0`
  - The container clips via `clipPath` from `inset(0 0 0% 0)` to `inset(0 0 25% 0)` — this pulls a curtain up from the bottom of the image
- Both properties animate on the same tween targeting the image element directly.

```ts
gsap.fromTo(
  headShotImageRef.current,
  { scale: 1.08, clipPath: 'inset(0 0 0% 0)' },
  {
    scale: 1.0,
    clipPath: 'inset(0 0 25% 0)',
    ease: 'none',
    scrollTrigger: {
      trigger: heroSectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  }
);
```

**Check before moving on:** The headshot should begin slightly zoomed in and gradually zoom out while being clipped from the bottom as you scroll through the hero. The clip should not be visible at the top of the page — it starts fully visible.

---

## Task 3 — Horizontal Scroll Text on Oversized Headlines

**File:** Apply to the "Featured Work" headline in `src/components/home/FeaturedProjects.tsx` and the "Selected Signals" headline in its section component.

**What to build:**  
The large section headlines drift horizontally as the user scrolls through their sections. One drifts left, the other drifts right — alternating directions. This is the defining visual signature of the reference site.

**Exact behavior:**
- Set `white-space: nowrap` and `overflow: visible` on the headline element so it can render wider than its container.
- The parent section must have `overflow: hidden` so the headline is clipped at the section boundary.
- "Featured Work" headline: `x: 0 → −80px` (drifts left as you scroll down)
- "Selected Signals" headline: `x: 0 → 60px` (drifts right as you scroll down)
- `scrub: 1.5` for a languid feel.
- Trigger: `start: 'top center'`, `end: 'bottom top'`.

```ts
// Featured Work headline — drifts left
gsap.to(featuredHeadlineRef.current, {
  x: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: featuredSectionRef.current,
    start: 'top center',
    end: 'bottom top',
    scrub: 1.5,
    invalidateOnRefresh: true,
  },
});

// Selected Signals headline — drifts right
gsap.to(signalsHeadlineRef.current, {
  x: 60,
  ease: 'none',
  scrollTrigger: {
    trigger: signalsSectionRef.current,
    start: 'top center',
    end: 'bottom top',
    scrub: 1.5,
    invalidateOnRefresh: true,
  },
});
```

**Mobile:** Disable entirely. Skip creating the ScrollTrigger on touch devices. The headline renders at `x: 0` with `white-space: normal`.

**Check before moving on:** Scroll through the Featured Work section — the headline drifts left. Scroll through Selected Signals — that headline drifts right. Neither should overflow the section boundary visually.

---

## Task 4 — Project Cards: Independent Vertical Depth

**File:** `src/components/projects/ProjectCards.tsx` and `src/components/home/FeaturedProjects.tsx`

**What to build:**  
The three project cards move at different vertical speeds as the user scrolls through the section, so they appear to exist at different depths rather than sitting on a flat plane.

**Y offset assignments over the section scroll range:**
- Card 1 (Elementization Infrastructure): `y: −30px` (rises)
- Card 2 (Membership Inference): `y: 0px` (neutral — no animation needed)
- Card 3 (AI Learning Assistant): `y: 30px` (sinks)

**Implementation:**  
Add a `data-parallax-y` attribute to each card with its target value. In a single `useEffect`, query all `[data-parallax-y]` elements within the component and create a ScrollTrigger for each:

```ts
containerRef.current
  ?.querySelectorAll('[data-parallax-y]')
  .forEach((card) => {
    const targetY = parseFloat(card.getAttribute('data-parallax-y') || '0');
    if (targetY === 0) return; // skip neutral card
    gsap.to(card, {
      y: targetY,
      ease: 'none',
      scrollTrigger: {
        trigger: card.closest('section') ?? card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });
```

**Check before moving on:** Scroll through the project cards. Card 1 should rise, Card 3 should sink, Card 2 stays level. The three cards should form a subtle diagonal arrangement by the time they exit the viewport.

---

## Task 5 — Logo/Signal Block: Floating Drift and Rotation

**File:** The component rendering the "SIGNAL" block with the CJ logo on the home page.

**What to build:**  
The SIGNAL logo block drifts upward and rotates very gently as the user scrolls past it — giving it the quality of a floating object that turns slightly as you pass it. This is the same effect as the scattered photo cards in the reference site that drift at their own independent rates.

**Exact behavior:**
- Y drift: `0 → −40px` over a scroll range that covers the hero and positioning sections.
- Rotation: `0deg → 3deg`.
- `scrub: 2` — slower response than default for a weightless, drifting quality.
- `will-change: transform` on the block wrapper.

```ts
gsap.to(signalBlockRef.current, {
  y: -40,
  rotate: 3,
  ease: 'none',
  scrollTrigger: {
    trigger: heroSectionRef.current,
    start: 'top top',
    end: '+=150%',
    scrub: 2,
    invalidateOnRefresh: true,
  },
});
```

**Check before moving on:** Scroll past the hero. The SIGNAL logo block should drift upward and rotate very slightly. It should feel like it is floating rather than animating.

---

## Task 6 — Section Backgrounds: Subtle Depth Separation

**File:** Section components for Positioning, Philosophy, and Selected Signals sections on the home page.

**What to build:**  
Within each major section, the background element moves at a slightly different speed than the text content inside it. This is the most subtle effect in this document — the purpose is that the page feels slightly dimensional without the user being able to identify exactly what is creating that feeling.

**Exact behavior:**
- Each section that has a distinct background element (a `<div>` acting as the section background, not the text) scrolls at `y: −15px` over the section's full scroll range.
- The text content is not touched — it scrolls at normal speed.
- `scrub: 1`. Trigger: `start: 'top bottom'`, `end: 'bottom top'`.
- `will-change: transform` on the background element.

The 15px maximum offset is intentionally small. If it feels distracting after implementation, reduce to `−8px`.

**Check before moving on:** The effect here should be imperceptible in isolation. If you scroll through and notice the backgrounds moving in a way that feels like a bug or draws attention, the offset is too large — reduce it.

---

## Verification Pass — Run After All Six Tasks Are Complete

**Hero:**
- [ ] Each layer of the hero (grid, headshot, status badges, text, CTAs) moves at a visibly different rate while scrolling
- [ ] The headshot begins slightly zoomed in and clips from the bottom as you scroll through the hero
- [ ] The three status badges (MODE / STATUS / SURFACE) drift at slightly different rates from each other
- [ ] The SIGNAL logo block drifts upward and rotates gently past the hero

**Headlines:**
- [ ] "Featured Work" headline drifts left while scrolling through that section
- [ ] "Selected Signals" headline drifts right while scrolling through that section
- [ ] Neither headline overflows its section boundary visually

**Project cards:**
- [ ] Card 1 rises, Card 3 sinks, Card 2 stays level as you scroll through the section
- [ ] Cards do not overlap or collide with surrounding content at any scroll position

**Section backgrounds:**
- [ ] Sections feel slightly dimensional without the parallax being obviously visible

**Cross-cutting:**
- [ ] On a real mobile device or DevTools mobile emulation (`hover: none`): zero parallax, everything scrolls at normal speed, no layout issues
- [ ] With `prefers-reduced-motion: reduce` emulated in DevTools: zero parallax, no JS errors
- [ ] Navigate to `/en/projects/elementization`. Story scroll animations are unaffected.
- [ ] Switch language EN → 中文. All parallax works identically in both routes.
- [ ] `npm run build` completes with zero errors.
- [ ] Open DevTools Performance tab. Record a scroll through the home page. No layout reflow (no purple Layout blocks in the flame chart) — composited transforms only.

---

## What Is Out of Scope for This Document

- Pinned scroll sequences where the page stops scrolling while an animation plays
- Parallax on the About, Research, Accomplishments, Contact, or project story pages
- Any new sections, layout additions, or content changes
- Parallax on the navigation bar or footer
- Any new npm packages