import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoasService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoasService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Lançamento salvo com sucesso!'});
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
