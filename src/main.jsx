import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { calculateBmi, formatBmi, getBmiCategory } from './utils/bmi.js';
import {
  PRIMARY_FITNESS_GOALS,
  filterAdditionalGoals,
  selectPrimaryGoal,
  skipAdditionalGoals,
  toggleAdditionalGoal,
} from './utils/primaryGoals.js';
import {
  WORKOUT_EXPERIENCE_OPTIONS,
  canContinueWorkoutExperience,
  selectWorkoutExperience,
} from './utils/workoutExperience.js';
import {
  WORKOUT_PREFERENCE_OPTIONS,
  canContinueWorkoutPreference,
  selectWorkoutPreference,
} from './utils/workoutPreference.js';
import {
  WORKOUT_DURATION_OPTIONS,
  canContinueWorkoutDuration,
  selectWorkoutDuration,
} from './utils/workoutDuration.js';
import {
  WEEKLY_AVAILABILITY_OPTIONS,
  canContinueWeeklyAvailability,
  selectWeeklyAvailability,
  skipWeeklyAvailability,
} from './utils/weeklyAvailability.js';
import {
  EQUIPMENT_OPTIONS,
  canContinueEquipment,
  skipEquipment,
  toggleEquipment,
} from './utils/equipment.js';
import './styles.css';

const MOCK_SESSION_KEY = 'dayoga.mockLoggedIn';
const MOCK_ONBOARDING_COMPLETE_KEY = 'dayoga.mockOnboardingComplete';
const SPLASH_DURATION_MS = 1800;
const PREVIEW_SCREEN = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('preview') : null;
const PREVIEW_ROUTES = [
  'onboarding-intro',
  'onboarding-age',
  'onboarding-minor',
  'onboarding-adult',
  'onboarding-adult-age',
  'onboarding-adult-age-selected',
  'onboarding-measurements',
  'onboarding-bmi',
  'onboarding-primary-goal',
  'onboarding-primary-goal-selected',
  'onboarding-additional-goals',
  'onboarding-additional-goals-selected',
  'onboarding-workout-experience',
  'onboarding-workout-experience-selected',
  'onboarding-workout-preference',
  'onboarding-workout-preference-selected',
  'onboarding-workout-duration',
  'onboarding-workout-duration-selected',
  'onboarding-weekly-availability',
  'onboarding-weekly-availability-selected',
  'onboarding-equipment',
  'onboarding-equipment-selected',
  'onboarding-review',
];
const PREVIEW_PARAMS = new URLSearchParams(window.location.search);

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 104 104" role="img" aria-label="daY²oga logo">
      <circle className="mark-halo" cx="52" cy="52" r="46" />
      <path className="mark-leaf mark-leaf-left" d="M52 69C31 68 22 54 24 34c18 2 29 13 28 35Z" />
      <path className="mark-leaf mark-leaf-right" d="M52 69c21-1 30-15 28-35-18 2-29 13-28 35Z" />
      <path className="mark-stem" d="M52 72V47" />
      <path className="mark-ground" d="M33 75h38" />
    </svg>
  );
}

function BrandLockup() {
  return (
    <div className="brand-lockup">
      <BrandMark />
      <span className="brand-name">daY<span className="brand-superscript">²</span>oga</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.6 6.1-14.7Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.5-5c-1.8 1.2-4.1 1.9-7 1.9-5.3 0-9.8-3.6-11.4-8.4H5.9v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.9a20 20 0 0 0 0 17.8l6.7-5.2Z" />
      <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.9 15.1l6.7 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z" />
    </svg>
  );
}

function MovementIllustration() {
  return (
    <svg className="movement-illustration" viewBox="0 0 480 440" role="img" aria-label="Illustration of a person stretching at home">
      <rect x="18" y="18" width="444" height="404" rx="36" fill="#E9EEE5" />
      <circle cx="347" cy="110" r="51" fill="#F6DDAF" />
      <path d="M18 301c58-46 110-34 159-8 59 31 104 21 158-18 46-33 84-34 127-12v159H18V301Z" fill="#D7E2D3" />
      <path d="M90 354h300" stroke="#9BB29A" strokeWidth="5" strokeLinecap="round" />
      <path d="M151 354c31-8 63-11 96-11 33 0 65 3 96 11" stroke="#789174" strokeWidth="4" strokeLinecap="round" />
      <circle cx="240" cy="159" r="24" fill="#B96F4A" />
      <path d="M239 188c-4 32-3 56 6 82" stroke="#285B45" strokeWidth="18" strokeLinecap="round" />
      <path d="M242 204c-27-22-48-39-74-46" stroke="#285B45" strokeWidth="13" strokeLinecap="round" />
      <path d="M244 204c25-23 48-37 75-42" stroke="#285B45" strokeWidth="13" strokeLinecap="round" />
      <path d="m168 158-26-24" stroke="#B96F4A" strokeWidth="11" strokeLinecap="round" />
      <path d="m319 161 26-29" stroke="#B96F4A" strokeWidth="11" strokeLinecap="round" />
      <path d="M245 267c-37 17-70 30-106 39" stroke="#285B45" strokeWidth="17" strokeLinecap="round" />
      <path d="M245 267c37 17 70 30 106 39" stroke="#285B45" strokeWidth="17" strokeLinecap="round" />
      <path d="m139 306-43 17" stroke="#B96F4A" strokeWidth="12" strokeLinecap="round" />
      <path d="m354 306 43 17" stroke="#B96F4A" strokeWidth="12" strokeLinecap="round" />
      <path d="M115 119c13-24 31-40 55-50" stroke="#789174" strokeWidth="5" strokeLinecap="round" />
      <path d="M363 235c12 9 21 20 27 35" stroke="#789174" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SplashScreen() {
  return (
    <main className="splash" aria-label="daY²oga splash screen">
      <BrandLockup />
    </main>
  );
}

function LoginScreen({ onContinue }) {
  return (
    <main className="login-screen">
      <section className="login-panel" aria-labelledby="login-heading">
        <BrandLockup />
        <div className="login-copy">
          <h1 id="login-heading">Welcome</h1>
          <p>Sign in to continue</p>
        </div>
        <button className="google-button" type="button" onClick={onContinue}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
        <p className="prototype-note">Google sign-in is simulated in this preview.</p>
      </section>
    </main>
  );
}

function OnboardingIntroduction({ onGetStarted }) {
  return (
    <main className="onboarding-intro">
      <header className="onboarding-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="intro-layout" aria-labelledby="intro-title">
        <div className="intro-content">
          <p className="intro-kicker">YOUR PRACTICE, YOUR PACE</p>
          <h1 id="intro-title">Let’s make your workouts fit you.</h1>
          <p className="intro-description">
            Answer a few questions so we can suggest home workouts that match your goals, experience, and available time.
          </p>
          <p className="intro-reassurance">
            Your preferences can be edited later.
          </p>
          <button className="get-started-button" type="button" onClick={onGetStarted}>
            <span>Get started</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="intro-art">
          <MovementIllustration />
          <span className="art-accent art-accent-one" aria-hidden="true" />
          <span className="art-accent art-accent-two" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}

function OnboardingAgeSelection({ selection, onSelect, onBack }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card" aria-labelledby="age-selection-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">A QUICK CHECK-IN</p>
        <h1 id="age-selection-title">Which age group are you in?</h1>
        <p className="age-selection-description">Choose the option that applies to you.</p>

        <div className="age-options" role="group" aria-label="Age group">
          <button
            className={`age-option${selection === 'minor' ? ' is-selected' : ''}`}
            type="button"
            aria-pressed={selection === 'minor'}
            onClick={() => onSelect('minor')}
          >
            <span className="age-option-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5.5 20c.4-4 2.7-6 6.5-6s6.1 2 6.5 6" />
              </svg>
            </span>
            <span className="age-option-copy">
              <strong>Minor</strong>
              <span>Under 18</span>
            </span>
            <span className="age-option-radio" aria-hidden="true" />
          </button>
          <button
            className={`age-option${selection === 'adult' ? ' is-selected' : ''}`}
            type="button"
            aria-pressed={selection === 'adult'}
            onClick={() => onSelect('adult')}
          >
            <span className="age-option-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5 20c.5-4 2.9-6 7-6s6.5 2 7 6" />
              </svg>
            </span>
            <span className="age-option-copy">
              <strong>Adult</strong>
              <span>18 or older</span>
            </span>
            <span className="age-option-radio" aria-hidden="true" />
          </button>
        </div>

        {selection === 'minor' && (
          <div className="age-feedback age-feedback-minor" role="status">
            <p>The age-appropriate experience for people under 18 isn’t available yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}

const ADULT_AGE_RANGES = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'];

function OnboardingAdultAgeRange({ ageRange, onAgeRangeChange, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card adult-age-card" aria-labelledby="adult-age-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">ADULT AGE RANGE</p>
        <h1 id="adult-age-title">What is your age range?</h1>
        <div className="adult-age-options" role="radiogroup" aria-labelledby="adult-age-title">
          {ADULT_AGE_RANGES.map((range) => (
            <label className={`adult-age-option${ageRange === range ? ' is-selected' : ''}`} key={range}>
              <input
                type="radio"
                name="adult-age-range"
                value={range}
                checked={ageRange === range}
                onChange={() => onAgeRangeChange(range)}
              />
              <span className="adult-age-option-label">{range}</span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <button className="age-continue-button" type="button" disabled={!ageRange} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function isValidMeasurement(value, minimum, maximum) {
  if (value === '') return false;
  const number = Number(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum;
}

function OnboardingMeasurements({ measurements, onMeasurementChange, onBack, onContinue }) {
  const [touched, setTouched] = useState({ height: false, weight: false });
  const heightValid = isValidMeasurement(measurements.height, 80, 250);
  const weightValid = isValidMeasurement(measurements.weight, 20, 300);

  function getError(field, value, minimum, maximum, label, touchedField) {
    if (!touchedField) return '';
    if (value === '') return `Enter your ${label.toLowerCase()}.`;
    if (!Number.isFinite(Number(value))) return 'Enter a numeric value.';
    if (!isValidMeasurement(value, minimum, maximum)) return `Enter a value from ${minimum} to ${maximum}.`;
    return '';
  }

  const heightError = getError('height', measurements.height, 80, 250, 'Height', touched.height);
  const weightError = getError('weight', measurements.weight, 20, 300, 'Current weight', touched.weight);

  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card measurements-card" aria-labelledby="measurements-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR DETAILS</p>
        <h1 id="measurements-title">Let's understand your body measurements.</h1>
        <p className="measurements-description">Your measurements help personalize your experience.</p>

        <div className="measurement-fields">
          <div className="measurement-field">
            <label htmlFor="height-input">Height <span>(required)</span></label>
            <div className={`measurement-input-wrap${heightError ? ' has-error' : ''}`}>
              <input
                id="height-input"
                type="number"
                autoComplete="off"
                inputMode="decimal"
                min="80"
                max="250"
                step="0.1"
                value={measurements.height}
                aria-invalid={Boolean(heightError)}
                aria-describedby="height-help height-error"
                onChange={(event) => onMeasurementChange('height', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, height: true }))}
              />
              <span className="measurement-unit">cm</span>
            </div>
            <p className="measurement-help" id="height-help">Enter a value from 80 to 250 cm.</p>
            <p className="measurement-error" id="height-error" aria-live="polite">{heightError}</p>
          </div>

          <div className="measurement-field">
            <label htmlFor="weight-input">Current weight <span>(required)</span></label>
            <div className={`measurement-input-wrap${weightError ? ' has-error' : ''}`}>
              <input
                id="weight-input"
                type="number"
                autoComplete="off"
                inputMode="decimal"
                min="20"
                max="300"
                step="0.1"
                value={measurements.weight}
                aria-invalid={Boolean(weightError)}
                aria-describedby="weight-help weight-error"
                onChange={(event) => onMeasurementChange('weight', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, weight: true }))}
              />
              <span className="measurement-unit">kg</span>
            </div>
            <p className="measurement-help" id="weight-help">Enter a value from 20 to 300 kg.</p>
            <p className="measurement-error" id="weight-error" aria-live="polite">{weightError}</p>
          </div>
        </div>

        <button className="age-continue-button" type="button" disabled={!heightValid || !weightValid} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingBmiResult({ bmi, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card bmi-card" aria-labelledby="bmi-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR RESULT</p>
        <h1 id="bmi-title">Your BMI</h1>
        <div className="bmi-result" aria-live="polite">
          <strong>{formatBmi(bmi)}</strong>
          <span>{getBmiCategory(bmi)}</span>
        </div>
        <p className="bmi-explanation">
          BMI is a screening measure, not a medical diagnosis. It does not distinguish between muscle and body fat.
        </p>
        <button className="age-continue-button" type="button" onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingPrimaryFitnessGoal({ selectedGoal, onSelect, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card primary-goal-card" aria-labelledby="primary-goal-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR FOCUS</p>
        <h1 id="primary-goal-title">What is your main fitness goal?</h1>
        <p className="primary-goal-description">Choose the one goal that matters most to you right now.</p>
        <div className="primary-goal-options" role="radiogroup" aria-labelledby="primary-goal-title">
          {PRIMARY_FITNESS_GOALS.map((goal) => (
            <label className={`primary-goal-option${selectedGoal === goal.id ? ' is-selected' : ''}`} key={goal.id}>
              <input
                type="radio"
                name="primary-fitness-goal"
                value={goal.id}
                checked={selectedGoal === goal.id}
                onChange={() => onSelect(goal.id)}
              />
              <span className="primary-goal-option-label">{goal.label}</span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <button className="age-continue-button" type="button" disabled={!selectedGoal} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingAdditionalGoals({ primaryGoal, selectedGoals, onToggle, onSkip, onContinue, onBack }) {
  const availableGoals = PRIMARY_FITNESS_GOALS.filter((goal) => goal.id !== primaryGoal);

  function handleToggle(goalId) {
    onToggle(goalId);
  }

  function handleSkip() {
    onSkip();
    onContinue();
  }

  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card additional-goals-card" aria-labelledby="additional-goals-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">OPTIONAL STEP</p>
        <h1 id="additional-goals-title">Any other goals you'd like to work on?</h1>
        <p className="additional-goals-description">Select any additional goals that interest you. This step is optional.</p>
        <div className="additional-goals-options" role="group" aria-labelledby="additional-goals-title">
          {availableGoals.map((goal) => (
            <label className={`additional-goal-option${selectedGoals.includes(goal.id) ? ' is-selected' : ''}`} key={goal.id}>
              <input
                type="checkbox"
                name="additional-fitness-goals"
                value={goal.id}
                checked={selectedGoals.includes(goal.id)}
                onChange={() => handleToggle(goal.id)}
              />
              <span className="additional-goal-option-label">{goal.label}</span>
              <span className="additional-goal-checkbox" aria-hidden="true">
                {selectedGoals.includes(goal.id) && <span>✓</span>}
              </span>
            </label>
          ))}
        </div>
        <div className="additional-goal-actions">
          <button className="additional-goal-skip" type="button" onClick={handleSkip}>Skip</button>
          <button className="additional-goal-continue" type="button" disabled={selectedGoals.length === 0} onClick={onContinue}>Continue</button>
        </div>
      </section>
    </main>
  );
}

function OnboardingWorkoutExperience({ selectedExperience, onSelect, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card workout-experience-card" aria-labelledby="experience-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR EXPERIENCE</p>
        <h1 id="experience-title">How much workout experience do you have?</h1>
        <p className="experience-description">This helps us find a comfortable starting point for your practice.</p>
        <div className="experience-options" role="radiogroup" aria-labelledby="experience-title">
          {WORKOUT_EXPERIENCE_OPTIONS.map((option) => (
            <label className={`experience-option${selectedExperience === option.id ? ' is-selected' : ''}`} key={option.id}>
              <input
                type="radio"
                name="workout-experience"
                value={option.id}
                checked={selectedExperience === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span className="experience-option-copy">
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <button className="age-continue-button" type="button" disabled={!canContinueWorkoutExperience(selectedExperience)} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingWorkoutPreference({ selectedPreference, onSelect, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card workout-preference-card" aria-labelledby="preference-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR WORKOUT PREFERENCE</p>
        <h1 id="preference-title">What type of workouts do you prefer?</h1>
        <p className="experience-description">Choose what you'd like to include in your routine.</p>
        <div className="experience-options" role="radiogroup" aria-labelledby="preference-title">
          {WORKOUT_PREFERENCE_OPTIONS.map((option) => (
            <label className={`experience-option${selectedPreference === option.id ? ' is-selected' : ''}`} key={option.id}>
              <input
                type="radio"
                name="workout-preference"
                value={option.id}
                checked={selectedPreference === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span className="experience-option-copy">
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <button className="age-continue-button" type="button" disabled={!canContinueWorkoutPreference(selectedPreference)} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingWorkoutDuration({ selectedDuration, onSelect, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card workout-duration-card" aria-labelledby="duration-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR WORKOUT DURATION</p>
        <h1 id="duration-title">How much time can you spend working out?</h1>
        <p className="experience-description">Choose a session length that fits your daily routine.</p>
        <div className="experience-options" role="radiogroup" aria-labelledby="duration-title">
          {WORKOUT_DURATION_OPTIONS.map((option) => (
            <label className={`experience-option${selectedDuration === option.id ? ' is-selected' : ''}`} key={option.id}>
              <input
                type="radio"
                name="workout-duration"
                value={option.id}
                checked={selectedDuration === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span className="experience-option-copy">
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <button className="age-continue-button" type="button" disabled={!canContinueWorkoutDuration(selectedDuration)} onClick={onContinue}>
          Continue
        </button>
      </section>
    </main>
  );
}

function OnboardingWeeklyAvailability({ selectedAvailability, onSelect, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card weekly-availability-card" aria-labelledby="availability-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR WEEKLY AVAILABILITY</p>
        <h1 id="availability-title">How many days a week can you work out?</h1>
        <p className="experience-description">Choose a schedule that feels realistic for your routine.</p>
        <div className="experience-options" role="radiogroup" aria-labelledby="availability-title">
          {WEEKLY_AVAILABILITY_OPTIONS.map((option) => (
            <label className={`experience-option${selectedAvailability === option.id ? ' is-selected' : ''}`} key={option.id}>
              <input
                type="radio"
                name="weekly-availability"
                value={option.id}
                checked={selectedAvailability === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span className="experience-option-copy">
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </span>
              <span className="age-option-radio" aria-hidden="true" />
            </label>
          ))}
        </div>
        <div className="additional-goal-actions">
          <button className="age-continue-button" type="button" disabled={!canContinueWeeklyAvailability(selectedAvailability)} onClick={onContinue}>
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}

function OnboardingEquipment({ selectedEquipment, onToggle, onBack, onContinue }) {
  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card equipment-card" aria-labelledby="equipment-title">
        <button className="back-button" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m7 7-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <p className="age-selection-kicker">YOUR EQUIPMENT</p>
        <h1 id="equipment-title">What equipment do you have available?</h1>
        <p className="additional-goals-description">We'll use what you have at home. You can still work out without equipment.</p>
        <div className="additional-goals-options" role="group" aria-labelledby="equipment-title">
          {EQUIPMENT_OPTIONS.map((option) => (
            <label className={`additional-goal-option${selectedEquipment.includes(option.id) ? ' is-selected' : ''}`} key={option.id}>
              <input
                type="checkbox"
                name="equipment"
                value={option.id}
                checked={selectedEquipment.includes(option.id)}
                onChange={() => onToggle(option.id)}
              />
              <span className="additional-goal-option-label">
                {option.label}
                <span className="equipment-option-description">{option.description}</span>
              </span>
              <span className="additional-goal-checkbox" aria-hidden="true">
                {selectedEquipment.includes(option.id) && <span>✓</span>}
              </span>
            </label>
          ))}
        </div>
        <div className="additional-goal-actions">
          <button className="age-continue-button" type="button" disabled={!canContinueEquipment(selectedEquipment)} onClick={onContinue}>
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}

function getGoalLabel(goalId) {
  return PRIMARY_FITNESS_GOALS.find((goal) => goal.id === goalId)?.label ?? 'Not specified';
}

function getExperienceLabel(experienceId) {
  return WORKOUT_EXPERIENCE_OPTIONS.find((option) => option.id === experienceId)?.label ?? 'Not specified';
}

function getPreferenceLabel(preferenceId) {
  return WORKOUT_PREFERENCE_OPTIONS.find((option) => option.id === preferenceId)?.label ?? 'Not specified';
}

function getDurationLabel(durationId) {
  return WORKOUT_DURATION_OPTIONS.find((option) => option.id === durationId)?.label ?? 'Not specified';
}

function getWeeklyAvailabilityLabel(availabilityId) {
  return WEEKLY_AVAILABILITY_OPTIONS.find((option) => option.id === availabilityId)?.label ?? 'Not specified';
}

function getEquipmentLabels(equipmentIds) {
  if (!Array.isArray(equipmentIds) || equipmentIds.length === 0) return 'Not specified';
  return equipmentIds.map((id) => EQUIPMENT_OPTIONS.find((option) => option.id === id)?.label ?? id).join(', ');
}

function canCompleteOnboarding(ageGroup, ageRange, measurements, primaryGoal, workoutExperience, workoutPreference, workoutDuration) {
  if (ageGroup !== 'minor' && ageGroup !== 'adult') return false;
  if (ageGroup === 'adult') {
    if (!ageRange) return false;
    if (!isValidMeasurement(measurements.height, 80, 250) || !isValidMeasurement(measurements.weight, 20, 300)) return false;
  }
  return Boolean(primaryGoal && workoutExperience && workoutPreference && workoutDuration);
}

function OnboardingReview({
  ageGroup,
  ageRange,
  measurements,
  primaryGoal,
  additionalGoals,
  workoutExperience,
  workoutPreference,
  workoutDuration,
  weeklyAvailability,
  equipment,
  onEditAgeGroup,
  onEditMeasurements,
  onEditBmi,
  onEditPrimaryGoal,
  onEditAdditionalGoals,
  onEditWorkoutExperience,
  onEditWorkoutPreference,
  onEditWorkoutDuration,
  onEditWeeklyAvailability,
  onEditEquipment,
  onComplete,
  completionError,
}) {
  const bmi = ageGroup === 'adult' && isValidMeasurement(measurements.height, 80, 250) && isValidMeasurement(measurements.weight, 20, 300)
    ? calculateBmi(Number(measurements.height), Number(measurements.weight))
    : null;
  const bmiLabel = ageGroup !== 'adult'
    ? 'Not applicable'
    : bmi === null
      ? 'Not available'
      : `${formatBmi(bmi)} (${getBmiCategory(bmi)})`;

  const additionalGoalsLabel = Array.isArray(additionalGoals) && additionalGoals.length > 0
    ? additionalGoals.map(getGoalLabel).join(', ')
    : 'Not specified';

  const measurementLabel = measurements.height || measurements.weight
    ? `${measurements.height ? `${measurements.height} cm` : 'Not specified'} / ${measurements.weight ? `${measurements.weight} kg` : 'Not specified'}`
    : 'Not specified';

  const sections = [
    { title: 'Age group', value: ageGroup === 'minor' ? 'Minor (under 18)' : ageGroup === 'adult' ? (ageRange ?? 'Not specified') : 'Not specified', onEdit: onEditAgeGroup },
    { title: 'Height and current weight', value: measurementLabel, onEdit: onEditMeasurements },
  ];

  if (ageGroup === 'adult') {
    sections.push({ title: 'BMI', value: bmiLabel, onEdit: onEditBmi, note: 'BMI is a screening measure, not a diagnosis.' });
  }

  sections.push(
    { title: 'Primary fitness goal', value: getGoalLabel(primaryGoal), onEdit: onEditPrimaryGoal },
    { title: 'Additional fitness goals', value: additionalGoalsLabel, onEdit: onEditAdditionalGoals },
    { title: 'Workout experience', value: getExperienceLabel(workoutExperience), onEdit: onEditWorkoutExperience },
    { title: 'Workout preference', value: getPreferenceLabel(workoutPreference), onEdit: onEditWorkoutPreference },
    { title: 'Session duration', value: getDurationLabel(workoutDuration), onEdit: onEditWorkoutDuration },
    { title: 'Weekly availability', value: getWeeklyAvailabilityLabel(weeklyAvailability), onEdit: onEditWeeklyAvailability },
    { title: 'Equipment availability', value: getEquipmentLabels(equipment), onEdit: onEditEquipment },
  );

  return (
    <main className="age-selection-page">
      <header className="onboarding-header age-selection-header">
        <div className="onboarding-brand" aria-label="daY²oga">
          <BrandMark />
          <span>daY<span className="brand-superscript">²</span>oga</span>
        </div>
      </header>
      <section className="age-selection-card review-card" aria-labelledby="review-title">
        <p className="age-selection-kicker">YOUR PROFILE</p>
        <h1 id="review-title">Your personal workout profile</h1>
        <p className="experience-description">Review your preferences. You can change anything before finishing.</p>
        <div className="review-sections">
          {sections.map((section) => (
            <div className="review-section" key={section.title}>
              <div className="review-section-header">
                <h2>{section.title}</h2>
                <button className="review-edit-button" type="button" onClick={section.onEdit}>Edit</button>
              </div>
              <p className="review-value">{section.value}</p>
              {section.note && <p className="review-note">{section.note}</p>}
            </div>
          ))}
        </div>
        {completionError && <p className="review-error" role="alert">{completionError}</p>}
        <button className="age-continue-button" type="button" onClick={onComplete}>
          Complete setup
        </button>
      </section>
    </main>
  );
}

function HomePlaceholder({ onLogout }) {
  return (
    <main className="home-placeholder">
      <BrandLockup />
      <h1>Home</h1>
      <button className="logout-button" type="button" onClick={onLogout}>Log out</button>
    </main>
  );
}

function App() {
  const initialPreview = PREVIEW_ROUTES.includes(PREVIEW_SCREEN) ? PREVIEW_SCREEN : null;
  const initialScreen = initialPreview === 'onboarding-adult-age' || initialPreview === 'onboarding-adult-age-selected'
    ? 'onboarding-adult-age'
    : initialPreview === 'onboarding-bmi'
      ? 'onboarding-bmi'
    : initialPreview === 'onboarding-primary-goal-selected'
      ? 'onboarding-primary-goal'
    : initialPreview === 'onboarding-additional-goals-selected'
      ? 'onboarding-additional-goals'
    : initialPreview === 'onboarding-workout-experience-selected'
      ? 'onboarding-workout-experience'
    : initialPreview === 'onboarding-workout-preference-selected'
      ? 'onboarding-workout-preference'
    : initialPreview === 'onboarding-workout-duration-selected'
      ? 'onboarding-workout-duration'
    : initialPreview === 'onboarding-weekly-availability-selected'
      ? 'onboarding-weekly-availability'
    : initialPreview === 'onboarding-equipment-selected'
      ? 'onboarding-equipment'
    : initialPreview === 'onboarding-minor' || initialPreview === 'onboarding-adult'
      ? 'onboarding-age'
      : initialPreview ?? 'splash';
  const [screen, setScreen] = useState(initialScreen);
  const [ageGroup, setAgeGroup] = useState(initialPreview === 'onboarding-bmi' || initialPreview === 'onboarding-review' ? (PREVIEW_PARAMS.get('ageGroup') ?? 'adult') : initialPreview === 'onboarding-minor' ? 'minor' : initialPreview === 'onboarding-adult' ? 'adult' : null);
  const [ageRange, setAgeRange] = useState(initialPreview === 'onboarding-adult-age-selected' ? '25–34' : initialPreview === 'onboarding-review' ? (PREVIEW_PARAMS.get('ageRange') ?? null) : null);
  const [measurements, setMeasurements] = useState({
    height: initialPreview === 'onboarding-bmi' || initialPreview === 'onboarding-review' ? (PREVIEW_PARAMS.get('height') ?? '') : '',
    weight: initialPreview === 'onboarding-bmi' || initialPreview === 'onboarding-review' ? (PREVIEW_PARAMS.get('weight') ?? '') : '',
  });
  const initialPrimaryGoal = selectPrimaryGoal(
    null,
    initialPreview === 'onboarding-primary-goal-selected'
      ? PREVIEW_PARAMS.get('goal')
      : initialPreview === 'onboarding-additional-goals-selected' || initialPreview === 'onboarding-additional-goals' || initialPreview === 'onboarding-review'
        ? PREVIEW_PARAMS.get('primaryGoal')
        : null,
  );
  const [primaryGoal, setPrimaryGoal] = useState(initialPrimaryGoal);
  const [additionalGoals, setAdditionalGoals] = useState(() => (
    initialPreview === 'onboarding-additional-goals-selected' || initialPreview === 'onboarding-review'
      ? filterAdditionalGoals(PREVIEW_PARAMS.getAll('additionalGoal'), initialPrimaryGoal)
      : []
  ));
  const [workoutExperience, setWorkoutExperience] = useState(() => (
    initialPreview === 'onboarding-workout-experience-selected' || initialPreview === 'onboarding-review'
      ? selectWorkoutExperience(null, PREVIEW_PARAMS.get('experience'))
      : null
  ));
  const [workoutPreference, setWorkoutPreference] = useState(() => (
    initialPreview === 'onboarding-workout-preference-selected' || initialPreview === 'onboarding-review'
      ? selectWorkoutPreference(null, PREVIEW_PARAMS.get('preference'))
      : null
  ));
  const [workoutDuration, setWorkoutDuration] = useState(() => (
    initialPreview === 'onboarding-workout-duration-selected' || initialPreview === 'onboarding-review'
      ? selectWorkoutDuration(null, PREVIEW_PARAMS.get('duration'))
      : null
  ));
  const [weeklyAvailability, setWeeklyAvailability] = useState(() => (
    initialPreview === 'onboarding-weekly-availability-selected' || initialPreview === 'onboarding-review'
      ? selectWeeklyAvailability(null, PREVIEW_PARAMS.get('availability'))
      : null
  ));
  const [equipment, setEquipment] = useState(() => (
    initialPreview === 'onboarding-equipment-selected' || initialPreview === 'onboarding-review'
      ? PREVIEW_PARAMS.getAll('equipment').reduce((current, next) => toggleEquipment(current, next), [])
      : []
  ));
  const [completionError, setCompletionError] = useState('');

  useEffect(() => {
    if (initialPreview) return undefined;
    const timeoutId = window.setTimeout(() => {
      const hasSession = window.localStorage.getItem(MOCK_SESSION_KEY) === 'true';
      const onboardingComplete = window.localStorage.getItem(MOCK_ONBOARDING_COMPLETE_KEY) === 'true';
      setScreen(hasSession ? (onboardingComplete ? 'home' : 'onboarding-intro') : 'login');
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [initialPreview]);

  function handleMockGoogleSignIn() {
    window.localStorage.setItem(MOCK_SESSION_KEY, 'true');
    window.localStorage.removeItem(MOCK_ONBOARDING_COMPLETE_KEY);
    setScreen('onboarding-intro');
  }

  function handleLogout() {
    window.localStorage.removeItem(MOCK_SESSION_KEY);
    window.localStorage.removeItem(MOCK_ONBOARDING_COMPLETE_KEY);
    setScreen('login');
  }

  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'home') return <HomePlaceholder onLogout={handleLogout} />;
  if (screen === 'onboarding-intro') return <OnboardingIntroduction onGetStarted={() => setScreen('onboarding-age')} />;
  if (screen === 'onboarding-age') {
    return (
      <OnboardingAgeSelection
        selection={ageGroup}
        onSelect={(nextAgeGroup) => {
          setAgeGroup(nextAgeGroup);
          if (nextAgeGroup === 'adult') setScreen('onboarding-adult-age');
        }}
        onBack={() => setScreen('onboarding-intro')}
      />
    );
  }
  if (screen === 'onboarding-adult-age') {
    return (
      <OnboardingAdultAgeRange
        ageRange={ageRange}
        onAgeRangeChange={setAgeRange}
        onBack={() => setScreen('onboarding-age')}
        onContinue={() => setScreen('onboarding-measurements')}
      />
    );
  }
  if (screen === 'onboarding-measurements') {
    return (
      <OnboardingMeasurements
        measurements={measurements}
        onMeasurementChange={(field, value) => setMeasurements((current) => ({ ...current, [field]: value }))}
        onBack={() => setScreen('onboarding-adult-age')}
        onContinue={() => {
          if (ageGroup === 'adult' && isValidMeasurement(measurements.height, 80, 250) && isValidMeasurement(measurements.weight, 20, 300)) {
            setScreen('onboarding-bmi');
          }
        }}
      />
    );
  }
  if (screen === 'onboarding-bmi') {
    if (ageGroup !== 'adult') {
      return <OnboardingAgeSelection selection={ageGroup} onSelect={() => setScreen('onboarding-age')} onBack={() => setScreen('onboarding-intro')} />;
    }
    const bmi = calculateBmi(Number(measurements.height), Number(measurements.weight));
    if (bmi === null) {
      return (
        <OnboardingMeasurements
          measurements={measurements}
          onMeasurementChange={(field, value) => setMeasurements((current) => ({ ...current, [field]: value }))}
          onBack={() => setScreen('onboarding-adult-age')}
          onContinue={() => setScreen('onboarding-bmi')}
        />
      );
    }
    return <OnboardingBmiResult bmi={bmi} onBack={() => setScreen('onboarding-measurements')} onContinue={() => setScreen('onboarding-primary-goal')} />;
  }
  if (screen === 'onboarding-primary-goal') {
    return (
      <OnboardingPrimaryFitnessGoal
        selectedGoal={primaryGoal}
        onSelect={(goal) => {
          setPrimaryGoal((current) => selectPrimaryGoal(current, goal));
          setAdditionalGoals((current) => current.filter((selected) => selected !== goal));
        }}
        onBack={() => setScreen('onboarding-bmi')}
        onContinue={() => setScreen('onboarding-additional-goals')}
      />
    );
  }
  if (screen === 'onboarding-additional-goals') {
    if (!primaryGoal) {
      return <OnboardingPrimaryFitnessGoal selectedGoal={null} onSelect={setPrimaryGoal} onBack={() => setScreen('onboarding-bmi')} onContinue={() => setScreen('onboarding-additional-goals')} />;
    }
    return (
      <OnboardingAdditionalGoals
        primaryGoal={primaryGoal}
        selectedGoals={additionalGoals}
        onToggle={(goal) => setAdditionalGoals((current) => toggleAdditionalGoal(current, goal, primaryGoal))}
        onSkip={() => setAdditionalGoals((current) => skipAdditionalGoals(current))}
        onContinue={() => setScreen('onboarding-workout-experience')}
        onBack={() => setScreen('onboarding-primary-goal')}
      />
    );
  }
  if (screen === 'onboarding-workout-experience') {
    return (
      <OnboardingWorkoutExperience
        selectedExperience={workoutExperience}
        onSelect={(experience) => setWorkoutExperience((current) => selectWorkoutExperience(current, experience))}
        onBack={() => setScreen('onboarding-additional-goals')}
        onContinue={() => setScreen('onboarding-workout-preference')}
      />
    );
  }
  if (screen === 'onboarding-workout-preference') {
    return (
      <OnboardingWorkoutPreference
        selectedPreference={workoutPreference}
        onSelect={(preference) => setWorkoutPreference((current) => selectWorkoutPreference(current, preference))}
        onBack={() => setScreen('onboarding-workout-experience')}
        onContinue={() => setScreen('onboarding-workout-duration')}
      />
    );
  }
  if (screen === 'onboarding-workout-duration') {
    return (
      <OnboardingWorkoutDuration
        selectedDuration={workoutDuration}
        onSelect={(duration) => setWorkoutDuration((current) => selectWorkoutDuration(current, duration))}
        onBack={() => setScreen('onboarding-workout-preference')}
        onContinue={() => setScreen('onboarding-weekly-availability')}
      />
    );
  }
  if (screen === 'onboarding-weekly-availability') {
    return (
      <OnboardingWeeklyAvailability
        selectedAvailability={weeklyAvailability}
        onSelect={(availability) => setWeeklyAvailability((current) => selectWeeklyAvailability(current, availability))}
        onBack={() => setScreen('onboarding-workout-duration')}
        onContinue={() => setScreen('onboarding-equipment')}
      />
    );
  }
  if (screen === 'onboarding-equipment') {
    return (
      <OnboardingEquipment
        selectedEquipment={equipment}
        onToggle={(item) => setEquipment((current) => toggleEquipment(current, item))}
        onBack={() => setScreen('onboarding-weekly-availability')}
        onContinue={() => setScreen('onboarding-review')}
      />
    );
  }
  if (screen === 'onboarding-review') {
    return (
      <OnboardingReview
        ageGroup={ageGroup}
        ageRange={ageRange}
        measurements={measurements}
        primaryGoal={primaryGoal}
        additionalGoals={additionalGoals}
        workoutExperience={workoutExperience}
        workoutPreference={workoutPreference}
        workoutDuration={workoutDuration}
        weeklyAvailability={weeklyAvailability}
        equipment={equipment}
        onEditAgeGroup={() => setScreen('onboarding-age')}
        onEditMeasurements={() => setScreen('onboarding-measurements')}
        onEditBmi={() => setScreen('onboarding-bmi')}
        onEditPrimaryGoal={() => setScreen('onboarding-primary-goal')}
        onEditAdditionalGoals={() => setScreen('onboarding-additional-goals')}
        onEditWorkoutExperience={() => setScreen('onboarding-workout-experience')}
        onEditWorkoutPreference={() => setScreen('onboarding-workout-preference')}
        onEditWorkoutDuration={() => setScreen('onboarding-workout-duration')}
        onEditWeeklyAvailability={() => setScreen('onboarding-weekly-availability')}
        onEditEquipment={() => setScreen('onboarding-equipment')}
        onComplete={() => {
          if (!canCompleteOnboarding(ageGroup, ageRange, measurements, primaryGoal, workoutExperience, workoutPreference, workoutDuration)) {
            setCompletionError('Please complete the required preferences before finishing.');
            return;
          }
          setCompletionError('');
          window.localStorage.setItem(MOCK_ONBOARDING_COMPLETE_KEY, 'true');
          setScreen('home');
        }}
        completionError={completionError}
      />
    );
  }
  return <LoginScreen onContinue={handleMockGoogleSignIn} />;
}

createRoot(document.getElementById('root')).render(<App />);
