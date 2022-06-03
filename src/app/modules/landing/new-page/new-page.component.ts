import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { Navigation, Pagination, FreeMode, Autoplay } from 'swiper';
import { KhoahocService } from '../khoahoc/khoahoc.service';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);
@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
    config;
    danhmucs;
    constructor(
        private route: Router,
        private _khoahocService: KhoahocService
    ) {}
   nest = (items, id = '', link = 'pid') =>
    items
        ?.filter((item) => item[link] == id)
        .map((item) => ({
            ...item,
            children: this.nest(items, item.id),
        }));
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
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'tintucsukien');
            this.danhmucs = this.nest(this.danhmucs?.reverse());
        });
       
    }
}
