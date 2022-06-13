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
import { forEach } from 'lodash';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-theme1',
    templateUrl: './theme1.component.html',
    styleUrls: ['./theme1.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class Theme1Component implements OnInit {
    course$: Observable<Khoahoc>;
    courses: any[] = [];
    xemNhanhBaiviet = [];
    massTimingsHtml;
    isCarousel1 = false;
    isCarousel2 = false;
    config;
    config1;
    xemNhanhNoiDung: any[];
    constructor(
        private khoahocService: KhoahocService,
        private route: ActivatedRoute
    ) {
        // this.massTimingsHtml = this.getInnerHTMLValue()
    }
    danhmucs: any[];
    theme: any = {};

    text: SafeHtml;

    getCourse() {
        this.khoahocService.course$.subscribe((course: any) => {
            // Update the counts

            this.theme = course;

            if (Object.keys(this.theme?.listslide1).length > 0) {
                this.isCarousel1 = true;
                this.theme.listslide1 = Object.values(this.theme?.listslide1);
            } else {
                this.isCarousel1 = false;
            }
            if (Object.keys(this.theme?.listslide2).length > 0) {
                this.isCarousel2 = true;
            } else {
                this.isCarousel2 = false;
            }
        });
    }
    xemnhanhnoidung() {
        let a = [];
        let queryH3 = document.querySelectorAll('h3');
        queryH3.forEach((x) => a.push(x));
        this.xemNhanhNoiDung = a;

        Array.from(queryH3).forEach((x) => {
            x.addEventListener('click', function (event) {
                console.log(event);
            });
        });
    }
    chonXemNoiDung(item, index) {
        let queryH3 = document.querySelectorAll('h3');
        for (let i = 0; i < queryH3.length; i++) {
            queryH3[i].removeAttribute('id')
            if ((i == index)) {
                queryH3[i].setAttribute('id', 'move');
            }
        }

        document.getElementById('move').scrollIntoView({
            behavior: 'smooth',
        });
    }

    ngOnInit(): void {
        this.getCourse();

        // window.location.href = 'https://v1.timona.edu.vn/khoa-hoc.html'
        this.khoahocService.getKhoahoc().subscribe();
        this.khoahocService.courses$.subscribe((res) => {
            this.courses = res;
        });
        this.khoahocService.getDanhmuc().subscribe();
        this.khoahocService.danhmucs$.subscribe((res) => {
            res?.forEach((x) => {
                x.courses = [];

                for (let i = 0; i < this.courses?.length; i++) {
                    if (x.id == this.courses[i]?.idDM) {
                        x.courses.push(this.courses[i]);
                    }
                }
                return x;
            });
            let xemBaivietTemp = [];
            this.danhmucs = res
                ?.reverse()
                .filter((x) => x.Type == 'chuyennganh');
            this.danhmucs?.forEach((x) => {
                xemBaivietTemp.push(...x.courses);
            });
            this.route.params.subscribe((data: any) => {
                this.xemNhanhBaiviet = xemBaivietTemp?.filter(
                    (x) => x.slug != data.slug
                );
            });
        });

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
