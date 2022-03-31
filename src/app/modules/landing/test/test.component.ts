import { Component, OnInit, ElementRef, Directive,Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);
  

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isInHoverBlock = false;

  constructor(private el: ElementRef) {}


  ngOnInit() {
      
  }

 


}
