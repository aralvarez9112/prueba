import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ActivatePaginationResponse } from 'src/app/entidades/ActivatePaginationResponse';
//

import {
	TerminosYCondiciones,
	TerminosYCondicionesResponse,
} from '../models/terminosYCondiciones';
export const createFilterURI = (array: any[], filterName: string): string => {
	let filters: string = '';
	array.forEach((item) => {
		filters += '&' + filterName + '=' + encodeURIComponent(item);
	});
	return filters;
};

export const ASCENDING = 'asc';

@Injectable({
	providedIn: 'root',
})
export class TerminosYCondicionesService {
	apiEndpoint: string;

	previousFilter: any = {};

	previousSortColumn: string = 'version';

	previousSortDirection: string = 'asc';

	previousPageIndex: number = 0;

	previousPageSize: number = 5;

	constructor(
		private http: HttpClient,
		private config: AppConfig,
	) {
		this.apiEndpoint = this.config.apiServicios + 'terminosYCondiciones';
	}

	public getTerminosYCondiciones(
		page = 0,
		limit = 100,
		selectedFilters: string[] = [],
		sort: string = '',
	): Observable<ActivatePaginationResponse> {
		const filters = this.getFilters(selectedFilters);
		return this.http
			.get<ActivatePaginationResponse>(
				this.apiEndpoint + '?page=' + page + '&limit=' + limit,
			);
	}

	crearTerminosYCondiciones(terminosYCondiciones: TerminosYCondiciones): Observable<TerminosYCondicionesResponse> {
		return this.http.post<TerminosYCondicionesResponse>(this.apiEndpoint, terminosYCondiciones);
	}

	actualizarTerminosYCondiciones(
		terminosYCondiciones: TerminosYCondiciones,
	): Observable<TerminosYCondicionesResponse> {
		return this.http.put<TerminosYCondicionesResponse>(this.apiEndpoint, terminosYCondiciones);
	}

	getTerminosYCondicionesActual(): Observable<ActivatePaginationResponse> {
		return this.http.get<ActivatePaginationResponse>(this.apiEndpoint + '/actual');
	}

	getTerminosYCondicionesById(id: string): Observable<ActivatePaginationResponse> {
		return this.http.get<ActivatePaginationResponse>(this.apiEndpoint + '/editar/' + id);
	}

	postAceptarTerminosYCondiciones(empresaId: string): Observable<TerminosYCondicionesResponse> {
		return this.http.post<TerminosYCondicionesResponse>(this.config.apiServicios + `empresa/${empresaId}/terminosYCondiciones/aceptar`, null );
	}

	public getFilters(selectedFilters: string[]) {
		let filters = '';
		filters = createFilterURI(selectedFilters, 'filters');
		return filters;
	}

}
