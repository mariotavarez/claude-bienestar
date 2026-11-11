# Personal y cobertura

Construir una sección de personal operativo. Registrar nombre ficticio, función y zona. Cada persona empieza pendiente. Confirmar su llegada y contar únicamente presentes en la cobertura por zona.

Usar el servicio existente y conservar incidentes, acreditaciones y exportación CSV. El registro usa EXPO1|P|zona|función|nombre. La llegada usa EXPO1|L|UUID del registro. Función es c, t o l. El nombre tiene hasta 64 caracteres.

Comprobar registro pendiente, llegada, persistencia al recargar y dos confirmaciones de la misma llegada. Producción debe tener una persona presente y Acceso debe seguir sin cobertura cuando su persona continúa pendiente.
