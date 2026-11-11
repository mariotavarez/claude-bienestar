# Misión Expo · práctica de dos horas

La app abre sin instalar dependencias. En clase crearemos únicamente:
1. .claude/agents/leo-data.md
2. .claude/agents/ana-ui.md
3. .claude/skills/expo-team/SKILL.md

## Ya preparado
- docs/task.md · problema, encargos, activación y checklist.
- docs/plan.md · entregas y ritmo de la clase.
- .claude/rules/project.md · una sola regla de datos e interfaz.
- CLAUDE.md, DESIGN.md y CONTRACT.md · contexto de la app.

## Empieza
Extrae toda la carpeta, abre index.html en el navegador y la carpeta en VS Code.
En Terminal → Nueva terminal ejecuta `claude --permission-mode default`.
Empieza con Sonnet disponible. Sigue la guía del aula; no necesitas practicar
una lista de comandos. Los agentes y la skill se crean con Claude durante la
explicación. Las carpetas vacías se conservan en Git mediante .gitkeep.

Al pedir construir Personal y cobertura, Claude puede elegir expo-team por su
description. La skill coordina a Leo y Ana. Si no se activa, escribe /expo-team.
También puedes nombrar un agente: «Usa leo-data para revisar la validación».
Comprueba la delegación observada; no asumas que el nombre obliga a ejecutarla.

Aula y guías: https://imaginatec.tech/sesion-3/
El ZIP resuelto conserva la app terminada y los tres archivos de referencia.
Usa nombres ficticios. El mentor prepara conexión y Google Sheets.


## Conexión compartida

La conexión del aula dura 7 días desde que el mentor la crea. Pégala en «Conectar aula» una sola vez: este navegador la recuerda al recargar y al volver a abrir el mismo proyecto desde la misma dirección. Otro navegador, perfil, equipo o puerto necesita que la pegues de nuevo.

«Desconectar aula» olvida la conexión de este navegador y vuelve a la simulación local. Si vence o el mentor la renueva, la app pide reconectar. Un fallo de red conserva la conexión y no cambia silenciosamente al modo local. No se suben automáticamente capturas hechas antes de conectar.

Google Sheets recibe los registros cuando el mentor ejecuta Orbit → Sincronizar ahora o activa la sincronización cada minuto. No incluyas la clave en Git, documentos ni prompts de Claude.
