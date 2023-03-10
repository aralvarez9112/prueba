import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
	selector: 'custom-toast',
	templateUrl: './custom-toast.component.html',
	styleUrls: ['./custom-toast.component.css'],
})
export class CustomToastComponent {
	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: any,
		private _snackRef: MatSnackBarRef<CustomToastComponent>,
	) {

  }

	dismiss() {
		this._snackRef.dismiss();
	}
}
