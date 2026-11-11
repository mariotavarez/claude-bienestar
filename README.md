# Misión Expo · punto de partida

La app de la expo de mayo 2027 abre sin instalar dependencias. Durante la clase
construiremos Personal y cobertura usando Claude Code y un equipo de agentes.

1. Extrae toda la carpeta y abre index.html en el navegador.
2. Abre la carpeta en VS Code y Terminal → Nueva terminal.
3. Ejecuta `claude --permission-mode default`. Dentro de Claude usa /model para
   elegir Sonnet disponible.
4. Sigue los ocho pasos del aula y la guía del alumno.

Aula, presentación, prompts y descargas: https://imaginatec.tech/sesion-3/

## Carpetas para construir con el grupo

- .claude/agents/ para Leo, Ana y Eva.
- .claude/rules/ para reglas de datos, interfaz y revisión.
- .claude/skills/expo-team/references/ para la skill y sus referencias.
- docs/ para encargo, plan y tarea escrita del equipo.
- docs/references/ para ejemplos y comprobaciones.

Estas carpetas llegan sin documentos .md. Los archivos .gitkeep conservan la
estructura en Git. En clase definimos qué debe pasar y pedimos a Claude que
redacte los documentos. Los revisamos y los guardamos antes de implementar.
README.md, DESIGN.md y CONTRACT.md son referencias de la aplicación preparada.
CLAUDE.md y los documentos del equipo se crean durante la práctica.

Primero guardamos las instrucciones en docs/. Después enviamos mensajes cortos
para que Claude lea el documento y ejecute una tarea concreta. Al terminar
comprobamos registro, llegada y cobertura en el navegador.

El ZIP resuelto y la guía privada del mentor contienen las soluciones completas.
Usa nombres ficticios. La conexión del aula y Google Sheets los prepara el mentor.
