import {spawnSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
const results=[];
for(const [name,args] of [['baseline',['--test','tests/baseline.test.mjs']],['web',['--test','tests/selection.test.mjs']],['types',['node_modules/typescript/bin/tsc','--noEmit']],['data',['scripts/python-task.mjs','-m','unittest','discover','-s','data/tests','-v']]]) {
 const r=spawnSync(process.execPath,args,{encoding:'utf8'});results.push({name,exit_code:r.status,output:(r.stdout||'')+(r.stderr||'')});
}
mkdirSync('evidence',{recursive:true});writeFileSync('evidence/checks.json',JSON.stringify({generated_at:new Date().toISOString(),results},null,2));
for(const result of results) console.log(`${result.exit_code===0?'PASS':'FAIL'} ${result.name}`);
console.log('Saved evidence/checks.json. It can contain local paths; review it before sharing.');
process.exitCode=results.some(result=>result.exit_code!==0)?1:0;
