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
    typeLoaibaiviet = 1;
    idMenu = 5; //id: 5 menu của chuyên ngành
    constructor(private HomeService: HomeService) {}

    ngOnInit(): void {
        this.HomeService.courses$
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
