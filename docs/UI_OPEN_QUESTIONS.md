# daY²oga UI Open Questions

**Status:** Owner decisions outstanding. Do not silently treat proposed answers as product requirements. The spec's source filename is at the repository root: `DAYOGA_UI_UX_REACT_VITE_SPEC.md`.

**P0 gate before any scaffold:** Q24/Q26 (bootstrap + Git), Q5/Q6/Q29 (navigation), Q1–Q4 (access), Q18–Q20/Q30 (camera scope and copy), Q15–Q17/Q33 (content/assets), Q13/Q28 (brand and corrected tokens), Q27 (route map). Review evidence: `docs/reviews/RECONCILIATION.md`.

## Product and access

1. What age range and eligibility should the experience support? Is the product intended for adults only?
2. Can visitors browse selected content before signing in, or is sign-in required before any use? Which actions require an account?
3. Should the first prototype include create-account, login, and forgot-password screens, or can these be represented as a lightweight mock entry flow?
4. Is email verification part of the intended user journey? The brief asks that it only be included if the auth flow is approved.

## Navigation and scope

5. Approve or revise the proposed five primary areas: Home, Explore, Plans, Progress, Profile. What exact labels and number of tabs should be used?
6. Should Yoga and Strength be tabs/filters within Explore or separate destinations in primary navigation?
7. Are both individual poses/exercises and curated sessions required in the first UI review, or should one be prioritized?
8. Are notifications part of the first frontend prototype? If so, which preferences should appear?
9. Is the first target web-only, with responsive phone layouts, or should the UI anticipate a later packaged mobile app?

## Onboarding and personalization

10. Which onboarding questions are approved: experience level, goal, available time, training preference, and equipment? Which are optional/skippable?
11. What goal choices and session-duration choices should be offered? Should preferences be editable later in Profile?
12. Is Beginner the default level, and should all users see beginner-first recommendations regardless of chosen goal?

## Brand and content

13. What are the approved logo/brand mark, colors, typography, and visual identity? If none exist, approve the proposed warm-neutral and muted-green direction and its token palette in `UI_DESIGN_DECISIONS.md`.
14. Which languages are intended at launch? Should the prototype account for localization/longer translated labels?
15. What exercise/session catalogue should be represented, and who will professionally review instructions, modifications, and safety notes?
16. Should the initial catalogue be strictly no-equipment, or include basic household equipment? Which items are acceptable?
17. Are there approved photography/illustration assets? The checkout has no assets currently.

## Camera guidance and privacy

18. Which exercises, if any, are in the initial AI-supported scope?
19. What is the verified processing location and data behavior (local processing, storage, transmission, retention)? UI copy must wait for this answer; do not imply local processing until verified.
20. Should camera screens in the prototype simulate only status states, or may an explicit user action request real browser camera permission? The brief says UI demonstration only and no actual pose model, so simulation is recommended.

## Prototype behavior and technical setup

21. Should account forms be purely demonstrative and avoid retaining typed values, or may they use local-only mock state? No real passwords should be collected or sent.
22. Should a user be able to refresh an active mock workout and resume it, or is interruption/resume represented only within the current session?
23. Are there existing design references, accessibility targets, or browser/device support requirements beyond those in the brief?
24. No React/Vite project or package metadata is present in this checkout. Should the implementation plan create a new React + Vite + TypeScript app in this repository after approval?

## Review coordination

25. ~~Orca runtime / independent reviews.~~ **Resolved 30 October 2026:** Orca is reachable, and Codex and OpenCode completed independent inspections under run `run_c8e7c1cd3274`. Reports are in `docs/reviews/CODEX_INSPECTION.md` and `docs/reviews/OPENCODE_INSPECTION.md`; the combined result is `docs/reviews/RECONCILIATION.md`.

## Review-derived decisions (added 30 October 2026)

These surfaced from the independent inspections and are not covered by Q1–Q25 unless noted.

26. **Bootstrap and version control (P0).** Authorize a new React + Vite + TypeScript app in this directory, `git init` with `.gitignore`, an initial planning-baseline commit/tag, package manager, lockfile policy, and Node pin. Without this, parallel workers have no safe rollback baseline. (Expands Q24.)

27. **Route map and refresh strategy (P0).** Approve the proposed paths in `UI_SCREEN_INVENTORY.md`, the history vs hash/static-fallback choice, and deep-link/refresh behavior. The Task 5 "no broken routes" check needs this contract.

28. **Corrected design tokens (P0).** Approve the contrast corrections in `UI_DESIGN_DECISIONS.md`: `border-strong` at ≥3:1, darker Yoga/Combined text tokens at ≥4.5:1, and a two-tone focus ring. The current proposal fails its own WCAG 2.2 AA target. (Expands Q13.)

29. **Explore hub (P0 with Q5/Q6).** Is Explore a hub screen, or only a label for the Yoga and Strength libraries? The inventory now proposes a hub screen pending this answer.

30. **Camera recovery and privacy destination (P0 with Q18–Q20).** Approve the recovery actions for denied, unavailable, busy, poor-light, and processing-unavailable states, and the destination/copy for "Learn about camera privacy". No processing or storage claim may be shown until verified.

31. **Demo-data behavior (P1 with Q21/Q22).** Choose memory-only vs `localStorage`/`sessionStorage`, whether a sample user name appears, the global banner and per-screen chip pattern, and whether "Reset demo data" is included.

32. **Test and acceptance tooling (P1 with Q23).** Approve Vitest/RTL for logic and Playwright (or equivalents) for route/responsive smoke checks, the viewport matrix (320, 360–390, 768, 1024, 1280–1440 px; zoom and reduced motion), and minimum browser versions.

33. **Help/legal/safety ownership (P1 with Q15/Q17).** Assign who writes and approves Help, Terms, Privacy, Safety, and camera-privacy copy, or approve clearly labelled placeholders.

34. **Error and 404 behavior (P2).** Approve the not-found and runtime error-boundary design, tone, and retry behavior.

35. **Multi-agent conflict control.** Approve the reconciliation workflow: coordinator owns shared components and routing; screen workers use disjoint file ownership; no two workers edit the same file in one wave.
