# OpenCode Independent Inspection — daY²oga UI Phase

**Reviewer role:** OpenCode (independent read-only reviewer, spec Task 1/Task 5)
**Date:** 30 October 2026
**Target:** `/home/seechan1/Downloads/yoga` (current worktree)
**Sources of truth:** `DAYOGA_UI_UX_REACT_VITE_SPEC.md`, `docs/UI_SCREEN_INVENTORY.md`, `docs/UI_OPEN_QUESTIONS.md`, `docs/UI_DESIGN_DECISIONS.md`, `docs/UI_IMPLEMENTATION_PLAN.md`, plus `Estimated cost structure.txt` as business context
**Change produced by this review:** this file only (`docs/reviews/OPENCODE_INSPECTION.md`)

This review was performed without reading any other reviewer's draft. No existing file was edited, no package was installed, no app was scaffolded, and no file-generating command other than the creation of this report was run. All file references below use `path:line` or `path:start-end`; line numbers refer to the files as inspected on the date above.

---

## Method and commands run

Read-only inspection only. The working directory is not a Git repository, so no diff/commit history was available; findings are based on the current tree and the documents listed above.

Commands executed, in order:

```sh
ls -la
find . -maxdepth 2 -not -path './node_modules*' -not -path './.git*' | head -100
git rev-parse --is-inside-work-tree
git status --short
ls -lad .git .github .gitignore
find . -type f | sort
find . -type f | sed 's/.*\.//' | sort | uniq -c
wc -l *.md docs/*.md *.txt
node --version
npm --version
npx --version
file *.md docs/*.md "Estimated cost structure.txt"
for p in package.json package-lock.json pnpm-lock.yaml yarn.lock tsconfig.json \
         vite.config.ts vite.config.js index.html src public tailwind.config.js \
         postcss.config.js .gitignore .nvmrc README.md; do
  if [ -e "$p" ]; then echo "PRESENT $p"; else echo "ABSENT  $p"; fi
done
grep -RnoE '`[^`]+\.(md|tsx?|json|css|html|js)`|docs/[A-Za-z0-9_./-]+' --include='*.md' .
grep -nE '^#{1,3} ' DAYOGA_UI_UX_REACT_VITE_SPEC.md docs/*.md
grep -ril --include='*.md' -- '404' 'Help and support' 'Terms' 'localStorage' \
  'Vitest' 'Playwright' 'state machine' 'dark mode' 'i18n' 'safe-area' 'dvh' \
  'aria-live' 'focus-visible' 'error boundary'
```

Contrast ratios were calculated with an inline Node script (no packages, no files written) in `/tmp/opencode`, implementing WCAG 2.x relative luminance:

```sh
node -e '
const h=s=>s.replace("#","").match(/../g).map(x=>parseInt(x,16)/255);
const l=c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;
const L=s=>{const [r,g,b]=h(s).map(l);return .2126*r+.7152*g+.0722*b};
const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05)};
/* pairs from docs/UI_DESIGN_DECISIONS.md:15-29 were evaluated here */
'
```

Key inspection results:

- `git rev-parse --is-inside-work-tree` → `fatal: not a git repository (or any of the parent directories): .git`. There is no `.git`, `.gitignore`, or `.github` entry.
- All of `package.json`, lockfiles, `tsconfig.json`, `vite.config.*`, `index.html`, `src/`, `public/`, `tailwind.config.js`, `postcss.config.js`, `.nvmrc`, and `README.md` are **absent**.
- The tree contains only Markdown planning/design documents and one plain-text cost note: 7 files at inspection time, no `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.html`, `.json`, image, or font files.
- Available toolchain: `node v26.12.1`, `npm 12.2.1`, `npx 12.2.1`. No project pins these versions.
- All Markdown documents are UTF-8, LF-only, no BOM; `Estimated cost structure.txt` is ASCII/LF.
- Document sizes: spec 700 lines, inventory 60, open questions 49, design decisions 64, implementation plan 83, cost note 17.

---

## 1. Existing UI patterns, or absence of them

**There is no existing UI code and no existing UI pattern to extend.** This is a documentation-only checkout.

| Path | Kind | Lines | What it contributes |
|---|---|---:|---|
| `DAYOGA_UI_UX_REACT_VITE_SPEC.md` | Product/UI brief | 700 | Requirements, screen list, DoD |
| `docs/UI_SCREEN_INVENTORY.md` | Planning draft | 60 | 17 proposed screens, flow, states |
| `docs/UI_OPEN_QUESTIONS.md` | Decision log | 49 | 25 owner questions |
| `docs/UI_DESIGN_DECISIONS.md` | Proposed design system | 64 | Token table, component rules |
| `docs/UI_IMPLEMENTATION_PLAN.md` | Proposed phases | 83 | Bootstrap/phasing plan |
| `Estimated cost structure.txt` | Business note | 17 | Free/paid component assumptions |

What does **not** exist:

- No `src/`, `app/`, `components/`, `features/`, `layouts/`, `styles/`, or `data/mock/` directory; the structure suggested at `DAYOGA_UI_UX_REACT_VITE_SPEC.md:509-540` is purely aspirational.
- No route configuration, route map, URL scheme, or navigation shell (`UI_SCREEN_INVENTORY.md:9`, `:11-27` describe a flow, not routes).
- No component contracts, variants, props, or examples. `UI_DESIGN_DECISIONS.md:39-46` states component *behavior* in prose only.
- No design-token implementation (CSS custom properties, Tailwind theme, TS constants). `UI_DESIGN_DECISIONS.md:11-37` is a proposal.
- No icon set, logo, photography, illustration, video, or font asset. `UI_OPEN_QUESTIONS.md:32` confirms assets are absent.
- No forms, validation pattern, modal/dialog pattern, toast pattern, empty/loading/error pattern, or focus-management pattern in code.
- No TypeScript config, lint/format config, test config, CI, or Git history.
- No `index.html`, favicon, web manifest, or document metadata; page title/language/theme-color are undefined.

The only "patterns" that exist are documentation conventions:

1. A token table with proposed hex values and intended use (`UI_DESIGN_DECISIONS.md:11-29`) plus type/spacing/radius/elevation rules (`:31-37`).
2. Component rules for buttons, inputs, cards, navigation, workout controls, and the camera demo (`UI_DESIGN_DECISIONS.md:39-46`).
3. A per-screen inventory of purpose, entry point, components, actions, and required states (`UI_SCREEN_INVENTORY.md:31-49`).
4. An ASCII flow diagram (`UI_SCREEN_INVENTORY.md:11-27`).
5. A five-area navigation proposal (Home / Explore / Plans / Progress / Profile; `UI_SCREEN_INVENTORY.md:9`, `DAYOGA_UI_UX_REACT_VITE_SPEC.md:224-238`).

**Consequence:** the "do not overwrite working code" constraint in spec Task 1 (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:164-171`) is trivially satisfied — there is nothing to overwrite. Every implementation decision (scaffold, routing, styling, state, testing, tokens, assets) is still open, and the first implementation commit will establish the patterns that later screens and the Task 5 review must follow. This makes the P0 decisions in §7 genuinely blocking rather than cosmetic.

---

## 2. Screen coverage against the spec

The inventory defines **17 screen rows** (`UI_SCREEN_INVENTORY.md:33-49`) against **14 screen sections** in the spec (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:244-436`). The extra rows come from splitting authentication into three screens and adding a Plan detail screen. That split is reasonable but is an unapproved expansion (see C6 in §5).

### 2.1 Section-by-section coverage

| Spec section | Required screen(s) | Inventory row | Status |
|---|---|---|---|
| 6.1 (`:244-256`) | Welcome / entry | `UI_SCREEN_INVENTORY.md:33` | Covered |
| 6.2 (`:258-268`) | Create account, Log in, Forgot password, verification if approved | `:34-36` | **Partial** — no verification row or route |
| 6.3 (`:270-287`) | Onboarding stepper | `:37` | **Partial** — "why we ask" copy and required/optional/skip policy undefined |
| 6.4 (`:289-302`) | Home dashboard | `:38` | Covered, but error state has no retry/recovery action |
| 6.5 (`:304-317`) | Yoga library | `:39` | Covered; camera-availability badge not required in the card spec |
| 6.6 (`:319-333`) | Strength library | `:40` | Covered |
| 6.7 (`:335-344`) | Combined plans | `:41-42` | Covered, with an added Plan detail screen that needs approval |
| 6.8 (`:346-354`) | Exercise detail | `:43` | Covered |
| 6.9 (`:356-368`) | Workout player | `:44` | Covered |
| 6.10 (`:370-385`) | Camera introduction | `:45` | **Partial** — "Learn about camera privacy" has no destination screen |
| 6.11 (`:387-408`) | Camera practice | `:46` | **Partial** — pause-camera control and permission-denied/busy recovery actions missing |
| 6.12 (`:410-417`) | Workout completion | `:47` | Covered |
| 6.13 (`:419-425`) | Progress | `:48` | Covered |
| 6.14 (`:427-436`) | Profile / settings | `:49` | **Partial** — Help, Terms, Privacy and Safety destinations undefined |

### 2.2 Missing or undefined screens and routes

| ID | Gap | Evidence | Severity | Why it matters |
|---|---|---|---|---|
| G1 | No **Explore hub** screen. Explore is a primary destination, but the flow routes Home directly to Yoga/Strength libraries and never defines what the Explore tab renders. | `UI_SCREEN_INVENTORY.md:9` vs `:11-27`, `:39-40`; `DAYOGA_UI_UX_REACT_VITE_SPEC.md:227` ("Explore / Exercise Library") | High | A primary tab with no screen definition cannot be reviewed or implemented coherently. |
| G2 | No **verification** screen/state. | Spec `:262-264`; inventory only mentions verification as unresolved at `:27` | Medium | Auth flow can dead-end; owner Q4 (`UI_OPEN_QUESTIONS.md:10`) unanswered. |
| G3 | No **camera privacy details** screen. The intro requires a "Learn about camera privacy" button; inventory lists the action but no destination. | Spec `:382`; inventory `:45` | High | Trust-sensitive action with no truthful content page; copy depends on Q19 (`UI_OPEN_QUESTIONS.md:37`). |
| G4 | No **Help/support** or **Terms/Privacy/Safety** content screens. | Spec `:431-432`; inventory `:49` ("legal/safety links") | Medium | Links with no route violate "every visible control has behavior" (spec `:566-578`) and trust requirements (spec `:607-617`). |
| G5 | No **404 / unknown route** screen and no **error boundary**. | Absent from inventory and plan; DoD requires "No broken routes" (spec `:639`) | Medium | A bad URL or runtime error would show a blank page, failing the UI review. |
| G6 | Flow diagram error: "Combined plans" points directly to "Exercise/session detail" and omits the Plan detail screen that the inventory defines. | Inventory `:18-24` vs `:41-42` | Medium | Reviewers and implementers may build the wrong path from the diagram. |
| G7 | No **route/URL map** anywhere (path names, params, guards, redirects). | Spec `:655` requires a routes and navigation map; neither inventory nor plan contains one | High | Task 5 review and deep-link testing need a route contract; SPA refresh behavior depends on it. |
| G8 | No **app shell / responsive navigation** definition: mobile pattern, tab count/labels, desktop pattern, active state. | Decisions `:44` defers mobile pattern; inventory `:9` only proposes five areas | High | The shell is the first thing built and every screen depends on it. |
| G9 | Onboarding **"why information is requested"** explanation and required/optional marking are not in the screen row. | Spec `:285-287`; inventory `:37` | Medium | Privacy/trust requirement for collecting goal/level data. |
| G10 | Camera **recovery actions** are not defined for denied, unavailable, busy, poor-light, and processing-unavailable states. | Spec `:398-401`, `:612`; inventory `:46` lists states only | High | States without an exit path (retry, manual mode, browser settings guidance) strand the user. |
| G11 | Camera practice row omits a **pause camera** control (spec asks for "Pause/stop camera"). | Spec `:395`; inventory `:46` says "stop camera" | Low | Minor requirement drift; pause is meaningful for privacy. |
| G12 | **Account controls** (delete/export mock) are listed but have no destination or mock-state definition. | Spec `:434-436`; inventory `:49` | Medium | Risk of a destructive-looking button that does nothing or implies real deletion. |
| G13 | **Resume after refresh/interruption** is undefined (player lists "interrupted/resumed" but no prompt or storage behavior). | Spec `:365`; inventory `:44`; open Q22 `UI_OPEN_QUESTIONS.md:43` | Medium | Determines whether session state lives in memory or storage. |
| G14 | **Plan "illustrative" disclaimer** placement/wording is undefined beyond a note in the actions column. | Spec `:343-344`; inventory `:42` | Medium | Sample schedules could be read as professional programming. |
| G15 | No **Notification preferences** screen and no decision whether it is in scope. | Inventory `:49` ("optional"); Q8 `UI_OPEN_QUESTIONS.md:17` | Low | Optional scope; must be explicitly in or out before Profile is built. |
| G16 | No screen for **demo reset** / mock-data management, despite seeded progress. | Spec `:557-564`; inventory `:55` | Medium | Without a reset, seeded progress looks like real user history across reloads. |

### 2.3 Underspecified states worth calling out

- **Home** lists loading and error states (`UI_SCREEN_INVENTORY.md:38`) but no retry action, skeleton rule, or "no recommendation" copy.
- **Libraries** list filtered/empty/loading/error (`:39-40`) but not "no results for these filters" recovery (clear filters exists) or filter persistence across navigation.
- **Player** lists ready/active/paused/rest/completed/stopped/interrupted (`:44`), but not the transition rules (whether pause stops the timer, whether skip counts as completed, what "previous" does at the first exercise).
- **Camera practice** lists all ten spec states (`:46` matches spec `:398-401`), but only two actions (stop, switch to manual); no simulate-state control is described for reviewers to reach each state.
- **Completion** distinguishes completed/stopped early (`:47`), but no rule for partially completed exercise counts.
- **Progress** has empty and populated states (`:48`), but no "mock data" visual treatment beyond the general note.

---

## 3. Technical risks for a React + Vite + TypeScript frontend-only build

| ID | Risk | Evidence / current state | Severity | Recommended mitigation |
|---|---|---|---|---|
| T1 | **No version control.** No `.git`, no baseline commit, no diffable history. Two agents editing the same tree cannot be reconciled or rolled back safely. | `git rev-parse` fails; `ls -la` shows no `.git`. `UI_IMPLEMENTATION_PLAN.md:7` still says a "visible `.git` entry" exists — no longer true. | **Blocker for coordination** | Coordinator/product owner authorizes `git init`, `.gitignore` (`node_modules`, `dist`, `.env*`), and an initial commit/tag of the planning baseline before scaffolding. Do not let two agents write the same files without a snapshot. |
| T2 | **No application scaffold or package metadata.** Bootstrapping this repository is still an open question. | Q24 `UI_OPEN_QUESTIONS.md:45`; plan `:9`, `:30` | High | Owner approves "create a new app in this directory", package manager, and exact dependency set before any install. |
| T3 | **Unpinned runtime.** Node 26.12.1 / npm 12.2.1 are available but nothing records or constrains them. | `node --version`, `npm --version`; no `.nvmrc`, no `engines` | Medium | Add `.nvmrc`/`.tool-versions` and `package.json#engines`; confirm the chosen Vite/React versions support that Node line. |
| T4 | **Dependency governance.** Tailwind and test tooling are conditional, and "avoid unnecessary dependencies" is a principle rather than a policy. | Spec `:496-507`, `:542-555`; plan `:31`; decisions `:7` | Medium | Approve a minimal list (React, React DOM, Vite, TypeScript, router, test runner) and require justification for anything else. |
| T5 | **TypeScript is optional in the spec** ("if ... it can be introduced safely"), while the plan says "likely TypeScript". | Spec `:500-504`; plan `:30` | Medium | In an empty repo, adopt strict TypeScript now (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`). Retrofitting types later is costly. |
| T6 | **SPA routing/deep links.** No route map and no decision on history vs hash routing. Direct navigation/refresh on a static preview can 404. | Spec `:502-504`, `:655`; no route docs | High | Define the route table first; either use a router with an explicit static-host fallback or a hash strategy for the prototype. Test refresh on every route. |
| T7 | **Workout state model undefined.** Seven player states (`UI_SCREEN_INVENTORY.md:44`) with no transition table invites impossible combinations (paused + completed, rest + stopped). | Spec `:356-368` | High | Model session state as a discriminated union driven by `useReducer`; write the transition table before UI; unit-test transitions. |
| T8 | **Timer correctness.** `setInterval` drift and background-tab throttling will make workout duration/rest timers inaccurate. | Spec `:361-362` | Medium | Compute elapsed time from `performance.now()` timestamps; decide whether pause stops the clock and whether hidden-tab time counts; test tab switching. |
| T9 | **Interruption/resume persistence is undecided** (`localStorage` vs `sessionStorage` vs memory). | Q22 `UI_OPEN_QUESTIONS.md:43`; spec `:365` | Medium | Decide storage, version the schema, and add an explicit "resume demo session?" prompt or state that resume is in-memory only. |
| T10 | **Camera demo may accidentally become real.** A mock that calls `getUserMedia` would trigger a browser permission prompt on load and violate the spec. | Spec `:384-385`, `:110-111`; decisions `:46` | High | Forbid media APIs in the demo; drive all camera states from local mock state. Add a code-review checklist item and a visible "simulated" label. |
| T11 | **Mock-data integrity.** Screens share exercises, sessions, plans, and progress; duplicated fixtures will drift (e.g., plan duration not matching its sessions). | Spec `:557-564`; plan `:33` | Medium | One typed fixture module per entity with IDs; derive plan aggregates from session fixtures; validate referential integrity with a test. |
| T12 | **Seeded progress looks real after reload** if persisted. | Spec `:563-564`; inventory `:55` | Medium | Either keep mock data in memory and reset on reload, or label it persistently and provide "Reset demo data". Decide in Q21/Q22. |
| T13 | **No global error handling.** A runtime error blanks the app; no 404 route. | Not present in any doc; DoD `:639` | Medium | Add a top-level error boundary with recovery, plus a not-found route. |
| T14 | **No testing strategy.** Task 5 requires build/test evidence, but no runner, test scope, or acceptance matrix is chosen. | Spec `:202-210`, `:641`, `:661`; plan `:57` says "any agreed checks" | High | Choose Vitest + Testing Library for logic/state and Playwright for routes/responsive/a11y smoke checks (subject to dependency approval); define the viewport matrix in §4.8. |
| T15 | **Token implementation could duplicate values** across CSS, Tailwind config, and TS constants. | Spec `:552`; decisions `:11-37` | Medium | Make CSS custom properties the single runtime source; map Tailwind/TS to those variables if Tailwind is approved. |
| T16 | **No localization and long-label strategy.** Five tabs plus long translated labels will overflow at 320 px. | Q14 `UI_OPEN_QUESTIONS.md:29`; no i18n reference | Medium | Centralize copy in typed constants/modules now; design nav for the longest expected label and test with pseudo-localized strings. |
| T17 | **Asset/CLS/performance risk.** No images or video; placeholders may later be replaced with large media. | Decisions `:7`; cost note `:11`; no `public/` | Low–Medium | Define fixed aspect-ratio placeholders with reserved space; avoid autoplay; lazy-load any real media; do not commit large files. |
| T18 | **SPA accessibility route management** (title changes, focus reset, announcements) is not mentioned anywhere. | No `aria-live`/focus-management references in any doc | Medium | On route change: set `document.title`, move focus to the `<h1>`/main landmark, announce page change politely. |
| T19 | **Browser/device support matrix is undefined.** | Q23 `UI_OPEN_QUESTIONS.md:44` | Medium | Approve minimum iOS Safari/Android Chrome/desktop versions; test `dvh`, safe-area insets, and `prefers-reduced-motion` support. |
| T20 | **No CI/deploy path**, yet the owner needs a running preview for the screen-by-screen walkthrough. | Spec `:664`; plan `:57` | Low | Document the exact local preview command; optionally add a CI build check after bootstrap. |

---

## 4. Accessibility and responsive-design concerns

### 4.1 Colour and contrast

Token contrast is quantified in §6.1. The accessibility-relevant conclusions are:

- **Control borders fail non-text contrast.** `color.border #DCE2DA` is 1.23:1 on the canvas and 1.32:1 on white; WCAG 2.2 AA 1.4.11 requires 3:1 for essential UI component boundaries. Inputs/buttons that rely on this border will be hard to perceive; a darker `border-strong` token is needed while `border` remains decorative.
- **Category hues cannot carry small text.** `color.yoga #6D8063` is 3.98:1 on the canvas (4.27:1 on white) and `color.combined #66758A` is 4.37:1 on the canvas; both fail the 4.5:1 normal-text threshold. `color.strength #A65F3B` passes at 4.53:1 (canvas) and 4.86:1 (white) but only narrowly. Use separate, darker text tokens for category labels; keep the current hues for non-text accents.
- **The focus ring fails on coloured surfaces.** `color.focus #1D6FD6` is 4.56:1 against the canvas and 4.89:1 against white, but only 1.61:1 against `color.primary` and about 1.0–1.1:1 against the Yoga/Strength/Combined markers. WCAG 2.2 AA 2.4.11 requires a 3:1 change for the focus indicator. A single blue ring is not sufficient for filled primary buttons or category chips; use a two-tone ring (e.g., white inner + blue outer) or a surface-aware ring.
- **Muted text passes** (5.75:1 canvas, 6.17:1 white); primary button text passes (7.86:1); error and warning text pass (5.99:1 and 6.50:1 on canvas).
- `UI_DESIGN_DECISIONS.md:13` and `:52` correctly say to verify contrast, but no verification was recorded until this review. The proposed palette therefore does not yet meet its own stated WCAG 2.2 AA target.

### 4.2 Keyboard and focus

- No document defines skip links, focus order, focus trapping for dialogs, or focus restoration after closing a modal/sheet. These are needed for camera privacy details, end/skip confirmation, and mobile navigation.
- Route changes in a SPA need explicit focus management (move focus to the main heading); otherwise keyboard and screen-reader users stay at the old position.
- The workout player must be fully operable by keyboard (start, pause/resume, next, previous, skip confirmation, stop), with visible focus and no keyboard trap.
- `:focus-visible` is mentioned only in passing (`UI_DESIGN_DECISIONS.md:42`); make "never remove outline without a replacement" an explicit rule.
- Disabled and loading buttons need `aria-disabled`/status handling, not only visual styling (`UI_DESIGN_DECISIONS.md:41`).

### 4.3 Screen readers and dynamic content

- No `aria-live` strategy exists (grep found none). Needed for: workout state changes (active/paused/rest/completed), timer announcements (announce at coarse intervals, not every second), camera status/permission changes, form errors, and save confirmations.
- The demo-data banner should be a static note, not a live region, to avoid repeated announcements.
- Icon-only controls need accessible names; primary navigation needs text labels as well as icons (`UI_DESIGN_DECISIONS.md:37`).
- Workout timers and camera feedback should not rely on colour or animation alone.
- Images/illustrations need meaningful `alt` text; decorative placeholders need empty `alt`/`aria-hidden`. The spec requires text alternatives for meaningful images (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:611`).

### 4.4 Forms

- Account forms must be visibly labelled as prototype/demo behavior and must not send or retain real credentials (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:266-268`, `UI_DESIGN_DECISIONS.md:42`). A realistic password field invites real passwords; prefer clearly disabled/demo-only fields or an explicit "do not enter real details" notice.
- Required-field marking, `aria-required`, `aria-invalid`, `aria-describedby` for helper/error text, and error-summary focus are unspecified.
- Onboarding selection controls must work with keyboard and expose selected state (radio/checkbox semantics, not colour-only cards).
- The "why we ask" explanation is a privacy requirement, not optional copy (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:287`); it is missing from the inventory row.

### 4.5 Touch, layout, and responsive behaviour

- **Navigation at 320 px:** five tabs with labels such as "Progress" and "Profile" leave roughly 64 px per tab before padding; labels will truncate or overflow. Either reduce visible labels (icon + short label), allow horizontal scroll (discouraged for primary nav), or reduce the tab count. This is an owner decision (Q5/Q6).
- **No safe-area handling:** iOS bottom navigation and sticky workout controls need `env(safe-area-inset-bottom)`; not mentioned anywhere.
- **Viewport height:** `100vh` is unreliable on mobile browsers; use `dvh`/`svh` with fallbacks and test landscape phones. Camera preview plus controls must fit short landscape heights.
- **Workout controls** must remain reachable without covering instructions (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:485-486`); a sticky control bar needs reserved bottom padding on the content.
- **Reflow/zoom:** WCAG 1.4.10 (320 CSS px equivalent, no loss of content at 400% zoom) and 1.4.12 (text spacing) are not addressed. Five-tab nav and wide cards are the likely failure points.
- **Home dashboard density:** eight proposed sections (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:293-296`) on a 320 px viewport risks a long, competing-CTA page, which the spec explicitly warns against (`:298-299`).
- **Touch targets:** the proposal is 44×44 px "where practical" (`UI_DESIGN_DECISIONS.md:41`). WCAG 2.2 AA requires at least 24×24 px with exceptions; 44 px is better, but "where practical" should not become an escape hatch for icon buttons.
- **No layout max-width or grid definition** for tablet/desktop; long-form exercise instructions need a readable measure (roughly 45–75 characters) and a defined content column.
- **Reduced motion** is required (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:486`, `UI_DESIGN_DECISIONS.md:54`) but no motion tokens/animations are defined; ensure any progress rings, transitions, or camera overlays honour `prefers-reduced-motion`.

### 4.6 Recommended responsive verification matrix

At minimum, verify these widths in both portrait and landscape where relevant, with no horizontal scrollbar and all controls reachable:

| Width | Represents | Priority screens |
|---:|---|---|
| 320 px | Small Android / reflow target | Welcome, Home, libraries, player controls, 5-tab nav |
| 360–390 px | Common Android/iPhone | Onboarding, detail, camera, completion |
| 768 px | Tablet portrait | Libraries grid, plan detail, player |
| 1024 px | Tablet landscape / small laptop | Navigation pattern switch, Home, Progress |
| 1280–1440 px | Desktop | Content max-width, Profile/settings |

Also check: 200%/400% zoom, long/pseudo-localized labels, reduced motion, keyboard-only traversal, and a 360×640 landscape-height player.

---

## 5. Conflicts and gaps between repository, planning docs, and spec

| ID | Conflict / gap | References | Impact |
|---|---|---|---|
| C1 | Plan says a "visible `.git` entry" exists but is unusable; the tree now has **no** `.git` at all. | `UI_IMPLEMENTATION_PLAN.md:7` vs `ls -la` / `git rev-parse` | Misleads reviewers about version-control availability; coordination risk (T1). |
| C2 | Inventory's baseline note says the checkout "currently contains only the product brief and `Estimated cost structure.txt`", but `docs/` and the planning files now exist. | `UI_SCREEN_INVENTORY.md:5` | Stale inspection statement; harmless but should be timestamped/updated. |
| C3 | Plan states the independent Codex/OpenCode reviews "have not run" and Orca is unreachable. This OpenCode review is now running under Orca dispatch, so that status is stale for OpenCode. | `UI_IMPLEMENTATION_PLAN.md:11-13`; `UI_OPEN_QUESTIONS.md:49` (Q25) | Coordinator must reconcile status; do not treat Q25 as still blocking the OpenCode half. Codex status is outside this review. |
| C4 | Spec says record open questions in `OPEN_QUESTIONS.md`; the actual file is `docs/UI_OPEN_QUESTIONS.md`. | Spec `:115` vs `:175`, `UI_OPEN_QUESTIONS.md:1` | Traceability/naming drift only. |
| C5 | Navigation naming drifts: "Explore / Exercise Library" in the spec, "Explore" in the inventory, with Yoga and Strength as separate libraries. | Spec `:227` vs inventory `:9`, `:39-40` | Unclear whether Explore is a hub, a combined library, or just a label for the two library tabs (G1). |
| C6 | Inventory adds a **Plan detail** screen not specified as a separate screen (spec describes plan details inside 6.7). | Spec `:335-344`; inventory `:42` | Reasonable expansion, but it increases scope and needs approval. |
| C7 | Spec includes a verification state if the auth flow requires it; inventory has no verification row. | Spec `:262-264`; inventory `:27`, `:34-36` | Auth flow may be incomplete (G2). |
| C8 | Profile row mentions help/legal/safety links, but no destination screens are defined. | Spec `:431-432`; inventory `:49` | Dead links or unspecified modals (G4). |
| C9 | Design decisions claim a WCAG 2.2 AA target, but proposed tokens fail 1.4.11 (borders) and have focus-ring/category-text failures. | `UI_DESIGN_DECISIONS.md:52` vs `:21`, `:24-27`; §6.1 below | Internal inconsistency in the design system; must be fixed before token implementation. |
| C10 | Spec makes TypeScript optional/conditional; plan says "likely TypeScript". | Spec `:500-504`; plan `:30` | Ambiguity delays the scaffold decision (T5). |
| C11 | Tailwind is allowed only "if already configured or approved", while the plan defaults to avoiding it. Neither is a decision. | Spec `:502`; plan `:31`; decisions `:7` | Styling architecture unresolved; affects token implementation (T15). |
| C12 | The cost note lists Go, PostgreSQL, MediaPipe, and video production as free/feasible, while the spec explicitly excludes backend, database, real MediaPipe, and video upload/recording from this phase. | Cost note `:5-11`; spec `:582-603`, especially `:592-593` | Scope creep risk: "MediaPipe is free" and "videos are free if you create them" understate integration and content-production effort. |
| C13 | Camera intro must state the "intended local-processing approach, once verified" and actual storage/transmission, but there is no implementation and no verified answer yet. | Spec `:376-379`; Q19 `UI_OPEN_QUESTIONS.md:37`; plan `:46` | Copy cannot be truthful yet; needs approved placeholder wording or omission, not invented facts. |
| C14 | Onboarding must explain why information is requested; the inventory's component/state list omits that explanation. | Spec `:287`; inventory `:37` | Privacy/trust gap (G9). |
| C15 | A visible demo indicator is required, but no component, placement, wording, or persistence rule is defined. | Spec `:563-564`; inventory `:55`; decisions `:42` | Inconsistent labelling across 17 screens; mock data can look real (T12). |
| C16 | Task 5/§13 require a route/navigation map and build/test evidence; no route map or test tooling exists. | Spec `:655`, `:661`; plan `:57` | Review cannot verify "no broken routes" against a contract (G7, T14). |
| C17 | Spec headings call the feature "AI-assisted posture guidance" / "AI camera guidance", while the body forbids claiming real AI detection and requires "UI demonstration only". | Spec `:42-44`, `:370-408`; decisions `:46` | Naming itself implies capability; UI labels need careful wording (§6.2). |
| C18 | Cost note implies local camera processing is free/available, but processing location is unverified. | Cost note `:8-9`; Q19 `UI_OPEN_QUESTIONS.md:37` | Privacy copy could overpromise local processing. |
| C19 | Inventory says exercise content requires qualified review, but the plan schedules content implementation in Phase 3 without naming a reviewer or blocking gate. | Inventory `:56`; plan `:41-46` | Unreviewed safety/instruction content may ship as authoritative. |
| C20 | Inventory/plan describe mock loading/error states, but no app-level error/404/offline strategy exists. | Inventory `:38-49`; spec `:639` | Global failure modes are unowned. |
| C21 | The spec says "Do not create two separate applications" and "Yoga and Strength should be visible as distinct categories within the same application"; all planning docs comply, but no shell/route structure yet proves it. | Spec `:48-49`, `:232-235`; inventory `:9` | Architectural intent is consistent; implementation must keep one shell and shared navigation. |

---

## 6. Design-token and copy risks

### 6.1 Contrast audit of the proposed tokens

Computed from the values at `UI_DESIGN_DECISIONS.md:15-29` using WCAG 2.x relative luminance. Thresholds: **4.5:1** normal text, **3:1** large text/UI boundaries/focus appearance.

| Pairing | Ratio | Verdict |
|---|---:|---|
| `text #202823` on `canvas #F8F7F2` | 14.09:1 | Pass |
| `text #202823` on `surface #FFFFFF` | 15.12:1 | Pass |
| `text-muted #59645D` on canvas | 5.75:1 | Pass |
| `text-muted #59645D` on surface | 6.17:1 | Pass |
| White on `primary #285B45` | 7.86:1 | Pass |
| White on `primary-hover #204A38` | 10.01:1 | Pass |
| `border #DCE2DA` on canvas | **1.23:1** | **Fail 1.4.11 (needs 3:1)** |
| `border #DCE2DA` on surface | **1.32:1** | **Fail 1.4.11** |
| `yoga #6D8063` text on canvas | **3.98:1** | **Fail normal text (4.5:1)** |
| `yoga #6D8063` text on surface | **4.27:1** | **Fail normal text** |
| White text on `yoga #6D8063` | **4.27:1** | **Fail normal text** |
| `strength #A65F3B` text on canvas | 4.53:1 | Pass (marginal) |
| `strength #A65F3B` text on surface | 4.86:1 | Pass |
| White on `strength #A65F3B` | 4.69:1 | Pass (marginal) |
| `combined #66758A` text on canvas | **4.37:1** | **Fail normal text** |
| `combined #66758A` text on surface | 4.69:1 | Pass (marginal) |
| White on `combined #66758A` | 4.69:1 | Pass (marginal) |
| `focus #1D6FD6` on canvas | 4.56:1 | Pass |
| `focus #1D6FD6` on surface | 4.89:1 | Pass |
| `focus` on `primary #285B45` | **1.61:1** | **Fail 2.4.11 focus appearance** |
| `focus` on `yoga #6D8063` | **1.14:1** | **Fail** |
| `focus` on `strength #A65F3B` | **1.01:1** | **Fail** |
| `focus` on `combined #66758A` | **1.04:1** | **Fail** |
| `error #A33D32` text on canvas | 5.99:1 | Pass |
| `warning #76530B` text on canvas | 6.50:1 | Pass |
| White on `error #A33D32` | 6.42:1 | Pass |

Implications:

1. **Do not use `color.border` for input/control boundaries.** Add a `color.border-strong` (≥3:1 against both canvas and surface) and reserve the current border for decorative dividers. This affects every form in onboarding, profile, and auth.
2. **Do not use Yoga/Combined hues for text.** Add `color.yoga-text`, `color.combined-text` (and ideally `color.strength-text` for consistency) with ≥4.5:1, or use the main text token next to a coloured non-text marker. `UI_DESIGN_DECISIONS.md:24-26` already says these markers are "not sole label", but implementation must also not use them as label text.
3. **Focus rings need a two-tone/offset treatment.** A single `#1D6FD6` ring is acceptable on canvas/surface but invisible on primary and category surfaces. Specify a white inner ring plus blue outer ring (or a dark ring on light surfaces and light ring on dark), and verify per component.
4. **12 px metadata** (`UI_DESIGN_DECISIONS.md:33`) is not a WCAG failure by itself, but it conflicts with the spec's "avoid tiny text" direction (`:467-468`). Restrict 12 px to short, non-essential tags; keep interactive labels and body copy at ≥14–16 px, and ensure 4.5:1.
5. **`strength`/`combined` pass only marginally** (4.53–4.86:1). Any opacity, disabled state, or overlay on these colours can drop below 4.5:1. Test composited states, not just base swatches.

### 6.2 Copy and claim risks

| ID | Risk | Evidence | Required action |
|---|---|---|---|
| P1 | **Implied real AI.** Labels such as "AI posture guidance", "AI camera", "detecting", "analysing" imply working pose estimation. | Spec `:42-44`, `:389-390`; decisions `:46`; inventory `:46` | Use "Camera guidance (demo)" / "Simulated camera check". Show a persistent "No pose detection in this prototype" note on the camera intro and practice screens. Avoid "AI" in the primary CTA unless qualified. |
| P2 | **Fabricated confidence/quality feedback.** Scores, percentages, "good form", "correct posture", "rep counted accurately" are prohibited. | Spec `:403-408` | Whitelist only conservative messages like the four examples in `:403-405`; ban numeric confidence, grades, and success claims. Add copy review to the Task 5 checklist. |
| P3 | **Medical/injury-prevention claims.** "Prevents injury", "fixes posture", "safe for everyone", "rehab", "pain relief" would violate the product principles. | Spec `:60-62`, `:254`, `:616-617` | Adopt a banned-claims list; use neutral safety copy ("Stop if you feel pain or discomfort", "This is general guidance, not medical advice"). |
| P4 | **Unreviewed exercise instruction presented as authoritative.** "Common mistakes" and "Safety note" are agent-written content with no named reviewer. | Spec `:346-354`; inventory `:56`; Q15 `UI_OPEN_QUESTIONS.md:29` | Mark detail content "Illustrative — pending professional review" until Q15 is resolved, or restrict to a small reviewed set. |
| P5 | **Calorie/weight-loss/transformation claims.** Completion must avoid calories; principles ban transformation promises. | Spec `:416-417`, `:61-62` | Omit calories/weight/body metrics entirely; ban before/after and "burn" language. |
| P6 | **"Free" promise.** The product goal is free, but the cost note shows paid domain/hosting/email/backups. | Spec `:93`; cost note `:12-17` | Do not put "free forever"/"no cost" in UI copy until the business model is approved. |
| P7 | **Mock data presented as real history.** Seeded progress, streaks, or a user name can be mistaken for the visitor's data. | Spec `:563-564`, `:424-425`; inventory `:55` | Persistent "Demo prototype — sample data" banner, per-screen "Sample data" chip, neutral labels ("Sample user"), and a reset action. |
| P8 | **Shame/streak pressure.** Empty states and missed-day messaging can become coercive. | Spec `:61-62`, `:614` | Neutral empty-state copy ("Your completed sessions will appear here"); no guilt, streak loss, or red alert styling for inactivity. |
| P9 | **Permission recovery copy missing.** Denied/busy/unavailable states need a way forward. | Spec `:398-401`, `:612`; inventory `:46` | Define copy and actions: retry, browser-settings guidance, "Continue without camera", manual instructions. Never imply the user must grant access. |
| P10 | **Brand glyph `²` accessibility.** "daY²oga" may be read as "daY squared oga" or skipped; superscript rendering varies by font. | Spec title line `1`; all doc titles | Give the logo an `aria-label`/visually hidden "daYoga" (or approved pronunciation), use a real text node, and ensure a glyph fallback. Do not rely on the superscript for meaning. |
| P11 | **Prototype account forms invite real credentials.** | Spec `:266-268`; decisions `:42` | Label "Demo only — do not enter real details", avoid sending/storing values, and consider non-password demo inputs. |
| P12 | **Camera privacy facts are not yet knowable.** Stating "processed on your device" before verification would be false. | Spec `:376-379`; Q19 `UI_OPEN_QUESTIONS.md:37` | Use approved neutral placeholder ("Privacy details will be confirmed before camera use") or omit the claim; do not invent local-processing/storage facts. |

### 6.3 Demo-data labelling recommendation

The spec requires a visible demo indicator "where sample data could be mistaken for real user data" (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:563-564`), but no pattern is defined. A consistent, low-risk pattern:

- **Global:** a slim, persistent top banner: "Demo prototype — all content and progress are sample data." Not dismissible, not colour-only, not an `aria-live` region. Account for its height in sticky headers and 320 px layouts.
- **Per screen:** a small "Sample data" chip near seeded metrics (Home progress, Progress, completion summary, plan schedule).
- **Profile:** a "Reset demo data" control with confirmation, so reviewers can return to empty states.
- **Camera:** a dedicated "Simulated — no pose detection" badge inside the preview and in the intro, separate from the demo-data banner.
- **Wording:** avoid first-person claims ("You completed 12 workouts"); prefer "Sample: 12 workouts completed".

---

## 7. Prioritized owner decisions before implementation

Priority key: **P0** blocks scaffolding or any screen work; **P1** blocks a specific screen/phase but not the foundation; **P2** can be deferred with a recorded default.

| # | Priority | Decision needed | Why it blocks / what it unblocks | References |
|---|---|---|---|---|
| 1 | **P0** | Authorize bootstrapping a **new React + Vite + TypeScript app in this repository**, and approve package manager, lockfile policy, Node LTS pin, and `git init` + baseline commit/tag + `.gitignore`. | Without this, there is no safe place to write code and no rollback path; T1/T2/T3. | Q24 `UI_OPEN_QUESTIONS.md:45`; plan `:9`, `:30` |
| 2 | **P0** | Approve the **primary navigation**: exact labels/count (five or fewer), mobile pattern (bottom tabs vs menu), desktop pattern, and whether **Explore is a hub** or simply the Yoga/Strength libraries. | The shell and every route depend on it; G1/G8, C5. | Q5/Q6 `UI_OPEN_QUESTIONS.md:14-16`; inventory `:9`; spec `:224-238` |
| 3 | **P0** | Approve the **access model**: guest browsing vs sign-in required, which actions need an account, whether auth screens are full mock flows, and whether verification and an age/eligibility gate are in scope. | Determines routes, guards, onboarding entry, and legal copy; G2, §2.2. | Q1–Q4 `UI_OPEN_QUESTIONS.md:7-10`; spec `:258-268` |
| 4 | **P0** | Approve **camera scope and truthfulness**: supported exercise list (or none), simulation-only vs real permission request, verified processing/storage facts or approved placeholder copy, and recovery paths for denied/busy/unavailable. | Blocks camera intro/practice screens and all privacy copy; G3/G10, T10, C13/C18. | Q18–Q20 `UI_OPEN_QUESTIONS.md:36-38`; spec `:370-408`, `:612` |
| 5 | **P0** | Approve **content and assets**: initial catalogue scope, no-equipment vs basic equipment, who authors and professionally reviews instructions/safety/modifications, and whether neutral media placeholders are acceptable. | Detail/plan/player content cannot be written truthfully or safely without it; G14, P4, C12/C19. | Q15–Q17 `UI_OPEN_QUESTIONS.md:29-32`; spec `:343-344`, `:556-564` |
| 6 | **P0** | Approve **brand direction and corrected tokens**: warm-neutral/botanical palette, typography (including the `²` brand glyph), and revised border/category-text/focus tokens that meet the stated WCAG 2.2 AA target. | Tokens are the first implementation artifact; current proposals fail contrast (C9, §6.1). | Q13 `UI_OPEN_QUESTIONS.md:28`; decisions `:11-37`, `:52` |
| 7 | **P0** | Approve the **route/URL map and refresh strategy** (paths, params, guards, redirects, history vs hash/static fallback). | Needed before routing code and for the Task 5 "no broken routes" check; G7, T6. | Spec `:655`; inventory `:11-27` |
| 8 | **P1** | Approve **onboarding fields**: required vs optional vs skippable, goal and duration choices, equipment question, and the "why we ask" copy. | Blocks onboarding validation and copy; G9, C14. | Q10–Q12 `UI_OPEN_QUESTIONS.md:22-24`; spec `:270-287` |
| 9 | **P1** | Approve **workout session semantics**: whether pause stops the timer, whether skip counts as completed, previous-at-first behavior, early-stop summary, and refresh/interruption/resume. | Blocks the player state machine and tests; T7/T8/T9, G13. | Spec `:356-368`; Q22 `UI_OPEN_QUESTIONS.md:43` |
| 10 | **P1** | Approve **mock-data persistence and labelling**: memory vs `localStorage`/`sessionStorage`, reset behavior, banner/chip pattern, and whether a sample user name is used. | Blocks Progress/Profile/Home history behavior; T12, G16, P7. | Q21/Q22 `UI_OPEN_QUESTIONS.md:42-43`; spec `:557-564` |
| 11 | **P1** | Approve **test and acceptance tooling**: Vitest/RTL, Playwright, axe (or equivalents), the viewport matrix in §4.6, WCAG 2.2 AA target, and minimum browser versions. | Task 5 requires actual build/test evidence; T14/T19, C16. | Q23 `UI_OPEN_QUESTIONS.md:44`; spec `:202-210`, `:621-643` |
| 12 | **P1** | Decide **notifications scope** (in or out) and, if in, which preferences appear in Profile. | Prevents an orphan settings section; G15. | Q8 `UI_OPEN_QUESTIONS.md:17` |
| 13 | **P1** | Approve **languages/localization** and the long-label strategy for five-tab navigation. | Affects nav labels, layout width, and copy centralization; T16. | Q14 `UI_OPEN_QUESTIONS.md:29`; spec `:124` |
| 14 | **P1** | Assign **content ownership for Help, Terms, Privacy, Safety and camera-privacy pages** (even if placeholder text) and approve their routes. | Blocks trust-sensitive links; G3/G4, C8. | Spec `:382`, `:431-432` |
| 15 | **P2** | Decide whether **dark mode** is explicitly out of scope for this phase. | Avoids token rework later; the spec does not request it. | Decisions `:11-37` |
| 16 | **P2** | Define the **mock account controls** behavior (delete/export): disabled with explanation vs simulated confirmation. | Prevents destructive-looking dead controls; G12. | Spec `:434-436` |
| 17 | **P2** | Approve the **404/error-state design and tone**, plus retry behavior for failed mock loads. | Completes the "no broken routes" DoD; G5, C20. | Spec `:639`; inventory `:38-49` |
| 18 | **P2** | Confirm the **production/media pipeline is out of scope** (video creation, hosting, MediaPipe) and remove the "free if you create them" assumption from UI-phase planning. | Prevents scope creep from the cost note; C12/C18. | Cost note `:8-11`; spec `:582-603` |

**Recommended order:** decisions 1–7 first (they gate the scaffold and the app shell), then 8–11 before building onboarding/player/progress, then 12–14 before Profile and camera copy, and 15–18 as recorded defaults. Until at least 1–7 are answered, the correct state of this repository is "planning complete, implementation not authorized" — which is also what the spec's Phase 0 gate requires (`DAYOGA_UI_UX_REACT_VITE_SPEC.md:671-696`, `UI_IMPLEMENTATION_PLAN.md:21-26`).
