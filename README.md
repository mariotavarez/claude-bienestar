# Módulo 2 · Dale una nueva habilidad a Orbit

Taller de dos horas: construye un reporte ejecutivo con Claude Code dentro del Orbit existente. Todos seguimos la misma práctica en React/TypeScript. No tienes que elegir Python ni cambiar de proyecto.

## El mismo Orbit, una nueva vista
Continuamos en [mariotavarez/claude-bienestar](https://github.com/mariotavarez/claude-bienestar), el repositorio del módulo 1. Conservamos la vista general, la tabla, la API, las seis operaciones y los filtros funcionando. La ampliación es **Reporte ejecutivo**, una nueva entrada en el menú existente. No crees otra aplicación ni reemplaces el panel.

| Rama | Para qué sirve |
| --- | --- |
| [`modulo-1`](https://github.com/mariotavarez/claude-bienestar/tree/modulo-1) | La práctica anterior, conservada con su historial. |
| [`modulo-2`](https://github.com/mariotavarez/claude-bienestar/tree/modulo-2) | Base de este taller: Orbit funcionando y el espacio para construir tu reporte. |
| [`modulo-2-solucion`](https://github.com/mariotavarez/claude-bienestar/tree/modulo-2-solucion) | Solución completa de referencia para comparar después de trabajar con Claude. |

### Si ya clonaste el repositorio
1. Guarda tus archivos en VS Code. En GitHub Desktop confirma `claude-bienestar` y tu rama del módulo 1; pulsa **Fetch origin** para recibir las ramas publicadas.
2. Si tienes cambios pendientes, crea `mi-modulo-1` desde la **rama actual**, no desde `main`. Si pregunta, lleva los cambios a esa nueva rama de respaldo.
3. Revisa los archivos en **Changes** y haz commit con el mensaje `Guardar mi práctica del módulo 1`. Debe quedar **0 changed files** y el commit visible en **History**. Si ya tenías todo guardado en una rama propia, omite los pasos 2 y 3.
4. Abre **Current Branch → modulo-2**. Si ya tenías esa rama local, pulsa **Fetch origin** y después **Pull origin** solo cuando indique nuevos commits.
5. Abre la carpeta en VS Code. El README debe decir **Dale una nueva habilidad a Orbit**. Tu práctica anterior sigue en `mi-modulo-1` o en la rama donde la guardaste.

No necesitas **Push origin** ni **Publish branch** para conservar el commit local; este respaldo queda en tu computadora. Si aparece el diálogo de cambios pendientes al pasar a `modulo-2`, cancela y completa el commit primero. No descartes cambios, no los lleves directamente a `modulo-2` y no uses **Update from main**. Esta rama ya incluye la base corregida; compara tus personalizaciones antes de incorporarlas.

Referencia: [ramas en GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop) y [sincronizar una rama](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop).

También puedes tener una segunda carpeta del mismo repositorio, sin alterar tu práctica anterior:

```bash
git clone --branch modulo-2 https://github.com/mariotavarez/claude-bienestar.git bienestar-modulo-2
```

El ZIP del aula contiene la misma base de `modulo-2`, sin historial Git. Extráelo en otra carpeta si eliges esa alternativa; no sobrescribas tu trabajo del módulo 1.

## Abre el laboratorio
1. Abre en VS Code la carpeta de la rama `modulo-2` o del ZIP extraído. Debes ver `package.json`, `README.md` y `web/`.
2. Usa tu instalación del módulo 1: con Docker, Reopen in Container; sin Docker, terminal local con Node 24.15 o posterior. No mezcles terminales de ambas instalaciones.
3. En la raíz ejecuta `npm install`, después `npm test` y `npm run typecheck`.
4. Inicia `npm run start`; déjalo encendido. Abre http://127.0.0.1:4182 y elige **Reporte ejecutivo**.
5. Abre una segunda terminal en la misma carpeta e inicia `claude --permission-mode plan`. Necesitas tu propio acceso a Claude Code o trabajar en pareja.

## Qué construir
En `web/src/components/ReportBuilder.tsx` ya tienes una pantalla inicial que recibe `operations`. Con Claude agrega selector General/Pendientes/Confirmadas, métricas, barras por segmento, resumen copiable y CSV. El diseño es tu decisión. El contrato está en `docs/report-brief.md`.

La base funciona desde el inicio. Sus pruebas no certifican el reporte que todavía construirás: pide pruebas nuevas para sus cálculos, vacío y exportación. No modifiques fixtures ni elimines pruebas para esconder fallos.

## Archivos
- `web/src/components/Dashboard.tsx`: navegación e integración del reporte.
- `web/src/components/ReportBuilder.tsx`: tu nuevo espacio de trabajo.
- `web/src/components/OrbitDropdown.tsx`: selector de Orbit reutilizable con sus estilos y navegación por teclado.
- `fixtures/operations.json`: seis registros ficticios.
- `web/src/selection.ts`: filtros existentes; conserva su comportamiento.
- `docs/report-brief.md`: objetivo, valores y evidencia.

Los scripts y archivos Python se conservan como herramientas del laboratorio anterior; no son una ruta alternativa ni se usan para completar este taller. El módulo 2 actual y su ZIP se consultan en https://imaginatec.tech/sesion-2/.
