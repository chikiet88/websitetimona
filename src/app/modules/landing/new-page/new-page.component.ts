import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
    config;
    constructor() {}

    ngOnInit(): void {
        // window.location.href = 'https://v1.timona.edu.vn/tin-tuc-su-kien.html'
        this.config = {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
           

            freeMode: true,
        };
    }
}
