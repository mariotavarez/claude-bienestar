'use strict';

/**
 * Filters Orbit operations and totals the visible amounts in integer MXN cents.
 * @param {{id: string, label: string, status: string, amount_cents: number}[]} operations
 * @param {string} [scope='all'] Orbit status or all statuses.
 * @param {string} [query=''] Optional ID or segment text.
 * @returns {{rows: Array, total: number, pending: number}} Rows and totals in cents.
 */
function buildReport(operations, scope = 'all', query = '') {
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const term = normalize(query.trim());
  const rows = operations.filter(row => (scope === 'all' || row.status === scope)
    && (!term || [row.id, row.label].some(value => normalize(value).includes(term))));
  const total = rows.reduce((sum, row) => sum + row.amount_cents, 0);
  const pending = rows.reduce((sum, row) => row.status === 'pending' ? sum + row.amount_cents : sum, 0);
  return {rows, total, pending};
}

/**
 * Serializes the displayed report, converting integer cents to MXN for readers.
 * @param {ReturnType<typeof buildReport>} report Calculated view data.
 * @param {string} label Human-readable filter name.
 * @returns {string} Markdown with the visible rows.
 */
function reportMarkdown(report, label) {
  const cell = value => String(value).replace(/[\r\n]+/g, ' ').replaceAll('\\', '\\\\')
    .replaceAll('|', '\\|').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const pesos = cents => (cents / 100).toFixed(2) + ' MXN';
  const lines = [
    '# Reporte ejecutivo de Orbit', '', `Selección: ${label}`, '',
    `- Operaciones: ${report.rows.length}`,
    `- Importe total: ${pesos(report.total)}`,
    `- Importe pendiente: ${pesos(report.pending)}`, '',
  ];
  if (!report.rows.length) return [...lines, 'Sin operaciones para esta selección.', ''].join('\n');
  return [...lines, '| ID | Segmento | Importe |', '| --- | --- | ---: |',
    ...report.rows.map(row => `| ${cell(row.id)} | ${cell(row.label)} | ${pesos(row.amount_cents)} |`), ''].join('\n');
}

function reportCsv(rows) {
  function csvCell(value) {
    const raw = String(value);
    const safe = /^[\s]*[=+@-]/.test(raw) ? "'" + raw : raw;
    return '"' + safe.replaceAll('"', '""') + '"';
  }
  const fields = ['ID', 'Fecha', 'Segmento', 'Estado', 'Importe MXN'];
  return '\uFEFF' + [fields, ...rows.map(row =>
    [row.id, row.date, row.segment, row.status, (row.amount_cents / 100).toFixed(2)]
  )].map(row => row.map(csvCell).join(',')).join('\r\n');
}

function renderReport(container, operations) {
  const choices = [['all','Vista general'], ['pending','Seguimiento de pendientes'], ['confirmed','Operaciones confirmadas']];
  container.innerHTML = `<div class="report-intro">
    <p class="eyebrow">ORBIT / REPORTE EJECUTIVO</p><h2>Los datos cuentan una historia.</h2>
    <p>Explora las mismas operaciones y comparte lo que comprobaste.</p>
  </div>
  <div class="report-controls">
    <div id="report-filter" class="filters"></div>
    <label for="report-search">Buscar por ID o segmento
      <input id="report-search" type="search" placeholder="Ej. Tecnología">
    </label>
  </div>
  <div class="metrics" id="report-metrics"></div>
  <section class="panel" aria-labelledby="report-chart-title">
    <p class="eyebrow">DISTRIBUCIÓN DEL IMPORTE</p><h2 id="report-chart-title">¿Dónde se concentra?</h2><div id="report-bars" class="bars"></div>
  </section>
  <section class="panel" aria-labelledby="report-rows-title">
    <h2 id="report-rows-title">Operaciones incluidas</h2>
    <p id="report-rows-count" role="status"></p>
    <div class="table-scroll"><table>
      <thead><tr><th scope="col">ID</th><th scope="col">Segmento</th><th scope="col">Importe</th></tr></thead>
      <tbody id="report-rows"></tbody>
    </table></div>
  </section>
  <section class="panel report-summary" aria-labelledby="report-summary-title">
    <h2 id="report-summary-title">Tu resumen en un párrafo</h2><p id="report-message"></p>
    <div class="report-footer"><button type="button" class="button" id="copy-summary">Copiar resumen</button><button type="button" class="button" id="download-report">Descargar CSV</button><button type="button" class="button" id="download-markdown">Descargar Markdown</button></div>
    <p id="report-feedback" role="status"></p>
    <textarea id="report-copy-fallback" aria-label="Resumen para copiar" rows="3" readonly hidden></textarea>
  </section>`;
  let scope = 'all';
  let report;
  const message = byId('report-message');
  const feedback = byId('report-feedback');
  const fallback = byId('report-copy-fallback');
  const download = byId('download-report');
  const downloadMarkdown = byId('download-markdown');
  const search = byId('report-search');
  let label;

  function drawReport() {
    report = buildReport(operations, scope, search.value);
    const {rows,total,pending} = report;
    label = choices.find(([key]) => key === scope)[1];
    const groups = segments.map(([key,name]) => [name, sumCents(rows.filter(row => row.segment === key))]);
    byId('report-metrics').replaceChildren(metric('Importe del reporte', money(total)),
      metric('Operaciones', rows.length), metric('Por confirmar', money(pending)));
    byId('report-bars').replaceChildren(...groups.map(([name,cents]) => bar(name,cents,total)));
    const tableRows = rows.map(row => {
      const line = document.createElement('tr');
      for (const value of [row.id, row.label, money(row.amount_cents)]) {
        line.insertCell().textContent = value;
      }
      return line;
    });
    byId('report-rows').replaceChildren(...tableRows);
    byId('report-rows-count').textContent = rows.length ? `Operaciones visibles: ${rows.length}` : 'Sin operaciones para esta selección.';
    const distribution = groups.filter(([, cents]) => cents > 0).map(([name,cents]) => name + ' ' + money(cents));
    message.textContent = rows.length ?
      label + '. ' + rows.length + (rows.length === 1 ? ' operación por ' : ' operaciones por ') + money(total) +
      ' MXN. Pendiente: ' + money(pending) + ' MXN.' + (distribution.length ? ' Por segmento: ' + distribution.join(', ') + '.' : '') :
      label + '. Sin operaciones para esta selección.';
    download.disabled = rows.length === 0;
    downloadMarkdown.disabled = rows.length === 0;
    fallback.hidden = true;
    feedback.textContent = '';
  }

  byId('report-filter').append(dropdown('Qué quieres mostrar', choices, scope, key => {
    scope = key;
    drawReport();
  }));
  search.addEventListener('input', drawReport);
  byId('copy-summary').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.textContent);
      fallback.hidden = true;
      feedback.textContent = 'Resumen copiado.';
    } catch {
      fallback.hidden = false;
      fallback.value = message.textContent;
      fallback.select();
      feedback.textContent = 'El resumen está seleccionado. Cópialo con tu teclado.';
    }
  });
  function downloadReport(content, type, extension) {
    const url = URL.createObjectURL(new Blob([content], {type}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orbit-' + scope + '.' + extension;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  download.addEventListener('click', () => downloadReport(reportCsv(report.rows), 'text/csv;charset=utf-8', 'csv'));
  downloadMarkdown.addEventListener('click', () => downloadReport(reportMarkdown(report, label), 'text/markdown;charset=utf-8', 'md'));
  drawReport();
}
