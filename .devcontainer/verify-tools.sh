#!/usr/bin/env bash
set -euo pipefail
printf '\nVERIFYING COURSE TOOLS\n'
node --version
npm --version
python3 --version
python --version
python3 -m pip --version
python3 -m venv --help >/dev/null
git --version
claude --version
test -x /home/node/.local/bin/claude
printf 'COURSE TOOLS VERIFIED\n'
