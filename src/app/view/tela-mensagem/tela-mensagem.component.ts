import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { ConexaoService } from 'src/app/shared/services/conexao/conexao.service';
import { MensagemService } from 'src/app/shared/services/mensagem/mensagem.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

import { Chat } from '../../shared/model/chat';
import { ChatsView } from '../../shared/model/chat-view';
import { Conexao } from '../../shared/model/conexao';
import { Usuario } from '../../shared/model/usuario';
import { Mensagem } from 'src/app/shared/model/mensagem';
import { NovoChat } from '../../shared/model/novoChat';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  mensagens: Array<Mensagem>;
  showAddChat: boolean;

  novoChat: NovoChat;
  criarChatButton: boolean;
  filtroNovoChat: Array<Usuario>;
  userCtrl = new FormControl();
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private roedor: Router, private usuarioService: UsuarioService, private chatService: ChatService, private conexaoService: ConexaoService, private mensagemService: MensagemService) {
    this.chatsViews = new Array();
    this.usuarios = new Array();
    this.chats = new Array();
    this.conexoes = new Array();
    this.mensagens = new Array();
    this.mensagensActive = new Array();
    this.showAddChat = false;

    this.novoChat = new NovoChat();
    this.criarChatButton = true;
    this.filtroNovoChat = new Array();
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

          this.novoChat.usuarios.push(usuario);
          this.filtroNovoChat = this.usuarios.filter(u => u.id !== usuario.id);

          this.formatChatsView();
          this.initUpdate();
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
    const chatsViews = new Array();
    this.chats.forEach(chat => {
      const chatView = new ChatsView();

      chatView.id = chat.id;
      const conexoes = this.conexoes.filter(c => c.id_chat === chat.id && c.id_usuario !== this.usuarioLogado.id);

      chatView.mensagens = this.mensagens.filter(m =>
        this.conexoes.filter(c => c.id_chat === chat.id && c.id === m.id_conexao).length > 0
      );


      const id_usuarios = conexoes.map(c => c.id_usuario);
      const usuarios = this.usuarios.filter(u => id_usuarios.includes(u.id));
      chatView.usuarios = usuarios;

      if(conexoes.length === 0) {
        chatView.logo = this.usuarioLogado.logo;
        chatView.userLetter = chat.nome[0];
      }else if(conexoes.length === 1) {
        chatView.logo = usuarios[0].logo;
        chatView.userLetter = usuarios[0].username[0];
      } else {
        chatView.logo = chat.logo;
        chatView.userLetter = chat.nome[0];
      }

      chatView.nome_chat = usuarios.length === 1? usuarios[0].username : chat.nome;
      chatView.active = false;
      chatView.usuariosText = "Eu";

      if(usuarios.length > 0)
        chatView.usuariosText += ", " + usuarios.map(u => u.username).join(", ");

      chatsViews.push(chatView);
    });

    let indexActive;
    if(this.chatsViews.length > 0)
      indexActive = this.chatsViews.map((c,i) => c.active ? i : false).filter(c => c)[0];

    this.chatsViews = chatsViews;
    if(indexActive) {
      if(this.chatsViews[indexActive]) {
        this.chatsViews[indexActive].active = true;
        this.mensagensActive = this.chatsViews[indexActive].mensagens;
      }
    } else {
      if(this.chatsViews[0]) {
        this.chatsViews[0].active = true;
        this.mensagensActive = this.chatsViews[0].mensagens;
      }
    }


    const datasRepeat = this.mensagensActive.map(m => m.datahora.split("T")[0].split("-").reverse().join("/"));
    this.datas = datasRepeat.filter((m, index) => datasRepeat.indexOf(m) === index).reverse();
  }

  public openChat(id: number, usuarios: Array<Usuario>): void {
    this.chatsViews.forEach(cv => {
      cv.active = cv.id === id;

      if(cv.id === id) {
        this.mensagensActive = cv.mensagens;
        const datasRepeat = this.mensagensActive.map(m => m.datahora.split("T")[0].split("-").reverse().join("/"));
        this.datas = datasRepeat.filter((m, index) => datasRepeat.indexOf(m) === index).reverse();
      }
    });
  }

  public initUpdate(): void {
    setInterval(() => { this.atualizaChats() }, 2000);
    setInterval(() => { this.atualizaConexoes() }, 2000);
    setInterval(() => { this.atualizaUsuarios() }, 2000);
    setInterval(() => { this.atualizaMensagens() }, 2000);
  }

  public getUserMessage(mensagem: Mensagem): string {
    const id_usuario = this.conexoes.filter(c => c.id === mensagem.id_conexao)[0].id_usuario;
    return this.usuarios.filter(u => u.id === id_usuario)[0].username;
  }

  public atualizaChats(): void {
    this.chatService.meusChats(this.usuarioLogado.id).then(c => {
      this.chats = c;
    });
  }

  public atualizaConexoes(): void {
    this.conexaoService.minhasConexoesChat(this.usuarioLogado.id).then(c => {
      this.conexoes = c;
    });
  }

  public atualizaUsuarios(): void {
    this.usuarioService.listar().then(u => {
      this.usuarios = u;
    });
  }


  public atualizaMensagens(): void {
    this.mensagemService.mensagensUsuarioChat(this.usuarioLogado.id).then(m => {
      this.mensagens = m;
      this.formatChatsView();
    });
  }

  public sendMessage(input: HTMLInputElement) {
    const text = input.value.trim();
    input.value = "";
    if(text !== '') {
      const chat_current = this.chatsViews.filter(c => c.active)[0];
      const id_chat_current = chat_current.id
      const mensagem = new Mensagem();

      const now = new Date();
      now.setHours( now.getHours() - 3 );

      mensagem.datahora = now.toISOString();
      mensagem.edit = false;
      mensagem.id_conexao = this.conexoes.filter(con => con.id_chat === id_chat_current && con.id_usuario === this.usuarioLogado.id)[0].id;
      mensagem.texto = text;

      this.mensagemService.inserir(mensagem).then(m => console.log('Mensagem enviada'));
    }
  }

  public isMessageMy(mensagem: Mensagem): boolean {
    return this.conexoes.filter(c => c.id === mensagem.id_conexao)[0].id_usuario === this.usuarioLogado.id;
  }

  public isDisabled(): boolean {
    const usuariosLenght = this.novoChat.usuarios.length;
    const chatUnico = usuariosLenght === 1 && !this.novoChat.nome;
    return !this.criarChatButton || ( usuariosLenght === 0 || (chatUnico || (usuariosLenght > 2 && (!this.novoChat.nome || (this.novoChat.nome && this.novoChat.nome.trim().length < 3))) ));
  }

  public mensagensData(data: string): Array<Mensagem> {
    return this.mensagensActive.filter(m => m.datahora.split("T")[0].split("-").reverse().join("/") === data.split(" ")[0]);
  }

  public getFirstUsernameLetter(): string {
    if (this.novoChat.usuarios.length === 1)
      return this.novoChat.usuarios[0].username[0];
    else if (this.novoChat.usuarios.length > 0 && this.novoChat.usuarios.length <= 2)
      return this.novoChat.usuarios.filter(u => u.id !== this.usuarioLogado.id)[0].username[0];
    else
      return "?"
  }

  public addChat(): void {
    this.showAddChat = true;
  }

  public eraseAddChat(event: PointerEvent, addChatBox: HTMLDivElement): void {
    if(event.target === addChatBox)
      this.showAddChat = false;
  }

  public async criarChat(): Promise<void> {
    this.criarChatButton = false;

    const usuarios = this.novoChat.usuarios;
    const usuariosNotLogado = usuarios.filter(u => u.id !== this.usuarioLogado.id);

    if(!this.novoChat.logo)
      this.novoChat.logo = '';

    if(!this.novoChat.nome)
      this.novoChat.nome = `${this.usuarioLogado.username}-${usuariosNotLogado[0].username}`;

    const chat = new Chat();
    chat.logo = this.novoChat.logo;
    chat.nome = this.novoChat.nome;

    const novoChat = await this.chatService.inserir(chat);
    this.novoChat.usuarios.forEach(async (usuario,i) => {
      const conexao = new Conexao();
      conexao.id_chat = novoChat.id;
      conexao.id_usuario = usuario.id;
      await this.conexaoService.inserir(conexao);
      if(i === this.novoChat.usuarios.length-1) {
        window.alert("Novo Chat Criado");
        this.showAddChat = false;
        this.criarChatButton = true;

        this.novoChat.logo = undefined;
        this.novoChat.nome = undefined;
        this.novoChat.usuarios = new Array();
        this.novoChat.usuarios.push( this.usuarioLogado );
        this.filtroNovoChat = this.usuarios.filter(u => u.id !== this.usuarioLogado.id);
      }
    });
  }

  public getHora(mensagem: Mensagem): string {
    return mensagem.datahora.split("T")[1].replace(/\...../g,"");
  }

  public onKey(event: KeyboardEvent, input: HTMLInputElement): void {
    if(event.key === "Enter")
      this.sendMessage(input);
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const user = this.usuarios.filter(u => u.username.toLowerCase() === value.toLowerCase())[0];

    if (user) {
      this.novoChat.usuarios.push(user);
      this.filtroNovoChat = this.filtroNovoChat.filter(u => u.id !== user.id);
      this.novoChat.nome = undefined;
    }

    event.chipInput!.clear();
    this.userCtrl.setValue(null);
  }

  public remove(user: Usuario): void {
    const index = this.novoChat.usuarios.indexOf(user);

    if (index >= 0) {
      this.filtroNovoChat.push( this.novoChat.usuarios[index] );
      this.novoChat.usuarios.splice(index, 1);
      if(this.novoChat.nome)
        this.novoChat.nome = undefined;
    }

  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const user = this.usuarios.filter(u => u.username.toLowerCase() === event.option.viewValue.toLowerCase())[0];

    this.novoChat.usuarios.push(user);
    this.filtroNovoChat = this.filtroNovoChat.filter(u => u.id !== user.id);
    this.novoChat.nome = undefined;

    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  public logout(): void {
    localStorage.clear();
    this.roedor.navigate([""]);
  }
}
