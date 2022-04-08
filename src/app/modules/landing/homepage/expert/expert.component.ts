import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation,Pagination,FreeMode, Autoplay } from "swiper";
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
