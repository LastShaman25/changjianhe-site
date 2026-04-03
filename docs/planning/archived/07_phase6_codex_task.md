# Phase 6 Codex Task

Implement homepage composition for the bilingual personal website.

## Goal
Turn the homepage into a premium, structured personal brand landing page built from reusable homepage sections.

## Required sections
1. Hero
2. Identity / positioning strip
3. Featured projects
4. Philosophy section
5. Accomplishments preview
6. Contact CTA

## Tasks
1. Create reusable homepage components under `src/components/home/`.
2. Refactor `src/app/[locale]/page.tsx` to use those components.
3. Extend `src/messages/en.json` and `src/messages/zh.json` with homepage-specific copy.
4. Use `src/data/projects.ts` for featured projects.
5. Keep the visual language premium, cinematic, graphite/silver, and mobile-friendly.
6. Preserve locale-aware routing.
7. Keep implementation modular and ready for later animation phases.

## Constraints
- do not add Framer Motion yet
- do not add GSAP yet
- do not redesign the whole app structure
- do not hardcode all homepage text directly into the page file
- do not change route structure

## Expected result
- a stronger homepage built from reusable sections
- clearer content hierarchy
- featured projects highlighted cleanly
- bilingual homepage support maintained