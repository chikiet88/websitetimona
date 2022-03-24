import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-specialzed',
  templateUrl: './specialzed.component.html',
  styleUrls: ['./specialzed.component.css'],
})


export class SpecialzedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
