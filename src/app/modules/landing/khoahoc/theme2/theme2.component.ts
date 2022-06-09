import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme2',
  templateUrl: './theme2.component.html',
  styleUrls: ['./theme2.component.css']
})
export class Theme2Component implements OnInit {
  config1
  constructor() { }

  ngOnInit(): void {
    this.config1 = {
      loop: true,
      freeMode: true,
      // autoplay: {
      //   delay: 1000,
      //   disableOnInteraction: false
      // },
      breakpoints: {
          320: {
              slidesPerView: 1,
              spaceBetween: 20,
          },

          982: {
              slidesPerView: 2,
              spaceBetween: 20,
          },
      },
  };
  }

}
