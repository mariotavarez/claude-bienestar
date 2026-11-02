# Laboratorio guiado de la sesión 1

Autor: Mario Josue Tavarez Mendoza · Mentor9

## ¿No puedes instalar Docker?

**Puedes realizar esta práctica dentro de VS Code sin Docker.** Abre [Instalación > Sin Docker](https://imaginatec.tech/aula/?herramienta=manual#instalacion) o descarga la [guía PDF sin Docker](https://imaginatec.tech/materiales/Guia_Sin_Docker_Claude.pdf). Sigue la alternativa manual de este README. `LOCAL COMPUTER` es el entorno correcto para esa ruta; no tienes que abrir un contenedor. Node, Python, Git y Claude se instalan en tu computadora. Si tampoco puedes instalar herramientas locales, acuerda con el mentor el simulador o trabajo en pareja en un equipo autorizado.

## Qué haremos

Abrir Orbit, un panel de React con datos ficticios, e investigar con Claude Code un **defecto intencional del filtro**. Al seleccionar Tecnología deben quedar dos operaciones por $1,650.00; al inicio aparecen las seis por $3,600.00. Conservaremos los datos y corregiremos únicamente la regla de filtrado.

## Descarga recomendada: GitHub y ramas del curso

Repositorio del curso: <https://github.com/mariotavarez/claude-bienestar>.

**Para esta práctica selecciona la rama `modulo-1`.** Las ramas de los módulos 2 al 6 se publicarán cuando sus laboratorios estén preparados. No uses `main` como laboratorio: contiene el índice del curso.

### Con GitHub Desktop

1. Abre **File > Clone repository > URL**, pega la dirección del repositorio y elige una carpeta local.
2. Pulsa **Clone**. En **Current branch**, selecciona **modulo-1**.
3. Usa **Open in Visual Studio Code**, o abre esa carpeta desde **Archivo > Abrir carpeta** en VS Code.
4. Continúa con una de las dos alternativas de instalación de abajo.

GitHub Desktop es la opción visual para Windows y macOS. Para los comandos `git` necesitas Git disponible en la terminal donde los ejecutes; el Dev Container ya lo incluye.

### Con Git desde la terminal de tu computadora

Copia y ejecuta cada bloque por separado. El primer comando descarga el laboratorio en una carpeta nueva:

```bash
git clone --branch modulo-1 https://github.com/mariotavarez/claude-bienestar.git
```

Entra en esa carpeta:

```bash
cd claude-bienestar
```

Ábrela en VS Code desde **Archivo > Abrir carpeta**. Después elige Dev Container o instalación local. Al clonar, `.git` ya existe: **omite la inicialización de Git** indicada más adelante para las descargas ZIP.

### Alternativa: ZIP

Puedes usar **Code > Download ZIP** después de seleccionar `modulo-1` en GitHub, o descargarlo desde **Materiales** del aula. Descomprímelo antes de abrirlo. El ZIP no conserva el historial de Git. Se recomienda clonar el repositorio para seguir sus actualizaciones.

Antes de cambiar de rama o actualizar una copia con trabajo, revisa `git status` y conserva tus cambios en una rama propia o una copia de respaldo. No borres archivos ni fuerces un cambio de rama para seguir la clase.

## Elige una sola alternativa de instalación

| Ruta | Dónde se ejecutan Node, Python y Claude | Qué instalas en tu computadora |
| --- | --- | --- |
| **Alternativa 1: Dev Container (recomendada)** | Dentro del contenedor del curso | Docker Desktop, VS Code y la extensión Dev Containers |
| **Alternativa 2: instalación local por comandos** | Directamente en tu computadora | Node.js + npm, Python 3, Git y Claude Code; VS Code para editar |

**Si ya ves “Dev Container: Bienestar Sesión 1” en VS Code, sigue la alternativa 1.** No necesitas instalar Node ni ejecutar `npm i` otra vez en tu computadora. La preparación del contenedor ya resuelve las dependencias.

Cada bloque de esta guía contiene **un comando**. Copia solo el comando, pulsa **Enter**, espera el resultado y después continúa. Los textos explicativos no se pegan en la terminal. En equipos corporativos, coordina las instalaciones y permisos con TI.

## Alternativa 1: Dev Container con Docker y VS Code

### 1. Prepara la base

1. Instala y abre **Docker Desktop**. Espera que el motor esté en ejecución.
2. Instala **Visual Studio Code**.
3. En VS Code abre **Ver > Extensiones**, busca **Dev Containers** y comprueba que el editor sea **Microsoft**. Su identificador es `ms-vscode-remote.remote-containers`.

**¿Para qué sirve cada cosa?** Docker mantiene el contenedor en ejecución. Dev Containers conecta VS Code con ese entorno. Una vez conectado, las terminales nuevas de VS Code usan las herramientas del contenedor. Node, npm, Python, Git y Claude Code ya vienen incluidos; no los instales por separado para esta ruta.

**Si Docker no se instala o no arranca:** consulta [Problemas comunes de Docker](#problemas-comunes-de-docker) al final de este README. Incluye el caso de Virtual Machine Platform y WSL en Windows.

### 2. Extrae y abre el laboratorio

Descomprime el ZIP en una carpeta local escribible. En Windows usa **Extraer todo**; en Mac abre el ZIP. Abre en VS Code **Archivo > Abrir carpeta** y selecciona la carpeta extraída que contiene `README.md`, `compose.yaml`, `package.json` y `.devcontainer`. No abras la carpeta superior ni trabajes dentro del ZIP.

La carpeta del proyecto está compartida con el contenedor: tus ediciones se conservan en esa carpeta local.

### 3. Conecta VS Code con el contenedor

**Configuración actualizada el 29 de octubre de 2026:** VS Code construye directamente el `Dockerfile` incluido. Esta ruta corrige el bloqueo `additional privileges requested ... fs.read ... Dockerfile-with-features` de Compose/Buildx. Docker Compose se conserva únicamente para el anexo; no necesitas ejecutarlo para abrir el proyecto con Dev Containers.

**Si descargaste una versión anterior y tienes ese error:** conserva tu trabajo. Sustituye solo `.devcontainer/devcontainer.json` por el del ZIP actualizado. Guarda el archivo y vuelve a ejecutar **Dev Containers: Reopen in Container** desde la paleta de VS Code. Si un contenedor anterior del laboratorio mantiene ocupado el puerto 4180, detén ese contenedor antes de iniciar otro; conserva sus volúmenes.

Con Docker abierto y la carpeta del laboratorio en **VS Code**, abre la **paleta de comandos** con el atajo de tu sistema:

| Sistema | Atajo |
| --- | --- |
| Mac | **Cmd + Shift + P** |
| Windows / Linux | **Ctrl + Shift + P** |

**F1 también abre la paleta.** Si cambia el brillo u otra función, usa el atajo de la tabla. Sin teclado: **Ver > Paleta de comandos** (View > Command Palette).

Escribe **Dev Containers: Reopen in Container**, selecciona el comando y pulsa **Enter**. Se hace en la paleta de **VS Code**, no en la terminal. **Cmd + P / Ctrl + P** abre archivos; para buscar comandos debes incluir **Shift**.

La primera construcción puede tardar varios minutos. Espera a que termine sin errores. La barra inferior debe indicar **Dev Container: Bienestar Sesión 1** y la preparación debe mostrar **Data file: found** y **Dependencies: ready**. También puede aparecer `ENVIRONMENT READY`.

Si la terminal automática dice **Done. Press any key to close the terminal**, pulsa una tecla para cerrarla. Después abre **Terminal > Nueva terminal**. Si ya ves un prompt como `node@…:/workspaces/bienestar$`, puedes escribir allí. No copies el símbolo `$`.

El archivo `.devcontainer/setup.sh` prepara el proyecto automáticamente. **No necesitas editarlo ni ejecutarlo otra vez** si terminó correctamente.

### 4. Comprueba el entorno

**Dónde:** terminal nueva de VS Code, dentro del contenedor.

```bash
npm run status
```

**Debes ver:** `Directory: /workspaces/bienestar`, versiones de las herramientas, `Data file: found` y `Dependencies: ready`. Una versión de Claude confirma la instalación, no el inicio de sesión.

### Si Python o Claude aparecen como “NOT available”

Primero lee **Environment** en `npm run status`:

- **LOCAL COMPUTER:** ejecutaste la comprobación en tu computadora. Si elegiste Dev Container, abre la paleta de VS Code con **Cmd + Shift + P** (Mac) o **Ctrl + Shift + P** (Windows/Linux), elige **Dev Containers: Reopen in Container**, espera y abre **Terminal > Nueva terminal**. Repite `npm run status` en esa terminal. Tener Docker abierto no convierte una terminal local en una terminal del contenedor.
- **COURSE DEV CONTAINER:** Python y Claude deben estar disponibles. El laboratorio actualizado verifica las herramientas durante la construcción y vuelve a comprobarlas al iniciar. Si una herramienta falta, la preparación se detiene; no debe indicar `ENVIRONMENT READY`.
- **DOCKER CONTAINER (course image not confirmed):** estás dentro de un contenedor anterior o diferente. Usa los archivos actualizados del laboratorio y reconstruye el entorno del curso.

**Solo si elegiste el anexo Docker Compose:** para comprobar ese contenedor desde una terminal de tu computadora, en la carpeta que contiene `compose.yaml`, ejecuta este bloque. En la ruta Dev Container usa `npm run status` directamente en la terminal integrada de VS Code:

```bash
docker compose exec workshop npm run status -- --container
```

**Si ya tenías una copia anterior**, conserva tu carpeta de trabajo y tus cambios. Actualiza desde el ZIP únicamente `.devcontainer/` y los archivos `scripts/status.mjs`, `scripts/environment-status.mjs` y `scripts/python-runtime.mjs`. Después abre la paleta de VS Code y ejecuta **Dev Containers: Rebuild Container Without Cache**. Espera a que termine y abre una terminal nueva. No reemplaces `web/`, `fixtures/`, `docs/` ni `.git` para aplicar esta actualización.

**Si usas Docker Compose sin conectar VS Code**, reconstruye desde la terminal de tu computadora; un bloque a la vez:

```bash
docker compose build --no-cache workshop
```

```bash
docker compose up -d workshop
```

```bash
docker compose exec workshop bash .devcontainer/setup.sh
```

El contenedor nuevo incluye **Python 3, el alias `python`, pip, venv, Node, npm, Git y Claude Code**. La salida debe indicar **Image revision: 2026-10-28.2** y **Readiness: READY**. Las dependencias del proyecto se completan al ejecutar la preparación.

**No uses `docker compose down -v`**: no hace falta borrar los volúmenes, la sesión de Claude ni tus archivos para reconstruir la imagen. El acceso a Claude se autentica por separado; tener la CLI instalada no inicia sesión automáticamente.

### 5. Enciende Orbit

**Dónde:** la misma terminal del contenedor. Puedes llamarla **App**.

```bash
npm run start
```

Espera a que Vite esté listo. **Deja esa terminal abierta** y abre en el navegador de tu computadora:

<http://127.0.0.1:4180>

Es una dirección web, no un comando. Debe aparecer Orbit. No pulses Ctrl+C mientras lo estés usando.

### 6. Abre Claude en otra terminal

En VS Code elige **Terminal > Nueva terminal**, sin cerrar App. Llámala **Claude** y ejecuta:

```bash
claude --permission-mode manual
```

Completa la configuración y el acceso aprobado por tu organización. Si no se abre el navegador, copia la URL que muestra Claude; si recibes un código, pégalo de vuelta donde se te solicite.

**Ya puedes continuar con el módulo 1.** Para comprobaciones y comandos de Git abre una tercera terminal llamada **Comprobaciones**.

## Alternativa 2: instalación local por comandos, sin Docker

Usa esta ruta si quieres ejecutar el proyecto directamente en Windows, Mac o Linux. **No abras Reopen in Container ni ejecutes los comandos de Docker Compose** para esta alternativa.

### 1. Instala las herramientas de tu computadora

- **Node.js 24 + npm:** usa la rama 24 LTS de [nodejs.org](https://nodejs.org/en/download). El instalador normal es `.msi` en Windows o `.pkg` en macOS. npm viene incluido. Para varios proyectos puedes elegir [nvm en macOS/Linux](https://github.com/nvm-sh/nvm) o [NVM for Windows](https://docs.nvm-windows.com/install/installers/); son gestores diferentes. El laboratorio requiere al menos Node 24.15.0; la imagen Docker usa 24.19.0.
- **Python 3:** instálalo desde [python.org](https://www.python.org/downloads/). No reemplaces el Python del sistema. En Windows puede usarse `py -3`; en macOS/Linux, `python3`.
- **Git:** sigue la instalación de tu sistema en [git-scm.com](https://git-scm.com/install/).
- **VS Code:** abre la carpeta del laboratorio localmente; Dev Containers no es necesario para esta alternativa.

Cierra y vuelve a abrir la terminal después de instalar las herramientas para cargar sus rutas. La guía gráfica del aula incluye el paso a paso de los instaladores y de nvm.

### 2. Abre la carpeta y su terminal

Extrae el ZIP. En VS Code usa **Archivo > Abrir carpeta** y elige la que contiene este README y `package.json`. Abre **Terminal > Nueva terminal**.

En esta alternativa la ruta será una carpeta de tu computadora (`C:\Users\…`, `/Users/…` o `/home/…`); **no debe ser `/workspaces/bienestar`**. El nombre de la carpeta puede variar, pero debes ver `package.json`, `package-lock.json`, `web/` y `fixtures/` en el explorador.

### 3. Comprueba Node, npm, Python y Git

Ejecuta cada bloque por separado:

```bash
node --version
```

**Esperado:** `v24.x.x`, al menos `v24.15.0` para el taller.

```bash
npm --version
```

**Esperado:** un número de versión de npm. Si PowerShell bloquea `npm.ps1`, puedes usar `npm.cmd` en lugar de `npm` en todos los comandos siguientes, sin desactivar la política de seguridad.

**Solo Windows:** comprueba Python con:

```powershell
py -3 --version
```

Si tu instalación ofrece `python` en lugar de `py`, usa `python --version` y confirma que diga **Python 3**.

**Solo macOS/Linux:** comprueba Python con:

```bash
python3 --version
```

En cualquier sistema, comprueba Git:

```bash
git --version
```

### 4. Instala las dependencias del proyecto

**Dónde:** terminal local, en la carpeta que contiene `package.json` y `package-lock.json`.

```bash
npm ci
```

**Espera:** termina la descarga e instalación y vuelve a aparecer el prompt sin errores. Esto crea `node_modules`; aún no inicia Orbit. No instales React ni TypeScript uno por uno y no uses `sudo`.

**¿Puedo ejecutar npm i?** Sí: `npm i` es el alias de `npm install` y también instala las dependencias. Para este ZIP recomendamos **`npm ci`** porque respeta las versiones de `package-lock.json`. Elige uno; no ejecutes ambos por rutina. `npm ci` reemplaza `node_modules` si ya existe, pero no borra los archivos fuente del proyecto. Si falta el lockfile, descarga de nuevo el ZIP del curso. Si un registro corporativo impide instalar, comparte el error con TI/mentor.

### 5. Prepara el punto de partida de Git

El ZIP nuevo no incluye `.git`. **Solo si es tu primera apertura y esta carpeta aún no es un repositorio**, ejecuta estos tres bloques por separado desde la carpeta del laboratorio. No lo hagas en tu carpeta personal ni en otro proyecto.

```bash
git init --initial-branch=session-1
```

```bash
git add .
```

```bash
git -c user.name="Laboratorio Bienestar" -c user.email="laboratorio@example.invalid" commit -m "Initial workshop state" --quiet
```

La identidad se usa solo para ese commit; no cambia tu configuración global. Si ya habías preparado el repositorio, conserva su historial y omite esta inicialización. Git permitirá comparar después el cambio del filtro con su estado inicial.

### 6. Instala y comprueba Claude CLI

La instalación de Claude y el acceso a su servicio son independientes. Usa **solo el bloque de tu sistema**, procedente de [la guía oficial de Claude Code](https://code.claude.com/docs/en/setup).

**Windows / PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**macOS o Linux / Terminal:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Cuando termine, abre una terminal nueva en la carpeta del proyecto y comprueba:

```bash
claude --version
```

Ver una versión no confirma que estés autenticado. La cuenta del aula no concede el acceso a Claude. Si aún no tienes acceso compatible, puedes arrancar Orbit y usar el simulador para ensayar la conversación.

### 7. Comprueba el laboratorio local

```bash
npm run status
```

**Debes ver:** tu carpeta local en `Directory`, **Data file: found** y **Dependencies: ready**. El script detecta Python 3 usando el comando disponible: `py`, `python` o `python3`, según tu sistema. Si falta una herramienta, resuélvelo antes de la parte que la utiliza.

### 8. Enciende Orbit en tu computadora

**Terminal App, en la carpeta del proyecto:**

```bash
npm run start
```

Espera que Vite esté listo. El laboratorio usa **127.0.0.1:4180 también en la ruta local**. Déjalo abierto y visita:

<http://127.0.0.1:4180>

Si ese puerto ya está ocupado por otra ejecución del laboratorio, detén esa ejecución; no arranques Docker y la ruta local a la vez sobre el mismo puerto.

### 9. Abre Claude y las comprobaciones

Abre **otra terminal local** en la misma carpeta, sin cerrar App:

```bash
claude --permission-mode manual
```

Inicia sesión con tu acceso compatible. Después abre una tercera terminal **Comprobaciones** para el resumen de datos:

```bash
npm run data
```

**Esperado:** `tech` tiene 2 operaciones y MXN 1650.00; `home`, 2 y MXN 1000.00; `sports`, 2 y MXN 950.00. Esta orden detecta el ejecutable de Python de tu sistema. No necesitas paquetes pip para ese resumen.

**Continúa con el ejercicio del módulo 1.** Los comandos npm y Git del ejercicio se ejecutan directamente en esta tercera terminal. Cuando el curso mencione “dentro del contenedor”, en esta alternativa usa tu terminal local en la carpeta del laboratorio. No uses el prefijo `docker compose exec workshop`.

**Al terminar:** sal de Claude y pulsa Ctrl+C en App para detener Orbit. En esta ruta no hay un contenedor que detener. Para continuar otro día, abre la misma carpeta y repite `npm run start`; no necesitas reinstalar las dependencias cada vez.

## Anexo: Docker Compose sin Dev Containers

**Este anexo es para quien quiere Docker sin la extensión de VS Code.** No lo ejecutes además de la alternativa 1 o la alternativa 2. Si ya tienes Orbit encendido, continúa con la práctica.

Esta alternativa usa **terminales de tu equipo**, fuera del contenedor. En todas debes estar en la carpeta del laboratorio que contiene `compose.yaml` y `README.md`. Cada bloque es **un comando independiente**: copia solo su contenido, pulsa **Enter** y espera la comprobación indicada antes de pasar al siguiente.

### 1. Terminal App: construye e inicia el contenedor

Abre una terminal del equipo en la carpeta del laboratorio. Ejecuta:

```bash
docker compose up -d --build
```

**Espera:** la primera construcción descarga la imagen y puede tardar varios minutos. Continúa cuando termine sin errores y vuelva a aparecer la entrada de la terminal. Si falla, detente y revisa el mensaje con el mentor.

### 2. En la misma terminal App: prepara las herramientas

```bash
docker compose exec workshop bash .devcontainer/setup.sh
```

**Espera:** al terminar debe aparecer `ENVIRONMENT READY`. Este comando instala las dependencias del proyecto dentro del contenedor; todavía no abre el panel.

### 3. En la misma terminal App: enciende el panel

```bash
docker compose exec workshop npm run start
```

**Comprueba:** espera a que Vite esté listo. Esta terminal queda ocupada mientras el panel funciona. Déjala abierta; **no pulses Ctrl+C** durante la práctica.

### 4. En el navegador: abre tu panel local

Escribe esta dirección en la barra de direcciones del navegador. **Es una URL, no un comando de terminal.**

<http://127.0.0.1:4180>

Debe aparecer Orbit. Si no abre, vuelve a la terminal App y confirma que sigue encendida y no muestra errores.

### 5. Terminal Claude: inicia la conversación

Abre **otra terminal del equipo**, también en la carpeta que contiene `compose.yaml`. No cierres ni interrumpas la terminal App. Ejecuta:

```bash
docker compose exec workshop claude --permission-mode manual
```

Completa el acceso con tu cuenta autorizada. Cuando aparezca la conversación de Claude, escribe allí los mensajes de `PROMPTS.md`; los comandos npm y git se ejecutan en la terminal Comprobaciones.

### 6. Terminal Comprobaciones: observa el filtro

Abre una **tercera terminal del equipo** en la misma carpeta y ejecuta:

```bash
docker compose exec workshop npm run check
```

**Comprueba:** verás una tabla con `all`, `tech`, `home` y `sports`. Es una observación del filtro actual; al inicio conserva el defecto intencional. Espera a que termine y vuelva la entrada de la terminal. Para usar otro comando del curso desde esta alternativa, antepón `docker compose exec workshop` al comando que se ejecutaría dentro del contenedor.

### 7. Solo al terminar: detén el entorno

Sal de la conversación de Claude. En la terminal App pulsa **Ctrl+C** para detener el panel. En una terminal del equipo ubicada en la carpeta del laboratorio ejecuta:

```bash
docker compose stop
```

Los archivos del laboratorio y el volumen de configuración de Claude se conservan.

### Para continuar otro día

En la carpeta del laboratorio, inicia el contenedor:

```bash
docker compose start
```

Después, en esa misma terminal, vuelve a encender el panel:

```bash
docker compose exec workshop npm run start
```

Deja esa terminal abierta y repite los pasos 4 y 5 cuando lo necesites. Si no cambió la imagen ni faltan dependencias, no hace falta volver a ejecutar la preparación del paso 2.

**No ejecutes `docker compose down -v`:** elimina los volúmenes de este laboratorio, incluida la configuración de acceso de Claude.

## Qué abrir durante clase
- `fixtures/operations.json`: datos de práctica.
- `web/src/App.tsx`: pantalla y selección de segmento.
- `web/src/filter.ts`: regla que conserva operaciones.
- `CLAUDE.md`: acuerdos que orientan a Claude.
- `PROMPTS.md`: instrucciones listas para copiar.
- `docs/my-diagnosis.md`: tu entrega de la primera sesión.

## Comandos de esta sesión
- `npm run status`: muestra disponibilidad de las herramientas; no inicia sesión por ti.
- `npm run start`: abre aplicación y servicio de datos; Ctrl+C los detiene.
- `npm run check`: imprime lo que calcula el filtro actual; no es una suite de pruebas.
- `npm run evidence`: guarda la observación en evidence/ con fecha y huella del archivo.
- `npm run data`: resume la misma fuente con Python para contrastarla con el panel.

## Si no puedes arrancar
Para comparar el síntoma con la guía actual, abre https://imagi-3gs.pages.dev/orbit/?mode=observe desde el aula. La copia local observation-mode.html es una referencia básica sin servidor; no permite hacer la edición asistida. Para practicar la conversación sin acceso a Claude usa el simulador del aula; para editar el proyecto real trabaja en un equipo preparado, por parejas si hace falta.

## Alcance del entorno
La imagen incluye Node 24.19.0, Python 3 de Debian, Git y Claude Code 2.1.310. Java, Spark y Playwright no se instalan en esta primera sesión.
La carpeta del proyecto está compartida con el contenedor: los cambios persisten en tu equipo. Claude trabaja en ese entorno y sigue solicitando permisos. Se conserva su configuración en un volumen local del proyecto. No se monta tu directorio personal ni el socket de Docker.
Primera construcción: depende de internet y del equipo; puede tomar varios minutos. Recomendamos preparar y abrir el entorno el día previo. El laboratorio publica su panel solo en localhost:4180.

## Convenciones de esta versión
El código, los tipos, las funciones, las rutas y los scripts usan inglés. Este README, las indicaciones y la interfaz del panel se mantienen en español.

| Comando | Qué hace |
| --- | --- |
| `npm run start` | Mantiene encendidos el servicio de datos y el panel. |
| `npm run status` | Comprueba las herramientas del entorno. |
| `npm run check` | Muestra lo que devuelve el filtro actual. |
| `npm run evidence` | Guarda una observación en `evidence/`. |
| `npm run data` | Resume los datos con Python. |
| `npm test` | Contrasta el filtro con los resultados esperados. |

**El defecto es intencional:** al empezar, tres pruebas fallan y una pasa. Después de la corrección deben pasar las cuatro. Un fallo inicial permite comprobar la mejora.

## Si no tienes una cuenta de Claude
Abre el simulador del aula: https://imagi-3gs.pages.dev/simulador/
Funciona con respuestas preparadas y archivos virtuales en el navegador. No necesita una cuenta de Claude ni una clave API. Practica la lectura, el plan, la solicitud de permiso, el cambio y la comprobación. No ejecuta comandos en tu equipo, no conecta servicios MCP reales y no genera respuestas con un modelo.
Puedes además usar el laboratorio real en Docker y aplicar manualmente el cambio que compruebas en el simulador.

## Si nunca has usado Claude Code

El acceso a esta aula y el acceso a Claude son independientes. Puedes aprender Claude desde cero, pero esta práctica supone que sabes abrir una carpeta y editar y guardar un archivo. Prepara Docker, VS Code y tu acceso antes de la clase. Si no tienes una cuenta compatible, usa el simulador del aula para ensayar con respuestas preparadas y archivos virtuales, o trabaja en pareja en un laboratorio real.

### Las tres terminales

En el panel Terminal de VS Code, haz clic derecho en una terminal de la lista y elige Cambiar nombre (Rename). Usa estos nombres durante toda la práctica:

| Nombre | Cuándo se abre | Qué escribimos allí |
| --- | --- | --- |
| App (Terminal 1) | Paso 5 | `npm run start`. Se mantiene encendida; no pulses Ctrl+C durante la práctica. |
| Claude (Terminal 2) | Se reserva en el paso 5 y se inicia en el paso 9 | Primero `claude --permission-mode manual`. Después, dentro de la conversación, los mensajes de `PROMPTS.md`. |
| Comprobaciones (Terminal 3) | Paso 7 | `npm run data`, `git diff -- web/src/filter.ts`, `npm test`, `npm run check` y `npm run evidence`. |

Un prompt es el mensaje donde explicas la tarea a Claude. Pega el mensaje completo en la entrada de la conversación y pulsa Enter para enviarlo; espera la respuesta antes del siguiente. Los comandos npm y git van en Comprobaciones, fuera de la conversación. Si necesitas detener una actividad de Claude, pulsa Esc. Revisa los permisos antes de aprobar una edición y comprueba el archivo guardado, aunque Claude diga que ya terminó.

### Recorrido hasta la entrega

1. Observa el fallo: Tecnología conserva las seis operaciones y MXN 3,600.
2. Lee el JSON y ejecuta `npm run data` en Comprobaciones: tech debe tener dos operaciones y MXN 1,650.
3. En `web/src/App.tsx` identifica `visibleOperations = filterOperations(operations, segment)`. Lee después `web/src/filter.ts` sin editarlo.
4. En Claude, envía el bloque 01 de `PROMPTS.md` para que lea y explique. La respuesta puede variar: contrástala con los archivos.
5. Edita y guarda `CLAUDE.md` con las dos reglas de la guía. El mensaje del plan consultará ese archivo actualizado.
6. Envía el bloque 02 para acordar el plan, todavía sin editar. Registra el plan en `docs/my-diagnosis.md`.
7. Envía el bloque 03 para autorizar la edición acotada. Si pide permiso, verifica la ruta y la propuesta antes de aprobarla.
8. En Comprobaciones ejecuta `git diff -- web/src/filter.ts`. Las líneas con menos muestran lo retirado y las de más lo agregado. Si se abre un visor con `(END)`, pulsa `q` para salir.
9. En el panel local comprueba Todos, Tecnología, Hogar y Deporte con `docs/expected-result.md`.
10. Ejecuta `npm test`: después de la corrección deben pasar cuatro pruebas y fallar cero. No cambies los datos ni las pruebas para conseguirlo.
11. Ejecuta `npm run check` y `npm run evidence`. Abre el JSON cuya ruta real aparece después de `Saved to`.
12. Completa y guarda `docs/my-diagnosis.md` con el antes, el resultado esperado, los archivos, el plan, el cambio, las cuatro comprobaciones y la ruta real del reporte. Guarda con Ctrl+S o Cmd+S.

Esta guía no incluye una respuesta garantizada del modelo. Si Claude cita otro archivo, propone instalar paquetes, cambia datos o no respeta el plan, detén la acción y revisa el caso con el mentor.

<!-- docker-help:generated -->
## Problemas comunes de Docker

Busca el mensaje que aparece en tu equipo. Sigue solo la solución de ese caso; no hace falta reinstalar todo ni repetir la instalación en cada sesión.

Revisado: 29 de octubre de 2026. **Copia un comando por vez y respeta dónde ejecutarlo.**

### Falta Virtual Machine Platform

**Mensaje de referencia:** `Installation failed. One prerequisite is not fulfilled.`

`Virtual Machine Platform is not enabled.`

![Guía visual del error Virtual Machine Platform en el instalador de Docker Desktop.](https://imaginatec.tech/assets/guide/docker-help-platform.png)

Ilustración didáctica del mensaje de la captura: el requisito que falta pertenece a Windows, antes de crear el contenedor.

**Qué significa:** Falta un componente de Windows que permite ejecutar WSL 2. El instalador por usuario no puede habilitarlo sin permisos de administrador. Todavía no es un fallo del proyecto ni del contenedor.

#### 1. Abre PowerShell como administrador

Cierra el instalador. En Inicio busca PowerShell, haz clic derecho y elige Ejecutar como administrador. Acepta el aviso autorizado. En una computadora corporativa, pide a TI que realice este cambio si no tienes permisos. No uses la terminal del contenedor.

![Referencia visual: busca PowerShell, haz clic derecho y elige Ejecutar como administrador.](https://imaginatec.tech/assets/guide/docker-help-powershell.png)

Referencia visual de Windows. Comprueba que la nueva ventana diga Administrador antes de ejecutar WSL.

#### 2. Instala WSL y espera a que termine

Ejecuta este único comando en PowerShell. Habilita los componentes necesarios e instala Ubuntu de forma predeterminada; esa distribución no es un requisito adicional de este laboratorio.

**Dónde:** PowerShell de Windows · Administrador

```powershell
wsl --install
```

**Resultado esperado:** El proceso termina o solicita reiniciar. Si dice que WSL ya está instalado, revisa el caso WSL desactualizado; no repitas la instalación en bucle.

#### 3. Reinicia Windows y vuelve al instalador

Guarda tu trabajo y reinicia la computadora. Vuelve a ejecutar el instalador de Docker Desktop. Cuando termine, abre Docker Desktop y espera a que el motor arranque. Cerrar PowerShell no sustituye el reinicio.

#### 4. Comprueba que el motor responde

Abre una terminal nueva de Windows y ejecuta el comando. Esta comprobación ya no requiere una terminal del contenedor.

**Dónde:** PowerShell de tu equipo

```powershell
docker info
```

**Resultado esperado:** Aparece información de Server sin error de conexión. Ahora puedes continuar con VS Code y Dev Containers.

#### Alternativa: Si WSL ya existe, pero sigue faltando Virtual Machine Platform

Con autorización de TI, abre PowerShell como administrador y habilita específicamente esa característica. Este comando no instala Docker ni corrige una virtualización desactivada en BIOS/UEFI.

**Dónde:** PowerShell de Windows · Administrador

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**Resultado esperado:** DISM indica que la operación se completó. Guarda tu trabajo, reinicia Windows y vuelve a probar el instalador. Si continúa el mismo mensaje, comparte la salida con TI.

**Así sabes que quedó resuelto:** Docker Desktop se instala y docker info muestra el servidor. La instalación por usuario se refiere a tu cuenta de Windows, no a cada sesión del curso.

**Fuentes:** [Docker · instalación en Windows](https://docs.docker.com/desktop/setup/install/windows-install/) · [Microsoft · instalar WSL](https://learn.microsoft.com/en-us/windows/wsl/install) · [Microsoft · habilitar Virtual Machine Platform](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature)

### WSL necesita una actualización

**Mensaje de referencia:** `WSL update required`

**Qué significa:** WSL existe, pero Docker necesita una versión compatible. Actualizar WSL es diferente de instalar otra distribución de Linux.

#### 1. Consulta la versión instalada

Abre PowerShell de Windows. Si el comando no existe o muestra ayuda en lugar de una versión, comparte esa salida con TI para revisar la instalación de WSL.

**Dónde:** PowerShell de tu equipo

```powershell
wsl --version
```

**Resultado esperado:** Aparece la versión de WSL. Contrástala con los requisitos vigentes de Docker en el enlace oficial.

#### 2. Actualiza WSL

Ejecuta el comando; si Windows solicita permisos, utiliza una ventana de administrador autorizada. Guarda el trabajo de otros entornos WSL antes de reiniciar cuando lo solicite.

**Dónde:** PowerShell de Windows

```powershell
wsl --update
```

**Resultado esperado:** La actualización termina, o informa que ya está actualizado. Vuelve a abrir Docker Desktop y comprueba docker info.

**Así sabes que quedó resuelto:** Docker deja de pedir actualizar WSL y el motor inicia.

**Fuentes:** [Microsoft · comandos de WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) · [Docker · backend WSL 2](https://docs.docker.com/desktop/features/wsl/)

### La virtualización está desactivada

**Mensaje de referencia:** `Virtualization support not detected`

**Qué significa:** La virtualización del procesador y la característica Virtual Machine Platform son requisitos distintos. Habilitar una característica de Windows no activa por sí solo BIOS/UEFI.

#### 1. Revisa el estado en Windows

Abre Administrador de tareas > Rendimiento > CPU. Busca Virtualización y anota si indica Habilitada o Deshabilitada.

![Referencia del Administrador de tareas, Rendimiento, CPU: ubicación de Virtualización.](https://imaginatec.tech/assets/guide/docker-help-virtualization.png)

Ilustración del lugar que debes revisar. En tu equipo puede decir Habilitada o Deshabilitada; comunica ese estado a TI.

#### 2. Pide apoyo para el cambio de firmware

Si está deshabilitada, consulta a TI o las instrucciones del fabricante para tu modelo. Si Windows se ejecuta dentro de otra máquina virtual, TI debe revisar también la virtualización anidada. No cambies opciones de BIOS al azar.

#### 3. Continúa con una ruta disponible

Mientras se resuelve, usa la instalación manual del README si puedes instalar sus herramientas, o ensaya con el simulador. El simulador no ejecuta el proyecto local.

**Así sabes que quedó resuelto:** La virtualización figura habilitada y Docker cumple los requisitos del equipo.

**Fuentes:** [Docker · problemas de virtualización](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/)

### El motor de Docker no responde

**Mensaje de referencia:** `Cannot connect to the Docker daemon`

**Qué significa:** Tener el comando docker instalado no significa que el motor esté encendido.

#### 1. Abre Docker Desktop

En Windows ábrelo desde Inicio; en Mac, desde Aplicaciones; en Linux, desde el lanzador. Espera a que el motor termine de iniciar y revisa los avisos de la aplicación.

#### 2. Comprueba el servidor

Ejecuta desde una terminal de tu computadora, fuera del contenedor. Si sigue fallando, registra el aviso de Docker y consulta el caso de WSL o virtualización según tu sistema.

**Dónde:** Terminal de tu computadora

```bash
docker info
```

**Resultado esperado:** Aparece la sección Server. docker --version solo comprueba el cliente; no sustituye esta prueba.

**Así sabes que quedó resuelto:** docker info conecta antes de usar Reopen in Container.

**Fuentes:** [Docker · iniciar Desktop](https://docs.docker.com/desktop/setup/install/windows-install/#start-docker-desktop)

### El puerto 4180 ya está ocupado

**Mensaje de referencia:** `Bind for 127.0.0.1:4180 failed: port is already allocated`

**Qué significa:** Otra ejecución ya utiliza el puerto del panel. Puede ser una copia anterior del laboratorio o una aplicación local.

#### 1. Identifica la ejecución

Abre primero http://127.0.0.1:4180. Revisa las terminales App que dejaste abiertas. Este comando muestra los contenedores que publican ese puerto; una lista vacía no descarta una aplicación local.

**Dónde:** Terminal de tu computadora

```bash
docker ps --filter publish=4180
```

**Resultado esperado:** Si hay un contenedor, aparecen su identificador, nombre y puerto. Identifica cuál es antes de detenerlo.

#### 2. Detén solo la copia que reconoces

Si es una App local, pulsa Ctrl+C en su terminal. Si es una copia Docker del laboratorio, detén únicamente ese contenedor desde Docker Desktop. Si no lo reconoces, pide apoyo al mentor; no detengas servicios de otros proyectos.

#### 3. Vuelve a abrir la copia correcta

Con el puerto libre, en la carpeta del laboratorio usa Dev Containers: Reopen in Container. Si seguiste el anexo Compose, repite su paso de inicio. No ejecutes ambas rutas a la vez.

**Así sabes que quedó resuelto:** Una sola ejecución ocupa 4180 y Orbit abre en el navegador.

**Fuentes:** [Docker · puertos ocupados](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/#port-already-allocated-errors)

### No encuentra compose.yaml o package.json

**Mensaje de referencia:** `no configuration file provided: not found`

`Could not read package.json`

**Qué significa:** La terminal puede estar en una carpeta distinta del proyecto. No crees archivos vacíos ni reinstales las herramientas para corregir la ruta.

#### 1. Abre la carpeta extraída correcta

En VS Code usa Archivo > Abrir carpeta. Elige la carpeta que contiene README.md, compose.yaml, package.json y .devcontainer. No trabajes dentro del ZIP ni en la carpeta superior.

#### 2. Ubica el entorno de la terminal

Los comandos docker compose del anexo se ejecutan desde esa carpeta local. Los comandos npm de la ruta Dev Container van en una terminal nueva conectada a /workspaces/bienestar. En la ruta manual, npm se ejecuta en la carpeta local del proyecto.

#### 3. Comprueba antes de continuar

Desde la terminal y carpeta de la ruta elegida, ejecuta este comando.

**Dónde:** Terminal del laboratorio · según tu ruta

```bash
npm run status
```

**Resultado esperado:** Encuentra package.json y muestra Data file: found. Si indica LOCAL COMPUTER, confirma que elegiste la ruta manual o conecta el contenedor.

**Así sabes que quedó resuelto:** La terminal usa la carpeta y el entorno correspondientes a tu alternativa.

**Fuentes:** [Docker · ubicación del archivo Compose](https://docs.docker.com/reference/cli/docker/compose/)

### Python o Claude aparecen como no instalados

**Mensaje de referencia:** `NOT available`

**Qué significa:** Una terminal local no utiliza automáticamente las herramientas del contenedor. También puede haberse descargado una versión anterior del laboratorio.

#### 1. Lee Environment en npm run status

Si dice LOCAL COMPUTER y elegiste Docker, abre la paleta de VS Code con Cmd+Shift+P en Mac o Ctrl+Shift+P en Windows/Linux. Elige Dev Containers: Reopen in Container. Espera y abre Terminal > Nueva terminal.

#### 2. Comprueba directamente el servicio

Desde la carpeta local con compose.yaml, usa este comando para consultar el servicio del curso.

**Dónde:** Terminal de tu computadora · carpeta del laboratorio

```bash
docker compose exec workshop npm run status
```

**Resultado esperado:** El contenedor del curso muestra versiones de Python y Claude. Si dice que el servicio no está en ejecución, conecta primero el entorno.

#### 3. Si faltan dentro del contenedor del curso

Conserva tus cambios y evidencias. Sigue la recuperación de la guía Abre el entorno preparado: usa los archivos de entorno actualizados y Dev Containers: Rebuild Container Without Cache. Reconstruir no es borrar volúmenes. La versión de Claude no confirma que hayas iniciado sesión.

**Así sabes que quedó resuelto:** Environment corresponde al contenedor del curso y las herramientas tienen versión.

**Fuentes:** [VS Code · contenedores de desarrollo](https://code.visualstudio.com/docs/devcontainers/containers)

### La descarga falla por red, proxy o certificados

**Mensaje de referencia:** `TLS handshake timeout / certificate / proxy`

**Qué significa:** La construcción descarga componentes de Internet. Un bloqueo de red no se resuelve modificando el filtro de React ni desactivando la seguridad.

#### 1. Localiza el primer error real

En VS Code abre el registro de Dev Containers. Copia la primera línea de error y el paso que falla; Building por sí solo puede ser actividad normal. Si el proceso terminó con Exit code 1, no sigas como si estuviera listo.

#### 2. Revisa la conexión con TI

Confirma acceso a Internet y la configuración corporativa de proxy y certificados en Docker Desktop. Pide a TI permitir las descargas necesarias según el dominio que falla. No desactives TLS, el antivirus ni el firewall para completar el taller.

#### 3. Reintenta tras resolver el bloqueo

Vuelve a abrir el proyecto con Dev Containers. Si falla otra vez, publica una pregunta del módulo 1 con sistema operativo, mensaje, paso y captura sin contraseñas, tokens ni datos de otros proyectos.

**Así sabes que quedó resuelto:** La construcción termina sin errores y npm run status confirma el entorno.

**Fuentes:** [Docker · configuración de proxy](https://docs.docker.com/desktop/settings-and-maintenance/settings/#proxies) · [Docker · certificados](https://docs.docker.com/engine/network/ca-certs/)

### Si necesitas apoyo

Publica en **Preguntas y problemas > Módulo 1**, en https://imaginatec.tech/aula/#preguntas. Incluye sistema, acción y primera línea de error; recorta la captura para excluir contraseñas, tokens y otros proyectos. Conserva archivos y volúmenes. Evita reinicios de fábrica o limpiezas generales como primera solución.
