import {spawnSync} from 'node:child_process';

export function findPython(platform = process.platform, run = spawnSync) {
  const candidates = platform === 'win32'
    ? [{command:'py',args:['-3']},{command:'python',args:[]},{command:'python3',args:[]}]
    : [{command:'python3',args:[]},{command:'python',args:[]}];
  for (const candidate of candidates) {
    const result = run(candidate.command, [...candidate.args, '--version'], {encoding:'utf8',timeout:5000});
    const version = (result.stdout || result.stderr || '').trim();
    if (result.status === 0 && /^Python 3\./.test(version)) return {...candidate,version};
  }
  return null;
}
