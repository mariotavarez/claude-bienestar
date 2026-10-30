import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {filterOperations} from '../web/src/filter.ts';

const data = JSON.parse(readFileSync('fixtures/operations.json', 'utf8'));
const segments = ['all', 'tech', 'home', 'sports'];
const rows = segments.map(segment => {
  const visibleOperations = filterOperations(data.operations, segment);
  return {segment, operations: visibleOperations.length, total_cents: visibleOperations.reduce((sum, operation) => sum + operation.amount_cents, 0), ids: visibleOperations.map(operation => operation.id).join(', ')};
});
console.table(rows);
console.log('Observation of the current code. Compare with docs/expected-result.md.');
if (process.argv.includes('--save')) {
  mkdirSync('evidence', {recursive: true});
  const timestamp = new Date().toISOString();
  const report = {timestamp, file: 'web/src/filter.ts', sha256: createHash('sha256').update(readFileSync('web/src/filter.ts')).digest('hex'), rows};
  const filename = `evidence/observation-${timestamp.replace(/[:.]/g, '-')}.json`;
  writeFileSync(filename, JSON.stringify(report, null, 2));
  console.log('Saved to ' + filename);
}
