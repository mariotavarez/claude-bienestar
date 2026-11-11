# Arquitectura del taller

## Responsabilidades

Coordinación aprueba el alcance y el plan. La sesión principal de Claude Code
usa /expo-team para ejecutar ese plan por entregas.

1. Contexto común: CLAUDE.md, docs/brief.md y docs/plan.md.
2. Leo (sonnet) lee CONTRACT.md, reglas y referencia de datos. Implementa
   operations.js y devuelve las firmas, campos, errores y casos pendientes.
3. La sesión principal pasa el contrato de Leo a Ana (sonnet). Ana lee DESIGN.md,
   reglas y referencia de interfaz y cambia index.html, expo.js y expo.css.
4. Eva (haiku) recibe las entregas y lee los cambios, reglas de revisión y el
   checklist. Devuelve hallazgos con ruta, condición, efecto y responsable.
5. El grupo ejecuta el recorrido del navegador. La sesión principal coordina
   correcciones y documenta hechos observados con aprobación del usuario.

Los subagentes tienen contextos propios. La entrega es el puente entre ellos;
no reciben automáticamente toda la conversación de los demás. La skill corre
en la sesión principal y espera cada resultado. Sus references/ detallan los
encargos y pruebas. El alcance escrito de un archivo no es un sandbox técnico.

## Aplicación y datos compartidos

Misión Expo en dos dispositivos → servicio del aula → Apps Script → Google Sheets.
El servicio conserva eventos de registro y llegada. Apps Script copia eventos
nuevos al sincronizar. El mentor prepara la conexión; el alumno construye la
función sin instalar un backend. En local usa dos pestañas del mismo navegador.

## Extensiones de Claude

MCP Expo ofrece listar_incidentes en modo lectura del servicio. No lee el padrón
ni escribe en Sheets. El mentor muestra la conexión opcional.
El hook de edición escribe una línea en la bitácora. Esa línea acredita una
edición, no una prueba exitosa de la aplicación.

## Modelos y contexto

Sonnet es el inicio para coordinación y para Leo y Ana. Haiku atiende el checklist
acotado de Eva. Sonnet u Opus pueden revisar problemas que requieran más análisis.
Consulta docs/model-guide.md para disponibilidad y límites. Reanuda una tarea
leyendo el plan y solo las referencias necesarias; guarda primero las decisiones.
