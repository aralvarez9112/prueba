import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toastr.service';


@Injectable({
	providedIn: 'root',
})
export class UserGuard implements CanActivateChild {
	constructor( private authService: AuthenticationService,  public toastService: ToastService) {}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    debugger
		return this.checkLogin(state.url);
	}

	checkLogin(url: string): boolean {
		const requiredRoles = ['usuarioEmpresa', 'administradorEmpresa', 'systemAdmin'];
		if (this.hasRequiredRoles(requiredRoles)) {
			return true;
		} else {
		//	this.authService.redirectUrl = url;
			return false;
		}
	}

	hasRequiredRoles(requiredRoles: string[]): boolean {
		const userRoles = <string[]>JSON.parse(localStorage.getItem('roles') as string);
		return userRoles.some((userRole) => requiredRoles.includes(userRole));
	}
}
