import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
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
  constructor(private lancamentoService: LancamentoService) { }

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
}
