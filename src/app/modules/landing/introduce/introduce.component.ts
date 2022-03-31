import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { OwlOptions } from 'ngx-owl-carousel-o';
import SwiperCore, { Navigation,Pagination,FreeMode, Autoplay } from "swiper";
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);


@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  config;
  constructor() { }

  ngOnInit(): void {
    this.config={
      loop:true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      },
      slidesPerView: 5,
    spaceBetween:30,
        freeMode: true,
        
    }
  }

}
