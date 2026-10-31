# daY²oga — Onboarding Screen Specification

**Document:** `ONBOARDING_SCREEN_SPEC.md`  
**Product:** daY²oga  
**Status:** Requirements finalized for UI design; visual screens await product-owner review  
**Scope:** React + Vite frontend only, mock data, no backend or real AI integration  
**Date:** 31 October 2026

## 1. Purpose

Onboarding collects the information needed to shape a practical home workout experience for each individual user. It helps daY²oga recommend Yoga, Strength, or Combined workouts; select a suitable starting difficulty; match sessions to available time and equipment; and build a realistic weekly plan with recovery days.

Onboarding is not a medical assessment, diagnosis, or substitute for professional advice.

## 2. Confirmed product decisions

| Decision | Approved requirement |
|---|---|
| Age | Ask for an age range, not exact date of birth |
| Height | Required |
| Current weight | Required |
| Fitness goals | One primary goal plus optional additional goals |
| BMI | Calculate and display for eligible adults |
| Target weight | Do not ask during initial onboarding |
| Account model | Individual account per person |
| Training scope | Yoga and body-strength training in one app |
| Recommendation | Personalized using onboarding information and later workout history |
| Camera | Optional; not part of onboarding |
| Current scope | UI/UX and frontend only |
| Home | Do not build Home as part of this task |

## 3. Data requirements

### 3.1 Age range — required

Suggested single-select choices:
- Under 18
- 18–24
- 25–34
- 35–44
- 45–54
- 55–64
- 65 or older

**Under-18 handling:** Do not show adult BMI categories or adult BMI interpretation. Pediatric BMI requires age- and sex-specific interpretation and appropriate clinical references. For this initial product, show a neutral notice that BMI interpretation is not provided for this age range. Whether under-18 users may create accounts or use personalized recommendations is a product/legal/safeguarding decision that must be resolved before public launch. Do not invent a consent policy in the prototype.

Do not ask for gender merely to calculate adult BMI; standard adult BMI calculation does not require it.

### 3.2 Height — required

- Default unit: centimetres (cm).
- A cm / ft-in switch may be included if it can be implemented clearly.
- Validate numeric input; reject blank, zero, negative, and implausible values.
- Always show the selected unit. Never silently reinterpret units.

### 3.3 Current weight — required

- Default unit: kilograms (kg).
- A kg / lb switch may be included if implemented clearly.
- Validate numeric input; reject blank, zero, negative, and implausible values.
- Do not ask for target weight.

Explain why height and weight are requested: to provide an optional adult BMI screening value and allow users to track their own measurements if they choose. These measurements must not alone determine exercise eligibility or intensity.

### 3.4 BMI calculation and display

For adults only:

`BMI = weight in kilograms / (height in metres × height in metres)`

Example: 170 cm = 1.70 m; 70 kg / (1.70 × 1.70) = 24.2.

Display one decimal place. Adult screening categories:
- Below 18.5: Underweight range
- 18.5–24.9: Healthy-weight range
- 25.0–29.9: Overweight range
- 30.0 or above: Obesity range

Use neutral language and explain:
- BMI is a screening measure, not a diagnosis.
- BMI does not distinguish muscle from fat or describe a person's complete health.
- BMI must not automatically prescribe weight loss, weight gain, or exercise intensity.
- Users with health concerns should consult a qualified professional.

For under-18 users, do not show adult BMI categories or label BMI using adult cut-offs. If measurements are invalid or missing, do not calculate BMI.

### 3.5 Fitness goal — required

Require exactly one primary goal:
1. Weight management
2. Build strength
3. Improve flexibility and mobility
4. Improve balance and coordination
5. General fitness
6. Relaxation and stress management

Allow zero or more optional additional goals from the same list, excluding the primary goal.

“Weight management” is a neutral umbrella goal. Do not infer weight loss from BMI. Do not ask for target weight. Weight gain and weight loss sub-goals may be considered later only after a separate product and safety decision.

### 3.6 Exercise experience — required

Choices:
- Beginner
- Some experience
- Advanced

These are self-reported experience levels, not an assessment of physical ability.

### 3.7 Workout preference — required

Choices:
- Yoga
- Strength
- Both
- Not sure

“Not sure” should lead to an exploratory or balanced beginner-friendly suggestion later. Do not silently treat it as “Both” without documenting that rule.

### 3.8 Session duration — required

Choices: 10, 15, 20, or 30 minutes.

Use this to filter or assemble sessions. Do not promise every workout will finish exactly within the selected time.

### 3.9 Days available per week — optional

Choices: 2, 3, 4, or 5 days. If skipped, use a conservative proposed schedule and allow editing later. Include recovery/rest days; do not default to intense daily training.

### 3.10 Equipment — optional

Choices:
- No equipment
- Chair or wall
- Resistance band
- Light weights

Allow multiple selections. If skipped, default to bodyweight/no equipment. Offer alternatives where possible. Represent “not answered” separately from “no equipment” if needed by the UI state.

## 4. Screen-by-screen flow

Keep one main question or closely related group of fields per screen. Do not put every question into one long form. Show a step indicator, Back, Continue, and Skip where applicable.

### Screen 01 — Onboarding introduction

**Heading:** “Let's make your workouts fit you.”  
**Description:** “Answer a few questions so we can suggest home workouts that match your goals, experience, and available time.”  
Also explain that preferences can be edited later. Primary action: **Get started**. Do not request camera permission.

### Screen 02 — Age range

**Question:** “Which age range are you in?”  
Show the approved age ranges as single-select cards or list. Selection is required. Do not ask for date of birth. Explain briefly that age helps the app provide appropriate guidance. Under-18 selection must show the age-appropriate BMI notice and follow the unresolved under-18 policy; do not invent legal consent behavior.

### Screen 03 — Height and current weight

**Heading:** “Add your measurements”  
Fields: Height (cm default) and Current weight (kg default). Both are required. Show units, validation, inline errors, and a short purpose explanation. No target-weight field. Do not calculate until both values are valid.

### Screen 04 — BMI result (eligible adults only)

For adults with valid measurements, show BMI to one decimal place and the adult screening category in neutral language, followed by the BMI limitation note. For under-18 users, do not show adult BMI number/category or classification; show a neutral note that BMI interpretation is not provided for this age range. Continue action. Never use BMI to select a weight-loss programme or restrict exercise.

### Screen 05 — Primary fitness goal

**Question:** “What is your main fitness goal?”  
Require one primary selection from the six approved goals. Add short plain-language descriptions if space allows.

### Screen 06 — Additional goals (optional)

**Question:** “Anything else you'd like to work on?”  
Allow zero or more additional goals, excluding the primary goal. Include a clear Skip action.

### Screen 07 — Experience level

**Question:** “How much workout experience do you have?”  
Choices and helper text:
- Beginner — “I'm new to regular workouts.”
- Some experience — “I've exercised before and know some basics.”
- Advanced — “I exercise regularly and know a range of movements.”

### Screen 08 — Workout preference

**Question:** “What would you like to practise?”  
Choices: Yoga, Strength, Both, Not sure. Use clear descriptions or relevant illustrations.

### Screen 09 — Session duration

**Question:** “How much time can you set aside for one workout?”  
Choices: 10, 15, 20, 30 minutes. One selection required.

### Screen 10 — Weekly availability (optional)

**Question:** “How many days can you work out each week?”  
Choices: 2, 3, 4, 5 days. Allow Skip. If skipped, use a conservative default plan proposal and allow editing later. Include recovery days.

### Screen 11 — Equipment (optional)

**Question:** “What equipment do you have at home?”  
Choices: No equipment, Chair or wall, Resistance band, Light weights. Allow multiple selections and Skip. If skipped, default to bodyweight/no equipment.

### Screen 12 — Review your preferences

Show:
- Age range.
- Height and current weight with units.
- BMI result only for eligible adults, with limitation note.
- Primary and additional goals.
- Experience level.
- Workout preference.
- Session duration.
- Weekly availability if provided or defaulted.
- Equipment if provided or defaulted.

Provide Edit actions for each section and a primary **Finish setup** action. Do not show target weight.

### Screen 13 — Setup complete

Show: “Your workout preferences are ready.” Explain that details can be updated later in Profile. Primary action: **Go to Home**. This completes onboarding; Home is a separate screen and must not be implemented in this task.

## 5. Frontend mock data shape

Suggested TypeScript types:

```ts
type AgeRange =
  | "under_18"
  | "18_24"
  | "25_34"
  | "35_44"
  | "45_54"
  | "55_64"
  | "65_plus";

type FitnessGoal =
  | "weight_management"
  | "build_strength"
  | "flexibility_mobility"
  | "balance_coordination"
  | "general_fitness"
  | "relaxation_stress_management";

type ExperienceLevel = "beginner" | "some_experience" | "advanced";
type WorkoutPreference = "yoga" | "strength" | "both" | "not_sure";
type Equipment = "chair_wall" | "resistance_band" | "light_weights";

interface OnboardingProfile {
  ageRange: AgeRange;
  heightCm: number;
  weightKg: number;
  primaryGoal: FitnessGoal;
  additionalGoals: FitnessGoal[];
  experienceLevel: ExperienceLevel;
  workoutPreference: WorkoutPreference;
  sessionDurationMinutes: 10 | 15 | 20 | 30;
  daysPerWeek?: 2 | 3 | 4 | 5;
  equipment: Equipment[];
  equipmentSkipped?: boolean;
  bmi?: number; // Only calculate/display for eligible adults.
  completed: boolean;
}
```

Do not persist real personal measurements to a server in this frontend-only phase. Use mock/local prototype state only; do not claim production privacy or persistence guarantees.

## 6. How Home will use onboarding data later

| Field | Future use |
|---|---|
| Age range | Age-appropriate experience and safety handling |
| Height and weight | Optional adult BMI display; not a standalone workout selector |
| Primary goal | Explain why a workout is suggested |
| Additional goals | Add variety to recommendations |
| Experience | Choose starting difficulty and modifications |
| Workout preference | Choose Yoga, Strength, Both, or exploratory recommendations |
| Session duration | Match workout length |
| Days per week | Build a weekly schedule with rest days |
| Equipment | Filter exercises and show alternatives |

Recommendation logic must not infer weight loss from BMI, treat BMI as diagnosis, or claim that age/experience replaces individual medical advice.

## 7. UI and interaction requirements

- Follow the existing Splash and Login visual language.
- Use consistent typography, spacing, color tokens, and components.
- Show a clear step indicator, e.g. “Step 3 of 12”. The BMI result screen may be conditional for under-18 users, so step numbering must handle that clearly.
- Provide Back and Continue actions.
- Preserve selections when navigating backward and forward.
- Validate required fields before continuing.
- Optional screens must have a visible Skip action.
- Make selected/unselected states obvious.
- Support comfortable touch targets, keyboard navigation, and accessible labels.
- Avoid unnecessary animation.
- Do not request camera permission during onboarding.
- Do not show fabricated workout recommendations during onboarding.
- Use neutral, non-shaming BMI language.

## 8. Frontend-only scope

**In scope:** onboarding screens, routes, mock/local state, validation, age handling, height/weight input, BMI calculation/display rules, goal selection, experience and preference selection, duration, optional days/equipment, review, completion, and mock transition to a Home route placeholder.

**Out of scope:** Home dashboard implementation, backend APIs/database, real Google authentication, production account persistence, cloud storage of measurements, real AI/camera/pose detection, medical recommendations, payments, and subscriptions.

The existing mock Google sign-in may route first-time users to onboarding. Returning-user routing can use a mock onboarding-completed flag. Do not claim real authentication.

## 9. Acceptance criteria

- [ ] Age is collected as a range, not date of birth.
- [ ] Height and current weight are required and validated.
- [ ] No target-weight question exists.
- [ ] One primary goal is required; additional goals are optional.
- [ ] Experience, workout preference, and session duration are required.
- [ ] Weekly availability and equipment are optional.
- [ ] Adult BMI is calculated correctly and shown only for eligible adults.
- [ ] Under-18 users do not receive adult BMI categories.
- [ ] BMI limitations are explained neutrally.
- [ ] BMI does not determine fitness goal or exercise eligibility.
- [ ] Back navigation preserves answers.
- [ ] Required fields validate; optional questions can be skipped.
- [ ] Review screen accurately reflects selections.
- [ ] Finish setup leads to a Home route placeholder only.
- [ ] No Home dashboard, backend, real authentication, camera, or AI is added.
- [ ] Mobile and desktop layouts are checked.
- [ ] Production build succeeds.
- [ ] Independent review is completed.
- [ ] Product owner reviews each screen before approval.

## 10. Instructions to Orca

Read this document completely. Implement **onboarding only**, one screen at a time, in the existing React + Vite project.

Before implementation:
1. Inspect current Splash/Login screens and routing.
2. Confirm the current mock Google sign-in transition.
3. Create/update the onboarding screen inventory and route plan.
4. Report conflicts or missing decisions.

Then implement **Screen 01 only** and show it for product-owner review. Do not implement all onboarding screens in one pass unless explicitly approved.

For each screen: implement it, run relevant checks/build, provide a screenshot/preview, list changed files and actual test results, and wait for approval before moving to the next screen.

Do not implement Home. Do not invent extra onboarding questions. Do not change approved requirements without asking.

---

**End of Onboarding Screen Specification.**
