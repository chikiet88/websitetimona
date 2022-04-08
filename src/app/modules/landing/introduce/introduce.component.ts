import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import SwiperCore, { Navigation,Pagination,FreeMode, Autoplay } from "swiper";
import { HomeService } from '../home/home.service';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);


@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  config;
  config1;
  intro;
  slug;
 
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   

  
   
      console.log(this.route.snapshot.paramMap.get("slug")); 
      this.slug = this.route.snapshot.paramMap.get("slug")
      this.homeService.getKhoahocChitiet(this.slug).subscribe((result)=> this.intro = result)
        
    
    this.config={
      loop:true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      },
      breakpoints: {
        380: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        
        982:{
          slidesPerView: 4,

        }
      },
        freeMode: true,
        
    }
    this.config1={
      loop:true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      },
      slidesPerView: 4,
          spaceBetween: 20,
        freeMode: true,
        
    }
  }

}
