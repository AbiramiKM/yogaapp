import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateBmi, formatBmi, getBmiCategory } from '../src/utils/bmi.js';

test('calculates and rounds BMI from entered height and weight', () => {
  const bmi = calculateBmi(170, 70);
  assert.equal(formatBmi(bmi), '24.2');
  assert.equal(getBmiCategory(bmi), 'Healthy-weight range');
});

test('classifies the underweight range', () => {
  const bmi = calculateBmi(160, 45);
  assert.equal(formatBmi(bmi), '17.6');
  assert.equal(getBmiCategory(bmi), 'Underweight range');
});

test('classifies the overweight range at 25.0', () => {
  const bmi = calculateBmi(160, 64);
  assert.equal(formatBmi(bmi), '25.0');
  assert.equal(getBmiCategory(bmi), 'Overweight range');
});

test('classifies the obesity range at 30.0', () => {
  const bmi = calculateBmi(170, 86.7);
  assert.equal(formatBmi(bmi), '30.0');
  assert.equal(getBmiCategory(bmi), 'Obesity range');
});

test('uses one decimal place for BMI category thresholds', () => {
  assert.equal(getBmiCategory(18.4), 'Underweight range');
  assert.equal(getBmiCategory(18.5), 'Healthy-weight range');
  assert.equal(getBmiCategory(24.9), 'Healthy-weight range');
  assert.equal(getBmiCategory(25), 'Overweight range');
  assert.equal(getBmiCategory(29.9), 'Overweight range');
  assert.equal(getBmiCategory(30), 'Obesity range');
});

test('returns null for invalid measurements or BMI', () => {
  assert.equal(calculateBmi(0, 70), null);
  assert.equal(calculateBmi(170, Number.NaN), null);
  assert.equal(getBmiCategory(Number.NaN), null);
});
