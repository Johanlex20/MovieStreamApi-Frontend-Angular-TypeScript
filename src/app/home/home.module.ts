import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { SeriePerfilComponent } from './components/serie-perfil/serie-perfil.component';
import { TemporadaComponent } from './components/temporada/temporada.component';
import { TemporadaPerfilComponent } from './components/temporada-perfil/temporada-perfil.component';
import { EpisodioPerfilComponent } from './components/episodio-perfil/episodio-perfil.component';




@NgModule({
  declarations: [
    CardComponent,
    IndexComponent,
    LayoutComponent,
    SeriePerfilComponent,
    TemporadaComponent,
    TemporadaPerfilComponent,
    EpisodioPerfilComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
