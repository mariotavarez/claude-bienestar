# Orbit · Módulo 2

Continuación del Orbit de Bienestar GS. Mantiene Vista general, Operaciones, Fuente de datos y las seis operaciones ficticias. Esta es la solución de referencia. Abre Reporte ejecutivo para revisar métricas, gráfica, resumen y CSV, búsqueda combinada, detalle de operaciones y exportación Markdown.

1. Descarga el ZIP o abre la rama `modulo-2` del mismo repositorio. Si trabajas con un ZIP, extráelo en otra carpeta para conservar tu práctica del módulo 1.
2. Abre `index.html` con doble clic. En el menú de Orbit, elige **Reporte ejecutivo**.
3. Abre esta carpeta en tu editor. Lee `CLAUDE.md` y `docs/report-brief.md`. Si ya tienes acceso a Claude Code, ábrelo en esta carpeta. Si usas Claude Desktop, comparte solo los archivos ficticios necesarios y aplica los cambios en tu editor.
4. Guarda los cambios y recarga `index.html` para verificarlos. Abre `pruebas.html` para comprobar la base y, cuando añadas la lógica del reporte, sus casos.

Orbit abre directamente desde el sistema de archivos. Los scripts son clásicos y cargan los datos locales; para que siga funcionando así, evita peticiones de red, importaciones de módulos y dependencias.

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Estructura y navegación de Orbit |
| `styles.css` | Estilos del panel y del reporte |
| `orbit.js` | Vista general, filtros, tabla y navegación |
| `report.js` | Vista de trabajo y futura lógica del reporte |
| `fixtures/operations.js` | Copia de los datos que carga el navegador |
| `fixtures/operations.json` | Datos de práctica para lectura y comprobaciones |
| `pruebas.html` y `pruebas.js` | Pruebas que puedes ejecutar en el navegador |

En GitHub Desktop, guarda primero tus cambios del módulo 1 con un commit en tu propia rama. Luego usa **Fetch origin** y **Current branch → modulo-2**. La rama `modulo-2-solucion` contiene el reporte completo para revisar después.
