import { Component, OnInit, Inject, Input } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Empaque } from 'src/app/entidades/Empaque';
import { Producto } from 'src/app/entidades/Producto';


@Component({
  selector: 'app-producto-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css']
})
export class EmpaqueComponent implements OnInit {
  @Input() producto: Producto;
  @Input() empaque: Empaque;
  imgURL: string
  mercadoObjetivo = '';
  contenidoNeto = '';

  constructor(private config: AppConfig) {
  }

  ngOnInit(): void {

    this.imgURL = "./assets/images/no-image.png";
    if (this.empaque.empaque == 'Caja') this.imgURL = "./assets/images/box.jpg";
    if (this.empaque.empaque == 'InnerPack') this.imgURL = "./assets/images/innerpack.png";
    if (this.producto != undefined) {
      this.producto.mercadoObjetivo.forEach(x => {
        this.mercadoObjetivo = this.mercadoObjetivo + x.nombre + ' ';
      });
      this.contenidoNeto = this.producto.contenidoNeto.cantidad + ' ' + this.producto.contenidoNeto.unidad;

      if (this.producto.foto != null) { this.imgURL = this.config.apiBucket + this.producto.foto; }
    }
  }
}
