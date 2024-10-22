import { Component, OnInit, Renderer2 } from '@angular/core';
import { Genero, Serie } from 'src/app/interfaces/serie.interfaces';
import { HomeService } from '../../home.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit{

  series:Serie[] =[];
  seriesAleatorias?: Serie[];
  generos = [Genero.Drama, Genero.Accion, Genero.Comedia, Genero.Crime, Genero.Animacion]; // Agrega más géneros aquí si quieres
  seriesPorGenero: { [key: string]: Serie[] } = {}; // Almacena las series por género

  imagenBgUrl = 'https://images.unsplash.com/photo-1658999167159-3f6659cace61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  imagenBgGeneroUrl = 'https://images.unsplash.com/photo-1656310737995-758afc2c7ea7?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  

  isModalOpen = false;
  selectedVideoKey: string | null = null;

  titulo: string = '';
  errors: string[] = [];


  constructor(
    private homeService:HomeService,
    public sanitizer:DomSanitizer,
    private render: Renderer2,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cargarSeries();
    this.generos.forEach(genero => this.cargarSeriesPorGenero(genero)); // Cargar series para cada género
  }

  cargarSeries(){
    this.homeService.listSerie()
    .subscribe(series =>{
      this.series = series; // Asigna todas las series directamente
      this.seriesAleatorias = this.obtenerAleatorio(series).slice(0,4); // Obtener 4 series aleatorias
    });
  }

  cargarSeriesPorGenero(genero: Genero) {
    this.homeService.buscarSeriesByGenero(genero).subscribe(series => {
      this.seriesPorGenero[genero] = this.obtenerAleatorio(series).slice(0, 7); // Máximo 5 series aleatorias
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
    this.homeService.buscarSerie(this.titulo).subscribe(
      (result) => {
        const serie = result[0]; // tomar la primera concidencia para obtner el id y poder enrutar a la pestalla de perfilSerie
        this.series = result; // Guardar los resultados de la búsqueda
          alert('serie encontrada');
          this.router.navigate(['/home/serie/' + serie.id ]);
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
