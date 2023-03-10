import { Empresa } from "./Empresa";
import { Usuario } from "./Usuario";

export class LoginResponse {
	data: Login;
}

export class Login {
	token?: string;
	business?: Empresa;
	businesses?: Empresa[];
	roles?: string[];
	user?: Usuario;
	esAdministrador?: boolean;
	aceptoTerminosYCondiciones?: boolean;
}
