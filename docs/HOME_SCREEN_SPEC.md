# daY²oga --- Home Screen Specification

**Screen ID:** HOME-01\
**Status:** Draft for product-owner approval\
**Scope:** React + Vite frontend only; mock data; no backend
integration\
**Date:** 30 October 2026

## 1. Purpose

The Home screen is the user's personalized starting point after
onboarding and sign-in. It should answer: - What workout is recommended
today? - Why is it recommended? - How long will it take? - What is in
the weekly plan? - How can the user continue an unfinished workout? -
How is the user progressing?

## 2. Confirmed product context

-   daY²oga is one integrated home-fitness app.
-   It includes Yoga, body-strength training, and combined plans.
-   Each person has an individual account.
-   The experience is beginner-friendly and home-oriented.
-   Camera-based posture guidance is optional.
-   Current work is frontend/UI only.
-   The selected Home approach is **Personalized Home**.

## 3. Main design decision

A personalized recommendation is the primary focus of Home. The
recommended workout may be Yoga, Strength, or Combined, based on the
user's profile and workout history.

For this frontend phase, use deterministic mock recommendation data. Do
not claim that a real recommendation engine exists.

## 4. Required content hierarchy

Implement these sections in this order. The layout may adapt
responsively but should preserve the hierarchy.

### 4.1 Header

-   Greeting; use a neutral greeting if time-based greeting is not
    implemented.
-   User's first name only when mock profile data exists.
-   Profile entry point.
-   Notification icon only if it has a meaningful destination; otherwise
    omit it.

Do not invent a user's name. Use clearly identified demo data or a
generic greeting.

### 4.2 Today's recommended workout --- primary section

Show: - Workout title. - Type: Yoga, Strength, or Combined. - Difficulty
level. - Estimated duration. - Short explanation based on mock profile
data. - Relevant exercise image/artwork. - Primary action: **Start
Workout**.

Example demo content: - Title: Beginner Full Body Balance - Type: Yoga +
Strength - Level: Beginner - Duration: 20 minutes - Reason: "Suggested
for your general-fitness goal and beginner level."

This is sample content, not a fixed workout. Avoid medical claims or
unsupported promises. The Start Workout action must navigate to a
workout detail/session prototype or perform a meaningful mock
interaction.

### 4.3 Weekly training-plan preview

Show: - Days of the week. - Planned activity or rest day. - Distinction
between Yoga, Strength, Combined, and Rest. - Current day indication if
date handling is available.

Keep this compact. Selecting it should navigate to Plans or a meaningful
plan detail state. Label sample schedules as illustrative until
professionally reviewed.

### 4.4 Continue workout --- conditional

Show only if mock user state contains an unfinished workout or
programme. Include its name, progress, and a Continue action. Omit the
section for new users with no unfinished activity.

### 4.5 Progress summary

Show a small number of meaningful metrics: - Completed workouts. -
Workout minutes. - Weekly consistency or programme progress, if
supported by mock data.

New users must see a zero/empty state, such as "Your progress starts
with your first workout." Demo values must not be presented as real user
data.

Do not show estimated calories, weight-loss claims, body scores, or
medical measurements on Home.

## 5. Personalization inputs

Future recommendation logic may use: - Fitness goal. - Experience
level. - Preference: Yoga, Strength, or Both. - Available workout
duration. - Equipment availability. - Previous completed workouts. -
Weekly schedule and rest days.

For this frontend phase: - Use mock profile and history data. - Keep
recommendation selection logic separate from UI components. - Make it
replaceable by an API later. - Do not implement machine learning or
claim a production recommendation engine.

If onboarding data is missing, show a prompt to complete the relevant
profile setup instead of calling a generic recommendation personalized.

## 6. Bottom navigation

Proposed five-tab navigation: 1. Home 2. Explore 3. Plans 4. Progress 5.
Profile

Home is active. Yoga and Strength are categories inside Explore, not
separate bottom-navigation tabs in this proposal.

**Approval note:** Confirm the five-tab structure with the product owner
before treating it as final.

## 7. Visual direction

Follow the visual language already used in the Splash and Login
screens: - Warm off-white / neutral background. - Deep green text and
accents. - Muted botanical green surfaces. - Calm, minimal wellness
feel. - Rounded cards with restrained borders and shadows. - Clear
typography and generous spacing.

The leaf logo and exact brand palette remain provisional. Do not
introduce an unrelated visual style. Use relevant imagery that matches
the exercise being described.

## 8. Responsive requirements

-   Mobile-first.
-   Support phone, tablet, laptop, and desktop.
-   No horizontal overflow.
-   Keep the primary workout action easy to reach.
-   Reflow cards appropriately on wider screens.
-   Keep navigation usable on small screens.
-   Avoid excessively stretched cards on desktop.

## 9. Required UI states

### New user

-   Greeting.
-   Recommendation based on mock onboarding profile.
-   Weekly plan preview if a plan exists.
-   No Continue Workout section.
-   Empty progress state.

### Active user

-   Today's recommendation.
-   Weekly plan preview.
-   Continue Workout when unfinished work exists.
-   Mock progress values clearly identified as demo data.

### Incomplete profile

-   Explain what information is missing.
-   Provide an action to complete onboarding.
-   Do not label a generic recommendation as personalized.

### No recommendation

-   Provide a helpful fallback to explore Yoga or Strength.
-   Do not leave a blank section.

### Loading and error

-   Use restrained loading and useful fallback/retry states.

## 10. Interactions and navigation

Every visible interactive element must work: - Profile → Profile
screen/route or meaningful placeholder. - Start Workout → workout
detail/session prototype. - Weekly plan → Plans screen/route. - Continue
Workout → resume mock workout state. - Progress summary → Progress
screen/route. - Bottom navigation → corresponding route/view. - Complete
profile prompt → onboarding/profile completion flow.

Omit decorative buttons that do nothing. Omit notification controls if
no destination exists.

## 11. Frontend implementation constraints

-   Inspect the existing React + Vite project before editing.
-   Reuse existing components and styles where appropriate.
-   Keep mock data separate from UI components.
-   Use reusable cards, buttons, and navigation.
-   Avoid one oversized Home component.
-   Do not add backend, database, real authentication, notifications,
    payments, or AI model integration.
-   Do not request camera permission from Home.
-   Do not add camera preview or posture controls to the dashboard.
-   Do not replace existing project configuration without explaining
    why.

Suggested component breakdown (adapt to the repository): - `HomePage` -
`HomeHeader` - `RecommendedWorkoutCard` - `WeeklyPlanPreview` -
`ContinueWorkoutCard` - `ProgressSummary` - `BottomNavigation`

## 12. Acceptance criteria

-   [ ] Personalized recommendation is the primary visual section.
-   [ ] Recommendation type can be Yoga, Strength, or Combined.
-   [ ] Level and duration are clear.
-   [ ] Recommendation reason uses mock profile data and is not
    misleading.
-   [ ] Weekly plan preview is visible and understandable.
-   [ ] Continue Workout appears only when applicable.
-   [ ] New-user progress has a genuine zero/empty state.
-   [ ] Demo statistics are not presented as real-user data.
-   [ ] Navigation and visible actions work.
-   [ ] Layout is responsive on phone, tablet, and desktop.
-   [ ] Splash/Login visual direction is respected.
-   [ ] Home does not request camera permission.
-   [ ] No backend or real AI integration is introduced.
-   [ ] Production build succeeds.
-   [ ] Independent review is completed.
-   [ ] Product owner reviews and approves the running screen.

## 13. Instructions to Orca

Implement **only the Home screen** using this specification.

Before editing: 1. Inspect the repository and current Splash/Login
implementation. 2. Identify routing, styles, components, and mock data.
3. Confirm the Home route and current Login-to-Home transition. 4.
Report missing setup or conflicts before changing files.

Then: 1. Implement Home with mock data. 2. Reuse the existing visual
language. 3. Implement required states and interactions. 4. Test the
production build and responsive layouts. 5. Request independent review.
6. Report files changed, tests actually run, known issues, and provide a
screenshot/preview.

Do not implement the next screen. Wait for product-owner review and
approval of Home before proceeding.

------------------------------------------------------------------------

**End of Home Screen Specification.**
