package com.chatapp.api.controller;

import com.chatapp.api.model.Chat;
import com.chatapp.api.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ChatController {

  @Autowired
  private ChatService chatService;

  @GetMapping("/chats")
  public List<Chat> getAll() {
    return this.chatService.getAll();
  }

  @PostMapping("/chats")
  public Chat inserirChat(@RequestBody Chat conexao) {
    return this.chatService.inserirChat(conexao);
  }

  @PutMapping("/chats")
  public Chat atualizarChat(@RequestBody Chat conexao) {
    return this.chatService.atualizarChat(conexao);
  }

  @GetMapping("/chats/usuario/{id}")
  public List<Chat> getMeusChats(@PathVariable("id") int id_usuario) {
    return this.chatService.getMeusChats(id_usuario);
  }
}

