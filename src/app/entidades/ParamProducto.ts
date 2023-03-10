import { ContenidoNeto } from "./ContenidoNeto";
import { Pais } from "./Pais";

export class ParamProducto {
  id:string;
  gtin:string;
	descripcion:string;
	marca: string;
	subMarca: string;
	variedad:string;
	contenidoNeto:ContenidoNeto;
	mercadoObjetivo:Pais[];
	gpc:number;
	estado:string;
	foto:string;
  fechaCreacion?: string;
}
