# Changjian He — personal website

Bilingual English/Chinese portfolio built with Next.js 16, React 19, TypeScript, next-intl, and GSAP. The application is at the repository root and is ready to import into Vercel.

## Folder guide

- `src/app/` — routes, layouts, metadata, and contact API
- `src/components/portfolio/` — homepage, project narratives, interactive explainers, and motion
- `src/components/mobile/` — dedicated phone/tablet homepage, project visuals, and native scroll sequences
- `src/components/layout/` — shared navigation and footer
- `src/styles/` — site styling
- `src/pic/` and `public/` — website images and public assets
- `src/content/`, `src/data/` — existing content and shared data/types
- `docs/redesign/` — design decisions, claim map, verification log, and historical storyboard
- `docs/planning/` — earlier planning history

Edit the current portfolio copy in `src/components/portfolio/content.ts`, `home-copy.ts`, and `PortfolioPage.tsx`. The archived storyboard is not the deployed website. Private manuals and separate project backends are not required to build this repository.

## Local development

Use Node.js 24 and the committed npm lockfile:

```sh
npm ci
npm run dev
```

Open http://localhost:3000/en. Optionally copy `.env.example` to `.env.local` and fill in local configuration. Never commit credentials.

```sh
npm run build
npm run start
```

Vercel builds into the standard `.next` directory. `CODEX_NEXT_DIST_DIR` is an optional local-only workaround for OneDrive build locks; do not set it in Vercel. Generated build folders and dependencies are ignored by Git.

## GitHub → Vercel automatic deployment

The existing Git remote is `https://github.com/LastShaman25/changjianhe-site` and the current branch is `main`.

1. Review and commit the website changes, then push `main` to GitHub.
2. In Vercel, import that GitHub repository (or confirm the existing Vercel project is linked to it).
3. Choose **Next.js**, root directory **./**, Node.js **24.x**, and production branch **main**. Leave the output directory at the framework default. `vercel.json` supplies `npm ci` and `npm run build`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain. Configure the custom domain in Vercel as needed.
5. Deploy. Subsequent pushes to the production branch trigger production deployments; other branches and pull requests receive previews through the Git integration.

No GitHub Actions deployment workflow or Vercel token needs to be committed. If an existing project has old build/output overrides, clear them to the settings above. Repository preparation alone does not connect the Vercel account.

See [Vercel Git integration](https://vercel.com/docs/git) and [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Optional email contact form

Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in the appropriate Vercel environments. The sender must be configured with your email provider. Redeploy after changes. If these are absent, the site uses LinkedIn instead; the website still builds and deploys.

## Checks

```sh
npm run lint
npm run build
```

`npm run typecheck` is also available after Next.js has generated route types. The production build includes TypeScript checking. Preview deployments should be checked in both `/en` and `/zh`, with automatic motion and a mobile viewport.

## Mobile presentation

Mobile and desktop share URLs and content, but load separate presentation components. The server uses a device hint for the initial render; viewport and pointer capabilities confirm the choice in the browser. Mobile uses native document scrolling and sticky cards, with arrow-controlled animated stages when the available height is too short for safe pinning. No floating chapter bar is rendered. See `docs/redesign/mobile-verification.md` for the verification scope and remaining physical-device checks.
