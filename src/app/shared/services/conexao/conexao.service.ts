import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Conexao } from '../../model/conexao';

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  URL_CONEXOES = 'http://localhost:8080/conexoes';

  constructor(private httpClient: HttpClient) {
  }

  async listar() : Promise<Conexao[]> {
    return this.httpClient.get<Conexao[]>(this.URL_CONEXOES).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar chats");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async minhasConexoesChat(id_usuario: number): Promise<Conexao[]> {
    return this.httpClient.get<Conexao[]>(`${this.URL_CONEXOES}/usuario/${id_usuario}`).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar minhas conexoes");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async inserir(conexao: Conexao): Promise<Conexao> {
    return this.httpClient.post<Conexao>(this.URL_CONEXOES, conexao).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar inserir a nova conexão");
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
