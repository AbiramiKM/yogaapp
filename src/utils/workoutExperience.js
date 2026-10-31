export const WORKOUT_EXPERIENCE_OPTIONS = [
  { id: 'beginner', label: 'Beginner', description: "I'm new to working out or returning after a long break." },
  { id: 'some_experience', label: 'Some experience', description: 'I exercise occasionally and know some basic movements.' },
  { id: 'advanced', label: 'Advanced', description: 'I exercise regularly and am comfortable with challenging workouts.' },
];

export function selectWorkoutExperience(currentExperience, nextExperience) {
  return WORKOUT_EXPERIENCE_OPTIONS.some((option) => option.id === nextExperience)
    ? nextExperience
    : currentExperience;
}

export function canContinueWorkoutExperience(experience) {
  return WORKOUT_EXPERIENCE_OPTIONS.some((option) => option.id === experience);
}
