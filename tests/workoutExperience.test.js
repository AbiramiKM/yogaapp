import assert from 'node:assert/strict';
import test from 'node:test';
import {
  WORKOUT_EXPERIENCE_OPTIONS,
  canContinueWorkoutExperience,
  selectWorkoutExperience,
} from '../src/utils/workoutExperience.js';

test('exposes exactly the three specified workout experience options', () => {
  assert.deepEqual(WORKOUT_EXPERIENCE_OPTIONS, [
    { id: 'beginner', label: 'Beginner', description: "I'm new to working out or returning after a long break." },
    { id: 'some_experience', label: 'Some experience', description: 'I exercise occasionally and know some basic movements.' },
    { id: 'advanced', label: 'Advanced', description: 'I exercise regularly and am comfortable with challenging workouts.' },
  ]);
});

test('does not preselect an experience and keeps Continue disabled', () => {
  assert.equal(selectWorkoutExperience(null, null), null);
  assert.equal(canContinueWorkoutExperience(null), false);
});

test('allows each experience option and enables Continue after selection', () => {
  for (const option of WORKOUT_EXPERIENCE_OPTIONS) {
    const selected = selectWorkoutExperience(null, option.id);
    assert.equal(selected, option.id);
    assert.equal(canContinueWorkoutExperience(selected), true);
  }
});

test('selection is single-valued and a new choice replaces the previous one', () => {
  const selected = selectWorkoutExperience('beginner', 'advanced');
  assert.equal(selected, 'advanced');
  assert.equal(typeof selected, 'string');
});

test('ignores invalid experience values', () => {
  assert.equal(selectWorkoutExperience('some_experience', 'expert'), 'some_experience');
  assert.equal(canContinueWorkoutExperience('expert'), false);
});
