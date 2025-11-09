import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SerieComponent } from './components/serie/serie.component';
import { SerieFormComponent } from './components/serie-form/serie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../home/shared/shared.module';


@NgModule({
  declarations: [
    SerieComponent,
    SerieFormComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
