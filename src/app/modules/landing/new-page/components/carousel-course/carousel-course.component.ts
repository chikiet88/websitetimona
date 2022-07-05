import { Component, OnInit } from '@angular/core';
import { KhoahocService } from 'app/modules/landing/khoahoc/khoahoc.service';
import { map } from 'rxjs';
import { HomeService } from '../../../home/home.service';

@Component({
    selector: 'app-carousel-course',
    templateUrl: './carousel-course.component.html',
    styleUrls: ['./carousel-course.component.scss'],
})
export class CarouselCourseComponent implements OnInit {
    baivietnoibat = 1;
    courses;
    danhmucs;
    config;
    constructor(
        private _HomeService: HomeService,
        private _khoahocService: KhoahocService
    ) {}

    ngOnInit(): void {
        this.config = {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            spaceBetween: 10,

            freeMode: true,
        };
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
        });
        this._HomeService.getKhoahoc().subscribe();
        this._HomeService.courses$.subscribe((result) => {
            this.courses = result;
            let a = [];
            for (let i = 0; i < this.courses?.length; i++) {
                for (let j = 0; j < this.danhmucs.length; j++) {
                    if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.courses[i]);
                    }
                }
            }

            this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
            this.courses.sort((a, b) => {
                return a.Ordering - b.Ordering;
            });
        });
    }
}
