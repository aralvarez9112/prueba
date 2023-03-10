import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toastr.service';

@Component({
	selector: 'app-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
	loginForm: FormGroup;
	hidePassword = true;

	constructor(
		public dialogRef: MatDialogRef<LoginDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data:any,
		private fb: FormBuilder,
		private alertService: ToastService,
	) {
		this.loginForm = this.fb.group({
			usuario: ['', Validators.required],
			contrasena: ['', Validators.required],
		});
	}

	ngOnInit() {}

	logOut() {
		this.data.next(null);
	}

	login() {
		if (!this.loginForm.valid) {
			this.alertService.error('Los datos no son válidos.', 'OK');
		} else {
			this.data.next(this.loginForm.value);
		}
	}
}
