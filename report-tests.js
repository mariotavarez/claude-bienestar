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
    ['La búsqueda combina estado y texto sin distinguir acentos ni mayúsculas', () => {
      const report = buildReport(operationsForTest, 'pending', 'TECNOLOGIA');
      return report.rows.map(row => row.id).join(',') === 'OP003'
        && report.total === 45000 && buildReport(operationsForTest, 'pending', 'op001').rows.length === 0;
    }],
    ['El Markdown conserva solo las filas visibles y su total', () => {
      const report = buildReport(operationsForTest, 'pending', 'OP003');
      const markdown = reportMarkdown(report, 'Pendientes');
      return markdown.includes('Pendientes') && markdown.includes('OP003')
        && markdown.includes('450.00') && !markdown.includes('OP006') && !markdown.includes('OP001');
    }],
    ['El Markdown escapa separadores de tabla y saltos en una celda', () => {
      const row = {...operationsForTest[0], label:'a|b\nc'};
      return reportMarkdown(buildReport([row], 'all'), 'General').includes(String.raw`a\|b c`);
    }],
    ['El CSV escapa comillas, saltos y fórmulas', () => {
      const csv = reportCsv([{...operationsForTest[0],id:'=1+1',segment:'a,"b"\nc'}]);
      return csv.includes('"\'=1+1"') && csv.includes('"a,""b""\nc"');
    }]
  );
}
