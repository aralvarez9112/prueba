export class TerminosYCondiciones {
	id?: string;
	version?: string;
	titulo?: string;
	descripcion: string;
	fechaCreacion?: Date;
	fechaEdicion?: Date;
}

export class TerminosYCondicionesListResponse {
	data: TerminosYCondiciones[];
	total: number;
}

export class TerminosYCondicionesResponse {
	data: TerminosYCondiciones;
}
