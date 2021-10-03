package com.chatapp.api.repositories;

import com.chatapp.api.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {

  @Query("SELECT m FROM Mensagem m")
  public List<Mensagem> getAll();

  @Query(value="SELECT m.* FROM mensagem m INNER JOIN conexao con ON m.id_conexao = con.id WHERE con.id_chat in (SELECT c.id_chat FROM Conexao c WHERE c.id_usuario = :id_usuario) ORDER BY m.datahora", nativeQuery = true)
  List<Mensagem> mensagensUsuarioChat(@Param("id_usuario") int id_usuario);
}
