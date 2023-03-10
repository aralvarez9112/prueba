import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConfig } from '../app.config';
import { ActivatePaginationResponse } from '../entidades/ActivatePaginationResponse';
import { ActivateResponse } from '../entidades/ActivateResponse';
import { Empresa } from '../entidades/Empresa';
import { ParamEmpaque } from '../entidades/ParamEmpaque';
import { ParamProducto } from '../entidades/ParamProducto';
import { Producto } from '../entidades/Producto';
import { TipoAccion } from '../entidades/TipoAccion';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private nroEmpresa:BehaviorSubject<any> = new BehaviorSubject(null);
  private _empresa: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private config: AppConfig) { }

  public getNroEmpresa(): BehaviorSubject<string> {
    return this.nroEmpresa;
  }
  public setNroEmpresa(nro:string) {
    this.nroEmpresa.next(nro);
  }
  public getEmpresa(): BehaviorSubject<Empresa> {
    return this._empresa;
  }
  public setEmpresa(empresa: Empresa) {
    this._empresa.next(empresa);
  }

  public cargarDetalleEmpresa(rutEmpresa: string) {
    return this.http.get<ActivateResponse>(this.config.apiServicios + `empresa/detalle?rutEmpresa=${rutEmpresa}`);
  }
  public obtenerEmpresas( page: number = 0, limit: number = 10, filter: any = null) {
    const params = new HttpParams()
      .set('page', (page + 1)?.toString())
      .set('limit', limit?.toString());

    var url = this.config.apiServicios + `empresa/all?` + params.toString();
    if (filter != null) { url = url + `&filters=${filter}`; }
    return this.http.get<ActivatePaginationResponse>(url);
  }
  public infoAltaProducto(rutEmpresa: string) {
    return this.http.get<ActivateResponse>(this.config.apiServicios + `empresa/infoAltaProducto?rutEmpresa=${rutEmpresa}`);
  }
  public adicionarMarcaOSubMarca(rutEmpresa: string, tipo: TipoAccion, valor: string) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/marcas/${tipo}/adicionar/${valor}`, null)
  }
  public eliminarMarcaOSubMarca(rutEmpresa: string, tipo: TipoAccion, id: number) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/marcas/${tipo}/eliminar/${id}`, null)
  }
  public altaProducto(rutEmpresa: string, codigo: string, param: ParamProducto) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/${codigo}/producto/adicionar`, param)
  }
  public actualizarProducto(rutEmpresa: string, gtin: string, param: Producto) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto/${gtin}/actualizar`, param)
  }
  public obtenerProducto(rutEmpresa: string, gtin: string) {
    return this.http.get<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto/${gtin}`)
  }
  public obtenerProductoBorrador(rutEmpresa: string, id: string) {
    return this.http.get<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/productoBorrador/${id}`)
  }
  public altaProductoBorrador(rutEmpresa: string, param: ParamProducto) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto-borrador`, param)
  }
  public eliminarProductoBorrador(rutEmpresa: string, param: Producto) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto-borrador/eliminar`, param)
  }
  public altaEmpaqueDeProducto(rutEmpresa: string, gtin: string, param: ParamEmpaque) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto/${gtin}/empaque/adicionar`, param)
  }
  public eliminarEmpaqueDeProducto(rutEmpresa: string, gtin13: string, gtin14: string) {
    return this.http.post<ActivateResponse>(this.config.apiServicios + `empresa/${rutEmpresa}/producto/${gtin13}/empaque/${gtin14}/eliminar`, null)
  }
  public cargarImagenProducto(rutEmpresa: string, gtin: string, esBorrador: boolean = false, file: File) {
  //  var headers = new HttpHeaders({'Accept': 'application/json','Content-Type': 'multipart/form-data'});

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.config.apiServicios + `empresa/${rutEmpresa}/producto/${gtin}/imagen?esBorrador=${esBorrador}`, formData);
  }

  public obtenerProductosEmpresa(rutEmpresa: string, page: number = 0, limit: number = 5, filter: any = null) {
    const params = new HttpParams()
      .set('page', (page + 1)?.toString())
      .set('limit', limit?.toString());

    var url = this.config.apiServicios + `empresa/${rutEmpresa}/productos?` + params.toString();
    if (filter != null) { url = url + `&filters=${filter}`; }
    return this.http.get<ActivatePaginationResponse>(url);
  }
  public obtenerProductosBorradorEmpresa(rutEmpresa: string, page: number = 0, limit: number = 5, filter: any = null) {
    const params = new HttpParams()
      .set('page', (page + 1)?.toString())
      .set('limit', limit?.toString());

    var url = this.config.apiServicios + `empresa/${rutEmpresa}/productosBorrador?` + params.toString();
    if (filter != null) { url = url + `&filters=${filter}`; }
    return this.http.get<ActivatePaginationResponse>(url);
  }
  public obtenerActividadesEmpresa(rutEmpresa: string, page: number = 0, limit: number = 10, filter: any = null) {
    const params = new HttpParams()
      .set('page', (page + 1)?.toString())
      .set('limit', limit?.toString());

    var url = this.config.apiServicios + `empresa/${rutEmpresa}/actividades?` + params.toString();
    if (filter != null) { url = url + `&filters=${filter}`; }
    return this.http.get<ActivatePaginationResponse>(url);
  }

  /*   public cargarExcel(
         fileToUpload: FormData,
         crearNueva: boolean = false,
         url: string,
         actualizar: boolean = true,
         eliminar: boolean = false,
     ) {
         const requestOptions: RequestOptions = { headers: this.httpHeaders.getHeaders() };
         requestOptions.headers;// = requestOptions.headers.delete('Content-Type');
         return this.http.post<ActivateResponse>(
             this.config.apiServicios +
                 url +
                 (crearNueva ? crearNueva : '') +
                 '&actualizarExistentes=' +
                 actualizar +
                 '&eliminarExistentes=' +
                 eliminar,
             fileToUpload,
             )
         } */

}
