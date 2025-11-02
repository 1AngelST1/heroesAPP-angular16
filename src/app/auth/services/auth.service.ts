import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor( private http: HttpClient ) { }


  verificaAutenticacion(): Observable<boolean> {

    const token = localStorage.getItem('token');
    
    if ( !token ) {
      console.log('❌ No hay token en localStorage');
      return of(false);
    }

    console.log('✅ Token encontrado, verificando con el servidor...', token);
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/${ token }`)
              .pipe(
                map( auth => {
                  console.log('✅ Usuario autenticado:', auth.usuario);
                  this._auth = auth;
                  return true;
                })
              );

  }


  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth ),
                tap( auth => {
                  localStorage.setItem('token', auth.id );
                  console.log('✅ Login exitoso, token guardado:', auth.id);
                }),
              );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
    console.log('🚪 Logout - Token eliminado');
  }

}
