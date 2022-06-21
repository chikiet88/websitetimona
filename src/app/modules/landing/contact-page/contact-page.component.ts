import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';
import { KhoahocService } from '../khoahoc/khoahoc.service';
import { Khoahoc } from './contact-types';
import { ContactService } from './contact.service';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
    courses: any[];
    danhmucs: any[];
    baivietnoibat = 1;
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
                for (let j = 0; j < this.danhmucs.length; j++) {
                    if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.courses[i]);
                    }
                }
            }

            this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
            this.courses = this.courses.reverse();
        });
    }
}
