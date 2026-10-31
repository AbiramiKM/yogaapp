import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PRIMARY_FITNESS_GOALS,
  filterAdditionalGoals,
  selectPrimaryGoal,
  skipAdditionalGoals,
  toggleAdditionalGoal,
} from '../src/utils/primaryGoals.js';

test('offers the six approved primary goals', () => {
  assert.deepEqual(PRIMARY_FITNESS_GOALS.map((goal) => goal.label), [
    'Weight management',
    'Build strength',
    'Improve flexibility and mobility',
    'Improve balance and coordination',
    'General fitness',
    'Relaxation and stress management',
  ]);
});

test('starts with no primary goal selected', () => {
  assert.equal(selectPrimaryGoal(null, null), null);
});

test('selecting another goal replaces the existing single selection', () => {
  const firstSelection = selectPrimaryGoal(null, 'build_strength');
  const secondSelection = selectPrimaryGoal(firstSelection, 'general_fitness');
  assert.equal(firstSelection, 'build_strength');
  assert.equal(secondSelection, 'general_fitness');
  assert.equal(typeof secondSelection, 'string');
});

test('ignores values outside the approved goal list', () => {
  assert.equal(selectPrimaryGoal('build_strength', 'target_weight'), 'build_strength');
});

test('filters the selected primary goal from additional choices', () => {
  const choices = filterAdditionalGoals(PRIMARY_FITNESS_GOALS.map((goal) => goal.id), 'build_strength');
  assert.equal(choices.length, 5);
  assert.equal(choices.includes('build_strength'), false);
});

test('allows multiple additional goals and toggles them independently', () => {
  let selected = [];
  selected = toggleAdditionalGoal(selected, 'flexibility_mobility', 'build_strength');
  selected = toggleAdditionalGoal(selected, 'general_fitness', 'build_strength');
  assert.deepEqual(selected, ['flexibility_mobility', 'general_fitness']);
  selected = toggleAdditionalGoal(selected, 'flexibility_mobility', 'build_strength');
  assert.deepEqual(selected, ['general_fitness']);
});

test('does not allow adding the primary goal again', () => {
  assert.deepEqual(toggleAdditionalGoal(['general_fitness'], 'build_strength', 'build_strength'), ['general_fitness']);
});

test('skipping clears additional goals and is valid with no selection', () => {
  assert.deepEqual(skipAdditionalGoals(['general_fitness']), []);
  assert.deepEqual(skipAdditionalGoals([]), []);
});

