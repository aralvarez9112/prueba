import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { TerminosYCondiciones } from '../../models/terminosYCondiciones';
import { TerminosYCondicionesService } from '../../services/terminos-y-condiciones.service';

@Component({
  selector: 'app-edit-terminos-y-condiciones',
  templateUrl: './edit-terminos-y-condiciones.component.html',
  styleUrls: ['./edit-terminos-y-condiciones.component.scss'],
})
export class EditTerminosYCondicionesComponent implements AfterViewInit {
  data: TerminosYCondiciones;

  canDeactivate: () => Observable<boolean> | boolean;

  dataChanged: () => void;

  terminosYCondicionesId: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditTerminosYCondicionesComponent>,
    public terminosYCondicionesService: TerminosYCondicionesService,
    public toastService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.terminosYCondicionesId = this.dialogData.id;
    this.getTerminosYCondiciones();
  }
  ngAfterViewInit() {
    this.getTerminosYCondiciones();
  }

  getTerminosYCondiciones() {
    this.terminosYCondicionesService.getTerminosYCondicionesById(this.terminosYCondicionesId).subscribe(
      (response) => {
        this.data = response.data.elementos;
      },
      (error) => {

      }
    );
  }

  submit(data: any) {
    this.actualizarTerminosYCondiciones(data);
  }

  cancel() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  actualizarTerminosYCondiciones(data: TerminosYCondiciones) {
    this.terminosYCondicionesService.actualizarTerminosYCondiciones(data).subscribe(
      (response) => {
        this.close();
        this.toastService.success('Se ha actulizado los términos y condiciones');
      },
      (error) => {
        console.log(error);
        this.toastService.error('Se produjo un Error');
      },
    );
  }
}
