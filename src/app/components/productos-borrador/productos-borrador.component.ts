import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { Producto } from 'src/app/entidades/Producto';
import { Empaque } from 'src/app/entidades/Empaque';

import { ModalEliminarComponent } from '../modals/modal-eliminar/modal-eliminar.component';
import { ModalAltaEmpaqueComponent } from '../modals/modal-alta-empaque/modal-alta-empaque.component';
import { ModalSuccessComponent } from '../modals/modal-success/modal-success.component';
import { ModalEliminarBorradorComponent } from '../modals/modal-eliminar-borrador/modal-eliminar.component';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-productos-borrador',
  templateUrl: './productos-borrador.component.html',
  styleUrls: ['./productos-borrador.component.css']
})

export class ProductosBorradorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
   modalRef: MatDialogRef<ModalAltaEmpaqueComponent| ModalEliminarComponent| ModalSuccessComponent>;
  color: ThemePalette = 'warn';
  isLoading: boolean = true;
  showButton: boolean = true;
  productos: Producto[] = [];
  empresa: Empresa;
  productoSeleccionado: Producto = new Producto();
  deleteModalTitle: string = "";
  empaqueSeleccionado: Empaque;
  indexGtin14ToDelete: number;
  packages: string[] = ['Caja', 'InnerPack', 'Display', 'Funda'];
  pickedPackage: string = this.packages[0];

  newGTIN14generated: number;

  descripcionProducto: string;
  descripcionEmpaque: string;
  tieneProductos: boolean;
  dataSource = new MatTableDataSource<Producto>();
  productosPaginados: Observable<Producto[]> = new Observable();
  cantidadProductos: Observable<number>;
  buscador: string
  constructor(private router: Router,		private dialog: MatDialog,
    private toast: ToastrService,
    private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.cargarInfoEmpresa();
    if (this.empresa != null) {
      this.cargarProductos(this.empresa.rut);
    } else {
      this.router.navigate(['/pagina/inicio']);//TO DO Cambiar para el loguin
    }

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Por página';
    this.paginator._intl.getRangeLabel = (page, size, length) => `Pág. ${page + 1} de ${Math.ceil(length / size)}`;
  }
  cargarInfoEmpresa() {
    this.empresaService.getEmpresa().subscribe(response => {
      this.empresa = response;

    })
  }
  cambiarPagina() {
    if (this.buscador == null) {
      this.cargarProductos(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      this.cargarProductos(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
    }
  }
  buscarProducto() {
    this.cargarProductos(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
  }
  cargarProductos(rut:string, pagina: number=0, limit: number=5, filter: any = null) {

    this.empresaService.obtenerProductosBorradorEmpresa(rut, pagina, limit, filter).subscribe(
      resp => {
        this.productos = resp.data;
        this.tieneProductos = this.productos.length > 0;
        this.dataSource = new MatTableDataSource<Producto>(this.productos);
        this.productosPaginados = this.dataSource.connect();
        this.cantidadProductos = new BehaviorSubject(resp.total);
      }, error => {
        this.toast.error("Error Inesperado");
        console.log(error);
      });
  }
  descipcionProducto() {
    this.descripcionProducto = this.productoSeleccionado.gtin + ' ' + this.productoSeleccionado.descripcion + ' ' + this.productoSeleccionado.marca + ' ' + this.productoSeleccionado.contenidoNeto.cantidad
    this.productoSeleccionado.contenidoNeto.unidad;

  }

  eliminarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.descipcionProducto();
    this.deleteModalTitle = "¿Está seguro que desea dar de baja el siguiente producto en estado borrador?"
    this.modalRef = this.dialog.open(ModalEliminarBorradorComponent, {
			data: {
        titleKey: 'Atención: Esta acción es irreversible',
				messageKey: this.deleteModalTitle,
        producto: this.productoSeleccionado,
			},
		});


    this.modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmarEliminarProducto();
      }
    });

  }
  confirmarEliminarProducto() {
    this.isLoading = true;
    this.empresaService.eliminarProductoBorrador(this.empresa.rut,this.productoSeleccionado).subscribe((response) => {
      if (response.code = 200) {
        this.isLoading = false;
        this.cargarProductos(this.empresa.rut);
      }
    })
  }

  editarProductoBorrador(productoSeleccionado: Producto) {
    this.router.navigate([`/pagina/producto-nuevo/${productoSeleccionado.id}`]);
  }
}
