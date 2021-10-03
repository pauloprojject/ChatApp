package com.chatapp.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
public class Mensagem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int id_conexao;
  private String texto;
  private String datahora;
  private boolean edit;
}
