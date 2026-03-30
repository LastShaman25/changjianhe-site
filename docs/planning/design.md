```markdown
# Design System: Technical Kineticism

## 1. Overview & Creative North Star: "The Mach-Speed Monolith"
This design system is built for high-velocity environments where data density meets visceral performance. The Creative North Star, **"The Mach-Speed Monolith,"** rejects the soft, rounded "friendly" UI of the modern web in favor of aggressive precision, retro-arcade nostalgia, and racing-inspired telemetry.

We break the "template" look through **hard-edged geometry** (0px radius), **intentional asymmetry**, and **monospaced alignment**. By utilizing the high-contrast tension between a deep black void and searing primary accents, the UI should feel like a heads-up display (HUD) in a cockpit moving at terminal velocity. We do not "guide" the user; we provide them with a high-performance instrument.

---

## 2. Colors & Surface Architecture
The palette is a high-octane interplay of deep blacks and "warning-level" vibrancy.

### The Palette
- **Base (Background):** `#131313` — The "void." Everything sits on this absolute foundation.
- **Primary (Kinetic Red):** `#ffb4ac` (Dim) to `#ff544c` (Container). This is your "Go" signal, used for critical actions and velocity indicators.
- **Secondary (Neon Sulfur):** `#eaea00`. Inspired by racing flags and arcade "Insert Coin" prompts. Use this for secondary data points and high-attention warnings.
- **Surface Tiers:** Use `surface_container_lowest` (#0e0e0e) through `surface_container_highest` (#353534) to define functional zones.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** To separate a dashboard module from the main feed, shift the background from `surface` to `surface_container_low`. Use vertical blocks of color (2px width) on the left edge of a container to denote focus, rather than framing the entire element.

### Surface Hierarchy & Nesting
Treat the UI as a **mechanical assembly**.
- A high-level telemetry block should sit on `surface_container_low`.
- Nested data points within that block should sit on `surface_container_high`.
- This creates depth through "machined" layers rather than artificial shadows.

### Signature Textures
Apply a subtle 15% linear gradient from `primary` to `primary_container` on large CTAs. This mimics the "glow" of a CRT monitor or the heat-stained metal of an exhaust pipe.

---

## 3. Typography: Technical Brutalism
We use **Space Grotesk** exclusively. Its geometric construction evokes 1980s engineering manuals and digitized racing stats.

- **Display (The Leaderboard):** `display-lg` (3.5rem) should be used for hero metrics or "Lap Times." Use tight letter-spacing (-0.02em) to increase the sense of speed.
- **Headlines (The HUD):** `headline-md` (1.75rem) in All-Caps for section headers.
- **Body (The Manual):** `body-md` (0.875rem) for technical descriptions. Ensure `on_surface_variant` is used to keep long-form text from vibrating against the dark background.
- **Labels (The Telemetry):** `label-sm` (0.6875rem) for data units (e.g., "KM/H", "MS").

Hierarchy is conveyed through **scale contrast**. A `display-lg` metric should sit immediately adjacent to a `label-sm` unit to create a "Technical Editorial" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We use "Optical Depth" to simulate a high-tech interface.

- **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` card placed on a `surface` background creates a "lifted" effect through sheer value contrast.
- **Ambient Shadows:** Only for floating modals. Use a blur of 40px with a 6% opacity, tinted with `primary` (#ffb4ac). This simulates the ambient glow of a red-lit dashboard.
- **The "Ghost Border" Fallback:** If a separator is required for accessibility, use `outline_variant` (#5e3f3c) at **15% opacity**. It should be felt, not seen.
- **Kinetic Glass:** For overlays, use `surface_container` with a `backdrop-blur` of 12px. This maintains the "Technical Kineticism" by allowing background motion to be sensed through the UI.

---

## 5. Components & Primitive Styling

### Buttons (The Ignition Switches)
- **Primary:** Solid `primary_container`. 0px border radius. Text is `on_primary_container`, All-Caps, Bold.
- **Secondary:** Ghost style. `outline` color, 1px (the only exception to the line rule, for interaction clarity).
- **Hover State:** Shift background to `secondary` (Yellow) for a sudden, high-contrast "flash" effect.

### Input Fields (The Data Entry)
- No boxes. Use a bottom-border only (2px) using `outline`.
- Active state: The border shifts to `secondary_fixed` (Yellow) and the label slides 4px to the right to simulate mechanical movement.

### Cards (The Modules)
- No borders, no shadows.
- Use `surface_container_low`.
- Header of the card should have a 4px `primary` top-accent bar to denote "active" status.

### Lists & Tables (The Telemetry)
- **Forbid dividers.** Use `0.9rem` (Spacing 4) of vertical gutter.
- Alternating rows should use a subtle shift between `surface` and `surface_container_lowest`.

### High-Velocity Components
- **The "Pulse" Indicator:** A 4px square of `secondary` that blinks at 120BPM for real-time data streams.
- **The Speed-Bar:** A horizontal progress bar using a staggered "segmented" look (repeating 4px blocks of color) rather than a smooth fill.

---

## 6. Do's and Don'ts

### Do
- **Use Hard Edges:** Every corner must be 0px. Softness is the enemy of velocity.
- **Embrace Asymmetry:** Align primary metrics to the far left and secondary labels to the far right.
- **Leverage "Dead Space":** Use large gaps of `surface` background to make the "vibrant red" elements pop like emergency lights.

### Don't
- **Don't Use Rounded Corners:** Even a 2px radius breaks the technical aesthetic.
- **Don't Use Smooth Transitions:** UI states (hovers, toggles) should be instant or use "step-start" easing to mimic retro hardware.
- **Don't Use Grey Shadows:** Shadows must be tinted or non-existent. Pure grey is "standard" and "safe"—this system is neither.
- **Don't Crowd the Red:** The `primary` red is aggressive; if overused, the UI becomes fatiguing. Use it for the "What" and `secondary` yellow for the "Watch Out."