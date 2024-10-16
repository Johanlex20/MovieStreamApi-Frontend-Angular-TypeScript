import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/interfaces/serie.interfaces';
import { SerieService } from '../../serie.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: []
})
export class CardComponent implements OnInit{

  series?:Serie[];
  
  constructor(
    private serieService:SerieService){
  }

  ngOnInit(): void {
    this.cargarSeries();
    console.log(this.series);
  }

  cargarSeries() {
     this.serieService.listSerie()
     .subscribe(series =>{
      this.series = series;
      console.log(this.series);
     });
     
  }

  

}
