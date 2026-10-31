# daY²oga UI Implementation Plan

**Status:** Revised 30 October 2026 after independent Codex and OpenCode inspections. Planning only — implementation is **not authorized** until the product owner answers the P0 decisions in `UI_OPEN_QUESTIONS.md`. Source brief: `DAYOGA_UI_UX_REACT_VITE_SPEC.md`.

## Repository inspection findings (verified 30 October 2026)

The checkout contains seven files and one directory: the root spec, `Estimated cost structure.txt`, `docs/UI_SCREEN_INVENTORY.md`, `docs/UI_OPEN_QUESTIONS.md`, `docs/UI_DESIGN_DECISIONS.md`, `docs/UI_IMPLEMENTATION_PLAN.md`, and the independent review set in `docs/reviews/`.

- No `src/`, `public/`, `package.json`, lockfile, `tsconfig*.json`, `vite.config.*`, `tailwind.config.*`, `postcss.config.*`, `index.html`, assets, tests, or CI configuration exists.
- There is **no usable Git repository**: `git rev-parse` and `git status` fail and no `.git` entry is present. There is no rollback or diff baseline.
- Available toolchain only: Node `v26.12.1`, npm `12.2.1`; no project pins them.
- No React, Vite, TypeScript, or Tailwind version is configured; the spec's stack section makes TypeScript conditional on safe introduction and Tailwind conditional on existing setup or approval.
- No design system is implemented. `docs/UI_DESIGN_DECISIONS.md` is a proposal.
- No working code can be overwritten. A fresh app can be bootstrapped here safely, subject to owner approval and a Git baseline.

The stale statement that the checkout holds only the brief and cost note (and the claim that a `.git` entry exists but is unusable) is superseded by this inspection.

## Independent review status

Both independent reviews have now run under Orca run `run_c8e7c1cd3274`, on the same folder workspace with disjoint file ownership and read-only constraints:

- Codex, task `task_bacfa3c05a53`, dispatch `ctx_9c68dad1c3ea`, succeeded → `docs/reviews/CODEX_INSPECTION.md`.
- OpenCode, task `task_8c5d1429b10f`, dispatch `ctx_05787c91a4c0`, succeeded → `docs/reviews/OPENCODE_INSPECTION.md`.

Combined findings, agreements, and the required decision order are in `docs/reviews/RECONCILIATION.md`. Q25 in `UI_OPEN_QUESTIONS.md` is resolved: Orca is reachable and both reviews completed. Neither review found existing UI code; both recommend a Git baseline and owner approval before scaffolding.

Key combined findings:

- Seven P0 decisions gate the scaffold: bootstrap/Git authorization, navigation, access model, camera scope and truthfulness, content/assets ownership, brand plus corrected tokens, and the route/URL map.
- The proposed tokens fail their own WCAG 2.2 AA target: control borders are ~1.23–1.32:1, Yoga/Combined text colors fail 4.5:1, and the single blue focus ring is invisible on primary and category surfaces. See `docs/UI_DESIGN_DECISIONS.md`.
- The inventory needs an Explore hub definition, camera-privacy details, help/legal/safety destinations, a 404/error boundary, a route map, and explicit player transition rules before implementation.
- Camera must remain simulated: no `getUserMedia`, no pose inference, no fabricated confidence or scores, and no unverified processing/storage claims.
- Sample data needs a persistent demo banner, per-screen chips, and a reset control so seeded progress is not mistaken for real history.

## Proposed screen flow and navigation

Welcome → Create account or Log in → (optional Forgot password) → Onboarding → Home. Home leads to Explore (Yoga and Strength), Plans, Progress, or Profile. Library/plan → detail → workout player → completion. A supported exercise detail may lead to a simulated camera introduction → mock camera states or manual workout.

Five primary destinations (Home / Explore / Plans / Progress / Profile) remain a proposal; label count, Explore-as-hub, and mobile/desktop patterns need approval. See `docs/UI_SCREEN_INVENTORY.md` for the screen-by-screen entries, proposed additions, and states.

## Proposed implementation phases

### Phase 0 — Owner decisions and baseline

- Answer the P0 decisions in `UI_OPEN_QUESTIONS.md`: bootstrap/Git, navigation, access, camera scope/copy, content/assets, brand/tokens, route map.
- Authorize `git init`, `.gitignore`, and an initial planning-baseline commit so parallel workers have a rollback point.
- Confirm package manager, Node pin, route/refresh strategy, and test tooling.
- Do not scaffold the app in this phase.

### Phase 1 — Frontend foundation (after P0 approval)

- Create a React + Vite + TypeScript app with the approved package manager and a minimal dependency set; add Tailwind only if approved.
- Establish CSS custom properties as the single token source, with corrected border, category-text, and focus tokens.
- Add the route table, app shell, responsive navigation, skip link, 404 route, error boundary, focus/title management on route change, and reduced-motion behavior.
- Add the persistent demo-data banner and a `src/data/mock/` typed fixture layer; add `.nvmrc`/`engines` and build/test scripts.
- Verify the scaffold, tokens, routes, and build evidence before starting screen workers.

### Phase 2 — Core discovery and setup

- Implement the approved Welcome/auth mock flow and onboarding, including "why we ask" copy and required/optional/skip marking.
- Implement Home, the Explore hub (if approved), Yoga library, Strength library, combined Plans, and Plan detail.
- Include empty/loading/error states appropriate to mock data, working filters, and neutral recovery copy.

### Phase 3 — Workout and trust-sensitive flows

- Implement exercise/session detail with clearly illustrative content, modifications, and safety notes pending qualified review.
- Implement the workout player state machine: ready, active, paused, rest, next/previous, skip/end confirmation, completed, stopped early, and interruption/resume as approved. Timer from `performance.now()` timestamps.
- Implement the completion summary without calories or transformation claims.
- Implement camera introduction and simulated permission/availability/body-visibility states only; keep manual mode available in every path; add a "Simulated — no pose detection" badge.

### Phase 4 — Progress and profile

- Add clearly labelled mock progress and empty states, with a demo reset control.
- Add profile/preferences and informational settings with local behavior; mark account delete/export as mock or disabled with explanation.
- Add Help, Terms, Privacy, and Safety destinations (placeholder text acceptable only if labelled and approved).

### Phase 5 — Independent review and owner walkthrough

- OpenCode reviews every route and screen, responsive behavior, all required states, accessibility basics, copy/claims, console output, and build/test results.
- Resolve findings and walk the product owner through each approved screen with a running preview or screenshots.
- Report exact commands and actual results; no unrun check is reported as passed.

## Proposed architecture once an app exists

```text
src/
  app/                 # app shell, router, error boundary, route metadata
  components/          # shared navigation, cards, forms, controls
  features/            # home, explore, onboarding, libraries, plans, workout, camera, progress, profile
  data/mock/           # visibly illustrative typed fixtures
  styles/              # tokens, global styles, responsive rules
  types/               # shared domain types
```

Use reusable controls and keep screen components separate from mock data. Avoid production APIs, backend, real auth, payments, analytics, real pose inference, recording/upload, and external data transmission in this phase.

## Acceptance checkpoints

Before full implementation: P0 decisions answered or explicitly deferred; Git baseline created; route map and token corrections approved; independent review findings reconciled (`docs/reviews/RECONCILIATION.md`).

Before UI phase completion: approved screens/routes usable; Yoga and Strength distinct in one app; combined plans present; player transitions and camera/manual mock states work; demo data labelled and resettable; responsive and accessibility checks actually run; build/tests actually pass; product-owner approval recorded.

## Dependencies and unresolved decisions

- Product-owner answers to the P0 group in `UI_OPEN_QUESTIONS.md`.
- A Git baseline before any parallel implementation wave.
- Confirmed navigation, access flow, onboarding fields, content ownership, brand/tokens, camera facts, localization, notification scope, and target platform.
- Agreed test/viewport matrix and preview method for the owner walkthrough.

No implementation work may start from this plan alone.
