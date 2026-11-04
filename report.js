'use strict';

function renderReport(container, operations) {
  container.innerHTML = '<div class="report-intro"><p class="eyebrow">ORBIT / MÓDULO 02</p><h2>Aquí empieza tu reporte.</h2><p>Tienes <strong id="report-record-count"></strong> operaciones de práctica. Decide qué necesita ver tu destinatario y convierte esa idea en una vista verificable.</p><p>Tu espacio de trabajo es <code>report.js</code>. Consulta <code>docs/report-brief.md</code> antes de pedir cambios.</p></div>';
  container.querySelector('#report-record-count').textContent = operations.length;
}
