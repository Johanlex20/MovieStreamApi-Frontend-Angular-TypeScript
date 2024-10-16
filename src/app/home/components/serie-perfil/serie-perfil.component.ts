import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/interfaces/serie.interfaces';
import { HomeService } from '../../home.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-serie-perfil',
  templateUrl: './serie-perfil.component.html',
  styleUrls: []
})
export class SeriePerfilComponent implements OnInit{

  serie?:Serie;

  constructor(
    private homeService:HomeService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    
    const serieId = this.route.snapshot.paramMap.get('id');

    if(serieId){
      this.homeService.buscarSerieById(parseInt(serieId))
        .subscribe(serie =>{
          console.log('serie', serie);
          this.serie = serie;
        });
    }


  }
  

}
