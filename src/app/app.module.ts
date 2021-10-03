import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginModule } from './view/login/login.module';
import { CadastroModule } from './view/cadastro/cadastro.module';
import { TelaMensagemModule } from './view/tela-mensagem/tela-mensagem.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    CadastroModule,
    TelaMensagemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
