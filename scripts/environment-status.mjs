import {existsSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import {findPython} from './python-runtime.mjs';

export function inspectEnvironment({cwd=process.cwd(),nodeVersion=process.version,platform=process.platform,exists=existsSync,read=readFileSync,run=spawnSync}={}){
 const insideContainer=exists('/.dockerenv'),courseContainer=insideContainer&&exists('/etc/imagi-workshop');
 const probe=(command,args=['--version'])=>{
  const result=run(command,args,{encoding:'utf8',timeout:10000});
  return {available:result.status===0,version:(result.stdout||result.stderr||'').trim().slice(0,240),error:result.error?.code||null};
 };
 const python=findPython(platform,run),git=probe('git'),claude=probe('claude');
 const pip=python?probe(python.command,[...python.args,'-m','pip','--version']):{available:false,version:''};
 const revision=courseContainer?String(read('/etc/imagi-workshop','utf8')).trim():null;
 const [major,minor]=nodeVersion.replace(/^v/,'').split('.').map(Number),nodeSupported=major>24||major===24&&minor>=15;
 const data=exists(resolve(cwd,'fixtures/operations.json')),dependencies=exists(resolve(cwd,'node_modules/vite/bin/vite.js'));
 const missing=[...(!nodeSupported?['Node.js >=24.15.0']:[]),...(!python?['Python 3']:[]),...(!git.available?['Git']:[]),...(!claude.available?['Claude Code']:[]),...(!data?['Project data file']:[]),...(!dependencies?['Project dependencies']:[]),...(courseContainer&&!pip.available?['Python pip']:[])];
 return {environment:courseContainer?'course-container':insideContainer?'other-container':'local',revision,cwd,nodeVersion,nodeSupported,python,git,claude,pip,data,dependencies,missing,ready:missing.length===0};
}

export function statusLines(status){
 const environment={'course-container':'COURSE DEV CONTAINER','other-container':'DOCKER CONTAINER (course image not confirmed)',local:'LOCAL COMPUTER (outside the course container)'}[status.environment];
 const lines=['SESSION 1 · ENVIRONMENT STATUS','Environment: '+environment,...(status.revision?['Image revision: '+status.revision]:[]),'Directory: '+status.cwd,'Node: '+status.nodeVersion+(status.nodeSupported?'':' (requires >=24.15.0)'),(status.python?.command||'Python 3')+': '+(status.python?.version||'NOT available'),'pip: '+(status.pip.available?status.pip.version:'NOT available'),'git: '+(status.git.available?status.git.version:'NOT available'),'claude: '+(status.claude.available?status.claude.version:'NOT available'),'Data file: '+(status.data?'found':'NOT found'),'Dependencies: '+(status.dependencies?'ready':'pending'),'Readiness: '+(status.ready?'READY':'INCOMPLETE · '+status.missing.join(', '))];
 if(status.environment==='local')lines.push('','DEV CONTAINER ROUTE: this terminal is running on your computer.','Open VS Code Command Palette: Cmd+Shift+P (Mac) / Ctrl+Shift+P (Windows/Linux).','Run Dev Containers: Reopen in Container, wait, then open Terminal > New Terminal.','Run npm run status there. Docker running by itself does not move this terminal into the container.','From your computer, you can also check the container with:','docker compose exec workshop npm run status -- --container','For the manual route, install missing tools on your computer using the course installation guide.');
 if(status.environment==='other-container')lines.push('','This is a container, but not a verified course image. Rebuild using the Dockerfile included in the updated laboratory.');
 if(status.environment!=='local'&&!status.ready)lines.push('','Do not continue with an incomplete container.','In VS Code run Dev Containers: Rebuild Container Without Cache, then open a NEW terminal.','Keep your project folder and volumes. Do not run docker compose down -v.');
 lines.push('','A Claude version confirms installation only. Sign in separately with your approved Claude access.');
 return lines;
}
