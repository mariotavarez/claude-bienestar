# Contrato de la misión

La coordinación de la expo necesita que los voluntarios reporten incidentes y que producción pueda resolverlos desde otro dispositivo. El tablero, el guardado y el cierre están preparados. Este contrato sirve como referencia para comprender la evidencia y los límites del simulacro.

- expo.js enlaza los controles con ExpoOperations.report y ExpoOperations.resolve.
- datos.js convierte filas guardadas en incidentes y calcula cuáles están resueltos.
- servicio.js gestiona la simulación en el navegador y la conexión al aula. ExpoService.append recibe un registro con id y asunto y devuelve el registro guardado.
- operaciones.js contiene las operaciones de reporte y cierre.

Cada fila tiene un ID UUID y un asunto de hasta 100 caracteres. Un evento nuevo puede abrir o cerrar un incidente, o registrar una acreditación.

| Evento | Asunto |
| --- | --- |
| Abrir | EXPO1\|O\|zona\|prioridad\|descripción |
| Resolver | EXPO1\|C\|UUID del incidente |
| Acreditar | EXPO1\|A\|tipo\|nombre |

Las zonas son A, B, C y D. La prioridad es n (normal) o u (urgente). Recorta espacios en la descripción y acepta de 1 a 85 caracteres. Los campos fijos preceden a la descripción, que puede contener barras verticales.

La función de acreditaciones ya está preparada. Usa nombres ficticios de hasta 64 caracteres. Los tipos son a (asistente), e (expositor) y p (personal). El tablero muestra estas filas en Acreditaciones y calcula los indicadores de incidentes con sus propios eventos.

Si un envío falla, reintenta con el mismo ID y los mismos datos. Si la persona cambia el contenido o conecta otro espacio, descarta ese envío pendiente. Para cerrar, calcula un ID estable a partir del ID del incidente para que un segundo dispositivo pueda reintentar el mismo cierre. El cierre se añade como evento y el historial conserva el reporte original.

## Cómo se comprueba

1. Abre index.html en dos pestañas de un mismo navegador. Ambas empiezan con el mismo escenario ficticio.
2. Reporta una falla urgente en Producción. La segunda pestaña debe mostrar el incidente y marcar la zona como urgente.
3. Resuelve el incidente desde la segunda pestaña. La primera debe recuperar el estado de la zona y mostrar el reporte entre los resueltos.
4. Recarga y comprueba que se conserva el cambio. Después conecta ambos dispositivos a la misma clave del aula para repetir la prueba con el espacio del grupo.
5. En el aula, los dispositivos consultan cambios periódicamente. Google Sheets recibe los eventos cuando el mentor sincroniza. La simulación local se conserva en el navegador.

## Cambio que se construye en la práctica

El padrón de personal operativo registra nombre ficticio, función y zona. Función usa c (Coordinación), t (Técnica) o l (Logística). Al registrarse, la llegada queda pendiente. Una zona tiene cobertura cuando al menos una persona asignada está presente.

El registro usa EXPO1|P|zona|función|nombre. El nombre tiene de 1 a 64 caracteres, sin barras verticales ni caracteres de control. La llegada usa EXPO1|L|UUID del registro. El ID del evento de llegada es estable para que un reintento desde dos dispositivos se guarde una sola vez.

El panel muestra el total de presentes y el desglose por zona. Acreditaciones conserva los asistentes y expositores. Los filtros y el CSV de incidentes ya forman parte de la base.

Para comprobarlo, registra a Alex Rivera en Producción. Debe quedar pendiente. Confirma su llegada desde otra pestaña y recarga. Producción debe mostrar una persona presente. Deja otra persona pendiente en Acceso y registro y verifica que esa zona siga sin cobertura.
