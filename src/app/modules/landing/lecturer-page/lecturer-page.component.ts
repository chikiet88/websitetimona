import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';
import { LecturerPageService } from './lecturer-page.service';

@Component({
    selector: 'app-lecturer-page',
    templateUrl: './lecturer-page.component.html',
    styleUrls: ['./lecturer-page.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class LecturerPageComponent implements OnInit {
    lecturers;
    lecturerNoibat;
    slug;
    constructor(
        private homeService: HomeService,
        private route: ActivatedRoute,
        private _giangvienService: LecturerPageService
    ) {}

    ngOnInit(): void {
        this._giangvienService.getGiangvien().subscribe();
        this._giangvienService.giangviens$.subscribe((res) => {
            if (res) {
                this.lecturerNoibat = res.find((x) => x.Loaibaiviet == '1');
                console.log(this.lecturerNoibat);
                
                this.lecturers = res?.filter((x) => x.Loaibaiviet != '1');
                this.lecturers.reverse()

            }
        });
    }
}
