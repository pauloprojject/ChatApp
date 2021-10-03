package com.chatapp.api.service;

import com.chatapp.api.model.Usuario;
import com.chatapp.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public List<Usuario> getAll() {
    return this.usuarioRepository.getAll();
  }

  public Usuario inserirUsuario(Usuario usuario) {
    return usuarioRepository.save(usuario);
  }

  public Usuario atualizarUsuario(Usuario usuario) {
    return usuarioRepository.save(usuario);
  }

  public Usuario getLogin(String username, String password) {
    List<Usuario> usuarios = this.usuarioRepository.getLogin(username, password);

    if(usuarios.size() > 0)
      return usuarios.get(0);
    else
      return null;
  }
}
