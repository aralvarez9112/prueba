import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css'],
})
export class ModalSuccessComponent implements OnInit {
  public titleKey = '';

  public messageKey = 'Message';

  public okBtnKey = 'Aceptar';

  public gtin14 = '';

  constructor(
    public dialogRef: MatDialogRef<ModalSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.gtin14 = this.data.gtin14;
  }

  accept(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(true);
  }
}
