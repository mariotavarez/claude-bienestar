# Misión Expo con Claude Code

El reto es crear dos agentes y una skill y usarlos para ampliar la app con Personal y cobertura.

1. Extrae el ZIP completo y abre index.html en el navegador.
2. Abre la carpeta en VS Code y ejecuta claude --permission-mode default en la terminal.
3. Con Claude revisa docs/brief.md y crea las reglas y referencias del paso 3. Aprueba el plan y guárdalo en docs/plan.md.
4. Completa los agentes leo-data y ana-ui con los prompts del aula.
5. Completa la skill /expo-team. La receta delega primero los datos a Leo y después la interfaz a Ana.
6. Ejecuta /expo-team y comprueba el padrón, la llegada y la cobertura en el navegador.
7. Entrega la app y los archivos de ambos agentes y de la skill.

El ZIP inicial incluye plantillas pendientes. El resuelto conserva los archivos completos de referencia. Usa nombres ficticios.

## Qué hace cada agente

Leo trabaja en operations.js. Implementa registerStaff, arrive y staff con el servicio existente. Ana trabaja en index.html, expo.js y expo.css. Conecta los controles con las funciones que entrega Leo.

## Demostración del mentor

Dos dispositivos pueden conectarse al mismo espacio del aula para compartir registros y llegadas. Apps Script copia los eventos a Google Sheets cuando el mentor sincroniza.

El MCP de lectura de incidentes es una demostración opcional. El proceso del mentor requiere Node 20 o superior y MISION_EXPO_TOKEN en su entorno privado. No lo necesita el alumno para abrir la app ni crear los agentes.

    claude mcp add --transport stdio --scope local mision-expo -- node ./mcp.mjs

Comprueba con /mcp las herramientas disponibles.

Los nombres de los archivos y carpetas están en inglés. El contenido del taller está en español.
