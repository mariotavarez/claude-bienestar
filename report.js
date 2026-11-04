'use strict';

function buildReport(operations, scope = 'all') {
  const rows = operations.filter(row => scope === 'all' || row.status === scope);
  const total = rows.reduce((sum, row) => sum + row.amount_cents, 0);
  const pending = rows.reduce((sum, row) => row.status === 'pending' ? sum + row.amount_cents : sum, 0);
  return {rows, total, pending};
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
  <div id="report-filter" class="filters"></div>
  <div class="metrics" id="report-metrics" style="margin-top:16px"></div>
  <section class="panel" aria-labelledby="report-chart-title">
    <p class="eyebrow">DISTRIBUCIÓN DEL IMPORTE</p><h2 id="report-chart-title">¿Dónde se concentra?</h2><div id="report-bars" class="bars"></div>
  </section>
  <section class="panel report-summary" aria-labelledby="report-summary-title">
    <h2 id="report-summary-title">Tu resumen en un párrafo</h2><p id="report-message"></p>
    <div class="report-footer"><button type="button" class="button" id="copy-summary">Copiar resumen</button><button type="button" class="button" id="download-report">Descargar CSV</button></div>
    <p id="report-feedback" role="status"></p>
    <textarea id="report-copy-fallback" aria-label="Resumen para copiar" rows="3" readonly hidden></textarea>
  </section>`;
  let scope = 'all';
  let report;
  const message = byId('report-message');
  const feedback = byId('report-feedback');
  const fallback = byId('report-copy-fallback');
  const download = byId('download-report');

  function drawReport() {
    report = buildReport(operations, scope);
    const {rows,total,pending} = report;
    const label = choices.find(([key]) => key === scope)[1];
    const groups = segments.map(([key,name]) => [name, sumCents(rows.filter(row => row.segment === key))]);
    byId('report-metrics').replaceChildren(metric('Importe del reporte', money(total)),
      metric('Operaciones', rows.length), metric('Por confirmar', money(pending)));
    byId('report-bars').replaceChildren(...groups.map(([name,cents]) => bar(name,cents,total)));
    const distribution = groups.filter(([, cents]) => cents > 0).map(([name,cents]) => name + ' ' + money(cents));
    message.textContent = rows.length ?
      label + '. ' + rows.length + (rows.length === 1 ? ' operación por ' : ' operaciones por ') + money(total) +
      ' MXN. Pendiente: ' + money(pending) + ' MXN.' + (distribution.length ? ' Por segmento: ' + distribution.join(', ') + '.' : '') :
      label + '. Sin operaciones para esta selección.';
    download.disabled = rows.length === 0;
    fallback.hidden = true;
    feedback.textContent = '';
  }

  byId('report-filter').append(dropdown('Qué quieres mostrar', choices, scope, key => {
    scope = key;
    drawReport();
  }));
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
  download.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([reportCsv(report.rows)], {type:'text/csv;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orbit-' + scope + '.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  drawReport();
}
