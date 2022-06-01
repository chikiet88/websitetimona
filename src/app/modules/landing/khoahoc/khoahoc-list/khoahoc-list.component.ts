import { Component, OnInit } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';

@Component({
    selector: 'app-khoahoc-list',
    templateUrl: './khoahoc-list.component.html',
    styleUrls: ['./khoahoc-list.component.css'],
})
export class KhoahocListComponent implements OnInit {
    courses$: Observable<Khoahoc[]>;
    danhmuc: any;
    themes: any;
    selectedCourse: any;
    constructor(private khoahocService: KhoahocService) {}

    ngOnInit(): void {
        // window.location.href = 'https://v1.timona.edu.vn/khoa-hoc.html'

        this.khoahocService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr &&
                        arr.length &&
                        arr.reverse().filter((r) => r.parentid == 5)
                )
            )
            .subscribe((result) => (this.themes = result));

        this.khoahocService.getDanhmuc().subscribe();
        this.khoahocService.danhmucs$.subscribe((res) => {
            console.log(res);

            res?.forEach((x) => {
                x.courses = [];

                for (let i = 0; i <= this.themes.length; i++) {
                    if (x.id == this.themes[i]?.idDM) {
                        x.courses.push(this.themes[i]);
                    }
                }

                return x;
            });
            this.danhmuc = res?.reverse().filter((x) => x.Type == '1');
            console.log(this.danhmuc);
        });
    }

    // this.khoahocService.course$
    //         .subscribe((course: any) => {
    //             // Update the selected contact
    //             this.selectedCourse = course;
    //         });
}
