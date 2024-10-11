import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent {
  
  menuVisible = false;

  openMenu(){
    this.menuVisible = !this.menuVisible
  }

}
