package com.chatapp.api.service;

import com.chatapp.api.model.Conexao;
import com.chatapp.api.repositories.ConexaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConexaoService {

  @Autowired
  private ConexaoRepository conexaoRepository;

  public List<Conexao> getAll() {
    return this.conexaoRepository.getAll();
  }

  public Conexao inserirMensagem(Conexao conexao) {
    return this.conexaoRepository.save(conexao);
  }

  public Conexao atualizarMensagem(Conexao conexao) {
    return this.conexaoRepository.save(conexao);
  }

  public List<Conexao> getMinhasConexoesChat(int id_usuario) {
    return this.conexaoRepository.getMinhasConexoesChat(id_usuario);
  }
}
