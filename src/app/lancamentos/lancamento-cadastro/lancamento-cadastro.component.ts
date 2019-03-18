import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../lancamento';
import { map } from 'rxjs/operators';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];
  titulo = 'Novo lançamento';
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriasService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Lançamento');
    const codigoLancamento = this.route.snapshot.params.codigo;
    if (codigoLancamento) {
      this.titulo = 'Editando lançamento';
      this.title.setTitle('Editando Lançamento');
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregaPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.pesquisaCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriasService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return {label: c.nome, value: c.codigo};
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregaPessoas() {
    return this.pessoasService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.content.map(c => {
        return {label: c.nome, value: c.codigo};
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Lançamento salvo com sucesso!'});
        this.router.navigate(['/lancamentos/', lancamento.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Lançamento salvo com sucesso!'});
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.lancamento = new Lancamento();
    form.reset(this.lancamento);
    this.router.navigate(['/lancamentos/cadastro']);
  }
}
