import { TemplateRef } from '@angular/core';

export class DialogData {
	title: string = '';
	content: string = '';
	type: string = ''; // "", "warn", "primary", "accent"
	disabled: boolean = false;
	isSingleButton: boolean = false;
	noButtons: boolean = false;
	cancelButtonText: string = 'Cancelar';
	acceptButtonText: string = 'Aceptar';
	width: string = '350px';
	//height: string = undefined;
	minWidth: string = '400px';
	minHeight: string = '400px';
  maxWidth: string = '400px';
	maxHeight: string = '90vh';
	//template: TemplateRef<any> = null;
	errorMensaje: string = '';
}
