# Phase 8 Codex Task

Implement flagship project story scenes for the bilingual personal website.

## Goal
Turn the Elementization and ALOA project pages into cinematic, scroll-driven narrative experiences.

## Project pages
- `/[locale]/projects/elementization`
- `/[locale]/projects/aloa`

## Story goals

### Elementization
Create a Nintendo-like system journey showing:
1. raw data world
2. transformation gate
3. transposed/trainable state
4. trust boundary / raw-data lockout
5. deployable AI outcome

### ALOA
Create a scientific attack progression showing:
1. two-tower architecture intro
2. embedding field
3. perturbation / probe stage
4. inference stage
5. charts / findings stage

## Tasks
1. Add GSAP support in a modular way.
2. Create reusable story shell components.
3. Create dedicated scene components for Elementization and ALOA pages.
4. Refactor the two project pages so they render:
   - hero
   - scroll story sections
   - MDX content body where appropriate
5. Keep the motion layered, premium, and mobile-aware.
6. Keep content separate from animation logic.
7. Use Framer Motion only where it remains useful for local component interactions.
8. Avoid overengineering with canvas or Three.js.

## Constraints
- do not redesign the global site structure
- do not change route structure
- do not create a noisy gaming aesthetic
- do not sacrifice readability for animation
- keep mobile fallback behavior simpler than desktop
- preserve bilingual support

## Expected result
- Elementization page feels like a visual infrastructure journey
- ALOA page feels like a scientific narrative
- both pages are modular and ready for later polish