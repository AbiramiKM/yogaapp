export const WEEKLY_AVAILABILITY_OPTIONS = [
  { id: '1_2_days', label: '1–2 days', description: 'A little time each week.' },
  { id: '3_4_days', label: '3–4 days', description: 'A regular weekly routine.' },
  { id: '5_6_days', label: '5–6 days', description: 'A more frequent routine.' },
  { id: 'every_day', label: 'Every day', description: 'I have time most days.' },
];

export const DAYS_PER_WEEK_OPTIONS = WEEKLY_AVAILABILITY_OPTIONS;
export const AVAILABILITY_OPTIONS = WEEKLY_AVAILABILITY_OPTIONS;
export const DAYS_AVAILABLE_OPTIONS = WEEKLY_AVAILABILITY_OPTIONS;
export const WEEKLY_AVAILABILITY_CHOICES = WEEKLY_AVAILABILITY_OPTIONS;

export function selectWeeklyAvailability(currentAvailability, nextAvailability) {
  if (nextAvailability === null) return null;
  return WEEKLY_AVAILABILITY_OPTIONS.some((option) => option.id === nextAvailability)
    ? nextAvailability
    : currentAvailability;
}

export const selectDaysPerWeek = selectWeeklyAvailability;
export const selectAvailability = selectWeeklyAvailability;
export const selectDaysAvailable = selectWeeklyAvailability;

export function canContinueWeeklyAvailability(availability) {
  return WEEKLY_AVAILABILITY_OPTIONS.some((option) => option.id === availability);
}

export const canContinueDaysPerWeek = canContinueWeeklyAvailability;
export const canContinueAvailability = canContinueWeeklyAvailability;
export const canContinueDaysAvailable = canContinueWeeklyAvailability;

export function skipWeeklyAvailability() {
  return null;
}

export const skipDaysPerWeek = skipWeeklyAvailability;
export const skipAvailability = skipWeeklyAvailability;
export const skipDaysAvailable = skipWeeklyAvailability;