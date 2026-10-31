# daY²oga UI Screen Inventory

**Status:** Planning draft revised 30 October 2026 after independent Codex and OpenCode inspections. Flows, screens, routes, and labels require product-owner approval; nothing here is implemented.
**Source:** `DAYOGA_UI_UX_REACT_VITE_SPEC.md` (repository root).
**Inspection note:** The checkout contains only Markdown planning documents, the spec, and a cost note. There is no `src/`, `package.json`, Vite configuration, route setup, component library, design system, assets, or Git repository. This is a planning baseline, not an implementation. The earlier note that the checkout held only two files is stale.

## Proposed navigation model

One responsive application with five proposed primary areas: **Home**, **Explore**, **Plans**, **Progress**, and **Profile**. Yoga and Strength are distinct Explore categories; combined routines live in Plans. Account entry, onboarding, exercise details, workout playback, camera guidance, and completion are supporting flows. Main navigation labels/count, the Explore-as-hub question, and mobile/desktop patterns are unapproved.

## Screen flow

```text
Welcome ── Get started ──> Create account ──> Onboarding ──> Home
   └────── Log in ───────> Log in ────────────────┘
                              └─ Forgot password (mock only)
                              └─ Verification (only if approved)

Home ──> Explore hub ──> Yoga library ──────┐
     │                └─> Strength library ─┼─> Exercise/session detail ──> Workout player
     ├─> Combined plans ─> Plan detail ─────┘                              ├─> Complete/stop
     └─> Progress / Profile                                                │
                                                                           └─> Camera introduction
                                                                               ├─> Camera privacy details
                                                                               ├─> Mock camera states
                                                                               └─> Manual player
```

Guest browsing, account gating, verification, and whether registration is required before onboarding remain unresolved. A session may end completed or early, then offer Home or Progress. Camera permission is never requested automatically; the prototype only simulates permission and availability states.

## Proposed route map (unapproved)

Paths are a starting contract for the route table and deep-link testing; history vs hash/static fallback still needs approval.

| Route | Screen |
|---|---|
| `/` | Welcome / entry |
| `/signup` | Create account |
| `/login` | Log in |
| `/forgot-password` | Forgot password |
| `/verify` | Verification (conditional on Q4) |
| `/onboarding` | Onboarding stepper |
| `/home` | Home dashboard |
| `/explore` | Explore hub (proposed addition) |
| `/explore/yoga` | Yoga library |
| `/explore/strength` | Strength library |
| `/plans` | Combined plans |
| `/plans/:planId` | Plan detail |
| `/exercises/:exerciseId` | Exercise/session detail |
| `/workout/:sessionId` | Workout player |
| `/workout/:sessionId/complete` | Workout completion |
| `/camera` | Camera guidance introduction |
| `/camera/privacy` | Camera privacy details (proposed addition) |
| `/camera/practice/:exerciseId` | Camera practice (simulated) |
| `/progress` | Progress |
| `/profile` | Profile / settings |
| `/help` | Help and support (proposed addition) |
| `/legal/terms`, `/legal/privacy`, `/safety` | Terms, privacy, safety (proposed additions) |
| `*` | Not found / error recovery (proposed addition) |

## Screen inventory

### Original planning rows

| Screen | Purpose and entry point | Main content/components | Actions | Required states |
|---|---|---|---|---|
| Welcome / entry | Introduce the integrated Yoga + Strength product; app entry | Brand, value proposition, optional activity preview, camera-is-optional note | Get Started, Log In, optional Explore | Default; route to registration/login |
| Create account | Individual-account entry; Welcome | Prototype-labelled form, privacy/demo note | Local validation; continue | Default, validation feedback, mock success; do not collect/send real credentials |
| Log in | Returning-user entry; Welcome | Prototype-labelled form | Local validation, Forgot password | Default, validation feedback, mock success |
| Forgot password | Explain unavailable recovery in a prototype | Informational state/form only if approved | Back; mock confirmation | Default, mock confirmation; no real email/OTP |
| Onboarding: preferences | Collect only approved setup choices after account entry (or guest path if approved) | Stepper; level, goal, time, Yoga/Strength/Both, equipment choices as proposed; "why we ask" explanation; required/optional/skip marking | Back, Continue, approved Skip; local selection | Unselected, selected, validation, step progress |
| Home dashboard | Help choose today's activity; post-onboarding or app return | Greeting, suggested session, Yoga and Strength entry cards, combined plan, continue item, compact progress, discovery link | Start, browse category/plan, continue, view progress | New user, returning user, no recommendation, loading, error with retry; demo data labelled |
| Yoga library | Browse yoga sessions and poses; Explore | Category and filter controls; session/pose cards | Filter by level/duration/focus, open item, clear filters | Default, filtered, no-results recovery, loading, error |
| Strength library | Browse accessible strength sessions; Explore | Bodyweight session/exercise cards; equipment/focus metadata | Filter, open item, clear filters | Default, filtered, no-results recovery, loading, error |
| Combined plans | Find a Yoga + Strength routine; Home/Plans | Illustrative weekly plan cards | View plan, filter if approved | Default, empty, loading, error; sample schedule explicitly illustrative |
| Plan detail | Explain weekly structure before starting; plan card | Title, level, weekly Yoga/Strength sessions, rest days, session length, illustrative disclaimer | Start plan, return | Default; mock plan-started/active state |
| Exercise/session detail | Explain a movement and alternatives; library or plan | Name/category/level, demo placeholder, focus, steps, breathing, timing/reps, common mistakes, modification, safety note, illustrative-content notice | Start workout, back; optional camera entry only for supported content | Default; unavailable media fallback; camera-supported/unsupported distinction |
| Workout player | Guide a mock workout; detail or active plan | Exercise demo, short instructions, session progress, timer or rep counter, controls | Start, pause/resume, next, previous if applicable, skip with confirmation, stop/end | Ready, active, paused, rest, completed, stopped early, interrupted/resumed; transition rules required |
| Camera guidance introduction | Explain optional camera use before any permission request; supported exercise flow | Purpose, consent choice, manual alternative, privacy/storage/local-processing facts only when verified, simulated badge | Enable (mock explicit action), continue manually, privacy details | Default; clear routes to mock camera, manual player, and privacy details |
| Camera practice | Demonstrate UI states only; explicit choice from intro | Clearly labelled demo preview, exercise reference, framing copy, feedback area, camera on/off, pause/stop, manual instructions | Simulate permission/status in prototype, pause/stop camera, switch to manual, recover from denied/busy/unavailable | Before permission, granted (simulated), denied, unavailable, busy, body not visible, poor light/uncertain, processing unavailable, stopped, manual |
| Workout completion | Summarize the session neutrally; player ends | Completed/stopped-early status, exercises done, duration, neutral encouragement | Save/finish (local), Home, Progress | Completed; stopped early; demo data shown; no calories |
| Progress | Show consistency and activity; navigation/completion | Completed sessions, weekly consistency, minutes, plan progress, recent sessions, demo reset | Open recent session if supported, navigate | New-user empty; populated demo summary; loading/error |
| Profile / settings | Review preferences and product information; navigation | Profile/preferences, goals, optional notification settings, camera/privacy, account controls, help, legal/safety links | Edit local preferences, open info, mock account controls | Default; unsaved/saved local state; explicitly mock unsupported controls |

### Proposed additions from the independent review (not approved)

| Screen | Purpose and entry point | Main content/components | Actions | Required states |
|---|---|---|---|---|
| Explore hub | Give the Explore tab a defined landing screen; Home/Explore | Yoga and Strength entry cards, optional combined entry, beginner shortcuts | Open Yoga/Strength, filter | Default, loading, error |
| Verification | Complete the auth flow only if Q4 approves it; after Create account | Mock verification status/instructions | Continue, resend (mock), back | Pending, verified, unavailable |
| Camera privacy details | Destination for "Learn about camera privacy"; Camera intro | Plain-language explanation of what is and is not implemented; processing/storage facts only when verified | Back, continue manually | Default; pending-facts placeholder |
| Help and support | Trust and support destination; Profile | FAQ, contact placeholder, safety guidance | Open sections, back | Default |
| Terms, privacy, safety | Legal/safety information; Profile | Clearly labelled placeholder or approved copy | Back | Default; placeholder-labelled |
| Not found / error recovery | Handle unknown routes and runtime errors | 404 message, recovery links, error boundary fallback | Go Home, retry | 404, runtime error, offline/unavailable |
| Demo data management | Prevent seeded data reading as real history; Profile | Reset demo data with confirmation | Reset, cancel | Default, confirmation, reset complete |

The **Plan detail** screen remains an approved-scope question: the spec describes plan details inside 6.7 rather than as a separate screen.

## Cross-screen requirements

- Responsive mobile-first layout for phones, tablets, and desktop; no horizontal overflow; keyboard-operable controls; visible focus with a two-tone ring on coloured surfaces; comfortable touch targets; readable contrast; reduced-motion support; safe-area and `dvh` handling for sticky controls.
- Every interactive control has a meaningful frontend behavior; no decorative dead buttons or dead links.
- Loading, empty, error, permission, and fallback states are represented where specified, each with a recovery action.
- Sample content/progress is labelled: persistent global demo banner, per-screen "Sample data" chips, and a reset control. Camera UI carries a separate "Simulated — no pose detection" badge, never fabricated scores or confidence.
- Exercise content and safety guidance require qualified review before being presented as authoritative.
- SPA route changes set the document title, move focus to the main heading, and announce page changes politely.

## Approval gates

Product-owner approval is needed for primary navigation, guest/account flow, onboarding fields, initial content scope, brand direction and corrected tokens, the route map, and whether notifications or verification screens are in scope. Until then these remain proposals, not locked requirements. See `docs/UI_OPEN_QUESTIONS.md` and `docs/reviews/RECONCILIATION.md`.
