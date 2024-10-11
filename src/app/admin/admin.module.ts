import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SerieComponent } from './components/serie/serie.component';
import { SerieFormComponent } from './components/serie-form/serie-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SerieComponent,
    SerieFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
