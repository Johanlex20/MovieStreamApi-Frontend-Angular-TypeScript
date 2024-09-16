import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: []
})
export class SerieFormComponent {
  form:FormGroup = this.fb.group({
    titulo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
  });

  constructor(
    private fb: FormBuilder
  ){}

  save(){
    console.log('form valid', this.form.valid);
    console.log('form', this.form.value);
  }

}
