import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent implements OnInit {
  config
  constructor() { }

  ngOnInit(): void {
    this.config={
      loop:true,
     
      slidesPerView: 1,
        
    }
  }

}
