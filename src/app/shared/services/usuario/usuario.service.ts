import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';

import { Usuario } from '../../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {
  }

  async listar() : Promise<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar usuários");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async login(username: string, password: string) : Promise<Usuario> {
    return this.httpClient.get<Usuario[]>(`${this.URL_USUARIOS}/login/${username}&&${password}`).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar autenticar usuário");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async inserir(usuario: Usuario): Promise<Usuario> {
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar inserir usuário");
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
