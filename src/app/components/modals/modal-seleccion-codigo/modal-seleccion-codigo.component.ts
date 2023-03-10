import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Codigo } from 'src/app/entidades/Codigo';

@Component({
  selector: 'modal-seleccion-codigo',
  templateUrl: './modal-seleccion-codigo.component.html',
  styleUrls: ['./modal-seleccion-codigo.component.css'],
})
export class ModalSeleccionCodigoComponent implements OnInit {
  public titleKey = 'Titulo';
  public messageKey = 'Mensaje';
  public codigos: Codigo[];
  public codigo: Codigo;
  result: any;
  constructor(
    public dialogRef: MatDialogRef<ModalSeleccionCodigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

    this.codigos = this.data.codigos;
  }

  accept(): void {
    this.result = { botton: true, codigo: this.codigo };
    this.dialogRef.close(this.result);
  }

  cancel(): void {
    this.result = { botton: false };
    this.dialogRef.close(this.result);
  }
}
