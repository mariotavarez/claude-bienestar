'use strict';

const testCases = [
  ['Los IDs de las operaciones son únicos', () => new Set(ORBIT_FIXTURE.operations.map(row => row.id)).size === ORBIT_FIXTURE.operations.length],
  ['Todos los importes se guardan en centavos enteros', () => ORBIT_FIXTURE.operations.every(row => Number.isInteger(row.amount_cents))],
];

addReportTests(testCases);

const testList = document.getElementById('tests');
let failed = 0;
for (const [title, check] of testCases) {
  const row = document.createElement('li');
  try {
    if (!check()) throw new Error('El resultado no coincide');
    row.textContent = '✓ ' + title;
  } catch (error) {
    failed++;
    row.textContent = '✗ ' + title + ' · ' + error.message;
  }
  testList.append(row);
}
document.getElementById('test-result').textContent = (testCases.length - failed) + ' de ' + testCases.length + ' pruebas pasaron';
