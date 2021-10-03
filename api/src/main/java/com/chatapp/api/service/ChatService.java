package com.chatapp.api.service;

import com.chatapp.api.model.Chat;
import com.chatapp.api.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

  @Autowired
  private ChatRepository chatRepository;

  public List<Chat> getAll() {
    return this.chatRepository.getAll();
  }

  public Chat inserirChat(Chat conexao) {
    return this.chatRepository.save(conexao);
  }

  public Chat atualizarChat(Chat conexao) {
    return this.chatRepository.save(conexao);
  }

  public List<Chat> getMeusChats(int id_usuario) {
    return this.chatRepository.getMeusChats(id_usuario);
  }
}
