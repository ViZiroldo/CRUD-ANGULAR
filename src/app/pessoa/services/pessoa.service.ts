import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pessoa } from 'src/app/shared';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<Pessoa[]> {
    const apiUrl = `${environment.apiUrl}/api/Pessoa/ObterTodos`;
    return this.httpClient.get<Pessoa[]>(apiUrl, this.httpOptions);
  }

  getById(id: string): Observable<Pessoa> {
    const apiUrl = `${environment.apiUrl}/api/Pessoa/ObterPorId/`;
    return this.httpClient.get<Pessoa>(apiUrl + id, this.httpOptions);
  }

  insert(pessoa: Pessoa): Observable<Pessoa> {
    const apiUrl = `${environment.apiUrl}/api/Pessoa/Adicionar`;
    return this.httpClient.post<Pessoa>(apiUrl, JSON.stringify(pessoa), this.httpOptions);
  }

  delete(id: string): Observable<Pessoa> {
    const apiUrl = `${environment.apiUrl}/api/Pessoa/Excluir/`;
    return this.httpClient.delete<Pessoa>(apiUrl + id, this.httpOptions);
  }

  update(id: string, pessoa: Pessoa): Observable<Pessoa> {
    const apiUrl = `${environment.apiUrl}/api/Pessoa/Atualizar/`;
    return this.httpClient.put<Pessoa>(apiUrl + id, JSON.stringify(pessoa), this.httpOptions);
  }

}
