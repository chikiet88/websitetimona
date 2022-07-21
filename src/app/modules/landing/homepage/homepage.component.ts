import {
    AfterViewInit,
    Component,
    DoCheck,
    OnInit,
    ViewChild,
} from '@angular/core';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { gsap } from 'gsap';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
    config;

    constructor() {}
    active = 'hidden';
    active1 = 'hidden';
    hidden = '';
    hidden1 = '';

    showVideo() {
        this.active = 'block';
        this.hidden = 'hidden';
    }
    showVideo1() {
        this.active1 = 'block';
        this.hidden1 = 'hidden';
    }
    ngOnInit(): void {
        this.config = {
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 5,
                },
            },

            freeMode: true,
        };
    }
    
}
