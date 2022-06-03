import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../../../home/home.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    typeLoaibaiviet = 1;
    courses
    idMenu = 5; //id: 5 menu của chuyên ngành
    constructor(private _HomeService: HomeService) {}

    ngOnInit(): void {
        this._HomeService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr &&
                        arr.length &&
                        arr.filter(
                            (r) =>
                                r.Loaibaiviet == this.typeLoaibaiviet &&
                                r.parentid == this.idMenu
                        )
                )
            )
            .subscribe((result) => {
                this.courses = result;
            });
    }
}
