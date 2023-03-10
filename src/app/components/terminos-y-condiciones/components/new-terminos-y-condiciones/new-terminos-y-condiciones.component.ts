import { Component, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { TerminosYCondiciones } from '../../models/terminosYCondiciones';
import { TerminosYCondicionesService } from '../../services/terminos-y-condiciones.service';

const errorKey = 'Error';

const savedMessageKey = 'Saved';

@Component({
  selector: 'new-terminos-y-condiciones',
  templateUrl: './new-terminos-y-condiciones.component.html',
  styleUrls: ['./new-terminos-y-condiciones.component.scss'],
})
export class NewTerminosYCondicionesComponent {
  data: any = {
    name: '',
  };

  tasks: Array<TerminosYCondiciones>;

  unsavedChanges = false;

  cancelBtnKey = 'No';

  okBtnKey = 'Yes';

  saveTitleKey = 'Discard Title';

  saveMessageKey = 'Discard Message';

  canDeactivate: () => Observable<boolean> | boolean;

  dataChanged: () => void;

  validationErrors: ValidationErrors;

  constructor(
    public dialogRef: MatDialogRef<NewTerminosYCondicionesComponent>,
    public activatedRoute: ActivatedRoute,
    public terminosYCondicionesService: TerminosYCondicionesService,
    public router: Router,
    public dialog: MatDialog,
    public toastService: ToastrService,
    public loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  submit(data: TerminosYCondiciones) {
    this.crearTerminosYCondiciones(data);
  }

  cancel() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  crearTerminosYCondiciones(data: TerminosYCondiciones) {

    this.terminosYCondicionesService.crearTerminosYCondiciones(data).subscribe(
      (response) => {
        this.close();
        this.toastService.success('Se ha creado correctamente', 'Exito');
      },
      (error) => {
        console.log(error)
        this.toastService.error('Se produjo un error', 'Errror');
      },
    );
  }
}
