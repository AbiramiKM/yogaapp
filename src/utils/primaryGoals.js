export const PRIMARY_FITNESS_GOALS = [
  { id: 'weight_management', label: 'Weight management' },
  { id: 'build_strength', label: 'Build strength' },
  { id: 'flexibility_mobility', label: 'Improve flexibility and mobility' },
  { id: 'balance_coordination', label: 'Improve balance and coordination' },
  { id: 'general_fitness', label: 'General fitness' },
  { id: 'relaxation_stress_management', label: 'Relaxation and stress management' },
];

export function selectPrimaryGoal(currentGoal, nextGoal) {
  return PRIMARY_FITNESS_GOALS.some((goal) => goal.id === nextGoal) ? nextGoal : currentGoal;
}

export function filterAdditionalGoals(goalIds, primaryGoal) {
  const allowed = new Set(PRIMARY_FITNESS_GOALS.filter((goal) => goal.id !== primaryGoal).map((goal) => goal.id));
  return [...new Set(goalIds)].filter((goalId) => allowed.has(goalId));
}

export function toggleAdditionalGoal(currentGoals, nextGoal, primaryGoal) {
  if (nextGoal === primaryGoal) return currentGoals;
  if (!PRIMARY_FITNESS_GOALS.some((goal) => goal.id === nextGoal)) return currentGoals;
  return currentGoals.includes(nextGoal)
    ? currentGoals.filter((goal) => goal !== nextGoal)
    : [...currentGoals, nextGoal];
}

export function skipAdditionalGoals() {
  return [];
}

