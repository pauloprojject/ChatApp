import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensagem } from 'src/app/shared/model/mensagem';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { ConexaoService } from 'src/app/shared/services/conexao/conexao.service';
import { MensagemService } from 'src/app/shared/services/mensagem/mensagem.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Chat } from '../../shared/model/chat';
import { ChatsView } from '../../shared/model/chat-view';
import { Conexao } from '../../shared/model/conexao';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-tela-mensagem',
  templateUrl: './tela-mensagem.component.html',
  styleUrls: ['./tela-mensagem.component.scss']
})
export class TelaMensagemComponent implements OnInit {

  usuarioLogado: Usuario;

  mensagensActive: Array<Mensagem>;
  chatsViews: Array<ChatsView>;
  datas: Array<string>;

  usuarios: Array<Usuario>;
  chats: Array<Chat>;
  conexoes: Array<Conexao>;
  mensagens: Array<Mensagem>

  constructor(private roedor: Router, private usuarioService: UsuarioService, private chatService: ChatService, private conexaoService: ConexaoService, private mensagemService: MensagemService) {
    this.chatsViews = new Array();
    this.usuarios = new Array();
    this.chats = new Array();
    this.conexoes = new Array();
    this.mensagens = new Array();
    this.mensagensActive = new Array();
  }

  async ngOnInit(): Promise<void> {
    const ls = localStorage;
    const username = ls.getItem("username");
    const password = ls.getItem("password");
    if(username && password) {
      this.usuarioService.login(username, password).then(async usuario => {
        if(usuario) {
          this.usuarioLogado = usuario;
          this.chats = await this.chatService.meusChats(usuario.id);
          this.conexoes = await this.conexaoService.minhasConexoesChat(usuario.id);
          this.usuarios = await this.usuarioService.listar();
          this.mensagens = await this.mensagemService.mensagensUsuarioChat(usuario.id);
          this.formatChatsView();
        } else {
          localStorage.clear();
          this.roedor.navigate([""]);
        }
      });
    } else {
      localStorage.clear();
      this.roedor.navigate([""]);
    }
  }

  private formatChatsView(): void {
    this.chats.forEach(chat => {
      const chatView = new ChatsView();

      chatView.id = chat.id;
      chatView.nome_chat = chat.nome;

      const conexoes = this.conexoes.filter(c => c.id_chat === chat.id && c.id_usuario !== this.usuarioLogado.id);

      chatView.mensagens = this.mensagens.filter(m =>
        this.conexoes.filter(c => c.id_chat === chat.id && c.id === m.id_conexao).length > 0
      );


      const id_usuarios = conexoes.map(c => c.id_usuario);
      const usuarios = this.usuarios.filter(u => id_usuarios.includes(u.id));
      chatView.usuarios = usuarios;

      if(conexoes.length === 0) {
        chatView.logo = this.usuarioLogado.logo;
        chatView.userLetter = this.usuarioLogado.username[0];
      }else if(conexoes.length === 1) {
        chatView.logo = usuarios[0].logo;
        chatView.userLetter = usuarios[0].username[0];
      } else {
        chatView.logo = chat.logo;
        chatView.userLetter = chat.nome[0];
      }

      chatView.active = false;
      chatView.usuariosText = "Eu";

      if(usuarios.length > 0)
        chatView.usuariosText += ", " + usuarios.map(u => u.username).join(", ");

      this.chatsViews.push(chatView);
    });
    this.chatsViews[0].active = true;
    this.mensagensActive = this.chatsViews[0].mensagens;

    const datasRepeat = this.mensagensActive.map(m => m.datahora.split(" ")[0]);
    this.datas = datasRepeat.filter((m, index) => datasRepeat.indexOf(m) === index);
  }

  public openChat(id: number, usuarios: Array<Usuario>): void {
    this.chatsViews.forEach(cv => {
      cv.active = cv.id === id;

      if(cv.id === id) {
        this.mensagensActive = cv.mensagens;
        const datasRepeat = this.mensagensActive.map(m => m.datahora.split(" ")[0]);
        this.datas = datasRepeat.filter((m, index) => datasRepeat.indexOf(m) === index);
      }
    });
  }

  public getUserMessage(mensagem: Mensagem): string {
    const id_usuario = this.conexoes.filter(c => c.id === mensagem.id_conexao)[0].id_usuario;
    return this.usuarios.filter(u => u.id === id_usuario)[0].username;
  }

  public isMessageMy(mensagem: Mensagem): boolean {
    return this.conexoes.filter(c => c.id === mensagem.id_conexao)[0].id_usuario === this.usuarioLogado.id;
  }

  public mensagensData(data: string): Array<Mensagem> {
    return this.mensagensActive.filter(m => m.datahora.split(" ")[0] === data.split(" ")[0]);
  }

  public logout(): void {
    localStorage.clear();
    this.roedor.navigate([""]);
  }
}
