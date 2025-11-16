import { Component, Input, OnInit } from '@angular/core';
import { Serie } from 'src/app/interfaces/serie.interfaces';
import { HomeService} from '../../home.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: []
})
export class CardComponent{

  //@Input() series:Serie[] =[];
  @Input() series: Serie[] | null = null;
 
}
