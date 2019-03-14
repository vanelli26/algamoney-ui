import { Pessoa } from '../pessoas/pessoa';
import { Categoria } from '../categorias/categoria';

export class Lancamento {
  codigo: number;
  tipo: 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
