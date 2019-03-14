import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

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
    private messageService: MessageService
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
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar(this.filtro.pagina);
        this.messageService.add({severity: 'success', summary: 'AlgaMoney', detail: 'Lançamento excluido com sucesso!'});
      });
  }
}
