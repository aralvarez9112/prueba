import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';

import { TerminosYCondiciones } from '../../models/terminosYCondiciones';


@Component({
	selector: 'app-terminos-y-condiciones-form',
	templateUrl: './terminos-y-condiciones-form.component.html',
	styleUrls: ['./terminos-y-condiciones-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminosYCondicionesFormComponent	implements OnInit
{
  formGroup:FormGroup;
	versionValida: boolean = true;
  @Input() data:TerminosYCondiciones;
  @Output() accept = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();
	constructor(private alerta: ToastrService) {
	}
	ngOnInit() {
		this.createFormGroup();
	}

	createFormGroup() {
		this.formGroup = new FormGroup({
			version: new FormControl(this.data.version, [Validators.required]),
			titulo: new FormControl(this.data.titulo, [Validators.required]),
			descripcion: new FormControl(this.data.descripcion, [Validators.required]),
		});
	}

	submitClicked() {
		if (this.formGroup.valid) {
			if (this.validarVersion(this.formGroup.get('version')?.value.trim())) {
        this.data.version = this.formGroup.get('version')?.value.trim()
        this.data.titulo = this.formGroup.get('titulo')?.value.trim()
        this.data.descripcion = this.formGroup.get('descripcion')?.value.trim()
        this.accept.emit(this.data);
			} else {
				this.alerta.error('La version debe escribirse en este formato x.y.z: Ej: 1.0.0', 'OK');
			}
		} else {
		//	this.triggerValidation();
		}
	}

	validarVersion(version: String): boolean {
		let validadorNumber = /^[0-9]+$/;
		let versionArrayTemp = version.trim().split('.');

		if (versionArrayTemp.length === 3) {
			if (
				versionArrayTemp[0].match(validadorNumber) &&
				versionArrayTemp[1].match(validadorNumber) &&
				versionArrayTemp[2].match(validadorNumber)
			) {
				return true;
			}
		}
		return false;
	}
	close() {
    this.cancel.emit();
	}
}
