export const WORKOUT_PREFERENCE_OPTIONS = [
  { id: 'yoga', label: 'Yoga', description: 'Focus on flexibility, balance and mindful movement.' },
  { id: 'strength', label: 'Strength', description: 'Focus on building strength with bodyweight exercises.' },
  { id: 'both', label: 'Both', description: 'Combine yoga and strength workouts.' },
  { id: 'not_sure', label: 'Not sure', description: 'Help me discover what works for me.' },
];

export function selectWorkoutPreference(currentPreference, nextPreference) {
  return WORKOUT_PREFERENCE_OPTIONS.some((option) => option.id === nextPreference)
    ? nextPreference
    : currentPreference;
}

export function canContinueWorkoutPreference(preference) {
  return WORKOUT_PREFERENCE_OPTIONS.some((option) => option.id === preference);
}
