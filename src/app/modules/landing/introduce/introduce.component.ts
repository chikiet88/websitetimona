import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { flush } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { HomeService } from '../home/home.service';
import { KhoahocService } from '../khoahoc/khoahoc.service';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class IntroduceComponent implements OnInit {
    config;
    config1;
    config4;

    config3;
    baivietnoibat = 1;
    intro;
    slug;
    courses;
    danhmucs;
    typeLoaibaiviet = 1; //
    idMenu = 5; //id: 5 menu của chuyên ngành
    constructor(
        private _HomeService: HomeService,
        private route: ActivatedRoute,
        private _khoahocService: KhoahocService
    ) {}

    ngOnInit(): void {
        // window.location.href = 'https://v1.timona.edu.vn/gioi-thieu/tong-quan-timona-academy.html'
        this.slug = this.route.snapshot.paramMap.get('slug');
        this._HomeService.getKhoahocChitiet('hoc-vien').subscribe((result) => {
            this.intro = result;
            this._khoahocService.getDanhmuc().subscribe();
            this._khoahocService.danhmucs$.subscribe((res) => {
                this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
            });
            this._HomeService.getKhoahoc().subscribe();
            this._HomeService.courses$.subscribe((result) => {
                this.courses = result;
                console.log(this.courses);

                let a = [];
                for (let i = 0; i < this.courses?.length; i++) {
                    console.log(this.courses[i]?.idDM);
                    for (let j = 0; j < this.danhmucs?.length; j++) {
                        if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                            a.push(this.courses[i]);
                            console.log(a);
                        }
                    }
                }

                this.courses = a.filter((x) => {
                    return x.Loaibaiviet == this.baivietnoibat;
                });
                console.log(this.courses);
            });
        });

        this.config = {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                380: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            },
            freeMode: true,
        };
        this.config1 = {
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            slidesPerView: 4,
            spaceBetween: 20,
            freeMode: true,
        };
        this.config3 = {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                380: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            freeMode: true,
        };
        this.config4 = {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },

                982: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            },
            freeMode: true,
        };
    }
}
