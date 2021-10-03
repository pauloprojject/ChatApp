package com.chatapp.api.repositories;

import com.chatapp.api.model.Conexao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConexaoRepository extends JpaRepository<Conexao, Long> {

  @Query("SELECT c FROM Conexao c")
  List<Conexao> getAll();

  @Query("SELECT c FROM Conexao c where c.id_chat in (SELECT con.id_chat FROM Conexao con WHERE con.id_usuario = :id_usuario)")
  List<Conexao> getMinhasConexoesChat(@Param("id_usuario") int id_usuario);
}
