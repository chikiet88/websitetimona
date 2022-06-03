import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../../../home/home.service';

@Component({
  selector: 'app-carousel-course',
  templateUrl: './carousel-course.component.html',
  styleUrls: ['./carousel-course.component.scss']
})
export class CarouselCourseComponent implements OnInit {
  typeLoaibaiviet = 1;
  courses;
  idMenu = 5; //id: 5 menu của chuyên ngành
  config;
  constructor(private _HomeService: HomeService) {}

  ngOnInit(): void {
      this.config = {
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
          spaceBetween:10,

          freeMode: true,
      };
      this._HomeService.courses$
          .pipe(
              map(
                  (arr) =>
                      arr &&
                      arr.length &&
                      arr.filter(
                          (r) =>
                              r.Loaibaiviet == this.typeLoaibaiviet &&
                              r.parentid == this.idMenu
                      )
              )
          )
          .subscribe((result) => {
              this.courses = result;
          });
  }

}
