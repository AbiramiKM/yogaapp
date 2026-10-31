import assert from 'node:assert/strict';
import test from 'node:test';
import {
  WORKOUT_PREFERENCE_OPTIONS,
  canContinueWorkoutPreference,
  selectWorkoutPreference,
} from '../src/utils/workoutPreference.js';

test('exposes exactly the four requested workout preferences', () => {
  assert.deepEqual(WORKOUT_PREFERENCE_OPTIONS, [
    { id: 'yoga', label: 'Yoga', description: 'Focus on flexibility, balance and mindful movement.' },
    { id: 'strength', label: 'Strength', description: 'Focus on building strength with bodyweight exercises.' },
    { id: 'both', label: 'Both', description: 'Combine yoga and strength workouts.' },
    { id: 'not_sure', label: 'Not sure', description: 'Help me discover what works for me.' },
  ]);
});

test('starts unselected with Continue disabled', () => {
  assert.equal(selectWorkoutPreference(null, null), null);
  assert.equal(canContinueWorkoutPreference(null), false);
});

test('each option including Not sure is a valid single selection', () => {
  for (const option of WORKOUT_PREFERENCE_OPTIONS) {
    const selected = selectWorkoutPreference(null, option.id);
    assert.equal(selected, option.id);
    assert.equal(canContinueWorkoutPreference(selected), true);
  }
});

test('a new choice replaces the previous choice', () => {
  assert.equal(selectWorkoutPreference('yoga', 'strength'), 'strength');
});

test('invalid choices are ignored', () => {
  assert.equal(selectWorkoutPreference('both', 'none'), 'both');
  assert.equal(canContinueWorkoutPreference('none'), false);
});
