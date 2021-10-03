package com.chatapp.api.controller;

import com.chatapp.api.model.Mensagem;
import com.chatapp.api.service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class MensagemController {

  @Autowired
  private MensagemService mensagemService;

  @GetMapping("/mensagens")
  public List<Mensagem> getAll() {
    return this.mensagemService.getAll();
  }

  @PostMapping("/mensagens")
  public Mensagem inserirMensagem(@RequestBody Mensagem mensagem){
    return this.mensagemService.inserirMensagem(mensagem);
  }

  @PutMapping("/mensagens")
  public Mensagem atualizarMensagem(@RequestBody Mensagem mensagem){
    return this.mensagemService.atualizarMensagem(mensagem);
  }

  @GetMapping("/mensagens/usuario/{id}")
  public List<Mensagem> mensagensUsuarioChat(@PathVariable("id") int id_usuario) {
    return this.mensagemService.mensagensUsuarioChat(id_usuario);
  }

}
