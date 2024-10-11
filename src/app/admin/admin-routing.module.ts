import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieComponent } from './components/serie/serie.component';
import { SerieFormComponent } from './components/serie-form/serie-form.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
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
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
