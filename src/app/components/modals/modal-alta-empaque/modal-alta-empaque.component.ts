import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/entidades/Producto';

@Component({
	selector: 'modal-alta-empaque',
	templateUrl: './modal-alta-empaque.component.html',
	styleUrls: ['./modal-alta-empaque.component.css'],
})
export class ModalAltaEmpaqueComponent implements OnInit {
	public titleKey = 'Titulo';
	public messageKey = 'Mensaje';
	public producto: Producto;
	public descripcionProducto: string;

	packages: string[] = ['Caja', 'InnerPack', 'Display', 'Funda'];
	pickedPackage: string = this.packages[0];
	unitsInside: number;
	result: any;
	constructor(
		public dialogRef: MatDialogRef<ModalAltaEmpaqueComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }
	ngOnInit(): void {

		this.producto = this.data.producto;
		if (this.producto != undefined) {
			this.descripcionProducto = this.producto.gtin + ' '  + this.producto.marca + ' '  +  (this.producto.subMarca !=  null ? this.producto.subMarca : "") + ' ' + this.producto.descripcion +  ' ' + (this.producto.variedad !=  null ? this.producto.variedad : "") + ' ' + this.producto.contenidoNeto.cantidad + ' ' +
      this.producto.contenidoNeto.unidad;
		}
	}
	accept(): void {
		this.result = { botton: true, unitsInside: this.unitsInside, pickedPackage: this.pickedPackage };
		this.dialogRef.close(this.result);
	}

	cancel(): void {
		this.result = { botton: false };
		this.dialogRef.close(this.result);
	}
}
