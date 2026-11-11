# Elección de modelo para el taller

| Trabajo | Propuesta | Motivo y límite |
| --- | --- | --- |
| Sesión principal y coordinación | Sonnet | Punto de partida para plan e implementación. |
| Leo y Ana | sonnet | Encargos de datos e interfaz con varios criterios. |
| Eva y checklist acotado | haiku | Revisión de lectura corta y explícita; el grupo prueba la app. |
| Decisiones complejas o fallos difíciles | Opus | Opción para analizar alternativas; vuelve al modelo habitual al cerrar. |

Los aliases sonnet, opus y haiku se resuelven al modelo disponible en tu proveedor.
Comprueba /model en la sesión y /agents para cada agente. El modelo del agente
se configura en su YAML; cambiar /model en la sesión no reemplaza un model
explícito del agente. inherit usa el modelo de la sesión principal.

Si un alias no está disponible, pide cambiar el YAML a inherit y confirma el
modelo principal disponible. No uses versiones fijas del curso ni prometas un
costo concreto. Las llamadas de subagentes también consumen uso.

## Antes de cambiar de tarea
Guarda encargo, contrato, decisiones y pruebas pendientes en los documentos.
Abre otra sesión desde esta carpeta y pide leer solo los archivos necesarios.
Una sesión nueva empieza sin el historial anterior; su contexto útil debe venir
de esos documentos. No garantiza ahorrar tokens si vuelves a cargar todo.

## Comandos que puedes mostrar
- /model para escoger modelo de la conversación.
- /agents para revisar definiciones, modelo y herramientas de cada agente.
- /context para inspeccionar el contexto de la conversación.
- /usage para consultar los límites de uso disponibles en tu cuenta.
- /compact para resumir una conversación larga; comprueba lo que se conserva.
- /clear para reiniciar tras guardar el trabajo; no reemplaza tus documentos.
- /help para comprobar los comandos de tu versión.

## Referencias oficiales
- https://code.claude.com/docs/en/model-config
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/skills
