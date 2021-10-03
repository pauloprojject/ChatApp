package com.chatapp.api.controller;

import com.chatapp.api.model.Usuario;
import com.chatapp.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping("/usuarios")
  public List<Usuario> getAll() {
    return this.usuarioService.getAll();
  }

  @PostMapping("/usuarios")
  public Usuario inserirUsuario(@RequestBody Usuario usuario){
    return this.usuarioService.inserirUsuario(usuario);
  }

  @PutMapping("/usuarios")
  public Usuario atualizarUsuario(@RequestBody Usuario usuario){
    return this.usuarioService.atualizarUsuario(usuario);
  }

  @GetMapping("/usuarios/login/{username}&&{pass}")
  public Usuario getLogin(@PathVariable("username") String username, @PathVariable("pass") String password) {
    return this.usuarioService.getLogin(username, password);
  }
}

