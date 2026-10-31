# daY²oga --- UI/UX Design & React + Vite Frontend Specification

**Document type:** UI/UX and frontend implementation brief\
**Status:** Initial design brief --- decisions marked "proposed" require
product-owner approval\
**Product:** daY²oga\
**Date:** 30 October 2026\
**Primary audience:** Orca coordinating Codex and OpenCode\
**Implementation scope:** Frontend only. React + Vite. No production
backend in this phase.

------------------------------------------------------------------------

# 1. Purpose of this document

This document tells the Orca multi-agent workflow what to design and
implement for the daY²oga React + Vite application.

The goal is to produce a coherent, responsive, polished frontend
prototype that can be reviewed screen by screen before backend
architecture and implementation begin.

**Important:** This is not a backend specification. Do not build backend
services, database schemas, authentication APIs, cloud AI services,
payment systems, or production integrations in this phase.

Use mock data and local frontend state where needed. Keep the code
structured so real APIs can be integrated later.

------------------------------------------------------------------------

# 2. Product definition

daY²oga is one beginner-friendly home-fitness application combining:

1.  **Yoga** --- flexibility, balance, mobility, breathing, relaxation,
    and yoga foundations.
2.  **Body-strength training** --- bodyweight exercises such as squats,
    modified push-ups, planks, lunges, and core exercises.
3.  **Combined plans** --- weekly routines that include both yoga and
    strength training.
4.  **AI-assisted posture guidance** --- an optional camera-based
    experience that can estimate body posture and provide limited
    exercise-specific feedback.
5.  **Progress tracking** --- completed sessions, workout time,
    consistency, and programme progress.

These are parts of one product, one navigation system, and one user
journey. Do not create two separate applications.

## Product principles

-   Beginner-first and understandable.
-   Designed for home workouts and people who may not own gym equipment.
-   Affordable/free-to-use is the product goal.
-   Individual accounts; no shared household account.
-   Camera guidance is optional.
-   Manual workout instructions must remain available.
-   Privacy and physical safety must be visible in the experience.
-   Do not claim AI can guarantee correct form or prevent injury.
-   Avoid clutter, pressure, shame-based language, or unrealistic
    body-transformation promises.

------------------------------------------------------------------------

# 3. Confirmed decisions vs. proposed design choices

## Confirmed decisions

  -----------------------------------------------------------------------
  Item                                Decision
  ----------------------------------- -----------------------------------
  Product                             daY²oga

  Main training types                 Yoga and body-strength training

  Product structure                   One integrated application

  Account model                       Each person has an individual
                                      account

  Main usage                          Home workouts

  Intended audience                   Beginners are important;
                                      middle-class households are an
                                      important audience

  Camera                              Explore optional camera-based
                                      posture guidance

  Camera access                       Must not be compulsory

  Pricing goal                        Free experience for users

  Current development stage           UI/UX design and frontend only

  Frontend stack                      React + Vite
  -----------------------------------------------------------------------

## Proposed design assumptions --- ask the product owner before treating as final

-   Beginner is the default training level.
-   Visitors may be able to explore selected content before signing in.
-   Initial experience includes Yoga, Strength, and Combined plan entry
    points.
-   A user can select a goal and training level during onboarding.
-   The first UI prototype uses a mobile-first responsive layout.
-   The design can include realistic sample exercise names and mock
    progress data.
-   Initial AI camera screens are UI demonstrations only; no actual pose
    model is required in this phase.

## Open questions

Do not silently decide these. Record them in `OPEN_QUESTIONS.md` and ask
the product owner.

-   Exact age range and eligibility.
-   Guest browsing versus sign-in required.
-   Final onboarding questions and fitness-goal list.
-   Exact bottom navigation labels and number of tabs.
-   Final brand colors, logo, and visual identity.
-   Initial exercise catalogue and professional content review.
-   Languages at launch.
-   Whether the first release is web-only or later packaged as a mobile
    app.
-   Final AI-supported exercise list.
-   Whether notifications are part of the first release.

------------------------------------------------------------------------

# 4. Required agent workflow

Orca coordinates Codex and OpenCode. The agents must share this document
as their UI source of truth.

## Responsibilities

  -----------------------------------------------------------------------
  Role                                Responsibility
  ----------------------------------- -----------------------------------
  Product owner (user)                Makes and approves product
                                      decisions

  Orca                                Coordinates tasks, tracks
                                      dependencies, prevents conflicting
                                      edits

  Codex                               Implements assigned React
                                      components and screens

  OpenCode                            Reviews the implementation against
                                      this specification, identifies
                                      gaps, and handles separately
                                      assigned tasks

  ChatGPT                             Helps clarify requirements, prepare
                                      specifications, and review
                                      flows/design decisions
  -----------------------------------------------------------------------

## Required sequence

### Task 1 --- Inspect the existing project

Before editing: - Inspect the current repository and its folder
structure. - Identify existing React, Vite, TypeScript, and Tailwind
versions/configuration. - Identify existing components, routes, assets,
and styling. - Identify whether a design system already exists. - Do not
overwrite or remove working code without reporting why. - Report the
current state and recommended implementation plan.

### Task 2 --- Create a screen inventory and UI plan

Create: - `docs/UI_SCREEN_INVENTORY.md` - `docs/UI_OPEN_QUESTIONS.md` -
`docs/UI_DESIGN_DECISIONS.md`

List every planned screen, its purpose, entry point, main components,
actions, and states.

Show the screen flow to the product owner before implementing all
screens. Mark assumptions clearly.

### Task 3 --- Establish the visual design system

Propose a coherent design direction for a calm, modern, welcoming
fitness/wellness product.

Define: - Color tokens. - Typography scale. - Spacing scale. - Border
radius. - Shadows/elevation. - Buttons and input styles. - Cards and
navigation. - Icon style. - Responsive breakpoints. - Accessibility and
contrast rules.

Do not use random colors, inconsistent radii, or unrelated component
styles. Use reusable design tokens.

### Task 4 --- Implement the frontend

Implement the approved screens in React + Vite. Use mock data. Keep the
components reusable and the routing/navigation coherent.

### Task 5 --- Independent review

OpenCode reviews: - Every route and screen. - Responsive behavior. -
Consistency with this document. - Empty, loading, error, and permission
states. - Accessibility basics. - Broken navigation and buttons. -
Browser console errors. - Build and test results.

Report issues with screen name, reproduction steps, severity, and
proposed fix.

### Task 6 --- Product-owner review

Show the product owner the application screen by screen. Do not call the
UI final until the product owner approves it.

------------------------------------------------------------------------

# 5. Proposed information architecture

This is a starting proposal for the screen inventory. Final navigation
needs product-owner approval.

## Main application areas

1.  Home
2.  Explore / Exercise Library
3.  Plans
4.  Progress
5.  Profile / Settings

Yoga and Strength should be visible as distinct categories within the
same application.

Combined plans should bring both training types together.

Do not make the navigation overly complicated. The primary action should
be easy to identify.

------------------------------------------------------------------------

# 6. Screen requirements

## 6.1 Welcome / entry screen

Purpose: - Introduce daY²oga. - Communicate the combined Yoga + Strength
proposition. - Let the user begin or sign in.

Possible content: - Brand mark and short value proposition. - Clear
primary action: Get Started. - Secondary action: Log In. - Optional
preview of Yoga and Strength. - Short note that camera guidance is
optional.

Do not claim medical or injury-prevention benefits.

States: - Default. - Navigation to registration. - Navigation to login.

## 6.2 Registration and login

Design individual-account screens.

Potential screens: - Create account. - Log in. - Forgot password. -
Verification state, if the product owner approves the chosen
authentication flow.

Use frontend-only mock interactions. Do not create real authentication
or collect real passwords in a prototype. If input forms are shown,
label the prototype behavior clearly and avoid sending values anywhere.

## 6.3 Onboarding / personal setup

Purpose: Collect only information needed to make the first experience
useful.

Potential steps to propose: - Training experience: Beginner /
Intermediate / Advanced. - Main goal: general fitness, strength,
flexibility, mobility, balance, or relaxation. - Available time: a small
set of session-duration choices. - Workout preference: Yoga / Strength /
Both. - Equipment availability: no equipment / basic equipment.

These are proposed fields, not approved requirements. Do not add medical
questions or sensitive health fields without product-owner approval and
a clear privacy rationale.

Show: - Progress indicator. - Back and Continue actions. - Skip option
where appropriate. - Validation and selected states. - A clear
explanation of why information is requested.

## 6.4 Home dashboard

Purpose: Help the user decide what to do today.

Proposed hierarchy: 1. Greeting. 2. Today's suggested workout or plan.
3. Clear Yoga entry point. 4. Clear Strength entry point. 5. Combined
weekly plan. 6. Continue workout/programme, if one exists. 7. Small
progress summary. 8. Discover exercises or plans.

Do not fill the page with too many cards, statistics, badges, or
competing calls to action.

States: - New user with no workout history. - Returning user with a
current plan. - No recommendation available. - Loading and error states.

## 6.5 Yoga library

Purpose: Browse yoga sessions and individual poses.

Potential filters: - Difficulty. - Duration. - Goal/category.

Potential categories: - Beginner foundations. - Flexibility and
mobility. - Balance. - Gentle yoga. - Breathing and relaxation.

Each card should communicate: - Name. - Level. - Duration. - Main
focus. - Whether camera guidance is available, only if supported.

Do not invent ratings, review counts, instructor credentials, or medical
claims.

## 6.6 Strength library

Purpose: Browse bodyweight and accessible strength sessions.

Potential categories: - Full body. - Upper body. - Lower body. - Core. -
Mobility and warm-up.

Potential beginner exercises: - Squat. - Wall or modified push-up. -
Plank and modified plank. - Supported lunge. - Glute bridge. - Bird-dog.

Each card should communicate: - Exercise/session name. - Difficulty. -
Duration or sets/repetitions. - Equipment requirement. - Main focus.

Show alternatives or modifications in the detail screen where content is
available.

## 6.7 Combined plans

Purpose: Present a coherent routine that includes Yoga and Strength.

Plan details should show: - Plan title. - Intended level. - Weekly
schedule. - Session duration. - Yoga and Strength sessions clearly
distinguished. - Rest/recovery days. - Start plan action.

Do not create unrealistic daily high-intensity schedules. Mark sample
plans as illustrative until reviewed by a qualified professional.

## 6.8 Exercise detail screen

Required content: - Exercise/pose name. - Category and difficulty. -
Demonstration image/video placeholder. - Purpose and target movement
focus. - Step-by-step instructions. - Breathing instructions where
relevant. - Duration, repetitions, sets, or hold time. - Common
mistakes. - Easier modification. - Safety note. - Start workout
action. - Optional AI guidance entry point, only when that exercise is
supported.

## 6.9 Workout session player

Required controls: - Start. - Pause/resume. - Next exercise. - Previous
exercise where appropriate. - Skip with confirmation if needed. -
Stop/end session. - Timer or repetition counter. - Exercise
demonstration and short instructions. - Progress through the current
session.

States: - Ready to begin. - Active. - Paused. - Rest interval. -
Completed. - Stopped early. - App interrupted or resumed.

Do not use sound, vibration, or autoplay video without appropriate user
control.

## 6.10 AI camera guidance introduction

Purpose: Explain the optional camera feature before requesting
permission.

Must communicate: - Why the camera is needed. - That the user chooses
whether to enable it. - That manual practice remains available. - The
intended local-processing approach, once verified. - Whether video is
stored or transmitted, based on the actual implementation. - How to stop
camera use.

Buttons: - Enable camera guidance. - Continue without camera. - Learn
about camera privacy.

Do not show a browser permission prompt immediately on page load.
Request access only after an explicit user action.

## 6.11 AI camera practice screen

For this frontend phase, build the interface and mock states only. Do
not claim that real AI posture detection is implemented.

Potential UI: - Camera preview area or a clearly labelled demo
placeholder. - Exercise name and demonstration reference. - Camera
on/off state. - Framing guidance. - Body visibility state. - Feedback
message area. - Pause/stop camera controls. - Switch to manual
instructions.

Required states: - Before permission. - Permission granted. - Permission
denied. - Camera unavailable. - Camera in use by another application. -
Body not fully visible. - Poor lighting / uncertain detection. - AI
processing unavailable. - Camera stopped. - Manual mode.

Feedback must be conservative. Examples: - "Move back so your full body
is visible." - "We cannot assess your position clearly yet." - "Try
adjusting the camera angle." - "Switch to manual guidance."

Do not show fabricated live confidence percentages, scores, or claims of
correctness.

## 6.12 Workout completion

Show: - Session completed or stopped early. - Exercises completed. -
Workout duration. - A neutral, encouraging message. - Save/finish
action. - Option to return home or view progress.

Avoid calorie estimates unless a defensible method and clear limitations
are established.

## 6.13 Progress

Potential content: - Completed workouts. - Weekly consistency. - Workout
minutes. - Programme progress. - Recent sessions.

Use clear empty states for new users. Do not imply that mock progress is
real.

## 6.14 Profile and settings

Potential sections: - Profile information. - Training preferences. -
Goals. - Notification preferences, if in scope. - Camera/privacy
explanation. - Account controls. - Help and support. - Terms, privacy,
and safety information.

Do not implement real account deletion or data export until backend
support exists. The frontend can show the intended UI with clearly
marked mock behavior.

------------------------------------------------------------------------

# 7. Visual design direction

## Desired feeling

The application should feel: - Calm. - Welcoming. - Modern. -
Trustworthy. - Clear for beginners. - Suitable for everyday home use. -
Fitness-oriented without looking aggressive or intimidating.

## Design exploration

Propose one primary visual direction and, if useful, one alternative.
Present them for approval before building every screen.

Possible starting direction: - Warm neutral backgrounds. - Deep green or
muted botanical accent. - High-contrast readable text. - Clear
photography showing real, accessible home workouts. - Generous
spacing. - Simple icons. - Rounded but not excessively pill-shaped
components. - Strong visual distinction between Yoga, Strength, and
Combined plans.

These are design suggestions, not final brand decisions.

## Avoid

-   Overly dark, intimidating gym aesthetics.
-   Excessive gradients and glassmorphism.
-   Too many colors.
-   Tiny text.
-   Crowded dashboards.
-   Decorative elements that reduce clarity.
-   Unverified claims such as "perfect posture" or "injury-proof."
-   Stock imagery that does not match the exercise being described.

------------------------------------------------------------------------

# 8. Responsive design requirements

The frontend must work on: - Mobile browsers. - Android phone
browsers. - iPhone browsers. - Tablets. - Desktop and laptop browsers.

Design mobile-first.

Requirements: - No horizontal overflow. - Readable typography. -
Comfortable touch targets. - Responsive cards and layouts. - Navigation
appropriate to screen size. - Camera preview sized for the available
viewport. - Workout controls reachable without obscuring key exercise
content. - Respect reduced-motion preferences. - Keyboard-accessible
navigation and controls.

Do not assume every desktop feature is available on mobile, or that
every phone can run pose estimation at the same speed.

------------------------------------------------------------------------

# 9. Frontend implementation requirements

## Stack

-   React.
-   Vite.
-   TypeScript, if the existing project uses it or it can be introduced
    safely.
-   Tailwind CSS, if already configured or approved for setup.
-   React Router or the routing approach already present in the
    repository.

First inspect the existing project. Do not replace configuration
blindly.

## Suggested structure

Adapt this to the repository rather than forcing a rewrite:

``` text
src/
  app/
    App.tsx
    router/
  components/
    common/
    navigation/
    cards/
    forms/
  features/
    onboarding/
    home/
    yoga/
    strength/
    plans/
    workout/
    camera-guidance/
    progress/
    profile/
  data/
    mock/
  hooks/
  layouts/
  styles/
  types/
  utils/
```

## Code quality

-   Use reusable components.
-   Use clear names and consistent file structure.
-   Keep page components separate from reusable UI.
-   Keep mock data separate from presentation.
-   Avoid huge single-file components.
-   Avoid unnecessary dependencies.
-   Use semantic HTML.
-   Provide accessible labels and keyboard interaction.
-   Do not hardcode repeated design tokens throughout the application.
-   Keep console free of errors and warnings where practical.
-   Do not add secrets or API keys.
-   Do not send user input to external services.

## Mock data

Use clearly identified sample data for: - Exercises. - Yoga sessions. -
Strength sessions. - Combined plans. - User profile. - Workout
history. - Progress summaries.

Add a visible development/demo indicator where sample data could be
mistaken for real user data.

## Interactions

Every visible button and interactive control must have a meaningful
frontend behavior.

Examples: - Navigation changes route or view. - Filters change displayed
mock results. - Tabs change selected content. - Start opens the workout
player. - Pause/resume changes session state. - Finish opens the
completion screen. - Camera permission screens show realistic mock
states if no real camera integration is included. - Forms validate
locally and show clear feedback.

Do not create decorative buttons that do nothing.

------------------------------------------------------------------------

# 10. What is explicitly out of scope now

Do not implement these in the current UI phase:

-   Go backend.
-   PostgreSQL database.
-   Real authentication APIs.
-   Real email/OTP delivery.
-   Production user accounts.
-   Cloud AI inference.
-   Real MediaPipe integration unless separately approved as a frontend
    experiment.
-   Video upload or recording.
-   Payment gateway.
-   Subscriptions.
-   Advertisements.
-   Production notifications.
-   Production analytics.
-   Deployment and production infrastructure.

The UI should be designed so these can be added later without rebuilding
the whole application.

------------------------------------------------------------------------

# 11. Accessibility, trust, and safety UI

Include: - Readable contrast. - Clear labels and instructions. -
Keyboard-accessible controls. - Visible focus states. - Text
alternatives for meaningful images. - Reduced-motion support. - Clear
permission-denied recovery. - Manual mode if camera use is
unavailable. - Clear stop/pause actions. - Safety notes on exercise
details. - No shame-based or coercive messaging.

The application must not suggest that AI feedback is medical advice or a
guarantee of safe movement.

------------------------------------------------------------------------

# 12. Definition of done for the UI phase

The UI phase is complete only when all of the following are true:

-   [ ] Existing project was inspected before changes.
-   [ ] Screen inventory is documented.
-   [ ] Open product questions are listed.
-   [ ] Product owner approved the main navigation and user flow.
-   [ ] Design tokens and component styles are consistent.
-   [ ] All approved screens are implemented.
-   [ ] Yoga and Strength are distinct categories inside one app.
-   [ ] Combined plans are represented.
-   [ ] Workout player interactions work with mock data.
-   [ ] Camera permission and fallback states are represented.
-   [ ] No fake claim of real AI detection is shown.
-   [ ] Progress and profile screens have appropriate empty/demo states.
-   [ ] Mobile and desktop layouts are usable.
-   [ ] Buttons and controls work.
-   [ ] No broken routes.
-   [ ] No horizontal overflow at supported viewport sizes.
-   [ ] Build completes successfully.
-   [ ] OpenCode completes an independent UI review.
-   [ ] Product owner reviews and approves the screens.

------------------------------------------------------------------------

# 13. Required final report from Orca

When the assigned UI work is complete, Orca must provide:

1.  Repository structure found before implementation.
2.  Screen inventory created.
3.  Design direction and design tokens.
4.  Screens implemented.
5.  Routes and navigation map.
6.  Components created or reused.
7.  Mock data added.
8.  Interactions implemented.
9.  Responsive viewport checks performed.
10. Accessibility checks performed.
11. Build/test commands and their actual results.
12. Known issues and incomplete work.
13. Open product decisions requiring owner approval.
14. Screenshots or a running preview for product-owner review.

Never report a test as passed unless it was actually run. Never report a
screen as complete if it is only a placeholder.

------------------------------------------------------------------------

# 14. First instruction to Orca

Start with **inspection and planning only**.

Do not begin by generating the entire application or changing many
files.

Ask Codex to inspect the existing React + Vite repository and report its
current structure, dependencies, routes, styling setup, and reusable
components.

Ask OpenCode to independently inspect the same repository and
identify: - Existing UI patterns. - Missing screens. - Technical
risks. - Accessibility and responsive-design concerns. - Conflicts
between the current code and this specification.

Orca should combine the findings into: - `docs/UI_SCREEN_INVENTORY.md` -
`docs/UI_OPEN_QUESTIONS.md` - `docs/UI_DESIGN_DECISIONS.md` -
`docs/UI_IMPLEMENTATION_PLAN.md`

Present the plan and unresolved questions to the product owner. Wait for
approval before implementing the complete UI.

**The product owner has final authority. This document guides the
agents; it does not authorize them to invent or silently finalize
unresolved product decisions.**

------------------------------------------------------------------------

**End of UI/UX and React + Vite frontend specification.**
