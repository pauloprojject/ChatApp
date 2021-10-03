import { Component, OnInit } from '@angular/core';
import { Login } from '../../shared/model/login';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  disabledButton: boolean;

  constructor(private roedor: Router, private usuarioService: UsuarioService) {
    this.login = new Login();
    this.disabledButton = false;
  }

  ngOnInit(): void {
    const ls = localStorage;
    const username = ls.getItem("username");
    const password = ls.getItem("password");
    if(username && password)
      this.usuarioService.login(username, password).then(usuario => usuario ? this.Router("chat") : ls.clear());
  }

  public isDisabled(): boolean {
    if(this.login.user && this.login.password) {
      const lengthValid = this.login.user.trim().length < 4 || this.login.password.trim().length < 8;
      return lengthValid || this.disabledButton;
    } else
      return true;
  }

  public Router(path: string) {
    this.roedor.navigate([path]);
  }

  public authenticate(): void {
    this.disabledButton = true;
    this.usuarioService.login(this.login.user, this.login.password).then(usuario => {
      if(usuario) {
        localStorage.setItem("username", usuario.username);
        localStorage.setItem("password", usuario.password);
        this.Router("chat");
      } else {
        window.alert("usuario e senha não cadastrados.")
        this.disabledButton = false;
      }
    });
  }

}
