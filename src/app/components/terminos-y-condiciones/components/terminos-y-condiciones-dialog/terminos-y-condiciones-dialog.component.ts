import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerminosYCondicionesService } from '../../services/terminos-y-condiciones.service';
import { TerminosYCondiciones } from '../../models/terminosYCondiciones';

@Component({
	selector: 'terminos-y-condiciones-dialog',
	templateUrl: './terminos-y-condiciones-dialog.component.html',
	styleUrls: ['./terminos-y-condiciones-dialog.component.css'],
})
export class TerminosYCondicionesDialogDialogComponent implements OnInit {
	public titleKey = 'Title';

	public messageKey = 'Message';

	public messageParam: any = {};

	public okBtnKey = 'Aceptar';

	public cancelBtnKey = 'Cancelar';

	@Input() showMessage = true;

	terminosYCondiciones: TerminosYCondiciones;

	aceptoLosTerminosYCondiciones: false;

	constructor(
		public dialogRef: MatDialogRef<TerminosYCondicionesDialogDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public terminosYCondicionesService: TerminosYCondicionesService,
	) {}

	ngOnInit() {
		this.cargarTerminosYCondicionesActual();
	}

	cargarTerminosYCondicionesActual() {
		this.terminosYCondicionesService.getTerminosYCondicionesActual().subscribe((response) => {
			this.terminosYCondiciones = response.data.elementos;
		});
	}

	accept(): void {
		this.dialogRef.close(true);
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
