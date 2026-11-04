import {OrbitDropdown} from './OrbitDropdown';
const options=[{value:'all',label:'Todos los segmentos',color:'#8b8d9c'},{value:'tech',label:'Tecnología',color:'#8272d4'},{value:'home',label:'Hogar',color:'#56a798'},{value:'sports',label:'Deporte',color:'#d79f65'}];
export function SegmentDropdown({value,onChange}:{value:string;onChange:(value:string)=>void}){
  return <OrbitDropdown label="Segmento" value={value} onChange={onChange} options={options}/>;
}
