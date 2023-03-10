import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalSeleccionEmpresaComponent } from '../modals/modal-seleccion-empresa/modal-seleccion-empresa.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  variasEmpresas: boolean = false;
  form: FormGroup;
  modalRef: MatDialogRef<ModalSeleccionEmpresaComponent>;
  data = {
    "token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiY3R5IjoiSldUIn0..DPbNua5jWGb3bkDn1tkv6Q.YSJuIh-F-GhcD4dtep_q04o4MxWwf-zT1RATrAHCR2mJTRvjiCz2Sp7X3hDa93dy8x29zY-HmXVBQlQewo7qCVHgBiE0wSSJam2TvYMvymTRxG7vWOixF4VeU7aW6qzlbb_An1JAfSs5L34G2VXF-aV6ua7qUW7_iHsd154NlFBxOyduvD35xNrSxaNESOebBFZLYJFHJ0GI0OesLvGfQxlzoscxuPRrQUNxVe3l73_fvjnsXPf9Lx2ufE6d5Z0xW-MaWTipqMs62aTwPqVUt6nI4sHqyIZWfP8HIIySgVkvDKI2rcd8n0H96_pHd2-mKWmkCpyPot4Tjl_AHvEnJg.Xf-7ePhfUsNslMv89tlhbw",
    "roles": [
      "usuarioEmpresa",
      "systemAdmin",
    ],
    "user": {
      "id": "62956c1c94bbd8507a9e77d8",
      "sid": "62956c1c94bbd8507a9e77d8",
      "fechaCreacion": "2022-05-30 22:15:08",
      "fechaEdicion": "2023-03-08 13:57:57",
      "eliminado": false,
      "nombre": "Admin",
      "apellido": "Admin",
      "email": "omorapatterson@gmail.com",
      "usuario": "omorapatterson@gmail.com",
      "contrasena": "bf3396479dad03b8757914ce76029266c09ac392742eb53eecb5d865afa8fd51",
      "reseteoContrasena": false,
      "validado": true,
      "validadoParaEmpresa": null,
      "esAdministradorSistema": true,
      "activo": true,
      "roles": [
        {
          "id": "5f77b0461634c7239a25955d",
          "sid": "5f77b0461634c7239a25955d",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2020-02-28 11:18:21",
          "eliminado": false,
          "rol": "administradorEmpresa",
          "descripcion": "Administrador",
          "visible": true
        },
        {
          "id": "61e9c92c85fbc0494367540b",
          "sid": "61e9c92c85fbc0494367540b",
          "fechaCreacion": "2022-01-11 21:00:00",
          "fechaEdicion": "2022-01-11 21:00:00",
          "eliminado": false,
          "rol": "archivarDocumentos",
          "descripcion": "Archivar Documentos",
          "visible": true
        },
        {
          "id": "5f77b0461634c7239a25955c",
          "sid": "5f77b0461634c7239a25955c",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2018-07-01 21:00:00",
          "eliminado": false,
          "rol": "crearGruposDeEmpresa",
          "descripcion": "Modificar Grupos de Empresa",
          "visible": true
        },
        {
          "id": "61e9ca1985fbc0494367540c",
          "sid": "61e9ca1985fbc0494367540c",
          "fechaCreacion": "2022-01-11 21:00:00",
          "fechaEdicion": "2022-01-11 21:00:00",
          "eliminado": false,
          "rol": "actualizarFoto",
          "descripcion": "Actualizar Foto",
          "visible": true
        },
        {
          "id": "5f77b0461634c7239a25955e",
          "sid": "5f77b0461634c7239a25955e",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2018-07-01 21:00:00",
          "eliminado": false,
          "rol": "usuarioEmpresa",
          "descripcion": "Usuario",
          "visible": false
        },
        {
          "id": "61e9c8d085fbc0494367540a",
          "sid": "61e9c8d085fbc0494367540a",
          "fechaCreacion": "2022-01-11 21:00:00",
          "fechaEdicion": "2022-01-11 21:00:00",
          "eliminado": false,
          "rol": "abrirDocumentos",
          "descripcion": "Abrir Documentos",
          "visible": true
        },
        {
          "id": "5f1f335f9c6222423d277204",
          "sid": "5f1f335f9c6222423d277204",
          "fechaCreacion": "2021-02-22 21:00:00",
          "fechaEdicion": "2021-02-22 21:00:00",
          "eliminado": false,
          "rol": "modificarSuspendidosDiscontinuados",
          "descripcion": "Modificar suspendidos y discontinuados",
          "visible": true
        },
        {
          "id": "61e9c86385fbc04943675409",
          "sid": "61e9c86385fbc04943675409",
          "fechaCreacion": "2022-01-11 21:00:00",
          "fechaEdicion": "2022-01-11 21:00:00",
          "eliminado": false,
          "rol": "verListaDocumentos",
          "descripcion": "Ver lista de Documentos",
          "visible": true
        },
        {
          "id": "5f1f335f9c6222423d277203",
          "sid": "5f1f335f9c6222423d277203",
          "fechaCreacion": "2021-02-22 21:00:00",
          "fechaEdicion": "2021-02-22 21:00:00",
          "eliminado": false,
          "rol": "modificarPrecio",
          "descripcion": "Modificar precio",
          "visible": true
        },
        {
          "id": "5f77b0461634c7239a259560",
          "sid": "5f77b0461634c7239a259560",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2018-07-01 21:00:00",
          "eliminado": false,
          "rol": "asignarVisibilidad",
          "descripcion": "Asignar Visibilidad",
          "visible": true
        },
        {
          "id": "5f77b0461634c7239a25955b",
          "sid": "5f77b0461634c7239a25955b",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2018-07-01 21:00:00",
          "eliminado": false,
          "rol": "crearListaDeVenta",
          "descripcion": "Modificar Lista de Venta",
          "visible": true
        },
        {
          "id": "5f77b0461634c7239a25955a",
          "sid": "5f77b0461634c7239a25955a",
          "fechaCreacion": "2018-07-01 21:00:00",
          "fechaEdicion": "2018-07-01 21:00:00",
          "eliminado": false,
          "rol": "editarProductos",
          "descripcion": "Editar Productos",
          "visible": true
        }
      ],
    },
    "esAdministrador": true,
    "aceptoTerminosYCondiciones": null
  }

  constructor(private router: Router,
    private loader: LoadingService,
    private dialog: MatDialog,
    private empresaService: EmpresaService,
    private autenticacion: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  LogIn() {
    localStorage.clear();
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();

      localStorage.setItem('token', this.data['token']);
      localStorage.setItem('role', 'providerAdmin');
      localStorage.setItem('roles', JSON.stringify(this.data['roles']));
      localStorage.setItem('user', JSON.stringify(this.data['user']));
      this.sellecionarEmpresa();
    }, 3000);

  }

  sellecionarEmpresa() {
    let empresas;
    if (this.form.get('usuario')?.value == 'admin@gmail.com') {
      this.autenticacion.isLoggedIn();
      this.router.navigate(['/pagina/admin/empresas'], { replaceUrl: true });
    }
    else if (this.form.get('usuario')?.value == 'alal@gmail.com') {
      empresas = [{ rut: '100000000000' }, { rut: '100000000002' }];
      this.modalRef = this.dialog.open(ModalSeleccionEmpresaComponent, {
        data: {
          titleKey: 'Selecciona la Empresa',
          empresas: empresas
        },
      });

      this.modalRef.afterClosed().subscribe((result) => {
        this.detalleEmpresa(result.codigo.rut)
      });
    } else {
      empresas = [{ rut: '212032250017' }]
      this.detalleEmpresa(empresas[0].rut)
    }
  }
  detalleEmpresa(rut: string) {
    this.empresaService.cargarDetalleEmpresa(rut).subscribe(resp => {
      this.empresaService.setNroEmpresa(rut)
      if (!resp.data.aceptoTerminosYCondiciones) {
        this.autenticacion.verificarQueSeAceptaronLosTerminosYCondiciones(rut, this.data)
      }
      else {  this.autenticacion.isLoggedIn();
        this.router.navigate(['/pagina/inicio'], { replaceUrl: true }); }
    })
  }
}
