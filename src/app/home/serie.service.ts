import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serie } from '../interfaces/serie.interfaces';


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

}
