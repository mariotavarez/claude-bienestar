export type ReportOperation = {id:string; date:string; segment:string; label:string; amount_cents:number; status:string};
export type ReportScope = 'all' | 'pending' | 'confirmed';
export const money = (cents:number) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(cents/100);
export const segments = [{id:'tech',label:'Tecnología'},{id:'home',label:'Hogar'},{id:'sports',label:'Deporte'}];
export function buildReport(operations:ReportOperation[],scope:ReportScope='all') {
 const rows=operations.filter(row=>scope==='all'||row.status===scope);
 const total=rows.reduce((sum,row)=>sum+row.amount_cents,0);
 const pending=rows.filter(row=>row.status==='pending').reduce((sum,row)=>sum+row.amount_cents,0);
 const groups=segments.map(segment=>({...segment,cents:rows.filter(row=>row.segment===segment.id).reduce((sum,row)=>sum+row.amount_cents,0)}));
 const label=scope==='all'?'Todas las operaciones':scope==='pending'?'Operaciones pendientes':'Operaciones confirmadas';
 const summary=rows.length?`${label}: ${rows.length} operaciones por ${money(total)} MXN. ${money(pending)} MXN pendientes. ${groups.filter(g=>g.cents).map(g=>`${g.label}: ${money(g.cents)} MXN`).join('; ')}.`:`${label}: no hay operaciones para esta selección.`;
 return {rows,total,pending,groups,label,summary};
}
function csvCell(value:string|number) {
 const raw=String(value),safe=/^[\s]*[=+@-]/.test(raw)?"'"+raw:raw;
 return '"'+safe.replaceAll('"','""')+'"';
}
export function reportCsv(rows:ReportOperation[]) {
 return '\uFEFF'+[['ID','Fecha','Segmento','Estado','Importe MXN'],...rows.map(row=>[row.id,row.date,row.segment,row.status,(row.amount_cents/100).toFixed(2)])].map(row=>row.map(csvCell).join(',')).join('\r\n');
}
