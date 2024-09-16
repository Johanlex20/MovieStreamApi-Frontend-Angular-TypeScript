import { Component, OnInit } from '@angular/core';
import { Serie, SeriePage } from '../interfaces/serie.interfaces';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: []
})
export class SerieComponent implements OnInit {

  series?:Serie[];

  constructor(
    private serieService:SerieService
  ){}

  ngOnInit(): void {
    this.serieService.paginate()
    .subscribe(seriePage => {
      this.series = seriePage.content;
    });
  }
}
