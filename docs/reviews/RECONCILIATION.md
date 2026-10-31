# Independent Review Reconciliation — daY²oga UI Phase

**Prepared by:** Orca coordinator (run `run_c8e7c1cd3274`)
**Date:** 30 October 2026
**Inputs:** `docs/reviews/CODEX_INSPECTION.md` (task `task_bacfa3c05a53`), `docs/reviews/OPENCODE_INSPECTION.md` (task `task_8c5d1429b10f`)
**Status:** Planning reconciliation only. No implementation is authorized by this document.

## 1. How the reviews were run

Both workers were dispatched by Orca on the same folder workspace (`/home/seechan1/Downloads/yoga`) with disjoint file ownership and read-only constraints:

| Role | Agent | Task | Dispatch | Outcome | Owned file |
|---|---|---|---|---|---|
| Inspection | Codex | `task_bacfa3c05a53` | `ctx_9c68dad1c3ea` | succeeded | `docs/reviews/CODEX_INSPECTION.md` |
| Independent review | OpenCode | `task_8c5d1429b10f` | `ctx_05787c91a4c0` | succeeded | `docs/reviews/OPENCODE_INSPECTION.md` |

Both were told not to edit the spec or existing docs, not to install packages or scaffold, and not to read each other's draft. OpenCode's terminal was released after settlement; Codex's terminal was retained by Orca with reason `user_takeover`, so it remains open for the product owner rather than being reported as closed.

## 2. Where the reviews agree

1. **The checkout is documentation-only.** Seven files: the spec, four planning docs, this review set, and `Estimated cost structure.txt`. No `src/`, `package.json`, lockfile, `tsconfig`, Vite/Tailwind config, `index.html`, assets, routes, components, tests, or design-system code.
2. **There is no Git repository.** `git rev-parse` and `git status` fail; no `.git`, `.gitignore`, or `.github`. There is no rollback or review baseline.
3. **A fresh React + Vite app is technically safe to bootstrap** because there is no working frontend code to overwrite — but doing so is gated on product-owner approval (spec §4 Task 1/§14; `UI_OPEN_QUESTIONS.md` Q24).
4. **The planning docs are stale in places.** Both flag the "only two files / no docs directory" baseline in `UI_SCREEN_INVENTORY.md` and `UI_IMPLEMENTATION_PLAN.md`, and the "Orca unavailable / reviews have not run" status.
5. **The proposed design tokens do not yet meet their own WCAG 2.2 AA target.** OpenCode calculated the ratios; Codex flagged the same risk in general terms.
6. **Camera and account behavior must stay simulated.** No `getUserMedia`, no pose inference, no credential collection or transmission, no unverified privacy claims.
7. **The spec's approval gates are real.** Navigation, access model, onboarding, content ownership, brand, camera facts, and platform scope remain product-owner decisions.

## 3. Where the reviews differ

These are emphasis differences, not contradictions:

- **Codex** answered the spec's Task 1 questions directly (what exists, what stack is configured, safe bootstrap, recommended plan) and kept recommendations at the phase level.
- **OpenCode** went further into screen-by-screen coverage, route contracts, player state semantics, contrast math, and copy/claim risks. It adds 16 screen gaps, 20 technical risks, 21 conflicts, and 18 prioritized owner decisions.
- Codex did not verify token contrast or enumerate route-level gaps; OpenCode did. Neither found existing UI code to review.

**Reconciled position:** treat Codex's report as the repository baseline and OpenCode's report as the implementation-risk and decision backlog. Where only OpenCode raises an item, it is carried forward as a finding to resolve, not as an established defect, because there is no code yet.

## 4. Blocking (P0) items before any scaffold

1. **Authorize bootstrap and version control.** Approve a new React + Vite + TypeScript app in this directory; approve `git init`, `.gitignore` (`node_modules`, `dist`, `.env*`), an initial planning-baseline commit/tag, package manager, lockfile policy, and a Node pin. Without Git, parallel workers cannot be reconciled safely.
2. **Approve primary navigation.** Exact labels and count, mobile pattern (bottom tabs vs menu), desktop pattern, and whether Explore is a hub or just the Yoga/Strength libraries.
3. **Approve the access model.** Guest browsing vs sign-in required, which actions need an account, whether auth screens are mock-only, and whether verification and an age/eligibility gate are in scope.
4. **Approve camera scope and truthful copy.** Which exercises (if any) are "supported", simulation-only vs real permission request, approved placeholder wording for processing/storage until verified, and recovery paths for denied/busy/unavailable.
5. **Approve content and assets.** Initial catalogue, no-equipment vs basic equipment, who authors and professionally reviews instructions/safety/modifications, and whether neutral placeholders are acceptable.
6. **Approve brand direction and corrected tokens.** Warm-neutral/botanical palette, typography including the `²` brand glyph, and revised border/category-text/focus tokens that pass WCAG 2.2 AA.
7. **Approve the route/URL map and refresh strategy.** Paths, params, guards, redirects, and history vs hash/static fallback.

## 5. Screen and route gaps carried forward

OpenCode found the inventory has 17 rows against 14 spec sections but leaves these undefined. They are proposed additions, not approved scope:

- Explore hub screen (a primary tab with no defined content).
- Verification screen/state (conditional on Q4).
- Camera privacy details destination for the intro's "Learn about camera privacy" action.
- Help/support and Terms/Privacy/Safety destinations.
- 404 / unknown-route screen and a top-level error boundary.
- A route/URL map and an app-shell/responsive navigation definition.
- Onboarding "why we ask" copy and required/optional/skip marking.
- Camera recovery actions for denied, unavailable, busy, poor light, and processing-unavailable states.
- Plan "illustrative" disclaimer placement.
- Demo reset / mock-data management.
- Player transition rules (pause vs timer, skip counting, previous-at-first, early-stop summary, refresh/resume).

Also fix the flow diagram so Combined plans routes through Plan detail before a session detail.

## 6. Technical decisions the foundation wave must settle

- Route table first; deep-link/refresh strategy chosen and tested on every route.
- Workout session modeled as a discriminated union with a written transition table and unit tests; timers derived from `performance.now()` timestamps.
- One typed mock-data module per entity, with plan aggregates derived from session fixtures and referential-integrity checks.
- CSS custom properties as the single token source; no duplicated hex values across CSS/Tailwind/TS.
- Camera demo state is local mock state only; no media APIs.
- Test tooling and viewport matrix agreed before Task 5 (Vitest/RTL for logic, Playwright for routes/responsive smoke checks subject to approval).
- SPA route changes set `document.title`, move focus to the main heading, and announce politely.
- Demo-data labeling: persistent global banner, per-screen "Sample data" chips, "Simulated — no pose detection" camera badge, and a reset control.

## 7. Token corrections required before implementation

From OpenCode's computed audit (`OPENCODE_INSPECTION.md` §6.1):

| Problem | Required correction |
|---|---|
| `color.border #DCE2DA` is 1.23:1 on canvas, 1.32:1 on surface | Add `color.border-strong` at ≥3:1 for control boundaries; keep `border` for decorative dividers only. |
| Yoga `#6D8063` text is 3.98:1 on canvas / 4.27:1 on white; Combined `#66758A` is 4.37:1 on canvas | Add darker `color.yoga-text` / `color.combined-text` (and ideally `strength-text`) at ≥4.5:1, or use main text beside a non-text category marker. |
| Focus `#1D6FD6` is 1.61:1 on primary and ~1.0–1.1:1 on category markers | Use a two-tone focus ring (white inner + blue outer) or surface-aware ring; verify per component. |
| 12 px metadata conflicts with "avoid tiny text" | Restrict 12 px to short non-essential tags; interactive labels ≥14–16 px. |
| Strength/Combined pass only marginally | Test composited, disabled, and overlay states, not just base swatches. |

## 8. Recommended next wave (after owner answers P0 items 1–7)

1. **Foundation worker (single writer):** initialize Git baseline, scaffold React + Vite + TypeScript, implement the token layer with corrected contrast values, app shell and responsive navigation, route table, 404/error boundary, demo-data banner, typed mock-data skeleton, and test/build scripts.
2. **Coordinator review gate:** verify scaffold, route table, tokens, and build/test evidence before any screen worker starts.
3. **Parallel screen waves with disjoint ownership:** (a) entry/auth/onboarding, (b) Home/libraries/plans, (c) detail/player/completion, (d) camera demo/manual path, (e) progress/profile/help/legal. No two workers edit the same file; the coordinator owns shared components and routing.
4. **Independent review wave:** OpenCode reviews routes, responsive behavior, states, accessibility, copy/claims, console, and build/test results against the spec.
5. **Product-owner walkthrough:** screen by screen, then final approval.

## 9. Artifacts and open decisions

- Repository baseline: `docs/reviews/CODEX_INSPECTION.md`
- Implementation-risk and decision backlog: `docs/reviews/OPENCODE_INSPECTION.md`
- Updated planning set: `docs/UI_SCREEN_INVENTORY.md`, `docs/UI_OPEN_QUESTIONS.md`, `docs/UI_DESIGN_DECISIONS.md`, `docs/UI_IMPLEMENTATION_PLAN.md`
- Blocking decisions: `docs/UI_OPEN_QUESTIONS.md` P0 gate (Q1–Q6, Q13, Q15–Q20, Q24, Q26–Q30, Q33)
- No code, dependency, or configuration was created by this wave.
