import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let httpParams = new HttpParams();

    httpParams = httpParams.append('page', filtro.pagina.toString());
    httpParams = httpParams.append('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      httpParams = httpParams.append('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      httpParams = httpParams.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      httpParams = httpParams.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      }),
      params: httpParams
    };

    return this.http.get(this.lancamentosURL + '?resumo', httpOptions).toPromise();
  }
}
