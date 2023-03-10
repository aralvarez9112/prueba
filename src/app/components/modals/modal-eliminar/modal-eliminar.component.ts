import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/entidades/Producto';



@Component({
	selector: 'modal-eliminar',
	templateUrl: './modal-eliminar.component.html',
	styleUrls: ['./modal-eliminar.component.css'],
})
export class ModalEliminarComponent implements OnInit{
	public titleKey = 'Titulo';

	public messageKey = 'Mensaje';

    public producto:Producto ;
	public descripcionProducto: string;
	public hayProducto:boolean;
	constructor(
		public dialogRef: MatDialogRef<ModalEliminarComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}
	ngOnInit(): void {

		this.producto = this.data.producto;
		if(this.producto!=undefined){
			this.hayProducto= true;
		this.descripcionProducto =   this.producto.gtin + ' '  + this.producto.marca + ' '  +  (this.producto.subMarca !=  null ? this.producto.subMarca : "") + ' ' + this.producto.descripcion +  ' ' + (this.producto.variedad !=  null ? this.producto.variedad : "") + ' ' + this.producto.contenidoNeto.cantidad + ' ' +
    this.producto.contenidoNeto.unidad;
	}
	}
	accept(): void {
		this.dialogRef.close(true);
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
