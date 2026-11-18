# Contrato · reporte de solicitudes

Problema laboral: un reporte con filtros incorrectos puede incluir solicitudes de otra área o estado y presentar un total equivocado. Revisar cada PR manualmente y volver a comprobar si cambió su commit consume atención repetitiva.

Este repositorio contiene PRs didácticos, no cambios productivos ni una incidencia real del área. El flujo de consulta, revisión y reporte sí opera sobre PRs reales en GitHub.

## Reglas
- Combinar área Y estado. `all` elimina solo la condición correspondiente.
- Sumar únicamente los registros visibles; cantidades en centavos enteros.
- Sin coincidencias: rows=[], count=0 y totalCents=0.
- No modificar el arreglo de entrada.
- Si se añade isEmpty, será true únicamente cuando no haya filas.

## Casos verificables
Entrada: A={area:backend,status:pending,amountCents:120000}; B={area:frontend,status:pending,amountCents:45000}; C={area:backend,status:resolved,amountCents:30000}.
- backend + pending -> solo A; count=1; totalCents=120000.
- all + pending -> A y B; count=2; totalCents=165000.
- soporte + resolved -> ninguna; count=0; totalCents=0.
- all + all -> A,B,C; count=3; totalCents=195000.

## Entrega de revisión
PR, SHA consultado, archivo, línea añadida, caso concreto y resultado esperado. Separar inspección de código de ejecución. Cero defectos es un resultado válido. No aprobar ni fusionar automáticamente.
