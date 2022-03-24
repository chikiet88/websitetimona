import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation,Pagination } from "swiper";
SwiperCore.use([Pagination]);

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {

  constructor() { }
  active = 'hidden'
  active1 = 'hidden'
  hidden = ''
  hidden1 = ''

  showVideo(){
    this.active = 'block'
    this.hidden = 'hidden'
  }
  showVideo1(){
    this.active1 = 'block'
    this.hidden1 = 'hidden'
    
  }
  ngOnInit(): void {
  }

}
