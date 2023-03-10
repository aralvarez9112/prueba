import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  showMyBusiness = true;
	showOtherBusiness = false;
	showPedidos = false;
	showSettings = false;
	activeLink = 0;
	flat: any;
	background: any;
	mostrarAdvertencia = false;
//	notificacion: NotificacionesUsuarios;
	private onDestroy$: Subject<void> = new Subject<void>();
//	notificacionesUsuarios: NotificacionesUsuarios[];
	notificacionesUsuariosLenght = 0;
	isLeido: Observable<boolean> = of(false);
	icon: string;
	private notificacionesSubscription: Subscription | undefined;

	constructor(
		private router: Router,
	//	private saleListsService: SaleListService,
	//	public usersService: UsuariosService,
		public authenticationService: AuthenticationService,
	//	public userGuardService: UserGuardService,
	///	private notificacionUsuariosService: NotificacionesUsuariosService,
	//	public websocketNotificacionesService: WebsocketNotificacionesService,
		public config: AppConfig,
	) {}

	ngOnInit() {

   if(!this.authenticationService.tokenIsFresh.getValue()){
    this.router.navigate(['/login'], { replaceUrl: true });
   }
		let pos = JSON.parse(localStorage.getItem('navBarPos') as string);
		if (pos) {
			this.changeNavbarPos(parseInt(pos));
		} else {
			this.changeNavbarPos(0);
		}
	//	this.websocketNotificacionesService.cargarNotificaciones();
	//	this.loadNotificationsDatas();
	}
	ngOnDestroy(): void {
		this.notificacionesSubscription?.unsubscribe();
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	changeNavbarPos(pos:any) {
		this.activeLink = pos;
		localStorage.setItem('navBarPos', JSON.stringify(pos));

		switch (pos) {
			case 0: {
				this.doShowMyBusiness();
				break;
			}
			case 1: {
				this.doShowOtherBusiness();
				break;
			}
			case 2: {
				this.doShowPedidos();
				break;
			}
			case 3: {
				this.doShowSettings();
				break;
			}
			default: {
				this.doShowMyBusiness();
				break;
			}
		}
	}

/* 	async loadNotificationsDatas() {
		this.notificacionesSubscription = this.websocketNotificacionesService.currentNotificaciones.subscribe(
			(response: any) => {
				if (response.total === undefined) {
					this.notificacionesUsuarios = [];
					this.notificacionUsuariosService.notificacionesUsuarios = [];
					this.notificacionesUsuariosLenght = 0;
					this.notificacionUsuariosService.total = 0;
					this.icon = 'notifications_none';
					this.mostrarAdvertencia = false;
				} else {
					this.notificacionesUsuarios = response.data;
					this.notificacion = this.notificacionesUsuarios.find((elemento) => elemento.tipo === 'warning');
					if (this.notificacion == undefined) this.mostrarAdvertencia = false;
					else this.mostrarAdvertencia = true;
					this.notificacionUsuariosService.notificacionesUsuarios = response.data;
					this.notificacionesUsuariosLenght = response.total;
					this.notificacionUsuariosService.total = response.total;
					this.icon = 'notifications_active';
				}
			},
		);
		this.isLeido = of(false);
	} */

	doShowMyBusiness() {
		this.showMyBusiness = true;
		this.showOtherBusiness = false;
		this.showSettings = false;
		this.showPedidos = false;
	}

	doShowOtherBusiness() {
		this.showMyBusiness = false;
		this.showOtherBusiness = true;
		this.showSettings = false;
		this.showPedidos = false;
	}

	doShowPedidos() {
		this.showMyBusiness = false;
		this.showOtherBusiness = false;
		this.showSettings = false;
		this.showPedidos = true;
	}

	doShowSettings() {
		this.showMyBusiness = false;
		this.showOtherBusiness = false;
		this.showSettings = true;
		this.showPedidos = false;
	}

	logout(): void {
		this.authenticationService.logout();
	}

  empresas(){
    this.router.navigate(['/pagina/admin/empresas'], { replaceUrl: true });
  }
	get nombreEmpresa() {
		return this.authenticationService.getNombreEmpresa();
	}

	get nombreCompleto() {
		return this.authenticationService.getNombreCompleto();
	}

	get idUsuario() {
		return this.authenticationService.getIdUsuario();
	}

}
