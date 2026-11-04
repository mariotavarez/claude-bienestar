import type {Operation} from '../types';
import './report-starter.css';

// Build your report here with Claude. Keep the operations prop as its data source.
export function ReportBuilder({operations}:{operations:Operation[]}) {
 return <section className="report-starter">
  <span>ORBIT / TU NUEVA FUNCIÓN</span>
  <h2>Aquí empieza tu reporte.</h2>
  <p>Tienes {operations.length} operaciones de práctica. Decide qué quieres comunicar y pide a Claude tu primera propuesta.</p>
  <div><article><b>01</b><h3>Diseña</h3><p>Elige destinatario, título y presentación.</p></article><article><b>02</b><h3>Construye</h3><p>Métricas, barras y un resumen con tus datos.</p></article><article><b>03</b><h3>Comparte</h3><p>Copia el resumen y descarga un CSV.</p></article></div>
  <footer>Tu espacio de trabajo: <code>web/src/components/ReportBuilder.tsx</code><br/>Abre el paso 3 del aula para conversar con Claude.</footer>
 </section>;
}
