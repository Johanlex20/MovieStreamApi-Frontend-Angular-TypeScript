import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeriePage } from '../interfaces/serie.interfaces';

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
}
