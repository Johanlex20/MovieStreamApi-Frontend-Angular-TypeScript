import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerieService } from '../serie/serie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie, Genero } from '../../../interfaces/serie.interfaces';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: []
})
export class SerieFormComponent implements OnInit {

  errors: string[] = [];
  serie?: Serie;
  form?: FormGroup;
  generos = Object.values(Genero);


  constructor(
    private fb: FormBuilder,
    private serieService: SerieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const serieId = this.route.snapshot.paramMap.get('id');

    if (serieId) {
      this.serieService.get(parseInt(serieId))
        .subscribe(serie => {

          this.serie = serie;

          this.form = this.fb.group({
            nombreSerie: [serie.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            sinopsis:[serie.sinopsis, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
            genero: [serie.genero, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            popularidad:[serie.popularidad, [Validators.required, Validators.min(0)]],
            numTemporadas:[serie.numTemporadas, [Validators.required, Validators.min(0)]],
            numEpisodiosTotal:[serie.numEpisodiosTotal,[Validators.required, Validators.min(0)]],
            videoKey:[serie.videoKey,[Validators.required]],
            plataforma:[serie.plataforma,[Validators.required]]
          });

        });
    } else {
      this.form = this.fb.group({
        nombreSerie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
      });
    }
  }

  controlHasError(control: string, error: string) {
    return this.form!.controls[control].hasError(error);
  };


  save() {
    if (this.form!.invalid) {
      console.log("formulario invalido");
      return;
    }

    let serie = this.form!.value;
    let request;

    if (this.serie) {
      request = this.serieService.update(this.serie.id, serie);
      alert("serie actualizada con exito");
    } else {
      request = this.serieService.create(serie); 
      alert("serie creada con exito");
    }

    request.subscribe({
      next: (serie: Serie) => {
        this.router.navigate(['/admin/series'])
      },
      error: (error: any) => {
         console.log("Error:", error); // <-- Agregar este console.log para ver el error en detalle
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
    });

  }

}
