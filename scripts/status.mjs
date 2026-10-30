import {inspectEnvironment,statusLines} from './environment-status.mjs';
const status=inspectEnvironment(),requireContainer=process.argv.includes('--container');
if(process.argv.includes('--json'))console.log(JSON.stringify(status));
else{
 console.log(statusLines(status).join('\n'));
 if(requireContainer&&status.environment!=='course-container')console.error('ERROR: this check requires the verified course container.');
}
if((requireContainer&&(status.environment!=='course-container'||!status.ready))||(status.environment!=='local'&&!status.ready)||process.argv.includes('--strict')&&!status.ready)process.exitCode=1;
