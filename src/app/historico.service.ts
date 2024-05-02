import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historico } from './historico';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HistoricoService {

  url = "http://localhost:8080/historico"
  constructor(private http: HttpClient) { }
  
  getHistorico(): Observable<Historico[]>{
    return this.http.get<Historico[]>(this.url)
  }

  save(historico : Historico): Observable<Historico>{
    return this.http.post<Historico>(this.url, historico)
  }

}
