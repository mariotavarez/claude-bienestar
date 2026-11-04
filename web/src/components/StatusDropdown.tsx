import {OrbitDropdown} from './OrbitDropdown';
const options=[{value:'all',label:'Todos los estados',color:'#8b8d9c'},{value:'confirmed',label:'Confirmadas',color:'#16765a'},{value:'pending',label:'Pendientes',color:'#ab6d1c'}];
export function StatusDropdown({value,onChange}:{value:string;onChange:(value:string)=>void}){
  return <OrbitDropdown label="Estado" value={value} onChange={onChange} options={options}/>;
}
