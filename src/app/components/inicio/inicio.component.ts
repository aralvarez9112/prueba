import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/entidades/Actividad';
import { Empresa } from 'src/app/entidades/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { ModalOperacionesMasivasComponent } from '../modals/modal-operaciones-masivas/modal-operaciones-masivas.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cantidadProductos: number = 0;
  empresa: Empresa;
  actividadReciente: Actividad[] = [];
  recentActivityToShow: number = 4;
  modalRef: MatDialogRef<ModalOperacionesMasivasComponent>;
  constructor(private router: Router,
    private dialog: MatDialog,
    private loader: LoadingService,
    private toast: ToastrService,
    private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.cargarDetalleEmpresa();
  }
  cargarDetalleEmpresa() {
    this.empresaService.getNroEmpresa().subscribe(response => {
     if (response != null) {
        this.empresaService.cargarDetalleEmpresa(response).subscribe((response) => {
          if (response.code == 200) {
            this.empresa = response.data;
            this.empresaService.setEmpresa(this.empresa);
            this.cantidadProductos = this.empresa.productos.length;
            this.actividadReciente = this.empresa.actividades.sort((a, b) => {
              const dt1 = new Date(a.fechaCreacion);
              const dt2 = new Date(b.fechaCreacion);
              if (dt1 < dt2) return 1;
              if (dt1 > dt2) return -1;
              return 0;
            }).slice(0, 4);
          }
        }, error => {
          this.loader.hide();
          this.toast.error("Error Inesperado");
          console.log(error);
        });
      } else {
        this.router.navigate(['/login']);
      }
    })
  }
  cargaMasiva() {
    this.modalRef = this.dialog.open(ModalOperacionesMasivasComponent, {
      data: {
        titleKey: 'Operaciones Masivas de Productos',

      },
    });

    this.modalRef.afterClosed().subscribe((result) => {

    });
  }
}
