import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
//import { TraficoService } from 'app/administracion/components/trafico-de-aplicacion/services/trafico.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
//import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/components/confirm-dialog/confirm-dialog.component';

import { TerminosYCondiciones } from '../../models/terminosYCondiciones';
import { TerminosYCondicionesService } from '../../services/terminos-y-condiciones.service';
import { EditTerminosYCondicionesComponent } from '../edit-terminos-y-condiciones/edit-terminos-y-condiciones.component';
import { NewTerminosYCondicionesComponent } from '../new-terminos-y-condiciones/new-terminos-y-condiciones.component';

const titleKey = 'Delete';

const deleteBtnKey = 'Delete';

const messageKey = 'Are you sure you want to delete this Task?';

const errorKey = 'Error';

const deletedMessageKey = 'Deleted';

@Component({
  selector: 'app-terminos-y-condiciones-table',
  templateUrl: './terminos-y-condiciones-table.component.html',
  styleUrls: ['./terminos-y-condiciones-table.component.scss'],
})
export class TerminosYCondicionesTableComponent implements OnInit {
  displayedColumns = ['version', 'titulo', 'accion'];

  filter: FormGroup;

  filterValueChanges: Subscription;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  totalLength: number = 0;

  tasksList: Subscription;

  terminosYCondiciones: Array<TerminosYCondiciones> = [];

  terminosYCondicionesDataSource: MatTableDataSource<TerminosYCondiciones> = new MatTableDataSource<TerminosYCondiciones>();;

  pageIndex = 0;

  pageSize = 5;

  total : Observable<number> = new BehaviorSubject(0);

  selectedFilters: string[] = [];

  modalRef: MatDialogRef< NewTerminosYCondicionesComponent | EditTerminosYCondicionesComponent >;
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  buscador: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public terminosYCondicionesService: TerminosYCondicionesService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
     this.paginator.pageIndex = 0;
    this.loadPage();

  }
  ngAfterViewInit (){
    this.terminosYCondicionesDataSource.sort = this.sort;


    this.terminosYCondicionesDataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Por página';
    this.paginator._intl.getRangeLabel = (page, size, length) => `Pág. ${page + 1} de ${Math.ceil(length / size)}`;

  }
  loadPage() {
    this.terminosYCondicionesService
      .getTerminosYCondiciones(this.pageIndex + 1, this.pageSize, this.selectedFilters)
      .subscribe(
        (response) => {
          this.terminosYCondicionesDataSource = new MatTableDataSource<TerminosYCondiciones>(response.data.elementos);
          this.total = new BehaviorSubject(response.data.total);
        },
        (err) => {
          console.log(err)

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

  onPage() {
    this.loadPage();
  }

  createTerminosYCondicionesModal() {
    this.modalRef = this.dialog.open(NewTerminosYCondicionesComponent, {
      width: '30%',
      height: '50%',
    });

    this.modalRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  editarTerminosYCondicionesModal(id: string) {
    this.modalRef = this.dialog.open(EditTerminosYCondicionesComponent, {
      width: '30%',
      height: '50%',
      data: {
        id: id,
      },
    });

    this.modalRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
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

  sortData(sort: Sort) {
    console.log(sort)
    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  buscarProducto() {
   // this.cargarProductos(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
  }
}
