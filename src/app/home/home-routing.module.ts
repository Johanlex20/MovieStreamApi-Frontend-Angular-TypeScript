import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SeriePerfilComponent } from './components/serie-perfil/serie-perfil.component';
import { TemporadaComponent } from './components/temporada/temporada.component';
import { TemporadaPerfilComponent } from './components/temporada-perfil/temporada-perfil.component';
import { EpisodioPerfilComponent } from './components/episodio-perfil/episodio-perfil.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'',
        component:IndexComponent
      },
      { 
        path:'serie/:id',
        component:SeriePerfilComponent
      },
      { 
        path:'temporada/:id',
        component:TemporadaPerfilComponent
      },
      {
        path:'episodio/:id',
        component:EpisodioPerfilComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
