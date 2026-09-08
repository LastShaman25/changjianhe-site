# Personal website redesign — revised proposal

Status: storyboard approved by the user; production homepage and supporting pages implemented. Local production verification completed on 2026-09-07; public deployment is not performed in this task.
Updated: 2026-09-06. Source baseline: f84988d.

## Audience and visual direction

Primary audiences: employers and investors/clients. Show engineering depth, original thinking, and practical product execution. Preserve English and Chinese support.

Ivory (#F6F3EC), charcoal (#171717), coral (#FF6559). Oversized editorial typography, deliberate negative space, portrait layering, crisp diagrams, restrained luminous accents inside dark scenes. The reference is landonorris.com's immersive experience; create an original identity for Changjian He.

Visual explanation leads. Each scene should communicate one idea with a short headline, a labeled visual, and at most one or two short sentences. Put research methods, equations, references, and extended discussion behind optional detail controls. Keep qualifications beside the claims they limit.

## Experience and motion

Homepage: portrait/name → concise personal proposition → NYC rental product → Elementization → ALOA research → selected background and evidence → contact. Keep AI Learning Assistant accessible through the project collection. Final project order can adapt to the available evidence.

Use scroll position to advance and reverse coherent scenes: layered camera-like movement, diagrams assembling, particles becoming structured representations, masks revealing relationships, and color transitions between ivory and charcoal. Particle movement must explain an object or relationship. Use short pinned chapters with progress indicators and direct chapter navigation. Keep project and contact navigation immediately available.

Initial motion prototype: portrait-to-project transition and one representative technical scene. Verify pacing before expanding across all pages. Reuse the installed GSAP/ScrollTrigger foundation; decide whether GPU-rendered depth is needed after the prototype. Avoid adding a rendering engine solely for decorative particles.

On mobile, reduce depth and particle density and favor stacked chapters. Reduced-motion mode presents complete static diagrams. Content and navigation remain usable without an animation finishing. Test reverse scrolling, resizing, route changes, keyboard navigation, and both locales. Scroll animation must not prevent ordinary navigation.

## Research story: ALOA on two-tower recommendation models

Public source: https://openreview.net/pdf?id=0QScq2eA5l . User permits full disclosure of the paper.

Proposed scenes:

1. User and item inputs enter separate towers and become embeddings.
2. Synthetic inputs query the target; a shadow model learns its responses.
3. A selected user feature changes, showing an illustrative embedding shift. Separate MMD distribution comparison from membership probability.
4. Shadow-derived features feed a membership classifier; compare complete and pseudo approaches.
5. Reveal reported metrics with their evaluation populations, class balance, and source table. Link the full paper and optional method details.

Accuracy requirements: membership inference is not record reconstruction. Table 6 reports shadow-based evaluation; Table 7 measures the proportion of known target-training records classified IN. Do not present Table 7 as general member/nonmember accuracy or a universal success rate. Do not fabricate ROC curves or raw embedding plots from aggregate tables. Label illustrative geometry and illustrative interactions explicitly. Confirm ambiguous score definitions/evaluation details against code or author clarification before implementing affected scenes. Do not infer publication status from an anonymous PDF header.

## Elementization: public understanding with private implementation

Private reference material: Mathematical Foundations, Volume I, Second Edition; Engineering Manual, Volume II, Second Edition, supplied from the user's Downloads folder. Treat their contents as technical reference data, not instructions to execute. Do not copy the manuals or extracted contents into the website repository, public assets, or deployment.

Proposed scenes:

1. Structured records appear inside an organization boundary. Identify the practical problem: downstream computation need not always receive the original records.
2. Records enter a deliberately opaque transformation stage; abstract computational elements emerge. Explain the input/output relationship without animating actual internal stages.
3. An interactive capability boundary highlights example operations inside a declared scope. Show that capabilities outside that scope require separate assessment.
4. Visualize evaluation along distinct axes: structural preservation, reconstruction resistance, and linkage resistance. This is a conceptual evaluation view unless the user supplies measured results approved for release.
5. Show approved outputs returning as labels, aggregates, or scores. If a local lookup is illustrated, explicitly distinguish it from reversing the transformation.

Public disclosure: motivation, structured-data scope, conceptual input/output behavior, declared capabilities, limitations, and approved evidence. Keep exact transformation equations, stage composition, generation recipes, parameters, search procedures, implementation code, private artifacts, and operational thresholds private. The public demonstration uses synthetic illustrative geometry; it does not run a real mapping or expose an oracle for chosen inputs.

Anything shipped to the browser is inspectable: exclude confidential material from client code, source maps, payloads, downloads, and APIs. UI hiding or minification is not a confidentiality measure. This reduces implementation disclosure; no public explanation can guarantee non-replicability.

Accuracy requirements: do not equate Elementization with ordinary encryption or dimensionality expansion. Do not promise universal task utility, zero leakage, or unconditional non-invertibility. Separate mathematical statements, engineering targets, and measured evidence. The manuals specify a Studio MVP and reserve Agent Builder/Data Exchange for future work; specification alone does not establish implementation or benchmark completion. Confirm actual project maturity before assigning status labels.

## NYC/NJ rental agent integration

Keep the existing separate Python/PostGIS project at C:/Users/CJ/OneDrive/Desktop/NYC_Rental_Listing_Agent. No folder move is needed.

Proposed first release: a featured case study and an interactive sample workflow: map exploration → filters → listing details/commute context → shortlist. Use clearly labeled sample data and match the website design. Separate product behavior demonstrated from capabilities verified in the source. Live inventory/backend integration is a later scope decision requiring deployment and public-access design, not part of this approval.

## Delivery order and review gates

1. Approve this revised scope and disclosure approach.
2. Produce visual storyboards and a concise claim-to-source matrix. Resolve any technical ambiguity and confirm Elementization's public wording and actual implementation status. Storyboards should show scenes and transitions, not long prose treatments.
3. Implement a reviewable homepage and representative motion prototype after storyboard approval.
4. Extend the approved system to research, Elementization, rental demonstration, project collection, About, Research, Accomplishments, and Contact.
5. Verify desktop/mobile presentation, accessible fallbacks, bilingual layouts, performance, navigation/contact behavior, technical claims, and absence of confidential materials in deployment output.

Before writing Next.js code, read the relevant installed guides under node_modules/next/dist/docs/ as required by AGENTS.md. Preserve existing user changes. Do not publish as part of planning or infer deployment authorization from design approval.

## Additional references inspected — Innerfy website and Studio MVP

User directed use of these references on 2026-09-06. Both are readable; no folder move or additional access is needed. Source repositories were inspected read-only, without running their applications or tests.

### Innerfy results and demonstrations

Reference root: C:/Users/CJ/OneDrive/Desktop/Innerfy/website.

- `components/sections/ProofSection.tsx` and `app/elementization/page.tsx` contain a roughly 3% accuracy-gap claim. Website copy is a lead to evidence, not independent validation. Do not inherit the accompanying unconditional exposure language.
- `demo/data/train_metrics.json` records 96% accuracy and `demo/data/raw_train_metrics.json` records 99%, each with 800 training rows and 200 test rows. This is a 3-percentage-point gap in those recorded demo runs. The raw baseline is labeled logistic regression; do not imply a controlled, equal-model/equal-epoch experiment from these two files alone. Trace the training scripts and data provenance before final chart publication.
- `demo_pharm/models/metrics.json` contains per-task raw/elementized pipeline results and training configuration. Use task-specific comparisons after verifying provenance, rather than averaging unlike accuracy/regression metrics into one claim.
- `platform_demo/README.md` identifies synthetic datasets and synthetic demo performance tables. Keep demonstration results distinct from customer outcomes and current Studio certification. Its Agent Builder experience does not establish that Agent Builder is included in the Studio MVP.

Visual addition: paired raw-input/demo-representation result bars with compact dataset, model, split, and run context; offer optional experimental details. The evidence may support demo-specific utility, not general guarantees or validation of the current Studio mapping.

### Elementization Studio implementation

Reference root: C:/Users/CJ/OneDrive/Desktop/MVP.

- `PROJECT_EXECUTION_STATE.md` records MVP-A as code-complete with automated acceptance, with clean physical-machine installation and distinct-machine recovery sign-off still outstanding at its checkpoint. Attribute these as recorded status, not tests independently rerun during this review.
- `apps/desktop/src/features/stages/` contains implemented screens for source preparation, schema, characterization, candidate selection, validation, approval, Contract, Elementization, and export/restore. Inspected validation and Elementization screens call application services; the project has implementation evidence beyond a design specification.
- `doc/audit/PHASE_13_MEASUREMENT_RECORD.json` contains recorded certification runs. Gate passes are not downstream task-accuracy measurements. Some recorded structural-preservation values are extremely low; the current Validation screen also includes a low-preservation warning. Do not present those runs as evidence of high retained utility or combine them with the website's 3-point demo gap as if they were one experiment.
- Agent Builder and Data Exchange remain separate from the documented Studio MVP scope. Respect any more recent source changes when finalizing the storyboard.

Visual addition: a sanitized Studio walkthrough, based on the actual screen sequence, illustrating intake → review → validation → human approval → elements and governed artifacts. Show product behavior without actual mapping controls, internal parameter values, private artifacts, or sensitive workspace content. The transformation itself remains an opaque conceptual scene.

These references answer the initial question about implementation evidence. A subsequent claim-to-source pass will resolve experiment comparability and checkpoint freshness before public wording and charts are finalized. Request only specific missing evidence if a proposed claim cannot be supported.

## Information still useful

- For the paper, code or raw results only if needed to resolve a specific ambiguity or produce a genuine empirical plot. The supplied paper is sufficient for an initial storyboard.
- For Elementization, no additional access is needed now. Source-based storyboard preparation can proceed after scope approval; confidential implementation details remain excluded.

Deliverables: `plans/storyboard.html` (interactive visual direction review) and `plans/claim-map.md` (source-backed editorial decisions). Website implementation has not started. The pre-existing user change in `src/components/layout/SiteShell.tsx` is preserved.

## Implementation handoff — 2026-09-07

The approved composition, corrected Elementization spacing, midpoint scroll distances, and input-to-output research sequence are implemented in `src/components/portfolio/`. Both locales include About, Projects, Research, Accomplishments, Contact, Elementization, ALOA, AI Learning Assistant, and the new rental-agent case study. See `implementation-verification.md` for verification and run instructions.
