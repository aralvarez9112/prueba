import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Codigo } from 'src/app/entidades/Codigo';

@Component({
  selector: 'modal-seleccion-empresa',
  templateUrl: './modal-seleccion-empresa.component.html',
  styleUrls: ['./modal-seleccion-empresa.component.css'],
})
export class ModalSeleccionEmpresaComponent implements OnInit {
  public titleKey = 'Titulo';
  public messageKey = 'Mensaje';
  public empresas:any[];
  public empresa: any;
  result: any;
  constructor(
    public dialogRef: MatDialogRef<ModalSeleccionEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

    this.empresas = this.data.empresas;
  }

  accept(): void {
    this.result = { botton: true, codigo: this.empresa };
    this.dialogRef.close(this.result);
  }

  cancel(): void {
    this.result = { botton: false };
    this.dialogRef.close(this.result);
  }
}
