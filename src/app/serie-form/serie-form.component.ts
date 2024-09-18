import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerieService } from '../serie/serie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: []
})
export class SerieFormComponent {

  errors: string[] = [];


  form: FormGroup = this.fb.group({
    nombreSerie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
  });

  
  constructor(
    private fb: FormBuilder,
    private serieService: SerieService,
    private router: Router
  ) { }


  controlHasError(control: string, error: string){
    return this.form.controls[control].hasError(error);
  };


  save() {
    if (this.form.invalid) {
      console.log("formulario invalido");
      return;
    }

    let serie = this.form.value;

    this.serieService.create(serie)
      .subscribe({

        next:serie=>{
          this.router.navigate(['/']);
        },
        error: error => {
          if (error.error.status === 400) {
            this.errors.push(error.error.detail);
          } else if (error.error.status === 422) {
            this.errors.push(...error.error.errors);
          } else if(error.error.status === 404){
            this.errors.push(error.error.title);
          } else if (error.error.status === 500 || 502){
            this.errors.push(error.error.title);
          }
        }
      });
  }

}
