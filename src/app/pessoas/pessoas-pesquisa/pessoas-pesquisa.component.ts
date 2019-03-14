import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

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

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.loading = true;
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.loading = true;
    this.pessoaService.pesquisar(this.filtro)
      .then((data) => {
        console.log(data);
        this.totalRegistros = data.totalElements;
        this.pessoas = data.content;
        this.loading = false;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
