import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplayHoverPause:true,
    pullDrag: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      // 400: {
      //   items: 2
      // },
      // 740: {
      //   items: 3
      // },
      940: {
        items: 1
      }
    },
    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
