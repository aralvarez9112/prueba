import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { Producto } from 'src/app/entidades/Producto';
import { Empaque } from 'src/app/entidades/Empaque';
import { ParamEmpaque } from 'src/app/entidades/ParamEmpaque';

import { ModalEliminarComponent } from '../modals/modal-eliminar/modal-eliminar.component';
import { ModalAltaEmpaqueComponent } from '../modals/modal-alta-empaque/modal-alta-empaque.component';
import { ModalSuccessComponent } from '../modals/modal-success/modal-success.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalInfoProductoComponent } from '../modals/modal-info/modal-info.component';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  modalRef: MatDialogRef<ModalAltaEmpaqueComponent | ModalEliminarComponent | ModalSuccessComponent | ModalInfoProductoComponent>;
  color: ThemePalette = 'warn';
  showButton: boolean = true;
  productos: Producto[] = [];
  productosPaginados: Observable<Producto[]> = new Observable();
  empresa: Empresa;
  productoSeleccionado: Producto = new Producto();
  deleteModalTitle: string = "";
  empaqueSeleccionado: Empaque;
  cantidadProductos: Observable<number>;
  buscador: string
  descripcionProducto: string;
  descripcionEmpaque: string;
  tieneProductos: boolean;
  dataSource = new MatTableDataSource<Producto>();
  constructor(private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
    private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.cargarInfoEmpresa();
    if (this.empresa != null) {
      this.cargarProductos(this.empresa.rut) ;
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

  generardescripcionProducto() {
    this.descripcionProducto = this.productoSeleccionado.gtin + ' ' + this.productoSeleccionado.descripcion + ' ' + this.productoSeleccionado.marca + ' ' + this.productoSeleccionado.contenidoNeto.cantidad
    this.productoSeleccionado.contenidoNeto.unidad;

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

  cargarProductos(rut:string,pagina: number=0, limit: number=5, filter: any = null) {

    this.empresaService.obtenerProductosEmpresa(rut, pagina, limit, filter).subscribe(
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

  showGTIN14() {
    this.showButton = !this.showButton;
    if (this.showButton) {
      this.accordion.openAll();
    }
    else {
      this.accordion.closeAll();
    }
  }
  eliminarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.generardescripcionProducto();
    this.deleteModalTitle = "Si Ud. da de baja esté código, el mismo dejará de estar disponible en el Global Registry de GS1 y en el catálogo de Rondanet.</br> ¿Está seguro que desea dar de baja el siguiente código y sus correspondientes empaques?"
    this.modalRef = this.dialog.open(ModalEliminarComponent, {
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

    this.productoSeleccionado.estado = 'Baja';
    this.empresaService.actualizarProducto(this.empresa.rut, this.productoSeleccionado.gtin, this.productoSeleccionado).subscribe((response) => {
      if (response.code = 200) {
        this.cargarProductos(this.empresa.rut) ;
      }
    }, error => {
      this.toast.error("Error Inesperado");
      console.log(error)
    })
  }
  eliminarEmpaque(producto: Producto, empaque: Empaque) {
    this.empaqueSeleccionado = empaque;
    this.productoSeleccionado = producto;
    this.deleteModalTitle = "¿Está seguro que desea dar de baja el siguiente código de empaque?<br> El código de la unidad básica no será dado de baja."
    this.modalRef = this.dialog.open(ModalEliminarComponent, {
      data: {
        titleKey: 'Atención: Esta acción es irreversible',
        messageKey: this.deleteModalTitle
      },
    });


    this.modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmarEliminarEmpaque();
      }
    });

  }
  confirmarEliminarEmpaque() {
    this.empresaService.eliminarEmpaqueDeProducto(this.empresa.rut, this.productoSeleccionado.gtin, this.empaqueSeleccionado.gtin).subscribe((response) => {
      if (response.code = 200) {
        this.productoSeleccionado.empaques = this.productoSeleccionado.empaques?.filter(x => !x.gtin.includes(this.empaqueSeleccionado.gtin));
        this.empresa.productos.filter(x => x.gtin.includes(this.productoSeleccionado.gtin))[0] = this.productoSeleccionado;
        this.empresaService.setEmpresa(this.empresa);
      }
    },error => {
      this.toast.error("Error Inesperado");
      console.log(error);
    })
  }
  newGTIN14(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    this.generardescripcionProducto();

    this.modalRef = this.dialog.open(ModalAltaEmpaqueComponent, {
      data: {
        titleKey: 'Nuevo código de Empaque GTIN14',
        producto: this.productoSeleccionado
      },
    });

    this.modalRef.afterClosed().subscribe((result) => {
      if (result.botton) {
        let param: ParamEmpaque = {
          empaque: result.pickedPackage,
          unidades: result.unitsInside
        };
        this.createGTIN14(param);
      }
    });
  }

  infoProducto(productoSeleccionado: Producto) {
    this.modalRef = this.dialog.open(ModalInfoProductoComponent, {
      data: {
        titleKey: 'Datos del Producto',
        producto: productoSeleccionado
      },
    });

  }
  infoEmpaque(empaque:Empaque,productoSeleccionado: Producto) {


    this.modalRef = this.dialog.open(ModalInfoProductoComponent, {
      data: {
        titleKey: 'Datos del Empaque',
        producto: productoSeleccionado,
        empaque: empaque
      },
    });

  }

  createGTIN14(param: ParamEmpaque) {

    this.empresaService.altaEmpaqueDeProducto(this.empresa.rut, this.productoSeleccionado.gtin, param).subscribe((response) => {
      if (response.code = 200) {
        let empaque = response.data;
        this.productoSeleccionado.empaques?.push(empaque);
        this.empresa.productos.filter(x => x.gtin.includes(this.productoSeleccionado.gtin))[0] = this.productoSeleccionado;
        this.empresaService.setEmpresa(this.empresa);

        this.modalRef = this.dialog.open(ModalSuccessComponent, {
          data: {
            titleKey: 'Atención: Esta acción es irreversible',
            messageKey: 'Puede consultar su código en cualquier momento en el listado de códigos',
            gtin14: empaque.gtin
          },
        });

      }
    })
  }
}
