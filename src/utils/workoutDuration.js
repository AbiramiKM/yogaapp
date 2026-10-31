export const WORKOUT_DURATION_OPTIONS = [
  { id: '10', label: '10 minutes', description: 'A short, focused session for busy days.' },
  { id: '15', label: '15 minutes', description: 'A balanced session that fits most routines.' },
  { id: '20', label: '20 minutes', description: 'A fuller session with more variety.' },
  { id: '30', label: '30 minutes', description: 'A longer, more complete practice.' },
];

export const SESSION_DURATION_OPTIONS = WORKOUT_DURATION_OPTIONS;
export const DURATION_OPTIONS = WORKOUT_DURATION_OPTIONS;

export function selectWorkoutDuration(currentDuration, nextDuration) {
  return WORKOUT_DURATION_OPTIONS.some((option) => option.id === nextDuration)
    ? nextDuration
    : currentDuration;
}

export const selectSessionDuration = selectWorkoutDuration;
export const selectDuration = selectWorkoutDuration;

export function canContinueWorkoutDuration(duration) {
  return WORKOUT_DURATION_OPTIONS.some((option) => option.id === duration);
}

export const canContinueSessionDuration = canContinueWorkoutDuration;
export const canContinueDuration = canContinueWorkoutDuration;