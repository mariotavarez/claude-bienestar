# Módulo 2 · Desarrollar y refactorizar con Claude

**Bienestar GS · Mario Josue Tavarez Mendoza / Mentor9**

Continúa después del módulo 1. Aquí su filtro ya está corregido; tu copia anterior no se modifica. Aprenderás a pedir a **Claude Code** un cambio delimitado, revisar el plan y comprobarlo con pruebas. Elige una ruta: **React/TypeScript** o **Python/SQL**. La otra queda como consulta opcional.

## ¿No puedes instalar Docker?

**Puedes realizar esta práctica dentro de VS Code sin Docker.** Abre [Instalación > Sin Docker](https://imaginatec.tech/aula/?herramienta=manual#instalacion) o descarga la [guía PDF sin Docker](https://imaginatec.tech/materiales/Guia_Sin_Docker_Claude.pdf). Sigue la alternativa manual de este README. `LOCAL COMPUTER` es el entorno correcto para esa ruta; no tienes que abrir un contenedor. Node, Python, Git y Claude se instalan en tu computadora. Si tampoco puedes instalar herramientas locales, acuerda con el mentor el simulador o trabajo en pareja en un equipo autorizado.

## 1. Obtén esta rama o el ZIP

Repositorio: https://github.com/mariotavarez/claude-bienestar · rama `modulo-2`.
En GitHub Desktop: **File → Clone repository → URL**, introduce el repositorio, elige **Current branch → modulo-2**. Antes de cambiar una copia existente, guarda o haz commit de tus cambios del módulo 1; no uses reset para descartarlos. También puedes descargar el ZIP de este módulo desde la plataforma y descomprimirlo en una carpeta nueva.

Con Git, para tener una carpeta independiente:

```bash
git clone --branch modulo-2 --single-branch https://github.com/mariotavarez/claude-bienestar.git bienestar-modulo-2
```

```bash
cd bienestar-modulo-2
```

Si descargaste ZIP, abre su carpeta en VS Code; **no ejecutes cd bienestar-modulo-2** si tu carpeta se llama diferente. Debes ver `package.json`, `README.md`, `web/` y `.devcontainer/`.

## 2. Elige una sola instalación

### Alternativa 1 · Dev Container

Necesitas **Docker Desktop** abierto, **VS Code** y **Dev Containers de Microsoft**. Node, npm, Python y Git se preparan dentro de la imagen; Claude Code se instala también, pero requiere tu propio acceso compatible para conversar.

1. Abre esta carpeta en VS Code.
2. Abre **Ver → Paleta de comandos**: **Cmd+Shift+P** en Mac o **Ctrl+Shift+P** en Windows/Linux. F1 también funciona si tu teclado lo permite.
3. Busca **Dev Containers: Reopen in Container** y pulsa Enter.
4. Espera la construcción. Abre una terminal nueva **en esa ventana**; abajo debe decir Dev Container y la ruta será `/workspaces/bienestar`.
5. Ejecuta una orden por bloque:

```bash
npm run status -- --container
```

```bash
npm run start
```

Abre **http://127.0.0.1:4182**. Mantén esa terminal ejecutándose. El módulo 1 usa 4180: no mezcles los dos puertos. Si 4182 está ocupado, detén la otra copia de este módulo antes de reiniciar; no borres todos tus contenedores.

### Alternativa 2 · Instalación manual

Necesitas **VS Code**, **Node.js >=24.15.0 con npm**, **Python 3**, **Git** y **Claude Code** con acceso compatible. Aquí no necesitas Docker, Java ni PySpark. **SQLite** se usa desde `sqlite3` de Python y no requiere un servidor; verifica que tu distribución lo incluya.

En la terminal integrada de VS Code, situada donde está `package.json`:

```bash
npm ci
```

```bash
npm run status
```

```bash
npm run start
```

Abre **http://127.0.0.1:4182**. Para detener, pulsa Ctrl+C. Para reabrir después, basta `npm run start`; no reinstales todo en cada clase. Si el chequeo dice Python/Claude ausente, confirma si estás usando tu equipo o el contenedor: las instalaciones pertenecen al entorno donde ejecutas.

Las instrucciones por sistema están en **https://imaginatec.tech/aula/#instalacion**. Si Node/npm no aparecen, cierra y vuelve a abrir la terminal después de instalar. En Windows, los scripts del curso detectan `py -3`, `python3` o `python` automáticamente.

## 3. Abre Claude en una segunda terminal

En **Terminal → Nueva terminal**, dentro de la misma carpeta y entorno:

```bash
claude --permission-mode plan
```

Pide primero: «Lee CLAUDE.md, docs/acceptance.md y los archivos de mi ruta. Explica qué funciona y qué falta. No edites archivos». El modo de planificación ayuda a revisar antes de editar. Si necesita autenticación, complétala con tu cuenta autorizada; la contraseña de la plataforma no es una cuenta de Claude. Para implementar, revisa `/permissions`, cambia a un modo que solicite autorización y aprueba solo el alcance acordado. No uses bypass de permisos.

## 4. Comprueba la base

En una terminal que NO esté ejecutando el servidor ni la conversación de Claude:

```bash
npm run baseline
```

**Esperado: 4 pruebas correctas.** Si falla, resuelve primero carpeta, Node o dependencias; no es el defecto didáctico nuevo.

## 5A. Ruta React/TypeScript

Lee `docs/acceptance.md`, `web/src/App.tsx`, `web/src/selection.ts` y `tests/selection.test.mjs`. El selector Estado ya está conectado a React; la función todavía ignora ese valor. Verás Confirmadas pero aparecerá también OP003 pendiente.

```bash
npm run test:web
```

**Estado inicial esperado: 2 pruebas pasan y 3 fallan.** Pide a Claude que explique la diferencia entre expected y actual. Luego revisa su plan y permite cambiar `web/src/selection.ts` sin tocar los fixtures ni quitar assertions.

Después:

```bash
npm run baseline
```

```bash
npm run test:web
```

```bash
npm run typecheck
```

```bash
npm run coverage
```

Esperado: baseline 4/4, web 5/5, tipos sin errores. Cobertura muestra código ejecutado, no demuestra que falten cero errores. TypeScript verifica tipos, **no sustituye un linter ni las pruebas**. En proyectos con ESLint usa también su configuración; no necesitamos instalar uno nuevo para esta práctica.

En el navegador comprueba Tecnología + Confirmadas, Todos + Pendientes, Hogar + Pendientes y Todos + Todos. Los totales esperados están en `docs/acceptance.md`.

## 5B. Ruta Python/SQL

Lee `fixtures/raw-operations.json`, `data/pipeline.py`, `data/tests/test_pipeline.py` y `docs/acceptance.md`.

```bash
npm run test:data
```

**Estado inicial esperado: 1 prueba pasa y 5 fallan.** No confundir un fallo de assertions con Python no instalado. Acuerda con Claude cómo normalizar, quitar solo copias idénticas y apartar conflictos sin inventar importes. Permite modificar solo `data/pipeline.py`.

```bash
npm run test:data
```

```bash
npm run data
```

Esperado: 6 pruebas correctas y 9 filas reconciliadas: 5 limpias, 1 copia, 2 conflictos y 1 inválida. `data/report.py` crea SQLite **en memoria** y consulta Tecnología + Confirmadas con parámetros: 1 operación y 120000 centavos.

## 6. Revisa y explica

```bash
git diff --stat
```

```bash
git diff -- web/src/selection.ts data/pipeline.py
```

Completa `docs/my-diagnosis.md`. Puedes guardar comprobaciones de ambas rutas:

```bash
npm run evidence
```

Revisa `evidence/checks.json` antes de compartirlo: puede incluir rutas de tu equipo. Si solo hiciste una ruta, la otra puede seguir fallando y se debe señalar. La plataforma registra tus casillas y refuerzos; una casilla no certifica que Claude ejecutó tu proyecto.

## Si algo falla

- **Could not read package.json:** abre la carpeta raíz, no `web/` ni `data/`.
- **Cannot find module:** ejecuta `npm ci` en esa carpeta, con Node compatible.
- **Node antiguo:** verifica `node --version`; la prueba de TypeScript usa soporte de Node 24.
- **Docker abierto pero falla Reopen:** abre el log de Dev Containers y comparte la primera línea de error útil, no solo «Exit code 1».
- **Python no encuentra sqlite3:** revisa la instalación de Python o usa el Dev Container; no instales un paquete llamado sqlite3 desde npm.
- **Sin acceso a Claude:** puedes leer el caso, practicar los prompts con el simulador del módulo 1 o trabajar en pareja; ese simulador no ejecuta este nuevo laboratorio.

El contenido y los ejemplos pueden ajustarse según el grupo y las herramientas autorizadas.
