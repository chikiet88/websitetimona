import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation,Pagination,FreeMode, Autoplay } from "swiper";
import { OwlOptions } from 'ngx-owl-carousel-o';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  config;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


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
