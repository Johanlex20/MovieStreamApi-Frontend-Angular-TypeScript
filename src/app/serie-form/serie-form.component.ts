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
  form:FormGroup = this.fb.group({
    nombreSerie:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
  });


  constructor(
    private fb: FormBuilder,
    private serieService:SerieService,
    private router:Router
  ){}


  controlHasError(control:string, error:string): boolean{
    return this.form.controls[control].hasError(error);
  };
  

  save(){
    //console.log('form valid', this.form.valid);
    //console.log('form', this.form.value);
    
    if(this.form.invalid){
      console.log("formulario invalido");
      return;
    }

    let serie = this.form.value;
    
    this.serieService.create(serie)
    .subscribe(()=>{
      alert("Serie creada con exito");
      this.router.navigate(['/']);
    }, error =>{
      console.error('Error al crear la serie', error);
    });
    
  }

}
