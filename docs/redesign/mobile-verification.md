# Dedicated mobile experience — verification record

Implemented 2026-09-07. The mobile presentation lives in `src/components/mobile/`; desktop scene code remains separate. Both use the same public routes, locale content, project claims, and deployment.

## Loading and layout

- `DeviceProvider` uses a server device hint for the first response and confirms with viewport/pointer capabilities in the browser. The selected presentation is dynamically imported.
- An iPhone/WeChat-style request returned mobile homepage markup and the mobile component chunk, without desktop homepage markup or its component chunk. A desktop request returned the inverse.
- Mobile project pages render their dedicated story component; no desktop explainer DOM is mounted.
- There is no floating chapter rail. Chapter links live in the mobile menu. Static and dynamic mobile arrows are SVGs.
- Mobile uses native document scrolling and CSS sticky. Card fit is measured before pinning. Short landscape screens use arrow-controlled, 1.8-second animated stages.
- Initial scroll space is reserved in HTML to reduce hydration movement around deep links. Browser-bar height changes do not rebuild active scroll tracks.

## Observed browser checks

These are viewport/browser checks, not claims of physical iPhone, Android, or WeChat verification.

| Sequence | Forward stages observed | Reverse check | Card position during active scroll |
| --- | --- | --- | --- |
| Rental | Discover, Compare, Shortlist | Returned to Compare | 72px below viewport top |
| Elementization | Records, Transform, Explore | Returned to Transform | 72px |
| Studio | Intake, Review, Validation, Approval, Output | Returned to Approval | 72px |
| ALOA | Towers, Perturb, Evidence | Returned to Perturb in earlier pass | 72px |
| Learning assistant | Observe, Adapt, Recalibrate | Returned to Adapt | 72px |

ALOA input arrival was explicitly sampled: at normalized progress 0.508 and 0.547, the pulse was visible at SVG y=47, at the user tower, before disappearing. Response motion begins after arrival; no reconstruction claim is made.

- 390×844: all five homepage stories progressed with real browser scroll actions; their cards held at 72px until the end of the sequence.
- 375×667 Chinese homepage: all five cards fit and enabled pinning; no horizontal overflow or floating rail.
- 320×740 Chinese project pages: rental, Elementization (including Studio), ALOA, and learning assistant used mobile explainers and had no horizontal overflow.
- 844×390 landscape: pinning was disabled, the control hint changed, and selecting the next learning stage animated progress from 0.396 to 0.660.
- Rental save action changed its selected state. Its complete 52px-high button remained visible at y=434–486 in an 844px viewport.

## Local visual evidence

Sampled scroll captures (GIFs assembled from browser screenshots taken between real scroll actions) and the numerical log are in `.local/mobile-verification/`. They are not FPS measurements or physical-device recordings. This local evidence folder is ignored by Git and Vercel.

- `rental-scroll.gif`
- `elements-scroll.gif`
- `studio-scroll.gif`
- `research-scroll.gif`
- `learning-scroll.gif`
- `scroll-checks.json`
- `rental-save.png`
- `chinese-375.png`

## Release gate still requiring a real device

After deploying this build to a Vercel preview, check it on iPhone Safari, the user's WeChat browser, and Android Chrome. Confirm expanding/collapsing browser bars, portrait/landscape rotation, fast swipes, reverse scrolling, all next/back controls, rental save, Chinese text, and chapter-menu navigation. Confirm the preview contains `data-experience="mobile"` and `.mobile-home` before assessing the result. The previous live site screenshots cannot verify this new build.

No public deployment or GitHub push was performed as part of this implementation.

## Final production checks

- Production build and TypeScript passed using `.next-mobile-ready`; targeted ESLint passed.
- `npm run check:render -- http://localhost:3004` passed 40 EN/ZH mobile/desktop response checks (HTTP 200, correct initial renderer, one H1, exclusive homepage markup).
- Fresh production browser: five mobile stories, no desktop rail, no horizontal overflow, no captured console errors.
- Fast scroll completed rental at progress 1.000 / stage 2; reversing returned to progress 0.553 / stage 1.
- Chapter menu uses native anchors; navigating from an existing fragment produced the correct `#rental` fragment and closed the menu. Removed double-counted anchor spacing.
- Local server: http://localhost:3004 . The public site is not updated by this local build.
