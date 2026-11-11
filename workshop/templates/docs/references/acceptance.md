# Recorrido de aceptación de /expo-team

Pide al usuario ejecutar un paso por vez y contar qué observó.

1. Registra Alex Rivera, Técnica, Producción. Esperado: Pendiente y cobertura 0.
2. Confirma su llegada desde otra pestaña. Esperado: Presente y cobertura 1.
3. Confirma de nuevo. Esperado: el mismo registro y conteo 1.
4. Deja otra persona pendiente en Acceso. Esperado: Sin cobertura en Acceso.
5. Recarga. Esperado: mismos registros y estados.
6. Prueba nombre vacío. Esperado: mensaje claro y ningún registro añadido.
7. Recorre el formulario con teclado y cierra con Escape. Esperado: foco vuelve
   al botón que lo abrió y los controles tienen etiquetas.
8. Abre incidentes y acreditaciones y descarga el CSV de incidentes.

La simulación usa dos pestañas del mismo navegador. Para distintos dispositivos
ambos deben usar la misma conexión del aula. Sheets recibe eventos cuando el
mentor sincroniza Apps Script; confirma esa fila antes de marcarla comprobada.

Anota cada caso como observado, fallido o pendiente. Conserva únicamente datos
ficticios y no copies la conexión a las notas.
