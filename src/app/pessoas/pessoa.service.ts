import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from './pessoa';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasURL = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('page', filtro.pagina.toString());
    httpParams = httpParams.append('size', filtro.itensPorPagina.toString());
    if (filtro.nome) {
      httpParams = httpParams.append('nome', filtro.nome);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      }),
      params: httpParams
    };

    return this.http.get(this.pessoasURL, httpOptions).toPromise();
  }

  excluir(codigo: number): Promise<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.delete(this.pessoasURL + '/' + codigo, httpOptions)
      .toPromise()
      .then(() => null);
  }

  alternarStatus(codigo: number, ativo: boolean): Promise<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.put(this.pessoasURL + '/' + codigo + '/ativo', ativo, httpOptions)
    .toPromise()
    .then(() => null);
  }

  listarTodas(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.get(this.pessoasURL, httpOptions).toPromise();
  }

  adicionar(lancamento: Pessoa): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };

    return this.http.post(this.pessoasURL, JSON.stringify(lancamento), httpOptions).toPromise();
  }
}
