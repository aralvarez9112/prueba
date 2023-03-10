import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { DialogData } from '../entidades/DialogData';


@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(public dialog: MatDialog) {}

	open(dialogData: DialogData) {
		return this.dialog.open(GenericDialogComponent, {
			width: dialogData.width,
			minWidth: dialogData.minWidth,
			maxWidth: dialogData.maxWidth,
			maxHeight: dialogData.maxHeight,
			data: dialogData,
			autoFocus: false,
			restoreFocus: false,
		});
	}

	openLogin(loginData:any) {
		return this.dialog.open(LoginDialogComponent, {
			data: loginData,
			closeOnNavigation: false,
			hasBackdrop: true,
			disableClose: true,
			autoFocus: false,
		});
	}

	openFromComponent(component:any, width:string, dialogData?: any, disableClose = false, panelClass = '') {
		return this.dialog.open(component, {
			width: width,
			maxWidth: width,
			maxHeight: '90vh',
			data: dialogData,
			autoFocus: false,
			disableClose: disableClose,
			panelClass: panelClass,
		});
	}
}
