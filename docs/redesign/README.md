# Website redesign review

| Deliverable | Purpose | Status |
| --- | --- | --- |
| [Redesign plan](website-redesign-plan.md) | Audience, direction, scope, disclosure boundary | Plan approved |
| [Visual storyboard](storyboard.html) | Six visual chapters with sample interactions and scroll motion | Ready for storyboard review |
| [Claim map](claim-map.md) | Source attribution and public wording decisions | Prepared |

Open `storyboard.html` in a browser, or use the local preview at http://127.0.0.1:4174/docs/redesign/storyboard.html?motion=on while the review server is running. The portrait loads from the existing site asset; keep the file in its current directory.

## Verification on 2026-09-06

- Inspected desktop composition at 1280 × 720 and mobile at 390 × 844.
- Corrected portrait aspect ratio and mobile scene overlap; mobile scenes stack and the Elementization diagram becomes vertical.
- All six desktop scenes' content bounds fit within their stages after adjustment.
- No horizontal page overflow at either inspected width.
- Verified save-to-sample-shortlist, Studio stage selection/next action, capability selection, research perturbation/evidence selection.
- Verified reduced-motion default and explicit motion preview override.
- Verified scroll progress moved from 0 to 0.604 and returned to 0 with reverse scrolling; corresponding portrait transform changed.
- No browser JavaScript errors observed during interaction checks.
- No private algorithms, manuals, real mapping parameters, or backend connections included in the storyboard.

This is a direction review, not the finished production website. No Next.js source was edited and no production build was run. The next approved-plan checkpoint is storyboard review before production implementation.

## Motion pacing revision

- GSAP entrances, portrait/name parallax, map depth reveal, opaque Elementization particle passage, and staged Studio/research motion now run in the preview. An explicit Motion toggle overrides the system preference for this preview only.
- Desktop chapter lengths: introduction 260vh, rental 280vh, Elementization 340vh, Studio 440vh, research 340vh. Scrubbing catches up over 1.1 seconds. Rental and Elementization have a final visual hold.
- Studio spreads five stages over a longer scroll run with extra intake/output holds. At widths of 850px or less, Studio and research progression is manual to avoid flashing through content.
- The guided scroll demo lasts 28 seconds including entrance and holds; wheel, touch, or navigation cancels it immediately.
- Reference: [Temology portfolio motion study](https://dribbble.com/shots/27133777-Temology-com-Personal-Portfolio-Site-Motion), found through the supplied Dribbble search. Layered depth and foreground reveals inform the original map/window transitions; no reference assets are copied.
- Verified JavaScript syntax, desktop scene heights at 1280 × 720, Studio progression after one page scroll, mobile state retention during scrolling and manual Next action at 390 × 844, no horizontal mobile overflow, and no browser errors during those checks.

## Approved and implemented

The storyboard was approved and promoted into the actual Next.js site, including both locales and the supporting pages. See [implementation verification](implementation-verification.md). Current local production URL: http://localhost:3004/en?motion=on . The storyboard remains available as a historical design reference.
