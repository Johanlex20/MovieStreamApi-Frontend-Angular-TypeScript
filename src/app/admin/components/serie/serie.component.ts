import { Component, OnInit } from '@angular/core';
import { Serie, SeriePage } from '../../../interfaces/serie.interfaces';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: []
})
export class SerieComponent implements OnInit {

  series?:Serie[];

  maxPopularidad: number = 1000; // Valor máximo de popularidad para calcular el porcentaje


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


      // Asegurarnos de que las barras de progreso se animen después de renderizar el DOM
      setTimeout(() => {
        this.series?.forEach(serie => {
          this.animateProgress(serie.id, serie.popularidad);
        });
      }, 0);



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



  animateProgress(serieId: number, popularidad: number) {
    const progressCircleElement = document.getElementById(`progress-${serieId}`);
    const percentageText = document.getElementById(`percentage-${serieId}`);
  
    // Verifica si los elementos existen
    if (!progressCircleElement || !percentageText) {
      console.warn(`No se encontró el círculo de progreso o el texto de porcentaje para serie ID: ${serieId}`);
      return; 
    }
  
    // Asegúrate de que el elemento es un SVGCircleElement
    const progressCircle = progressCircleElement as unknown as SVGCircleElement;
  
    // Escala la popularidad a un porcentaje basado en el valor máximo
    const porcentaje = Math.min((popularidad / this.maxPopularidad) * 100, 100); // Limitar a 100%
  
    const radio = 35;
    const circunferencia = 2 * Math.PI * radio;
  
    // Establece el stroke-dasharray para el círculo
    progressCircle.style.strokeDasharray = `${circunferencia}`;
    
    // Calcula el nuevo stroke-dashoffset según el porcentaje
    const offset = circunferencia - (porcentaje / 100) * circunferencia;
  
    // Animación para llenar la barra
    let progresoActual = 0;
    const intervalo = setInterval(() => {
      progresoActual += 1;
  
      // Actualiza el porcentaje de texto
      percentageText!.textContent = `${progresoActual}%`;
  
      // Calcula el nuevo offset según el progreso actual
      const progresoOffset = circunferencia - (progresoActual / 100) * circunferencia;
  
      // Actualiza el stroke-dashoffset para el círculo de progreso
      progressCircle.style.strokeDashoffset = `${progresoOffset}`;
  
      if (progresoActual >= porcentaje) {
        clearInterval(intervalo);
      }
    }, 20); 
  }


}



