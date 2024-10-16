import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serie } from '../interfaces/serie.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(
    private http:HttpClient
  ) {}

  listSerie(){
    return this.http.get<Serie[]>('http://localhost:8080/api/series/list');
  }

  buscarSerie(titulo: string){
    const params = new HttpParams().set('titulo', titulo); // Crear los parámetros de consulta
    return this.http.get<Serie[]>(`http://localhost:8080/api/home/series/titulo`, { params }); // Usar los parámetros
  }

}
