import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Actividad } from 'src/app/entidades/Actividad';
import { Empresa } from 'src/app/entidades/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
export class ActividadesComponent implements OnInit {

  actividades: Actividad[] = [];
  empresa: Empresa;
  tieneActividades: boolean;
  dataSource = new MatTableDataSource<Actividad>();
  actividadesPaginados: Observable<Actividad[]> = new Observable();
  cantidadActividades: Observable<number>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  buscador: string;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private router: Router,
    private empresaService: EmpresaService,
    private loader:LoadingService,
    private toast: ToastrService) {
  }

  ngOnInit(): void {

    this.cargarInfoEmpresa();
    if (this.empresa != null) {
      this.cargarActividades(this.empresa.rut);
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
      this.cargarActividades(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      this.cargarActividades(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
    }
  }
  buscarActividad() {
    this.cargarActividades(this.empresa.rut,this.paginator.pageIndex, this.paginator.pageSize, this.buscador);
  }
  cargarActividades(rut:string , pagina: number=0, limit: number=10, filter: any = null) {

    this.empresaService.obtenerActividadesEmpresa(rut, pagina, limit,  filter).subscribe(
      resp => {
        this.actividades = resp.data;
        this.tieneActividades = this.actividades.length > 0;
        this.dataSource = new MatTableDataSource<Actividad>(this.actividades);
        this.actividadesPaginados = this.dataSource.connect();

        this.cantidadActividades = new BehaviorSubject(resp.total);
      }, error => {
        this.toast.error("Error Inesperado");
        console.log(error);
      }
    );
  }
}
