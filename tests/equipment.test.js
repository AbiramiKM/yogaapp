import assert from 'node:assert/strict';
import test from 'node:test';
import {
  EQUIPMENT_OPTIONS,
  canContinueEquipment,
  skipEquipment,
  toggleEquipment,
} from '../src/utils/equipment.js';

test('exposes exactly the four requested equipment options', () => {
  assert.deepEqual(EQUIPMENT_OPTIONS, [
    { id: 'no_equipment', label: 'No equipment', description: 'Bodyweight exercises and floor practice.' },
    { id: 'chair_or_wall', label: 'Chair or wall', description: 'For balance and supported exercises.' },
    { id: 'resistance_band', label: 'Resistance band', description: 'For resistance-based movements.' },
    { id: 'light_weights', label: 'Light weights', description: 'For optional strength exercises.' },
  ]);
});

test('starts with no equipment selected', () => {
  assert.deepEqual(toggleEquipment([], 'none'), []);
  assert.deepEqual(skipEquipment(), []);
  assert.equal(canContinueEquipment([]), false);
});

test('allows multiple equipment selections', () => {
  let selected = [];
  selected = toggleEquipment(selected, 'chair_or_wall');
  selected = toggleEquipment(selected, 'light_weights');
  assert.deepEqual(selected, ['chair_or_wall', 'light_weights']);
});

test('selecting No equipment clears all other selections', () => {
  const selected = toggleEquipment(['chair_or_wall', 'resistance_band'], 'no_equipment');
  assert.deepEqual(selected, ['no_equipment']);
});

test('selecting another option clears No equipment', () => {
  const selected = toggleEquipment(['no_equipment'], 'resistance_band');
  assert.deepEqual(selected, ['resistance_band']);
});

test('toggling No equipment removes it when already selected', () => {
  assert.deepEqual(toggleEquipment(['no_equipment'], 'no_equipment'), []);
});

test('toggling another selected option removes it', () => {
  assert.deepEqual(toggleEquipment(['chair_or_wall', 'light_weights'], 'chair_or_wall'), ['light_weights']);
});

test('invalid choices are ignored', () => {
  assert.deepEqual(toggleEquipment(['light_weights'], 'unknown'), ['light_weights']);
  assert.equal(canContinueEquipment('not-a-list'), false);
});

test('Skip saves an empty list', () => {
  assert.deepEqual(skipEquipment(['chair_or_wall']), []);
});