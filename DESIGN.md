# Misión Expo · Dirección visual

Misión Expo es el centro de operaciones de una feria ficticia de mayo de 2027. Antes de abrir, los equipos revisan el estado del recinto, registran incidentes y se coordinan desde una bitácora compartida.

La portada funciona como un cartel del evento. El nombre tiene escala de señalización y la fotografía ocupa el panel contiguo de borde a borde. La portada toma como referencia la identidad tipográfica de [Config](https://config.figma.com/), el protagonismo de la imagen en [VivaTech](https://vivatech.com/) y la jerarquía entre evento y accesos en [CES](https://www.ces.tech/).

## Identidad y navegación

- **Marca.** Dos chevrones señalan el acceso y acompañan el nombre del evento. Manrope da una forma redondeada a los títulos, los números y los controles. El logo de Imaginatec se muestra al pie de la barra lateral y junto al nombre del evento en móvil.
- **Color.** El cartel usa coral #FF684C y tinta #1B171D. El área operativa usa papel #F7F5EF y blanco. El violeta #563BB0 identifica el foco y las acciones de la bitácora. Los estados se leen como texto con un trazo corto en verde, ámbar o rojo.
- **Sidebar.** Tablero, Plano, Bitácora y Acreditaciones tienen un acceso propio. El destino actual se reconoce por el borde coral y el atributo `aria-current`. En móvil, el índice pasa a una fila sobre la barra de conexión.
- **Portada.** El cartel incluye **Reportar incidente** y **Ver plano**. La fotografía documenta un pabellón de una feria real. El pie de foto identifica el evento, la autoría y la licencia.
- **Tablero.** Las cifras y la consigna comparten un panel de color. El plano, la bitácora y las acreditaciones aprovechan el ancho completo. Cada zona del plano tiene una fotografía de archivo que vuelve a aparecer como miniatura en los incidentes de esa zona. La selección filtra la bitácora y se distingue por el borde violeta.
- **Acreditaciones.** El registro guarda un nombre ficticio para el gafete y un tipo de acceso. La lista y el total se actualizan en las sesiones conectadas al mismo espacio del aula.

## Interacción

Usa controles redondeados de color sólido, texto de estado y un foco visible. El menú de zonas admite flechas, Inicio, Fin, Intro y Escape. Al guardar o resolver un incidente, el tablero actualiza la bitácora, las cifras y el plano. Respeta la preferencia de movimiento reducido.

Los formularios se abren desde el borde derecho. El encabezado y las acciones quedan a la vista mientras se desplazan los campos. En móvil, el panel ocupa el ancho de la pantalla.

Comprueba la portada y los controles en escritorio y móvil. Abre un incidente con teclado, filtra una zona y revisa que el estado cambie al resolver el incidente desde otra sesión.

## Créditos

- **Fotografía.** [Paris - Salon VivaTech 2025 - 9](https://commons.wikimedia.org/wiki/File:Paris_-_Salon_VivaTech_2025_-_9.jpg), © Peter Potrowl, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Redimensionada y convertida a WebP como `imagenes/vivatech-pabellon.webp`. La interfaz ajusta el encuadre al tamaño disponible.
- **Fotografías de zona y acceso.** El apartado «Créditos de fotografía» de `index.html` enlaza los originales, autores y licencias de cada fotografía reencuadrada.
- **Tipografía.** Manrope, The Manrope Project Authors. La licencia SIL Open Font License 1.1 se incluye en `fuentes/manrope-OFL.txt`.
