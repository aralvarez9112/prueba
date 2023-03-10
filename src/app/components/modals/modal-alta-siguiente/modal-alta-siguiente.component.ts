import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'modal-alta-siguiente',
	templateUrl: './modal-alta-siguiente.component.html',
	styleUrls: ['./modal-alta-siguiente.component.css'],
})
export class ModalAltaSiguienteComponent implements OnInit {
	public titleKey = 'Titulo';
	public messageKey = 'Mensaje';

  descripcionConcatenada:string;
  gpcSeleccionado:string;
  imgURL:string;

	result: any;
	constructor(
		public dialogRef: MatDialogRef<ModalAltaSiguienteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }
	ngOnInit(): void {

		this.descripcionConcatenada = this.data.descripcionConcatenada;
    this.gpcSeleccionado = this.data.gpcSeleccionado;
    this.imgURL = this.data.imgURL;

	}
	accept(accion:string): void {
		this.dialogRef.close(accion);
	}
	cancel(): void {
		this.dialogRef.close('Exit');
	}
}
