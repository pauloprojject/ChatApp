import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../../shared/model/cadastro';
import { Usuario } from 'src/app/shared/model/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastro: Cadastro;
  disabledButton: boolean;

  constructor(private usuarioService: UsuarioService, private roedor: Router) {
    this.cadastro = new Cadastro();
    this.disabledButton = false;
  }

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if(username && password) {
      this.usuarioService.login(username, password).then(usuario => {
        if(usuario)
          this.roedor.navigate(["chat"]);
        else
          localStorage.clear();
      });
    }
  }

  public isDisabled(): boolean {
    const values = Object.values(this.cadastro).filter(i => i.trim() !== '');
    const confirmPass = this.cadastro.password === this.cadastro.repassword;
    if( values.length === 4 && confirmPass) {
      const lengthValid: boolean = this.cadastro.user.trim().length < 4 || this.cadastro.password.trim().length < 8;
      return lengthValid || this.disabledButton;
    } else
      return true;
  }

  public cadastrar(): void {
    this.disabledButton = true;

    const usuario = new Usuario();
    usuario.name = this.cadastro.name;
    usuario.username = this.cadastro.user;
    usuario.password = this.cadastro.password;
    usuario.datahora_cadastro = new Date().toDateString();
    usuario.datahora_ultimo_login= null;
    usuario.logo = "";
    this.usuarioService.inserir(usuario).then(res => window.alert("Usuario cadastro com sucesso."));
  }
}
