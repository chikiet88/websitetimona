import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import SwiperCore, { Pagination } from 'swiper';
import { threadId } from 'worker_threads';
import { HomeService } from '../../home/home.service';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
SwiperCore.use([Pagination]);
@Component({
    selector: 'app-specialzed',
    templateUrl: './specialzed.component.html',
    styleUrls: ['./specialzed.component.css'],
})
export class SpecialzedComponent implements OnInit {
    courses: any[];
    danhmucs: any[];
    baivietnoibat = 1;
    idMenu = 5; //id: 5 menu của chuyên ngành
    constructor(
        private HomeService: HomeService,
        private _khoahocService: KhoahocService
    ) {}

    ngOnInit(): void {
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
        });
        this.HomeService.getKhoahoc().subscribe();
        this.HomeService.courses$.subscribe((result) => {
            this.courses = result;
            let a = [];
            for (let i = 0; i < this.courses?.length; i++) {
                console.log(this.courses[i]?.idDM);
                for (let j = 0; j < this.danhmucs.length; j++) {
                    if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.courses[i]);
                    }
                }
            }
           
            this.courses = a.filter(x => x.Loaibaiviet == this.baivietnoibat)
        });
    }
}
