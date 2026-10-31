export function calculateBmi(heightCm, weightKg) {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  const heightMetres = heightCm / 100;
  const bmi = weightKg / (heightMetres * heightMetres);
  return Number.isFinite(bmi) ? bmi : null;
}

export function roundBmi(bmi) {
  return Math.round((bmi + Number.EPSILON) * 10) / 10;
}

export function formatBmi(bmi) {
  return roundBmi(bmi).toFixed(1);
}

export function getBmiCategory(bmi) {
  if (!Number.isFinite(bmi) || bmi <= 0) return null;

  const roundedBmi = roundBmi(bmi);
  if (roundedBmi < 18.5) return 'Underweight range';
  if (roundedBmi < 25) return 'Healthy-weight range';
  if (roundedBmi < 30) return 'Overweight range';
  return 'Obesity range';
}
