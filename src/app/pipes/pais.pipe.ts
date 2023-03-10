import { Pipe, PipeTransform } from '@angular/core';

import { Pais } from '../entidades/Pais';

@Pipe({
  name: 'pais',
  pure: true,
})
export class PaisPipe implements PipeTransform {

  transform(value: Pais[]): any {
    if (value !== undefined && value !== null) {
      if (value.length > 1) {
        let paises = '';
        value.forEach(x => {
          paises += x.nombre + ' ';
        })
        return paises;
      }else
      return value[0].nombre;
    }
    return "";
  }
}
