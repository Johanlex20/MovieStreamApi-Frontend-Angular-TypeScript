import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episodio, Serie, Temporada } from '../interfaces/serie.interfaces';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

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

  buscarSerieById(id:number){
    return this.http.get<Serie>(`http://localhost:8080/api/series/${id}`);
  }

  buscarTemporadasOfSerie(titulo:string){
    return this.http.get<Temporada[]>(`http://localhost:8080/api/temporada/temporadas/${titulo}`);
  }

  buscarTemporadaByIdAndTitle(titulo:string, numeroTemporada:number){
    const params = new HttpParams().set('titulo', titulo).set('numeroTemporada', numeroTemporada);
    return this.http.get<Temporada>(`http://localhost:8080/api/temporada/temporadaId`, {params} );
    }
   
    buscarTemporadaById(id:number){
      return this.http.get<Temporada>(`http://localhost:8080/api/temporada/${id}`);
    }

  buscarEpisodioById(id:number){
    return this.http.get<Episodio>(`http://localhost:8080/api/episodio/${id}`);
  }

}
