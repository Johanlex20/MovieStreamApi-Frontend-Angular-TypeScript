import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serie, SeriePage } from '../../../interfaces/serie.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(
    private http:HttpClient
  ) {}

  paginate(){
    return this.http.get<SeriePage>(`${environment.apiBase}/series`);
  }

  create(serie: Serie){
    return this.http.post<Serie>(`${environment.apiBase}/series/buscar`,serie );
  }

  get(id:number){
    return this.http.get<Serie>(`${environment.apiBase}/series/${id}`);
  }

  update(id:number, serie:Serie){
    return this.http.put<Serie>(`${environment.apiBase}/series/${id}`, serie);
  }

  delete(serie:Serie){
    return this.http.delete(`${environment.apiBase}/series/${serie.id}`);
  }
}
