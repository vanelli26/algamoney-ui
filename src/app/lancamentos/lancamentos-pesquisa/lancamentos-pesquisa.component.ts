import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [ ];
  loading: boolean;
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.loading = true;
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.loading = true;
    this.lancamentoService.pesquisar(this.filtro)
      .then((data) => {
        this.totalRegistros = data.totalElements;
        this.lancamentos = data.content;
        this.loading = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {

    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmar exclusão',
      icon: 'pi pi-trash',
      accept: () => {
        this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          this.pesquisar(this.filtro.pagina);
          this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Lançamento excluido com sucesso!'});
        })
        .catch(erro => this.errorHandler.handle(erro));
      }
    });
  }
}
