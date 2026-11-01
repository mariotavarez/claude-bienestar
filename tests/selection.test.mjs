import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {selectOperations, summarizeOperations} from '../web/src/selection.ts';
const {operations} = JSON.parse(readFileSync('fixtures/operations.json', 'utf8'));

test('technology + confirmed keeps only OP001 and 120000 cents', () => {
  const rows = selectOperations(operations, {segment:'tech', status:'confirmed'});
  assert.deepEqual(rows.map(row => row.id), ['OP001']);
  assert.deepEqual(summarizeOperations(rows), {count:1, total_cents:120000});
});
test('all + pending keeps OP003 and OP006', () => {
  assert.deepEqual(selectOperations(operations, {segment:'all',status:'pending'}).map(row=>row.id), ['OP003','OP006']);
});
test('empty input returns zero instead of NaN', () => {
  assert.deepEqual(summarizeOperations(selectOperations([], {segment:'tech',status:'confirmed'})), {count:0,total_cents:0});
});
test('all + all preserves every operation and does not mutate input', () => {
  const original = structuredClone(operations);
  assert.deepEqual(selectOperations(operations,{segment:'all',status:'all'}), operations);
  assert.deepEqual(operations, original);
});
test('home + pending has no matches; empty result is valid', () => {
  assert.deepEqual(selectOperations(operations,{segment:'home',status:'pending'}), []);
});
