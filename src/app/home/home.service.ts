import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episodio, Genero, Serie, Temporada } from '../interfaces/serie.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http:HttpClient
  ) {}

  listSerie(){
    return this.http.get<Serie[]>(`${environment.apiBase}/series/list`);
  }

  buscarSerie(titulo: string){
    const params = new HttpParams().set('titulo', titulo); // Crear los parámetros de consulta
    return this.http.get<Serie[]>(`${environment.apiBase}/home/series/titulo`, { params }); // Usar los parámetros
  }

  buscarSerieById(id:number){
    return this.http.get<Serie>(`${environment.apiBase}/series/${id}`);
  }

  buscarTemporadasOfSerie(titulo:string){
    return this.http.get<Temporada[]>(`${environment.apiBase}/temporada/temporadas/${titulo}`);
  }

  buscarTemporadaByIdAndTitle(titulo:string, numeroTemporada:number){
    const params = new HttpParams().set('titulo', titulo).set('numeroTemporada', numeroTemporada);
    return this.http.get<Temporada>(`${environment.apiBase}/temporada/temporadaId`, {params} );
    }
   
    buscarTemporadaById(id:number){
      return this.http.get<Temporada>(`${environment.apiBase}/temporada/${id}`);
    }

  buscarEpisodioById(id:number){
    return this.http.get<Episodio>(`${environment.apiBase}/episodio/${id}`);
  }

  buscarSeriesByGenero(genero:Genero){
    const params = new HttpParams().set('genero',genero);
    return this.http.get<Serie[]>(`${environment.apiBase}/series/genero`, {params});
  }

}
