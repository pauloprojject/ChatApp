package com.chatapp.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter @Setter
@Entity
public class Conexao {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int id_chat;
  private int id_usuario;
}
