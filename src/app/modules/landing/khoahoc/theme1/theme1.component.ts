import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    Pipe,
} from '@angular/core';

import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-theme1',
    templateUrl: './theme1.component.html',
    styleUrls: ['./theme1.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class Theme1Component implements OnInit {
    course$: Observable<Khoahoc>;
    massTimingsHtml;
    config;
    config1;
    constructor(
        private khoahocService: KhoahocService,
        private sanitizer: DomSanitizer
    ) {
        // this.massTimingsHtml = this.getInnerHTMLValue()
    }

    theme: any;

    text: SafeHtml;

    getCourse() {
        this.khoahocService.course$.subscribe((course: any) => {
            // Update the counts
            this.theme = course;
        });
    }

    ngOnInit(): void {
        // window.location.href = 'https://v1.timona.edu.vn/khoa-hoc.html'

        this.getCourse();
        this.config = {
            loop: true,
            // autoplay: {
            //   delay: 1000,
            //   disableOnInteraction: false
            // },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    freeMode: true,
                },

                982: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        };
        this.config1 = {
            loop: true,
            freeMode: true,
            // autoplay: {
            //   delay: 1000,
            //   disableOnInteraction: false
            // },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            },
        };
    }
}
