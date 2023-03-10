import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empaque } from 'src/app/entidades/Empaque';
import { Producto } from 'src/app/entidades/Producto';



@Component({
  selector: 'modal-info-producto',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css'],
})
export class ModalInfoProductoComponent implements OnInit {
  public titleKey = 'Titulo';

  public messageKey = 'Mensaje';

  public producto: Producto;
  public empaque:Empaque

  constructor(
    public dialogRef: MatDialogRef<ModalInfoProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.producto = this.data.producto;
    this.empaque = this.data.empaque;
  }
  accept(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
