import { Pipe, PipeTransform } from '@angular/core';
import { Codigo } from '../entidades/Codigo';

@Pipe({
	name: 'codigo',
	pure: true,
})
export class CodigoPipe implements PipeTransform {

	transform(value: Codigo): any {
		if (value !== undefined && value !== null) {
			return value.codigo;
		}
		return "";
	}
}
