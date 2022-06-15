import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SwiperCore, { Mousewheel, Pagination, Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { LetotnghiepService } from '../letotnghiep.service';
SwiperCore.use([Mousewheel, Pagination, Navigation]);

@Component({
    selector: 'app-letotnghiep-detail',
    templateUrl: './letotnghiep-detail.component.html',
    styleUrls: ['./letotnghiep-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LetotnghiepDetailComponent implements OnInit {
    @ViewChild(SwiperComponent) swiper: SwiperComponent;
    album;
    config;
    b = [];
    a = [];
    x;
    constructor(
        private _letotnghiepService: LetotnghiepService,
        private route: ActivatedRoute
    ) {}

    swipePrev() {
        this.swiper.swiperRef.slidePrev();
    }
    swipeNext() {
        this.swiper.swiperRef.slideNext();
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this._letotnghiepService.getDataDetail(Number(id)).subscribe();
        this._letotnghiepService.imageDetail$.subscribe((res) => {
            console.log(res);
            this.album = res;

            this.x = Object.keys(this.album?.Image)?.length / 3;
            for (let i = 0; i <= this.x; i++) {
                this.b.push(
                    Object.values(this.album.Image).slice(3 * i, 3 * i + 3)
                );
            }
            console.log(this.b);
        });
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
    }
}
