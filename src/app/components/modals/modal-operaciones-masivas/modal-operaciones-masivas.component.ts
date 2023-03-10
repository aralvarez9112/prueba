import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/entidades/Producto';



@Component({
	selector: 'modal-operaciones-masivas',
	templateUrl: './modal-operaciones-masivas.component.html',
	styleUrls: ['./modal-operaciones-masivas.component.css'],
})
export class ModalOperacionesMasivasComponent implements OnInit {
	public titleKey = 'Titulo';
	public messageKey = 'Mensaje';
	public actividades: string [] = ['Cargar Productos','Exportar Productos'];
	actividad: string;
	constructor(
		public dialogRef: MatDialogRef<ModalOperacionesMasivasComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }
	ngOnInit(): void {

	}
	accept(): void {
		this.dialogRef.close({accept:true,operacion:this.actividad});
	}

	cancel(): void {
		this.dialogRef.close({accept:false});
	}
}
