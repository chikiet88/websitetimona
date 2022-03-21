import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showmenu = 'hidden';
  toggle = false;
  constructor() { }

  showFiller = false;
  clickEvent(){
    this.toggle = !this.toggle;
    this.toggle ? this.showmenu='show-menu' : this.showmenu=''
  }
  
  ngOnInit(): void {
  }

}
