# Reporte ejecutivo de Orbit

## Para quién y para qué

El reporte es una vista nueva del Orbit que ya usamos. Ayuda a coordinación
a decidir qué operaciones necesitan seguimiento. Completa este documento con
Claude antes de aprobar cambios y anota qué decisiones tomó tu equipo.

## Resultado base

- La vista muestra indicadores, una gráfica por segmento, un resumen copiable
  y un CSV. Todos reflejan la misma selección: general, pendientes o confirmadas.
- Conserva el menú, los datos y las otras vistas. Usa el proyecto tal como está:
  HTML, CSS y JavaScript, sin dependencias nuevas.
- Calcula en centavos y presenta los importes en pesos.
- Pídele a Claude JSDoc para explicar entradas, salidas y unidades de las funciones
  públicas del reporte. La documentación se comprueba junto con las pruebas.

## Mejoras que podemos decidir por separado

- Buscar por ID o segmento dentro del filtro activo.
- Mostrar el detalle de las filas que respaldan la cifra y un estado sin resultados.
- Descargar un Markdown con las filas visibles. El CSV se conserva.

## Registro del taller

- Primer cambio que autorizamos:
- Evidencia comprobada (prueba o acción en el navegador):
- Qué todavía no verificamos:
- Siguiente cambio acordado:

Este archivo es el encargo del proyecto. El Markdown descargado desde la vista
es el reporte de una selección.
