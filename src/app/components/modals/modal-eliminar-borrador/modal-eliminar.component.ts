import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/entidades/Producto';



@Component({
  selector: 'modal-eliminar-borrador',
  templateUrl: './modal-eliminar-borrador.component.html',
  styleUrls: ['./modal-eliminar-borrador.component.css'],
})
export class ModalEliminarBorradorComponent implements OnInit {
  public titleKey = 'Titulo';

  public messageKey = 'Mensaje';

  public producto: Producto;
  public descripcionProducto: string;
  public hayProducto: boolean;
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarBorradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

    this.producto = this.data.producto;
    this.descripcionProducto = this.producto.marca + ' '  +  (this.producto.subMarca !=  null ? this.producto.subMarca : "") + ' ' + this.producto.descripcion +  ' ' + this.producto.variedad + ' ' + this.producto.contenidoNeto.cantidad + ' ' +
      this.producto.contenidoNeto.unidad + ' ' + this.producto.gpc;
  }
  accept(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
