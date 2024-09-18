import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serie, SeriePage } from '../interfaces/serie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(
    private http:HttpClient
  ) {}

  paginate(){
    return this.http.get<SeriePage>('http://localhost:8080/api/series');
  }


  create(serie: string){
    return this.http.post<string>('http://localhost:8080/api/series/buscar',serie );
  }

}
