# Phase 5 Codex Task

Implement content integration for the bilingual personal website.

## Goal
Refactor route pages so long-form content comes from local MDX files instead of hardcoded body text.

## Tasks
1. Create a reusable MDX rendering component.
2. Update the MDX loading helper so it can load locale-aware content by section and slug.
3. Create a reusable content body wrapper component for long-form pages.
4. Refactor these route pages to render MDX:
   - `src/app/[locale]/about/page.tsx`
   - `src/app/[locale]/research/page.tsx`
   - `src/app/[locale]/accomplishments/page.tsx`
   - `src/app/[locale]/projects/elementization/page.tsx`
   - `src/app/[locale]/projects/aloa/page.tsx`
   - `src/app/[locale]/projects/ai-learning-assistant/page.tsx`
5. Refactor `src/app/[locale]/projects/page.tsx` to use `src/data/projects.ts`.
6. Keep page intros and high-level page structure in the route components.
7. Keep long-form content in MDX files only.
8. Preserve locale-aware routing and current visual styling.

## Constraints
- do not add Framer Motion yet
- do not add GSAP yet
- do not redesign the header or footer
- do not change route structure
- do not hardcode long-form content back into pages

## Expected result
- route pages render localized MDX content
- project index uses typed project metadata
- site structure is cleaner and easier to iterate on