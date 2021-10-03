import { Mensagem } from "./mensagem";
import { Usuario } from "./usuario";

export class ChatsView {
  id: number;
  nome_chat: string;
  logo: string;
  userLetter: string;
  usuarios: Array<Usuario>;
  mensagens: Array<Mensagem>;
  usuariosText: string;
  active: boolean;
}
