import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toastr.service';

import { UserGuard } from './user.guard';

@Injectable({
	providedIn: 'root',
})
export class AdministradorGuard implements CanActivate {
	constructor(private router: Router, private toastService: ToastService, private userGuard: UserGuard) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.esAdministradorDelSistema();
	}

	esAdministradorDelSistema(): boolean {
		const requiredRoles = ['systemAdmin'];
		if (this.userGuard.hasRequiredRoles(requiredRoles)) {
			return true;
		} else {
			this.toastService.error('No tiene permisos para esta funcionalidad', 'OK');
			this.router.navigate(['login']);
			return false;
		}
	}
}
