package com.chatapp.api.service;

import com.chatapp.api.model.Mensagem;
import com.chatapp.api.repositories.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {

  @Autowired
  private MensagemRepository mensagemRepository;

  public List<Mensagem> getAll() {
    return this.mensagemRepository.getAll();
  }

  public Mensagem inserirMensagem(Mensagem mensagem) {
    return this.mensagemRepository.save(mensagem);
  }

  public Mensagem atualizarMensagem(Mensagem mensagem) {
    return this.mensagemRepository.save(mensagem);
  }

  public List<Mensagem> mensagensUsuarioChat(int id_usuario) {
    return this.mensagemRepository.mensagensUsuarioChat(id_usuario);
  }
}
