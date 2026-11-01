# Criterios de aceptación · Módulo 2

## Ruta web
- El filtro del módulo 1 ya funciona: `npm run baseline` pasa sus 4 pruebas.
- Tecnología + Confirmadas: OP001, 1 operación, 120000 centavos (MXN 1,200.00).
- Todos + Pendientes: OP003 y OP006, 2 operaciones, 75000 centavos.
- Hogar + Pendientes: 0 operaciones, total 0; no es un error de carga.
- Todos + Todos conserva los 6 registros y 360000 centavos.
- No mutar operaciones, eliminar filas del fixture, ni sumar importes antes de filtrar.
- `npm run test:web`, `npm run baseline` y `npm run typecheck` deben pasar.

## Ruta datos
El archivo `raw-operations.json` es distinto de `operations.json`. Tiene 9 filas: las 6 originales, una copia idéntica de OP001, una variante conflictiva de OP003 y OP007 con importe nulo.
- Normalizar id (espacios), segmento y estado (espacios/minúsculas).
- Importe: entero no negativo en centavos; `None`/bool/negativos no son válidos. No convertirlos a cero.
- Duplicado idéntico después de normalizar: conservar una fila y registrar las copias.
- Mismo id con valores normalizados distintos: apartar **todas** sus filas; no elegir la primera ni la última.
- Resultado: 5 limpias + 1 copia idéntica + 2 conflictivas + 1 inválida = 9 filas recibidas.
- OP003 no aparece en limpias. Tecnología + Confirmadas en SQLite: 1 operación, 120000 centavos.
- Usar parámetros `?` en la consulta SQL; no construir SQL con texto del usuario.
- `npm run test:data` debe pasar sus 6 pruebas y `npm run data` debe mostrar los conteos anteriores.

## Cierre
Conservar diff y explicación de la ruta elegida. `npm run evidence` ejecuta ambas rutas: si solo completaste una, el archivo puede registrar fallos de la otra; identifícalos sin presentarlos como una entrega completa de ambas rutas.
