package com.chatapp.api.repositories;

import com.chatapp.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  @Query("SELECT u FROM Usuario u")
  public List<Usuario> getAll();

  @Query("SELECT u FROM Usuario u where u.username= :username and u.password= :password")
  public List<Usuario> getLogin(@Param("username") String user, @Param("password") String password);
}
