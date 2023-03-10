import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { Producto } from 'src/app/entidades/Producto';
import { Empaque } from 'src/app/entidades/Empaque';
import { ParamEmpaque } from 'src/app/entidades/ParamEmpaque';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { NewTerminosYCondicionesComponent } from '../../terminos-y-condiciones/components/new-terminos-y-condiciones/new-terminos-y-condiciones.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EditTerminosYCondicionesComponent } from '../../terminos-y-condiciones/components/edit-terminos-y-condiciones/edit-terminos-y-condiciones.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent implements OnInit {
  displayedColumns = ['gln', 'rut', 'razonSocial', 'accion'];

  filter: FormGroup;

  filterValueChanges: Subscription;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  empresasDataSource: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>();;

  pageIndex = 0;

  pageSize = 5;

  total: Observable<number> = new BehaviorSubject(0);

  selectedFilters: string[] = [];

  modalRef: MatDialogRef<NewTerminosYCondicionesComponent | EditTerminosYCondicionesComponent>;
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  buscador: string;
  constructor(
    public dialog: MatDialog,
    private toast: ToastrService,
    private empresaService: EmpresaService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.loadPage();

  }
  ngAfterViewInit() {
    this.empresasDataSource.sort = this.sort;

    this.empresasDataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Por página';
    this.paginator._intl.getRangeLabel = (page, size, length) => `Pág. ${page + 1} de ${Math.ceil(length / size)}`;

  }
  loadPage() {
    this.empresaService
      .obtenerEmpresas(this.pageIndex, this.pageSize, this.selectedFilters)
      .subscribe(
        (response) => {
          this.empresasDataSource = new MatTableDataSource<Empresa>(response.data.elementos);
          this.total = new BehaviorSubject(response.data.total);
        },
        (err) => {
          this.toast.error("Error Inesperado");
          console.log(err);
        },
      );
  }

  onFilter() {
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  onSort() {
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  navegarEmpresa(id: string) {
    this.empresaService.setNroEmpresa(id)
    this.router.navigate(['pagina/inicio']);
  }

  cambiarPagina(paginador: any) {
    this.pageSize = paginador.pageSize;
    this.pageIndex = paginador.pageIndex;
    this.loadPage();
  }

  public handleFilterChange(event: any): void {
    this.selectedFilters = event;
    this.loadPage();
  }

  sortData(sort: any) {
    console.log(sort)
    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  buscarEmpresa() {
    // this.cargarProductos(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
  }
}
