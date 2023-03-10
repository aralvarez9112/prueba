import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastComponent } from '../components/custom-toast/custom-toast.component';



@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(public snackBar: MatSnackBar) {}

	success(message: string, title?: string) {
		this.snackBar.openFromComponent(CustomToastComponent, {
			data: { messageType: 'Success', messageData: message, messageTitle: title },
			duration: 2000,
			horizontalPosition: 'right',
		});
	}

	error(message: string, title?: string) {
		this.snackBar.openFromComponent(CustomToastComponent, {
			data: { messageType: 'Error', messageData: message, messageTitle: title },
			duration: 2000,
			horizontalPosition: 'right',
		});
	}
}
