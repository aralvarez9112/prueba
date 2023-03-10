import { ContenidoNeto } from "./ContenidoNeto";
import { Empaque } from "./Empaque";
import { Pais } from "./Pais";

export class Producto {
  id:string;
	gtin: string;
  codigo: string;
	fechaCreacion?: string;
	fechaEdicion?: string;
	descripcion: string;
	marca: string;
	subMarca: string;
	variedad: string;
	contenidoNeto: ContenidoNeto;
	mercadoObjetivo: Pais[];
	gpc: number;
	estado: string;
	foto: string;
	empaques?: Empaque[];
	isDeleted: boolean
}
