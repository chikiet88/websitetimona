import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Pagination, Navigation, Autoplay, FreeMode } from 'swiper';
import { LecturerPageService } from '../../lecturer-page/lecturer-page.service';
SwiperCore.use([Pagination, FreeMode, Navigation, Autoplay]);


@Component({
    selector: 'app-lecturer',
    templateUrl: './lecturer.component.html',
    styleUrls: ['./lecturer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LecturerComponent implements OnInit {
    config;
    giangviens = [];
    constructor(private _giangvienSerivce: LecturerPageService) {}

    ngOnInit(): void {
        this.config = {
            loop: true,
            
            slidesPerView: 1,
           
        };
        this._giangvienSerivce.getGiangvien().subscribe();
        this._giangvienSerivce.giangviens$.subscribe((res) => {
            if(res){
                res.reverse()
                let x = res?.length / 4;
                for (let i = 0; i < x; i++) {
                    this.giangviens.push(res.slice(i * 4, i * 4 + 4));
                }
                this.giangviens.reverse()
            }
        
        });
    }
}
