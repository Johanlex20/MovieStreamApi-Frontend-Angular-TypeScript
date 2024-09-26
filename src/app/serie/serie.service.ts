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

  get(id:number){
    return this.http.get<Serie>(`http://localhost:8080/api/series/${id}`);
  }

  delete(serie:Serie){
    return this.http.delete(`http://localhost:8080/api/series/${serie.id}`);
  }

}
