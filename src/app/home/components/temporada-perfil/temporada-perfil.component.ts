import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { Episodio, Serie, Temporada } from 'src/app/interfaces/serie.interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-temporada-perfil',
  templateUrl: './temporada-perfil.component.html',
  styleUrls: []
})
export class TemporadaPerfilComponent implements OnInit{
  
  temporada?:Temporada;
  serie?:Serie;

  constructor(
    private homeService:HomeService,
    private route:ActivatedRoute,
  ){}

  episodio?:Episodio[];

  ngOnInit(): void {

    const temporadaId = this.route.snapshot.paramMap.get('id');

    if(temporadaId){
      this.homeService.buscarTemporadaById(parseInt(temporadaId))
        .subscribe(temporada => {
          this.temporada = temporada;
          //console.log(temporada);
        
          this.episodio = temporada.episodios;
          //console.log(this.episodio)
          if(temporada.nombreTemporada){
            this.buscarSerie(temporada.tituloSerie);
          }

        });  
    }
  }


  buscarSerie(nombreSerie:string){
    this.homeService.buscarSerie(nombreSerie).subscribe(
      (serie:Serie[])=>{
        this.serie = serie[0];
      }
    )
  }

  porcentajeEpisodio(porcentaje: number): number {
    return Math.floor(porcentaje * 10);
  }

   
  
}

