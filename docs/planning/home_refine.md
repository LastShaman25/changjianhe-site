# Phase 5B — Cinematic Home Page Hero
> This plan redesigns the home page hero into a full-viewport portrait with overlaid text and a 4-chapter pinned scroll sequence. The headshot fills the entire viewport height. The name and title sit on top of it. As the viewer scrolls, a pinned sequence reveals identity, positioning, proof points, and a call to action before the page unpins into the existing sections below. Read this entire document before writing any code.

---

## Standing Constraints

- **No new npm packages.** GSAP + ScrollTrigger + Framer Motion already cover everything needed.
- **No changes below the hero.** The Positioning, Featured Work, Philosophy, Research Ticker, Selected Signals, and Contact sections are untouched.
- **Only animate `transform` and `opacity`.** No layout properties.
- **`will-change: transform`** on every element receiving a parallax or pinned animation.
- **Feature flag first.** Before writing a single line of the new hero, implement the feature flag and backup. No existing code is deleted until the new hero is verified working.
- **Reduced motion:** If `useHydratedReducedMotion` returns `true`, skip the pin entirely. Render the hero statically with all content visible at once. No sequence, no pinning.
- **Mobile:** Disable the pinned sequence on touch devices (`hover: none`). Render the mobile layout described at the bottom of this document. No pinning.
- **Bilingual:** All text content comes from the existing locale data layer. No hardcoded strings.
- **Confirm the feature flag works before implementing the new hero. Confirm the static layout looks correct before adding any animation.**

---

## Step 1 — Feature Flag and Backup

Before any other work, do these two things in order.

### 1A — Copy the current hero

Copy `src/components/home/HeroSection.tsx` to `src/components/home/HeroSectionClassic.tsx` without any changes. This file must remain completely untouched throughout this entire plan. It is the rollback.

### 1B — Create the feature flag

Create `src/config/heroMode.ts`:

```ts
// src/config/heroMode.ts
// Change this single value to switch between hero layouts instantly.
// 'cinematic' — new full-viewport portrait with pinned sequence
// 'classic'   — original hero layout, fully preserved in HeroSectionClassic.tsx

export const HERO_MODE: 'cinematic' | 'classic' = 'cinematic';
```

### 1C — Wire the flag in the home page

In the home page component that renders the hero, import both components and the flag:

```tsx
import { HERO_MODE } from '@/config/heroMode';
import HeroSection from '@/components/home/HeroSection';
import HeroSectionClassic from '@/components/home/HeroSectionClassic';

// In JSX:
{HERO_MODE === 'cinematic'
  ? <HeroSection {...props} />
  : <HeroSectionClassic {...props} />}
```

**Verify the flag works before continuing.** Set it to `'classic'` — confirm the site renders identically to before. Set it back to `'cinematic'` — confirm the new hero mounts (placeholder is fine at this point). Only then proceed to Step 2.

---

## Step 2 — The New Hero Layout (Static, No Animation Yet)

Build the correct structure and proportions first. No animations. All hidden elements are rendered in the DOM but invisible via `opacity: 0`.

### Layout structure

The hero section is exactly full viewport height (`h-screen overflow-hidden`). It has no columns or grid. Instead it uses a single stacking context:

```
┌──────────────────────────────────────────┐  ← full viewport width
│                                          │
│         [Headshot — full height]         │  ← absolute, centered
│                                          │
│  [Name]                                  │  ← absolute, lower-left
│  [Title]                                 │  ← absolute, below name
│                                          │
│  [Hidden: metric panels]                 │  ← absolute, below title, opacity 0
│  [Hidden: intro paragraph]               │  ← absolute, below panels, opacity 0
│  [Hidden: signal statements]             │  ← absolute, below intro, opacity 0
│  [Hidden: CTA buttons]                   │  ← absolute, below signals, opacity 0
│                                          │
└──────────────────────────────────────────┘
```

The section container is `position: relative`. The headshot and all text layers are `position: absolute` children stacked inside it.

### Headshot

- Use `headshot_nbck.png` (background-removed PNG). Do not use `headshot.jpg`.
- Render as a Next.js `<Image>` with `priority`, `placeholder="empty"` (not `"blur"` — the transparent PNG will produce a grey flash with blur placeholder), `fill` prop, and `object-fit: contain`.
- The image is centered horizontally and vertically within the full viewport. Because the background is removed, the figure floats against the site's dark background on all sides where the PNG is transparent.
- The image sits at `z-index: 0`.
- Add `will-change: transform` to the image wrapper div.
- Wrap the image in `ref={headshotRef}`.

### HeroGrid SVG

- Keep the existing ambient grid SVG pulse from Phase 3. It sits at `z-index: -1`, behind the headshot, `position: absolute, inset: 0`. No changes to it.

### Name and title

- Both are `position: absolute`, bottom-left of the viewport. Suggested placement: `bottom: 20%`, `left: var(--container-padding)` or equivalent to your existing container spacing token.
- Name: `<h1>` with existing `display-title` class. `z-index: 10`.
- Title: `<h2>` with existing `headline-lg` class, immediately below the name. `z-index: 10`.
- Both wrapped in a single `div ref={nameBlockRef}` at `z-index: 10`.
- These are the **only visible elements** on initial load before any scrolling.

### Hidden elements

Render these below the name/title block, all at `opacity: 0` and `y: 20px` offset (set via `gsap.set` in the animation step, not inline style). They are in the DOM from the start — the sequence makes them visible.

```tsx
// Metric panels
<div ref={metricPanelsRef} className="absolute bottom-[10%] left-[var(--container-padding)] flex gap-4">
  <div className="hero-metric-panel">
    <span className="hero-metric-label">MODE</span>
    <span className="hero-metric-value">{t('mode')}</span>
  </div>
  <div className="hero-metric-panel">
    <span className="hero-metric-label">STATUS</span>
    <span className="hero-metric-value">{t('status')}</span>
  </div>
  <div className="hero-metric-panel">
    <span className="hero-metric-label">SURFACE</span>
    <span className="hero-metric-value">{t('surface')}</span>
  </div>
</div>

// Intro paragraph — center of viewport, overlaid on headshot
<p ref={introRef} className="absolute top-1/2 left-[var(--container-padding)] max-w-md -translate-y-1/2 body-lg">
  {intro}
</p>

// Signal statements — right side of viewport
<div ref={signalsRef} className="absolute top-1/2 right-[var(--container-padding)] max-w-xs -translate-y-1/2 flex flex-col gap-4">
  {signals.map((signal, i) => (
    <p key={i} ref={el => signalItemRefs.current[i] = el} className="body-md">
      {signal}
    </p>
  ))}
</div>

// CTA buttons — bottom right
<div ref={ctaRef} className="absolute bottom-[10%] right-[var(--container-padding)] flex gap-4">
  <LocaleLink href="/projects" className="btn-primary">{ctaPrimary}</LocaleLink>
  <LocaleLink href="/contact" className="btn-secondary">{ctaSecondary}</LocaleLink>
</div>
```

**Verify the static layout before proceeding.** The headshot should fill the viewport height cleanly. Name and title should sit over the image in the lower-left. Everything else should be invisible. If the transparent PNG is showing a grey background, fix `placeholder="empty"` before continuing.

---

## Step 3 — The Pinned Sequence

With the static layout verified, add the pinned scroll sequence.

### Initial states

Set these with `gsap.set()` before creating the timeline:

```ts
gsap.set(metricPanelsRef.current, { opacity: 0, y: 30 });
gsap.set(introRef.current, { opacity: 0, y: 16 });
gsap.set(signalItemRefs.current, { opacity: 0, y: 20 });
gsap.set(ctaRef.current, { opacity: 0, scale: 0.97 });
gsap.set(headshotRef.current, { scale: 1.0, y: 0, opacity: 1 });
```

### Timeline

```ts
const tl = gsap.timeline({ paused: true });

// Chapter 1 — metric panels slide up, headshot zooms gently into focus
tl.to(metricPanelsRef.current, {
  opacity: 1,
  y: 0,
  duration: 0.25,
  ease: 'power2.out',
}, 0);

tl.to(headshotRef.current, {
  scale: 1.04,
  duration: 0.25,
  ease: 'none',
}, 0);

// Chapter 2 — intro paragraph fades in over the headshot
// headshot drifts upward slightly as text arrives
tl.to(introRef.current, {
  opacity: 1,
  y: 0,
  duration: 0.2,
  ease: 'power2.out',
}, 0.3);

tl.to(headshotRef.current, {
  y: -18,
  duration: 0.2,
  ease: 'none',
}, 0.3);

// Chapter 3 — signal statements stagger in on right side
// headshot dims slightly as proof points take focus
tl.to(signalItemRefs.current, {
  opacity: 1,
  y: 0,
  duration: 0.15,
  stagger: 0.08,
  ease: 'power2.out',
}, 0.55);

tl.to(headshotRef.current, {
  opacity: 0.88,
  duration: 0.15,
  ease: 'none',
}, 0.55);

// Chapter 4 — CTA buttons appear, headshot returns to full presence
tl.to(ctaRef.current, {
  opacity: 1,
  scale: 1,
  duration: 0.15,
  ease: 'power2.out',
}, 0.82);

tl.to(headshotRef.current, {
  opacity: 1,
  duration: 0.1,
  ease: 'none',
}, 0.82);
```

### Pin

```ts
ScrollTrigger.create({
  trigger: heroSectionRef.current,
  start: 'top top',
  end: '+=2000',
  pin: true,
  pinSpacing: true,
  scrub: 1,
  animation: tl,
  invalidateOnRefresh: true,
});
```

**Tuning note:** `end: '+=2000'` is a starting value. After seeing it in the browser, adjust up if the sequence feels rushed, down if it requires too much scrolling. Report the value that feels right and it will be documented.

### Cleanup

Wrap the entire `useEffect` in `gsap.context()` scoped to `heroSectionRef` and return `ctx.revert()` from the effect cleanup.

---

## Step 4 — Post-Pin Headshot Parallax

After the pin releases, the headshot continues drifting upward as the sections below scroll in — the portrait recedes as the work takes center stage.

```ts
gsap.to(headshotRef.current, {
  y: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: heroSectionRef.current,
    start: 'bottom bottom',
    end: 'bottom top',
    scrub: 1.5,
    invalidateOnRefresh: true,
  },
});
```

Note: `start: 'bottom bottom'` refers to the bottom of the hero section including `pinSpacing` — this triggers only after the pin has fully released.

---

## Removed Elements

These elements from `HeroSectionClassic.tsx` do not appear in the new `HeroSection.tsx`. Do not carry them over:

- Telemetry badge pills (`AI RESEARCH`, `APPLIED MATH`, `DEPLOYABLE SYSTEMS`) — removed
- `hero-portrait-frame` and `hero-portrait-grid` wrappers — removed; headshot floats freely
- `hero-side-panel` (PROFILE block with pulse indicator) — removed
- `section-label` eyebrow text — removed
- Two-column grid layout — removed; replaced with single stacking context
- Phase 4 parallax refs for status badges and side panel — removed because those elements no longer exist

The Phase 4 parallax on the headshot image itself (`headshotWrapRef`) is superseded by the new post-pin parallax in Step 4. Do not duplicate it.

---

## Mobile Layout

On touch devices and viewports narrower than the `lg` breakpoint, render a completely different layout with no pinning:

- `headshot_nbck.png` centered, `max-height: 60vh`, `object-fit: contain`
- Name (`h1 display-title`) below the headshot, left-aligned
- Title (`h2 headline-lg`) below the name
- Metric panels below the title in a row (wrap if needed)
- Intro paragraph below the panels
- Signal statements below the intro
- CTA buttons at the bottom
- All content immediately visible — use the existing Framer Motion entrance stagger from Phase 3
- No GSAP, no ScrollTrigger, no pin

---

## Verification Checklist

**Feature flag:**
- [ ] `HERO_MODE = 'classic'` renders the site exactly as before — no regressions
- [ ] `HERO_MODE = 'cinematic'` mounts the new hero component

**Static layout:**
- [ ] Headshot uses `headshot_nbck.png` — no grey or white background visible behind the figure
- [ ] Headshot fills the full viewport height (`h-screen`)
- [ ] Name and title are visible in the lower-left, overlaid on the image
- [ ] All other elements (metric panels, intro, signals, CTAs) are invisible
- [ ] HeroGrid SVG pulse animation still runs behind the headshot

**Pinned sequence:**
- [ ] Page pins when scrolling begins from the hero
- [ ] Chapter 1: metric panels slide up, headshot zooms subtly to 1.04
- [ ] Chapter 2: intro paragraph fades in over the headshot, headshot drifts upward
- [ ] Chapter 3: signal statements appear one by one on the right side, headshot dims
- [ ] Chapter 4: CTA buttons appear, headshot returns to full opacity
- [ ] Pin releases after Chapter 4 and page scrolls into Positioning section naturally
- [ ] Scrolling backward reverses all animations correctly
- [ ] `pinSpacing: true` is working — Positioning section does not overlap the hero

**Post-pin parallax:**
- [ ] After the hero scrolls out of view, headshot drifts upward slightly faster than the page

**Reduced motion:**
- [ ] With `prefers-reduced-motion: reduce` emulated: all content immediately visible, no pinning, no JS errors

**Mobile:**
- [ ] Single column, all content visible, no pinning
- [ ] `headshot_nbck.png` renders with no grey background artifact on mobile

**Cross-cutting:**
- [ ] Home → About → back to Home: sequence resets correctly
- [ ] EN → 中文: layout and sequence work identically in both locales
- [ ] `npm run build` completes with zero errors
- [ ] DevTools Performance: no layout reflow during scroll — composited transforms only

---

## What Is Out of Scope

- Any changes to sections below the hero
- Any changes to other pages
- Any new npm packages
- Deleting `HeroSectionClassic.tsx` — keep it permanently as the rollback