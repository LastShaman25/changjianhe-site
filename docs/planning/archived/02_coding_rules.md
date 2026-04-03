# Coding Rules

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- MDX
- Vercel deployment target

## Rules
1. Prefer Server Components by default.
2. Use Client Components only when hooks or browser-only behavior are required.
3. Keep routing under `src/app/[locale]/`.
4. Use locale-aware navigation from `src/i18n/navigation.ts`.
5. Do not hardcode long-form content into page components.
6. Long-form copy must come from MDX files.
7. Reusable lists and metadata belong in typed `src/data/*.ts` files.
8. Preserve the graphite/silver visual system.
9. Keep code modular and component-driven.
10. Avoid adding heavy animation libraries in content architecture tasks.

## File ownership
- `src/messages/*`: short UI copy
- `src/content/*`: long-form copy
- `src/data/*`: typed shared content metadata
- `docs/planning/*`: build briefs for coding agents