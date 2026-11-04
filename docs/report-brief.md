# Mi reporte ejecutivo

## Mi decisión
Destinatario:
Qué necesita entender:
Título y estilo:

## Contrato común
Datos: fixtures/operations.json; importes almacenados en centavos.
- General: 6 operaciones, 360000 centavos ($3,600.00 MXN).
- Pendientes: OP003 y OP006, 75000 centavos ($750.00).
- Confirmadas: 4 operaciones, 285000 centavos ($2,850.00).
- Grupos generales: tech 165000, home 100000, sports 95000 centavos.
- Selector propio; no depende de los filtros del dashboard.
- Reutiliza `web/src/components/OrbitDropdown.tsx` para el selector del reporte, como en los filtros de Orbit. Conserva el estilo compartido y la navegación por teclado; no lo sustituyas por un `select` nativo con otro diseño.
- Vacío: cero operaciones, importes cero y mensaje sin datos.
- Resumen calculado con las mismas filas. Copiar debe manejar éxito y error.
- CSV: ID, fecha, segmento, estado e importe MXN con dos decimales; filas de la selección y escape correcto.

## Evidencia
Mi mejor prompt:
Cambio entre mi primera versión y la final:
Pruebas ejecutadas:
Comprobaciones manuales (copia, descarga, teclado, móvil):
Limitaciones pendientes:
