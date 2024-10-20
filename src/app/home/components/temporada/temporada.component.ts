import { Component, OnInit } from '@angular/core';
import { Serie, Temporada } from 'src/app/interfaces/serie.interfaces';
import { HomeService } from '../../home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: []
})
export class TemporadaComponent implements OnInit {
  serie?: Serie;
  temporadas: Temporada[] = [];

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const serieId = this.route.snapshot.paramMap.get('id');

    if (serieId) {
      this.homeService.buscarSerieById(parseInt(serieId))
        .subscribe(serie => {
          this.serie = serie;

          this.homeService.buscarTemporadasOfSerie(serie.titulo)
            .subscribe((temporadas: Temporada[]) => {
              this.temporadas = temporadas.map(temporada => ({
                ...temporada,
                episodios: [] // Inicializa episodios como un array vacío
              }));

              this.temporadas.forEach(temporada => {
                this.homeService.buscarTemporadaById(serie.titulo, temporada.numeroTemporada)
                  .subscribe((episodiosTemporada: Temporada) => {
                    temporada.episodios = episodiosTemporada.episodios;
                    //console.log(temporada);
                  });
              });

            });
        });
    }
  }


  porcentajeTemporada(porcentaje: number): number {
    return Math.floor(porcentaje * 10);
  }


}
