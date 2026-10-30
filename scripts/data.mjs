import {spawnSync} from 'node:child_process';
import {findPython} from './python-runtime.mjs';

const python = findPython();
if (!python) {
  console.error('Python 3 was not found. Install it, reopen the terminal and run npm run status.');
  process.exitCode = 1;
} else {
  const result = spawnSync(python.command, [...python.args,'data/summary.py'], {stdio:'inherit'});
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
}
