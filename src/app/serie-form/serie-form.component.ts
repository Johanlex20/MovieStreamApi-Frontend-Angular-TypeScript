import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerieService } from '../serie/serie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: []
})
export class SerieFormComponent  implements OnInit {

  errors: string[] = [];


  form: FormGroup = this.fb.group({
    nombreSerie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
  });

  
  constructor(
    private fb: FormBuilder,
    private serieService: SerieService,
    private router: Router,
    private route:ActivatedRoute
  ) { }



  ngOnInit(): void {
    const serieId = this.route.snapshot.paramMap.get('id')!;

    this.serieService.get(parseInt(serieId))
    .subscribe( serie=>{
      console.log('serie', serie);
    })
  }


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
