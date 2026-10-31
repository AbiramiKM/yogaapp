import assert from 'node:assert/strict';
import test from 'node:test';
import {
  WORKOUT_DURATION_OPTIONS,
  canContinueWorkoutDuration,
  selectWorkoutDuration,
} from '../src/utils/workoutDuration.js';

test('exposes exactly the four requested workout durations', () => {
  assert.deepEqual(WORKOUT_DURATION_OPTIONS, [
    { id: '10', label: '10 minutes', description: 'A short, focused session for busy days.' },
    { id: '15', label: '15 minutes', description: 'A balanced session that fits most routines.' },
    { id: '20', label: '20 minutes', description: 'A fuller session with more variety.' },
    { id: '30', label: '30 minutes', description: 'A longer, more complete practice.' },
  ]);
});

test('starts unselected with Continue disabled', () => {
  assert.equal(selectWorkoutDuration(null, null), null);
  assert.equal(canContinueWorkoutDuration(null), false);
});

test('each duration including 30 minutes is a valid single selection', () => {
  for (const option of WORKOUT_DURATION_OPTIONS) {
    const selected = selectWorkoutDuration(null, option.id);
    assert.equal(selected, option.id);
    assert.equal(canContinueWorkoutDuration(selected), true);
  }
});

test('a new choice replaces the previous choice', () => {
  assert.equal(selectWorkoutDuration('10', '20'), '20');
});

test('invalid choices are ignored', () => {
  assert.equal(selectWorkoutDuration('15', '45'), '15');
  assert.equal(canContinueWorkoutDuration('45'), false);
});