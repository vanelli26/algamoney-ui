import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [ ];
  loading: boolean;
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa Pessoa');
    this.loading = true;
  }

  pesquisar(pagina = 0) {
    this.grid.first = 0;
    this.filtro.pagina = pagina;
    this.loading = true;
    this.pessoaService.pesquisar(this.filtro)
      .then((data) => {
        this.totalRegistros = data.totalElements;
        this.pessoas = data.content;
        this.loading = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmar exclusão',
      icon: 'pi pi-trash',
      accept: () => {
        this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          this.pesquisar(this.filtro.pagina);
          this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Pessoa excluida com sucesso!'});
        })
        .catch(erro => this.errorHandler.handle(erro));
      }
    });
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.alternarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Pessoa ' + acao + ' com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
