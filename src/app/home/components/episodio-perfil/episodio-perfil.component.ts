import { Component, OnInit, Renderer2 } from '@angular/core';
import { HomeService } from '../../home.service';
import { ActivatedRoute } from '@angular/router';
import { Episodio, Serie } from 'src/app/interfaces/serie.interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment'; 


@Component({
  selector: 'app-episodio-perfil',
  templateUrl: './episodio-perfil.component.html',
  styleUrls: []
})
export class EpisodioPerfilComponent implements OnInit {

  episodio?:Episodio;
  serie?: Serie;
  isModalOpen = false;
  selectedVideoKey: string | null = null;
  
  imagenBgUrl = 'https://images.unsplash.com/photo-1658999167159-3f6659cace61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  imagenBgGeneroUrl = 'https://images.unsplash.com/photo-1656310737995-758afc2c7ea7?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  

  environment = environment;

  constructor(
    private homeService:HomeService,
    private route:ActivatedRoute,
    private render: Renderer2,
    public sanitizer:DomSanitizer,
  ){}

  ngOnInit(): void {
   
    const episodioId = this.route.snapshot.paramMap.get('id');
    
    if(episodioId){
      this.homeService.buscarEpisodioById(parseInt(episodioId))
      .subscribe(episodio =>{
        this.episodio = episodio;
        console.log(episodio);


        if(episodio.tituloSerie){
          this.buscarSerie(episodio.tituloSerie);
        }

      });
    }
  }

  buscarSerie(tituloSerie:string){
    this.homeService.buscarSerie(tituloSerie).subscribe(
      (serie:Serie[])=>{
        this.serie = serie[0];
      }
    );
  }


  openModal(videoKey:string){
    this.selectedVideoKey = videoKey;
    this.isModalOpen = true;

    //Desactivar Scroll del body
    this.render.addClass(document.body, 'overflow-hidden');
  }

  closeModal(){
    this.isModalOpen = false;
    this.selectedVideoKey = null;

    //Activar Scroll del body
    this.render.removeClass(document.body, 'overflow-hidden');
  }

  porcentajeEpisodio(porcentaje: number): number {
    return Math.floor(porcentaje * 10);
  }

}
