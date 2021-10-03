package com.chatapp.api.controller;

import com.chatapp.api.model.Conexao;
import com.chatapp.api.service.ConexaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ConexaoController {

  @Autowired
  private ConexaoService conexaoService;

  @GetMapping("/conexoes")
  public List<Conexao> getAll() {
    return this.conexaoService.getAll();
  }

  @PostMapping("/conexoes")
  public Conexao inserirMensagem(@RequestBody Conexao conexao) {
    return this.conexaoService.inserirMensagem(conexao);
  }

  @PutMapping("/conexoes")
  public Conexao atualizarMensagem(@RequestBody Conexao conexao) {
    return this.conexaoService.atualizarMensagem(conexao);
  }

  @GetMapping("/conexoes/usuario/{id}")
  public List<Conexao> getMinhasConexoesChat(@PathVariable("id") int id_usuario) {
    return this.conexaoService.getMinhasConexoesChat(id_usuario);
  }
}

