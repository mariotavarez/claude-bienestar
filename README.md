# Misión Expo · Arquitectura de Claude Code

La aplicación abre sin instalación. En clase crearemos un equipo de tres agentes
y una skill para añadir Personal y cobertura al tablero de la expo de mayo 2027.

## Empieza aquí
1. Extrae toda la carpeta y abre index.html en el navegador.
2. Abre la carpeta en VS Code. En Terminal → Nueva terminal ejecuta
   `claude --permission-mode default`.
3. Dentro de Claude usa /model y elige Sonnet disponible.
4. Sigue docs/workshop.md y los ocho pasos del aula.

Aula, presentación, prompts y guías: https://imaginatec.tech/sesion-3/

## Qué crearemos juntos
| Pieza | Responsabilidad | Modelo propuesto |
| --- | --- | --- |
| Leo · leo-data | Datos, validación, registro y llegada | sonnet |
| Ana · ana-ui | Formulario, estados, foco y cobertura | sonnet |
| Eva · eva-review | Checklist y hallazgos de lectura | haiku |
| /expo-team | Coordina entregas desde la sesión principal | Modelo de la sesión |

Opus es una opción para decisiones complejas o fallos difíciles. Lee
`docs/model-guide.md` para disponibilidad, límites y cambio de contexto.

## Inicial y resuelto
El inicial conserva hojas elaboradas en workshop/templates/. Durante la práctica
Claude crea los agentes activos en .claude/agents/ y la skill en .claude/skills/.
Las reglas y referencias también se crean con el grupo. No son archivos vacíos.
El ZIP resuelto incluye las definiciones completas y la app terminada.

Leo entrega el contrato antes de que Ana implemente la pantalla. Eva revisa
archivos y el grupo ejecuta las pruebas. El alcance de cada agente es una
instrucción y no una restricción técnica del sistema de archivos.

## Registro compartido
Dos dispositivos con la misma conexión del aula comparten registros y llegadas.
Apps Script copia los eventos a Google Sheets cuando el mentor sincroniza.
La simulación local funciona en dos pestañas del mismo navegador.

## Demostración opcional del mentor
MCP Expo ofrece lectura de incidentes. Su proceso necesita Node 20 o superior
y MISION_EXPO_TOKEN en el entorno privado del mentor. El alumno no instala Node
para abrir la app, crear agentes o completar la función.

    claude mcp add --transport stdio --scope local mision-expo -- node ./mcp.mjs

Comprueba /mcp. No guardes conexiones ni tokens en prompts o archivos del taller.
Todos los nombres de archivos están en inglés; el contenido didáctico está en español.
