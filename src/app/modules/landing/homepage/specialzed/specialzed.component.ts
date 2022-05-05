import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import SwiperCore, { Pagination } from 'swiper';
import { HomeService } from '../../home/home.service';
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-specialzed',
  templateUrl: './specialzed.component.html',
  styleUrls: ['./specialzed.component.css'],
})


export class SpecialzedComponent implements OnInit {
  courses;
  constructor(private HomeService: HomeService ) { }
  
  ngOnInit(): void {
    this.HomeService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr && arr.length && arr.filter((r) => r.Loaibaiviet == 1 && r.parentid == 5)
                )
            )
            .subscribe((result) => {
              (this.courses = result)
              console.log(result);
              
            });            
  }

}
