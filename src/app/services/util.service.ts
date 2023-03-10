import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppConfig } from '../app.config';
import { ActivateResponse } from '../entidades/ActivateResponse';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor(private http: HttpClient, private config: AppConfig) { }

    public buscarGPCPorDescripcion(filtro: string) {
        return this.http.get<ActivateResponse>(this.config.apiCatalogo + `/gpc/brick?filters=${filtro}`);
    }

}