
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tag: string;
  rua: string;
  numero: string;
  bairro: string;
  usuario: Usuario | null;

}