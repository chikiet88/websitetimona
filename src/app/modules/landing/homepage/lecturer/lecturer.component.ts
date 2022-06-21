import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { LectuerService } from './lectuer.service';
SwiperCore.use([Pagination, Navigation]);

@Component({
    selector: 'app-lecturer',
    templateUrl: './lecturer.component.html',
    styleUrls: ['./lecturer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LecturerComponent implements OnInit {
    config;
    gaingviens: any[] = [];
    constructor(private _giangvienSerivce: LectuerService) {}

    ngOnInit(): void {
        this.config = {
            loop: true,

            slidesPerView: 1,
        };
        this._giangvienSerivce.getGiangvien().subscribe();
        this._giangvienSerivce.giangviens$.subscribe((res) => {
            let x = res?.length / 4;
            for (let i = 0; i < x; i++) {
                this.gaingviens.push(res.slice(i * 4, i * 4 + 4));
            }
        });
    }
}
