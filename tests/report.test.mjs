import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildReport,reportCsv} from '../web/src/components/report.ts';
const fixture=JSON.parse(readFileSync(new URL('../fixtures/operations.json',import.meta.url))).operations;
test('report uses all rows or the requested status without mutating inputs',()=>{
 const frozen=Object.freeze(fixture.map(row=>Object.freeze({...row})));
 for(const [scope,count,total,pending]of [['all',6,360000,75000],['pending',2,75000,75000],['confirmed',4,285000,0]]){
  const result=buildReport(frozen,scope);assert.equal(result.rows.length,count);assert.equal(result.total,total);assert.equal(result.pending,pending);assert.match(result.summary,new RegExp(count+' operaciones'));
 }
 assert.deepEqual(buildReport(fixture).groups.map(g=>g.cents),[165000,100000,95000]);
 assert.deepEqual(buildReport(fixture,'pending').rows.map(r=>r.id),['OP003','OP006']);
});
test('empty report has zeros, a useful summary and header-only CSV',()=>{
 const report=buildReport([]);assert.equal(report.total,0);assert.equal(report.pending,0);assert.ok(report.groups.every(g=>g.cents===0));assert.match(report.summary,/no hay operaciones/);assert.equal(reportCsv([]).split('\r\n').length,1);
});
test('CSV exports selected rows as pesos and protects special spreadsheet cells',()=>{
 const csv=reportCsv(buildReport(fixture,'pending').rows);assert.equal(csv.split('\r\n').length,3);assert.match(csv,/"450.00"/);assert.match(csv,/"300.00"/);assert.ok(!csv.includes('OP001'));
 const special=reportCsv([{...fixture[0],id:'=SUM(A1)',segment:'home,"quoted"\nrow',status:' +evil'}]);assert.ok(special.includes('"\'=SUM(A1)"'));assert.ok(special.includes('"home,""quoted""\nrow"'));assert.ok(special.includes('"\' +evil"'));
});
