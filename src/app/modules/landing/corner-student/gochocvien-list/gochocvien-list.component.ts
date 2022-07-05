import { Component, OnInit } from '@angular/core';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import SwiperCore, { Pagination, Navigation, Autoplay, FreeMode } from 'swiper';

SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);

@Component({
    selector: 'app-gochocvien-list',
    templateUrl: './gochocvien-list.component.html',
    styleUrls: ['./gochocvien-list.component.scss'],
})
export class GochocvienListComponent implements OnInit {
    config;
    danhmucs: any[];
    constructor(private _khoahocService: KhoahocService) {}
    nest = (items, id = '', link = 'pid') =>
        items
            ?.filter((item) => item[link] == id)
            .map((item) => ({
                ...item,
                children: this.nest(items, item.id),
            }));
    ngOnInit(): void {
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            let danhmucCha;
            res?.find((x) => {
                if (x.Type == 'gochocvien') {
                    danhmucCha = x;
                }
            });
            this.danhmucs = res.filter((v) => v.pid == danhmucCha.id);
            this.danhmucs = this.danhmucs.reverse();
        });
        this.config = {
            freeMode: true,
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },

                982: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        };
    }
}
