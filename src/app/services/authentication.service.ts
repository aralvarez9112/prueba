import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { TerminosYCondicionesDialogDialogComponent } from '../components/terminos-y-condiciones/components/terminos-y-condiciones-dialog/terminos-y-condiciones-dialog.component';
import { TerminosYCondicionesService } from '../components/terminos-y-condiciones/services/terminos-y-condiciones.service';
import { Login } from '../entidades/LoginResponse';
import { DialogService } from './dialog.service';
import { ToastService } from './toastr.service';


@Injectable()
export class AuthenticationService {
  public redirectUrl: string;

  private loginDialogData: Subject<any> = new Subject();

  public tokenIsFresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  openDialogRef :any

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppConfig,
    private dialogService: DialogService,
    private alertService: ToastService,
    public terminosYCondicionesService: TerminosYCondicionesService,

  ) { }

  login(formUsuario: any) {
    return this.http.post(this.config.apiApiGateway + '/auth/login', formUsuario).pipe(
      map(
        (response: any) => {
          const data = response.data;
          localStorage.setItem('token', data['token']);
          localStorage.setItem('role', 'providerAdmin');
          localStorage.setItem('roles', JSON.stringify(data['roles']));
          localStorage.setItem('user', JSON.stringify(data['user']));
          if (data['business'] != undefined) {
            localStorage.setItem('business', JSON.stringify(data['business']));
          }
          localStorage.setItem('businesses', JSON.stringify(data['businesses']));
          this.isLoggedIn();
        },
        (err: any) => { console.log(err) }
      ),
    );
  }

  loginExpired(formUsuario: any, empresaId: any) {
    localStorage.removeItem('token');
    return this.http.post(this.config.apiApiGateway + '/auth/login', formUsuario).pipe(
      map(
        (response: any) => {
          const data = response.data;
          localStorage.setItem('token', data['token']);
          this.isLoggedIn();

          if (empresaId !== '' && empresaId !== undefined) {
            this.loginEmpresa(empresaId).subscribe(
              () => {

              },
              () => {
                this.alertService.error('Error al loguear el usuario empresa', 'OK');
              },
            );
          }
        },

      ),
    );
  }

  isLoggedIn() {
    this.tokenIsFresh.next(true);
    return localStorage.getItem('business') != null;
  }

  loginEmpresa(id: any): any {
    return this.http.post(this.config.apiApiGateway + '/auth/empresa/' + id, null).pipe(
      map(
        (response: any) => {
          this.verificarQueSeAceptaronLosTerminosYCondiciones(id, response.data);
          return response;
        },
        (err: any) => { console.log(err) }
      ),
    );
  }

  verificarQueSeAceptaronLosTerminosYCondiciones(idEmpresa: string, data: any) {
 //   debugger
    if (!data.aceptoTerminosYCondiciones) {
      if (data.esAdministrador) {
        this.dialogService
          .openFromComponent(TerminosYCondicionesDialogDialogComponent, '700px', {}, true)
          .afterClosed()
          .subscribe((response: any) => {
            if (response) {
              this.terminosYCondicionesService.postAceptarTerminosYCondiciones(idEmpresa).subscribe(
                (response: any) => {
                  this.setearValoresEnElLocalStorage(data);
                  this.isLoggedIn()
                  this.router.navigate(['/pagina/inicio'], { replaceUrl: true });
                },
                (error: any) => {
                 if(error.error.code==400){
                  this.alertService.error(error.error.data, 'OK');}
                  else{ this.alertService.error("Error Inesperado");}
                },
              );
            } else {
              this.alertService.error(
                'Por el momento no se puede acceder a esta empresa. No se han aceptado los Términos y Condiciones.',
              );
            }
          });
      } else {
        this.alertService.error(
          'Por el momento no se puede acceder a esta empresa. No se han aceptado los Términos y Condiciones. Pongase en contacto con su administrador.',
        );
      }
    } else {
      this.setearValoresEnElLocalStorage(data);
    }
  }

  setearValoresEnElLocalStorage(response: Login) {
    const data = response;
    localStorage.setItem('token', data['token'] as string);
    localStorage.setItem('role', 'providerAdmin');
    localStorage.setItem('roles', JSON.stringify(data['roles']));
    localStorage.setItem('user', JSON.stringify(data['user']) );
    localStorage.setItem('businesses', JSON.stringify(data['businesses']));

    if (data['business']) {
      localStorage.setItem('business', JSON.stringify(data['business']));
    }

    const allRoles = localStorage.getItem('roles') as string;
    const allRolesArray: String[] = JSON.parse(allRoles);

  }

  logout() {
    localStorage.clear();
    this.tokenIsFresh.next(false);
    window.location.replace('/login');
  }

  getNombreEmpresa() {
    const empresa = JSON.parse(localStorage.getItem('business')as string);
    if (!empresa) return '';
    return empresa.nombre;
  }

  getNombreCompleto() {
    let ret = '';
    if (this.getNombre()) {
      ret += this.getNombre();
    }
    if (this.getApellido()) {
      ret += ' ' + this.getApellido();
    }
    return ret;
  }

  getNombre() {
    let usuario = localStorage.getItem('user');
    if (usuario) {
      return JSON.parse(usuario)?.nombre
    }
    return "";
  }
  getApellido() {
    let usuario = localStorage.getItem('user');
    if (usuario) {
      return JSON.parse(usuario)?.apellido;
    }
    return "";
  }

  getIdUsuario() {
    let id = JSON.parse(localStorage.getItem('user') as string)?.id;
    return id;
  }
  can(role: string) {
    const allRoles = localStorage.getItem('roles');

    if (!allRoles) {
      return true;
    }

    const allRolesArray: String[] = JSON.parse(allRoles);
    return allRolesArray.includes(role);
  }

  openLoginDialog() {
    if (this.dialogService.dialog.openDialogs.length === 0) {
      this.openDialogRef = this.dialogService.openLogin(this.loginDialogData);
      let subscription = this.loginDialogData.subscribe((response) => {
        if (response) {
          const empresa = JSON.parse(localStorage.getItem('business') as string);
          let empresaId = '';
          if (empresa !== null && empresa !== undefined) {
            empresaId = empresa.id;
          }
          this.loginExpired(response, empresaId).subscribe(
            (data) => {
              subscription.unsubscribe();
              this.openDialogRef.close();
            },
            (error) => {

              subscription.unsubscribe();
            },
          );
        } else {
          this.openDialogRef.close();
          this.logout();
          subscription.unsubscribe();
        }
      });
    }
  }

  loginDialogIsOpen() {
    return this.openDialogRef && this.openDialogRef.getState() === MatDialogState.OPEN;
  }

  updateHeader(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    request = token ? request.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : request;
    return request;
  }
}
