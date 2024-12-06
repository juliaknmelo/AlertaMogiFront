
import Usuario from './Usuario';

export default interface PostagemCreate {
  titulo: string;
  texto: string;
  tag: number;
  rua: string;
  numero: string;
  bairro: string;
  usuario: Usuario | null;

}