function addReportTests(testCases) {
  const operationsForTest = ORBIT_FIXTURE.operations;
  const expectedSelections = [
    ['all', 6, 360000],
    ['pending', 2, 75000],
    ['confirmed', 4, 285000],
  ];
  for (const [scope, count, total] of expectedSelections) {
    testCases.push(['Selección ' + scope + ': cantidad e importe', () => {
      const report = buildReport(operationsForTest, scope);
      return report.rows.length === count && report.total === total;
    }]);
  }
  testCases.push(
    ['Las pendientes son OP003 y OP006', () => buildReport(operationsForTest, 'pending').rows.map(row => row.id).join(',') === 'OP003,OP006'],
    ['La lista vacía devuelve ceros', () => {
      const report = buildReport([], 'pending');
      return !report.rows.length && report.total === 0 && report.pending === 0;
    }],
    ['El CSV solo exporta las filas de la selección', () => {
      const csv = reportCsv(buildReport(operationsForTest, 'pending').rows);
      return csv.includes('OP003') && csv.includes('OP006') && !csv.includes('OP001') && csv.includes('450.00') && csv.includes('300.00');
    }],
    ['El CSV escapa comillas, saltos y fórmulas', () => {
      const csv = reportCsv([{...operationsForTest[0],id:'=1+1',segment:'a,"b"\nc'}]);
      return csv.includes('"\'=1+1"') && csv.includes('"a,""b""\nc"');
    }]
  );
}
