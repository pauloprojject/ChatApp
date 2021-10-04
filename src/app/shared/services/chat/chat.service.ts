import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { Chat } from '../../model/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  URL_CHATS = 'http://localhost:8080/chats';

  constructor(private httpClient: HttpClient) {
  }

  async listar() : Promise<Chat[]> {
    return this.httpClient.get<Chat[]>(this.URL_CHATS).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar chats");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async meusChats(id_usuario: number): Promise<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.URL_CHATS}/usuario/${id_usuario}`).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar listar meus chats");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async inserir(chat: Chat): Promise<Chat> {
    return this.httpClient.post<Chat>(this.URL_CHATS, chat).pipe(catchError(() => {
      window.alert("Erro de conexão ao tentar inserir o novo chat");
      return of(undefined);
    })).pipe(first()).toPromise();
  }

}
