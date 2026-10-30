import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
const insideContainer = existsSync('/.dockerenv');
const viteArguments = ['node_modules/vite/bin/vite.js', '--config', 'vite.config.ts'];
if (!insideContainer) viteArguments.push('--host', '127.0.0.1', '--port', '4180');
const processes = [
  spawn(process.execPath, ['server/api.mjs'], {stdio: 'inherit'}),
  spawn(process.execPath, viteArguments, {stdio: 'inherit'})
];
console.log('Open the panel at http://127.0.0.1:4180');
let shuttingDown = false;
function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of processes) child.kill('SIGTERM');
  setTimeout(() => process.exit(exitCode), 250).unref();
}
for (const child of processes) child.on('exit', exitCode => shutdown(exitCode ?? 0));
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
