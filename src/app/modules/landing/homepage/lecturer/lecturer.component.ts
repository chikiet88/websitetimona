import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
