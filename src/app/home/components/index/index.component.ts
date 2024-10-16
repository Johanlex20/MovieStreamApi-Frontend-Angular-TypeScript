import { Component, OnInit, Renderer2 } from '@angular/core';
import { Serie } from 'src/app/interfaces/serie.interfaces';
import { SerieService } from '../../serie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit{

  series?:Serie[];

  imagenBgUrl = 'https://images.unsplash.com/photo-1658999167159-3f6659cace61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  imagenBgGeneroUrl = 'https://images.unsplash.com/photo-1656310737995-758afc2c7ea7?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  

  isModalOpen = false;
  selectedVideoKey: string | null = null;

  titulo: string = '';
  errors: string[] = [];


  constructor(
    private serieService:SerieService,
    public sanitizer:DomSanitizer,
    private render: Renderer2,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cargarSeries();
  }

  cargarSeries(){
    this.serieService.listSerie()
    .subscribe(series =>{
      this.series = this.obtenerAleatorio(series).slice(0,4);
    });
  }

   // Función para mezclar los elementos de forma aleatoria (Fisher-Yates Shuffle)
   obtenerAleatorio(array: Serie[]): Serie[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]]; // Intercambia elementos
    }
    return copia;
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

   buscarSerie() {
    this.serieService.buscarSerie(this.titulo).subscribe(
      (result) => {
        this.series = result; // Guardar los resultados de la búsqueda
          alert('serie encontrada');
          this.router.navigate(['/admin/series']);
          console.log(this.series);
      },
      (error:any)=>{
        if (error.error.status === 400) {
          this.errors.push(error.error.detail);
        } else if (error.error.status === 422) {
          this.errors.push(...error.error.errors);
        } else if (error.error.status === 404) {
          this.errors.push(error.error.title);
        } else if (error.error.status === 500 || 502) {
          this.errors.push(error.error.title);
        }
      }
    );
  }


}
