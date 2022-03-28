import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { OwlOptions } from 'ngx-owl-carousel-o';
import SwiperCore, { Navigation,Pagination } from "swiper";
SwiperCore.use([Pagination]);

SwiperCore.use([Navigation]);
@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
