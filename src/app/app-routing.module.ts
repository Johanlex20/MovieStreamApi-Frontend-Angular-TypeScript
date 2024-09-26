import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieComponent } from './serie/serie.component';
import { SerieFormComponent } from './serie-form/serie-form.component';

const routes: Routes = [
  {
    path:'series',
    component: SerieComponent
  },
  {
    path:'new/serie',
    component:SerieFormComponent
  },
  {
    path:'serie/:id/edit',
    component:SerieFormComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
