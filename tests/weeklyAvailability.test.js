import assert from 'node:assert/strict';
import test from 'node:test';
import {
  WEEKLY_AVAILABILITY_OPTIONS,
  canContinueWeeklyAvailability,
  selectWeeklyAvailability,
  skipWeeklyAvailability,
} from '../src/utils/weeklyAvailability.js';

test('exposes exactly the four requested weekly availability options', () => {
  assert.deepEqual(WEEKLY_AVAILABILITY_OPTIONS, [
    { id: '1_2_days', label: '1–2 days', description: 'A little time each week.' },
    { id: '3_4_days', label: '3–4 days', description: 'A regular weekly routine.' },
    { id: '5_6_days', label: '5–6 days', description: 'A more frequent routine.' },
    { id: 'every_day', label: 'Every day', description: 'I have time most days.' },
  ]);
});

test('starts unselected with Continue disabled', () => {
  assert.equal(selectWeeklyAvailability(null, null), null);
  assert.equal(canContinueWeeklyAvailability(null), false);
});

test('each option is a valid single selection', () => {
  for (const option of WEEKLY_AVAILABILITY_OPTIONS) {
    const selected = selectWeeklyAvailability(null, option.id);
    assert.equal(selected, option.id);
    assert.equal(canContinueWeeklyAvailability(selected), true);
  }
});

test('a new choice replaces the previous choice', () => {
  assert.equal(selectWeeklyAvailability('1_2_days', '5_6_days'), '5_6_days');
});

test('invalid choices are ignored', () => {
  assert.equal(selectWeeklyAvailability('3_4_days', 'not_an_option'), '3_4_days');
  assert.equal(canContinueWeeklyAvailability('not_an_option'), false);
});

test('Skip saves null', () => {
  assert.equal(skipWeeklyAvailability(), null);
  assert.equal(selectWeeklyAvailability('every_day', null), null);
});