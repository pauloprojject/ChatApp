import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Mensagem } from '../../model/mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  URL_MENSAGENS = 'http://localhost:8080/mensagens';

  constructor(private httpClient: HttpClient) {
  }

  async listar() : Promise<Mensagem[]> {
    return this.httpClient.get<Mensagem[]>(this.URL_MENSAGENS).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar mensagens");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async mensagensUsuarioChat(id_usuario: number) : Promise<Mensagem[]> {
    return this.httpClient.get<Mensagem[]>(`${this.URL_MENSAGENS}/usuario/${id_usuario}`).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar mensagens");
      return of(undefined);
    })).pipe(first()).toPromise();

  }
}
