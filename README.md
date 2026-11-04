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
En GitHub Desktop conserva primero tus cambios del módulo 1 en tu propia rama y haz commit. Después usa **Fetch origin → Current branch → modulo-2**. La rama del taller incluye la base corregida; tus personalizaciones permanecen en tu rama anterior. Compáralas antes de llevarlas al módulo 2. No uses reset ni fuerces el cambio de rama si Git avisa de cambios pendientes.

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
- `fixtures/operations.json`: seis registros ficticios.
- `web/src/selection.ts`: filtros existentes; conserva su comportamiento.
- `docs/report-brief.md`: objetivo, valores y evidencia.

Los scripts y archivos Python se conservan como herramientas del laboratorio anterior; no son una ruta alternativa ni se usan para completar este taller. El módulo 2 actual y su ZIP se consultan en https://imaginatec.tech/sesion-2/.
