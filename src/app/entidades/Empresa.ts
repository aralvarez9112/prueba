import { Actividad } from "./Actividad";
import { Codigo } from "./Codigo";
import { Marca } from "./Marca";
import { Producto } from "./Producto";
import {TerminosYCondiciones} from "./../components/terminos-y-condiciones/models/terminosYCondiciones"
export class Empresa {
  rut: string;
  codigos: Codigo[];
  marcas: Marca[];
  subMarcas: Marca[];
  productos: Producto[];
  productosBorrador: Producto[];
  actividades: Actividad[];
  usuario: string;
  terminosYCondicionesAceptados:TerminosYCondiciones[]
  aceptoTerminosYCondiciones:boolean
}
