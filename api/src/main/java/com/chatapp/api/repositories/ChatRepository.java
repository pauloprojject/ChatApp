package com.chatapp.api.repositories;

import com.chatapp.api.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

  @Query("SELECT c FROM Chat c")
  public List<Chat> getAll();

  @Query(value="SELECT c.* FROM Chat c INNER JOIN Conexao con ON c.id = con.id_chat WHERE con.id_usuario = :id_usuario", nativeQuery = true)
  List<Chat> getMeusChats(@Param("id_usuario") int id_usuario);
}
