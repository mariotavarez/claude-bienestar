'use strict';

function renderReport(container, operations) {
  container.innerHTML = '<div class="report-intro"><p class="eyebrow">ORBIT / MÓDULO 02</p><h2>Aquí empieza tu reporte.</h2><p>Tienes <strong id="report-record-count"></strong> operaciones de práctica. Decide qué necesita ver tu destinatario y convierte esa idea en una vista verificable.</p><p>Escribe tus propias instrucciones en un archivo Markdown dentro de <code>docs/</code>. Usa ese archivo para explicarle a Claude qué quieres construir.</p></div>';
  container.querySelector('#report-record-count').textContent = operations.length;
}
