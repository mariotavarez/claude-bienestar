# Ruta guiada · construye tu equipo de Claude

Trabaja con el mentor. Copia un encargo, revisa la propuesta y autoriza guardarla.
La aplicación inicial ya abre sin instalación. El equipo agéntico lo creamos
juntos. Las hojas de workshop/templates/ son material de consulta y no se cargan
como agentes o skills activos.

## 1 · Abre y elige modelo
Abre la carpeta en VS Code y index.html en el navegador. En la terminal ejecuta
`claude --permission-mode default`. Dentro de Claude usa `/model` y elige Sonnet
si está disponible. Lee docs/model-guide.md para las alternativas.

## 2 · Define el encargo y el plan
Pide a Claude leer CONTRACT.md y DESIGN.md. Redacta el objetivo de Personal y
cobertura en docs/brief.md y crea reglas de interfaz, datos y revisión.
Guarda referencias con ejemplos y el recorrido de aceptación. Revisa el plan y
aprueba docs/plan.md antes de implementar. Usa los prompts del paso 3 del aula.

## 3 · Crea Leo
Usa workshop/templates/agents/leo-data.md y el prompt 4A del aula. Pide misión,
modelo sonnet, entradas, límites, contrato, flujo, ejemplos y entrega.
Revisa operaciones y reintentos. Autoriza .claude/agents/leo-data.md.

## 4 · Crea Ana
Usa su hoja y el prompt 4B. Modelo sonnet, diseño y accesibilidad, archivos de
interfaz, estados y contrato de Leo como entrada. Revisa y autoriza su archivo.

## 5 · Crea Eva
Usa su hoja y el prompt 4C. Modelo haiku, herramientas solo de lectura, checklist,
formato de hallazgos y pruebas pendientes. Revisa y autoriza su archivo.
Abre /agents y comprueba las tres definiciones y sus modelos.

## 6 · Crea la skill
Con workshop/templates/skills/expo-team/SKILL.md, pide la receta de activación
manual y referencias. Debe esperar el resultado de cada agente y coordinar
Leo → Ana → Eva → grupo. Revisa antes de guardar los archivos activos.

## 7 · Ejecuta y comprueba
Vuelve a abrir Claude en esta carpeta y ejecuta /expo-team. Observa cada encargo.
Registra Alex pendiente en Producción, confirma desde otra pantalla y recarga.
Deja otra persona pendiente en Acceso. Revisa cobertura y reintentos.
Dile a Claude qué observaste. Si Eva encuentra un defecto, el equipo lo corrige.

## 8 · Entrega
Guarda solo hechos comprobados en docs/activity-log.md. Muestra la app, agentes,
reglas, skill y evidencia. El hook de bitácora y MCP son demostraciones opcionales
del mentor. Apps Script y Google Sheets se preparan por el mentor.

Prompts completos y descargas: https://imaginatec.tech/sesion-3/
