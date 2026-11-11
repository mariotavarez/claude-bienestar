# Misión Expo · tarea del equipo

## Problema y resultado
La expo abre pronto. Coordinación ve personas asignadas, pero necesita saber
quién llegó y qué zonas siguen sin cobertura. Construye Personal y cobertura
sobre la app preparada. Una asignación pendiente no cuenta como presencia.

## Archivos preparados
Lee CLAUDE.md, CONTRACT.md, DESIGN.md y .claude/rules/project.md.
El plan de entregas está en docs/plan.md. No necesitas crear más documentos
para completar la clase. Conserva HTML, CSS y JS sin nuevas dependencias.

## Dos agentes que crearemos en clase
Cada definición incluye name, description, model y tools en su YAML; después
misión, documentos que leer, alcance, procedimiento, criterios y entrega.
La description debe decir cuándo delegar, para que Claude reconozca el encargo.
No basta con llamar al agente Leo o Ana sin explicar su especialidad.

### Leo · .claude/agents/leo-data.md
name leo-data; model sonnet; tools Read, Grep, Glob, Edit, Write.
Úsalo para registrar personal, confirmar llegadas, validar e impedir duplicados.
Trabaja en operations.js; consulta data.js y service.js. Lee este documento,
el plan, CONTRACT.md y la regla preparada. Conserva las funciones existentes.
Entrega registerStaff({name,role,zone}), arrive(id) y staff(rows).
staff devuelve id, name, role, zone y present por persona. Respeta los eventos
P y L del contrato, valida antes de guardar y usa IDs estables al reintentar.
Documenta parámetros, retorno y errores con JSDoc.
Devuelve firmas, campos, errores, ejemplo pendiente/presente y pruebas pendientes.

### Ana · .claude/agents/ana-ui.md
name ana-ui; model sonnet; tools Read, Grep, Glob, Edit, Write.
Úsala para formularios, estados, accesibilidad y cobertura de Personal.
Trabaja en index.html, expo.js y expo.css; espera el contrato de Leo.
Lee este documento, el plan, DESIGN.md, CONTRACT.md y la regla preparada.
Construye entrada Personal, panel lateral, nombre/función/zona, lista y llegada.
Reutiliza dropdowns, estilos, foco, Escape y manejo de errores existentes.
Cuenta solo present=true por zona. Cero muestra Sin cobertura.
Entrega archivos cambiados, conexión de controles y recorrido de comprobación.

## Una skill que crearemos en clase
Ruta .claude/skills/expo-team/SKILL.md; name expo-team.
Description: usar cuando se solicite construir Personal y cobertura de Misión
Expo con el plan preparado. Debe reconocer ese pedido y coordinar Leo y Ana.
Mantén la invocación automática predeterminada y la llamada directa /expo-team.
No pongas disable-model-invocation true ni context fork. Corre en la sesión
principal y usa este mismo documento como referencia, sin duplicarlo en carpetas.
1. Lee los documentos preparados y comprueba que existan ambos agentes.
2. Espera una petición explícita de construir; crear definiciones no autoriza
   modificar la app. Si el alcance cambia, muestra la propuesta y espera.
3. Delega a leo-data y espera su contrato completo.
4. Pasa ese contrato a ana-ui y espera la interfaz.
5. La sesión principal revisa contra el checklist siguiente. No hace falta
   un tercer agente. Devuelve un defecto al responsable y revisa ese caso.
6. El usuario prueba el navegador. Distingue lectura de código y prueba real.
Si un fallo persiste tras una corrección, resume el bloqueo y espera.

## Checklist del grupo
- Alex Rivera, Técnica, Producción empieza pendiente y cobertura cero.
- Confirma su llegada desde otra pestaña; aparece presente y cobertura uno.
- Reintentar la misma llegada conserva uno. Recargar conserva el estado.
- Otra persona pendiente en Acceso no cubre esa zona.
- Nombre vacío no guarda filas. Un fallo conserva entradas para reintentar.
- Teclado, foco y Escape funcionan; el diseño móvil conserva el contenido.
- Incidentes, acreditaciones y CSV siguen funcionando.
Dos pestañas usan la simulación local. Distintos dispositivos deben compartir
la conexión del aula. Sheets se comprueba después de sincronizar el mentor.
Usa nombres ficticios y no guardes conexiones en documentos ni prompts.

## Cómo llamar al equipo
Tras guardar las definiciones, vuelve a abrir Claude desde esta carpeta para
cargar los agentes. Puedes pedir «Usa leo-data para revisar la validación» o
«Usa ana-ui para revisar el formulario». La selección automática depende de
la description, del pedido y del contexto; comprueba qué agente recibió la tarea.
Para construir pide «Construye Personal y cobertura siguiendo docs/task.md y
el plan preparado». Si Claude no carga la skill, envía /expo-team directamente.
La skill pasa el contrato entre agentes; no comparten todo su historial.
