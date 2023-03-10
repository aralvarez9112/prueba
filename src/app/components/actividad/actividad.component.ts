import { Component, OnInit, Input } from '@angular/core';
import { Actividad } from 'src/app/entidades/Actividad';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  @Input() actividad: Actividad;

  constructor() { }

  ngOnInit(): void { }

  statusManager() {

    if (this.actividad.estado === "Activo") {
      return '#198754';
    } else if (this.actividad.estado === "Baja") {
      return '#dc3545';
    } else { return '#ffc107'; }

  }
}
