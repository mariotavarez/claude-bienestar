# Prompts de la sesión 1

Se pegan dentro de Claude Code. Los comandos npm se escriben en otra terminal.

## 01 Leer el proyecto

Lee CLAUDE.md y estos archivos: web/src/App.tsx, web/src/filter.ts y fixtures/operations.json. Explica en cinco pasos cómo llegan las operaciones al panel y cómo se filtran. Menciona las rutas de los archivos que sustentan tu explicación. Por ahora no edites archivos ni ejecutes comandos.

## 02 Acordar el plan

Vuelve a leer CLAUDE.md actualizado. Al elegir Tecnología sigo viendo seis operaciones y MXN 3600.00. En docs/expected-result.md se indican dos operaciones, OP001 y OP003, con MXN 1650.00. Lee web/src/filter.ts, explica la causa que encuentres y propón un cambio pequeño. No edites todavía. Separa lo que leíste del código de lo que aún no has comprobado.

## 03 Autorizar una edición acotada

Aplica el cambio acordado solo en web/src/filter.ts para que se conserve una operación cuando el segmento sea all o su segment coincida exactamente con el segmento elegido. No cambies fixtures, la interfaz ni el resultado esperado. Muestra el diff y explica cada línea que cambiaste. No instales paquetes ni hagas commits.

## 04 Guardar la observación

Lee el estado actual de web/src/filter.ts. Propón ejecutar npm run evidence y explica qué información guardará. Espera mi autorización antes de ejecutar el comando. Después ayúdame a completar docs/my-diagnosis.md con mis observaciones; no inventes una ejecución ni números que no viste.
