# Referencia de datos

registerStaff recibe name, role y zone.
arrive recibe el UUID del registro.
staff recibe los eventos y devuelve id, name, role, zone y present.

## Comprobaciones

Un registro nuevo aparece pendiente.
Una llegada confirmada persiste al recargar.
Dos confirmaciones de la misma llegada producen un evento.
Un nombre vacío y una zona inválida muestran un error.
Solo las personas presentes aumentan la cobertura.
