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

    themes: any;
    selectedCourse: any;
    constructor(private khoahocService: KhoahocService) {}

    ngOnInit(): void {
        this.khoahocService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr &&
                        arr.length &&
                        arr
                            .reverse()
                            .filter(
                                (r) => r.Loaibaiviet == 1 && r.parentid == 5
                            )
                )
            )
            .subscribe((result) => (this.themes = result));
    }

    // this.khoahocService.course$
    //         .subscribe((course: any) => {
    //             // Update the selected contact
    //             this.selectedCourse = course;
    //         });
}
