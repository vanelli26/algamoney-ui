import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from '../pessoa';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  titulo = 'Nova pessoa';
  constructor(
    private pessoasService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Pessoa');
    const codigoPessoa = this.route.snapshot.params.codigo;
    if (codigoPessoa) {
      this.titulo = 'Editando Pessoa';
      this.title.setTitle('Editando Pessoa');
      this.carregarCadastro(codigoPessoa);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarCadastro(codigo: number) {
    this.pessoasService.pesquisaCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarPessoa(form: FormControl) {
    this.pessoasService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Pessoa salva com sucesso!'});
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoasService.atualizar(this.pessoa)
    .then(pessoa => {
      this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Pessoa salva com sucesso!'});
      this.pessoa = pessoa;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    this.pessoa = new Pessoa();
    form.reset(this.pessoa);
    this.router.navigate(['/pessoas/cadastro']);
  }
}
