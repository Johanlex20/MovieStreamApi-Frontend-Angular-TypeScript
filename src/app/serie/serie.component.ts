import { Component, OnInit } from '@angular/core';
import { Serie, SeriePage } from '../interfaces/serie.interfaces';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: []
})
export class SerieComponent implements OnInit {

  series?:Serie[];

  constructor(
    private serieService:SerieService
  ){}

  ngOnInit(): void {
    this.cargarSeries();
  }

  cargarSeries(){
    this.serieService.paginate()
    .subscribe(seriePage => {
      this.series = seriePage.content;
    });
  }

  deleteSerie(serie:Serie){
    if(confirm('Seguro de eliminar la Serie')){
      this.serieService.delete(serie)
      .subscribe(()=>{
        this.cargarSeries();
      })
    }
  }


}
