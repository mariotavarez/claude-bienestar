#!/usr/bin/env bash
set -euo pipefail
cd /workspaces/bienestar
if [ ! -x node_modules/.bin/vite ]; then
  echo "Preparing dependencies included in the image..."
  cp -a /opt/course/node_modules/. node_modules/
fi
if [ ! -d .git ]; then
  git init --initial-branch=module-2
  git add .
  git -c user.name="Laboratorio Bienestar" -c user.email="laboratorio@example.invalid" commit -m "Estado inicial de la sesion 1" --quiet
fi
npm run status -- --container
printf '\nENVIRONMENT READY\n'
printf '\nNext step: npm run start\nPanel: http://127.0.0.1:4182\n'
