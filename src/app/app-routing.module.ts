import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieComponent } from './serie/serie.component';
import { SerieFormComponent } from './serie-form/serie-form.component';

const routes: Routes = [
  {
    path:'',
    component: SerieComponent
  },
  {
    path:'new',
    component:SerieFormComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
