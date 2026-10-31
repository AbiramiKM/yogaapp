export const EQUIPMENT_OPTIONS = [
  { id: 'no_equipment', label: 'No equipment', description: 'Bodyweight exercises and floor practice.' },
  { id: 'chair_or_wall', label: 'Chair or wall', description: 'For balance and supported exercises.' },
  { id: 'resistance_band', label: 'Resistance band', description: 'For resistance-based movements.' },
  { id: 'light_weights', label: 'Light weights', description: 'For optional strength exercises.' },
];

export const EQUIPMENT_AVAILABILITY_OPTIONS = EQUIPMENT_OPTIONS;

export function toggleEquipment(currentEquipment, nextEquipment) {
  if (!EQUIPMENT_OPTIONS.some((option) => option.id === nextEquipment)) return currentEquipment;

  if (nextEquipment === 'no_equipment') {
    return currentEquipment.includes('no_equipment') ? [] : ['no_equipment'];
  }

  const withoutNoEquipment = currentEquipment.filter((item) => item !== 'no_equipment');
  return withoutNoEquipment.includes(nextEquipment)
    ? withoutNoEquipment.filter((item) => item !== nextEquipment)
    : [...withoutNoEquipment, nextEquipment];
}

export function skipEquipment() {
  return [];
}

export function canContinueEquipment(equipment) {
  return Array.isArray(equipment) && equipment.length > 0;
}