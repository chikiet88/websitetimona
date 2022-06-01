import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Mousewheel, Pagination, Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Mousewheel, Pagination, Navigation]);

@Component({
    selector: 'app-letotnghiep-detail',
    templateUrl: './letotnghiep-detail.component.html',
    styleUrls: ['./letotnghiep-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LetotnghiepDetailComponent implements OnInit {
    @ViewChild(SwiperComponent) swiper: SwiperComponent;

    config;
    b = [];
    a = [];
    x;
    constructor() {}

    swipePrev() {
        this.swiper.swiperRef.slidePrev();
    }
    swipeNext() {
        this.swiper.swiperRef.slideNext();
    }
    ngOnInit(): void {
        this.config = {
            direction: 'vertical',
            freeMode: true,

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },

                982: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        };
        for (let i = 0; i <= 30; i++) {
            this.a.push(i);
        }
        this.x = this.a.length / 3;
        for (let i = 0; i <= this.x; i++) {
            this.b.push(this.a.slice(3 * i, 3 * i + 3));
        }
        console.log(this.b);
    }
}
