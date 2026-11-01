import {spawnSync} from 'node:child_process';
import {findPython} from './python-runtime.mjs';
const python = findPython(process.platform, spawnSync);
if (!python) { console.error('Python 3 is unavailable in this terminal. Use the course container or review the manual installation guide.'); process.exit(1); }
const result = spawnSync(python.command, [...python.args, ...process.argv.slice(2)], {stdio:'inherit'});
process.exit(result.status ?? 1);
