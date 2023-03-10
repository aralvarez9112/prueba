import { Component, OnInit, Inject, Input } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Producto } from 'src/app/entidades/Producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  imgURL: string
  mercadoObjetivo = '';
  contenidoNeto = '';

  constructor(private config: AppConfig) {
  }

  ngOnInit(): void {

    this.imgURL = "./assets/images/no-image.png";
    if (this.producto != undefined) {
      this.contenidoNeto = this.producto.contenidoNeto.cantidad + ' ' + this.producto.contenidoNeto.unidad;

      if (this.producto.foto != null) { this.imgURL = this.config.apiBucket + this.producto.foto; }
    }
  }
}
