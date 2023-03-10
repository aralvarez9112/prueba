import { Pipe, PipeTransform } from '@angular/core';
import { ContenidoNeto } from '../entidades/ContenidoNeto';

@Pipe({
  name: 'contN',
  pure: true,
})
export class ContenidoNetoPipe implements PipeTransform {

  transform(value: ContenidoNeto): any {
    if (value !== undefined && value !== null) {
    return value.cantidad + ' ' +value.unidad;
  }
  return "";
}
}
