import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {filterOperations} from '../web/src/filter.ts';
const {operations} = JSON.parse(readFileSync('fixtures/operations.json','utf8'));
for (const [segment, ids, cents] of [
  ['all',['OP001','OP002','OP003','OP004','OP005','OP006'],360000],
  ['tech',['OP001','OP003'],165000],
  ['home',['OP002','OP005'],100000],
  ['sports',['OP004','OP006'],95000]
]) test(`filterOperations: ${segment}`,()=>{
  const result=filterOperations(operations,segment);
  assert.deepEqual(result.map(operation=>operation.id),ids);
  assert.equal(result.reduce((sum,operation)=>sum+operation.amount_cents,0),cents);
});
