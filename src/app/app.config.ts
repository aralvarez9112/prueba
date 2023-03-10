import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class AppConfig {
  private _apiServicios = '';
  private _apiBucket = '';
  private _apiCatalogo = '';
  private _apiApiGateway = '';
  private _env = ''
  constructor() {

  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      const data$ = fromFetch('./assets/env.json').pipe(
        switchMap((response) => {
          if (response.ok) {
            // OK return data
            return response.json();
          } else {
            // Server is returning a status requiring the client to try something else.
            return of({ error: true, message: `Error ${response.status}` });
          }
        }),
        catchError((err) => {
          // Network or other error, handle appropriately
          console.error(err);
          return of({ error: true, message: err.message });
        }),
      );

      data$.subscribe({
        next: (result) => {
          this._apiServicios = result['apiServicios'];
          this._apiBucket = result['apiBucket'];
          this._apiCatalogo = result['apiCatalogo'];
          this._apiApiGateway = result['apiApiGateway'];
          this._env = result['env'];
          resolve(true);
        },
      });
    });
  }

  get apiServicios() {
    return this._apiServicios;
  }

  get apiBucket() {
    return this._apiBucket;
  }
  get apiCatalogo() {
    return this._apiCatalogo;
  }

  public get env() {
    return this._env;
  }

  public get apiApiGateway() {
    return this._apiApiGateway;
  }
}
