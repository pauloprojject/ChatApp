import { Usuario } from "./usuario";

export class NovoChat {
  nome: string;
  logo: string;
  usuarios: Array<Usuario> = new Array();
}
