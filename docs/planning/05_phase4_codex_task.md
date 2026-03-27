# Phase 4 Codex Task

Implement the content architecture for the bilingual personal website.

## Tasks
1. Configure MDX support in `next.config.ts`.
2. Add `mdx-components.tsx` to style MDX output with the existing design system.
3. Create a lightweight MDX loading helper.
4. Create typed project data in `src/data/projects.ts`.
5. Create initial MDX files under:
   - `src/content/en/...`
   - `src/content/zh/...`
6. Refactor route page shells so they are ready to consume MDX content later.
7. Do not add animation logic yet.
8. Keep all routes under `src/app/[locale]/`.
9. Preserve the current graphite/silver visual direction.
10. Keep the code clean and modular.

## Important constraints
- UI strings stay in `messages/*.json`
- long-form copy stays in `content/**/*.mdx`
- summary/index data stays in `data/*.ts`
- no hardcoded long-form text inside route components

## Expected output
- MDX-enabled app
- content files created
- typed project index created
- route pages prepared for content integration