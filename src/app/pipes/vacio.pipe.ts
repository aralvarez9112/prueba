import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'vacio',
	pure: true,
})
export class VacioPipe implements PipeTransform {

	transform(value: any): any {
		if (value === undefined || value === null) {
			return '';
		}
		return value;
	}
}
