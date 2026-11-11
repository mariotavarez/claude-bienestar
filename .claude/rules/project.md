---
paths:
  - "index.html"
  - "expo.js"
  - "expo.css"
  - "operations.js"
---

# Regla del proyecto · preparada para la clase

## Trabajo común
Lee docs/task.md y docs/plan.md. Conserva incidentes, acreditaciones y CSV.
No añadas dependencias. Usa nombres claros y JSDoc para las funciones públicas.
Respeta el alcance de archivos de cada agente. Si necesitas ampliarlo, consulta.
El alcance escrito no impide técnicamente editar otros archivos.

## Datos · Leo
Respeta CONTRACT.md y reutiliza ExpoService.append.
Valida nombre, función y zona antes de guardar. Mantén IDs estables para
reintentos y llegada. Una persona registrada empieza pendiente.
No inventes registros ni cambies el servicio o sus conexiones.

## Interfaz · Ana
Respeta DESIGN.md. Reutiliza el panel lateral y dropdowns existentes.
Usa etiquetas visibles, navegación por teclado, foco y cierre con Escape.
Inserta nombres como texto seguro. Conserva entradas ante un error.
La cobertura cuenta únicamente personas con llegada confirmada.

## Verificación · sesión principal
Cita archivo y condición al reportar un hallazgo. Separa inspección de código
de pruebas ejecutadas. El usuario comprueba el navegador antes de aceptar.
No copies conexiones, tokens ni datos reales en documentos o respuestas.
