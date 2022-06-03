import { Component, OnInit } from '@angular/core';
import { KhoahocService } from '../khoahoc/khoahoc.service';

@Component({
    selector: 'app-corner-student',
    templateUrl: './corner-student.component.html',
    styleUrls: ['./corner-student.component.css'],
})
export class CornerStudentComponent implements OnInit {
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
            this.danhmucs = res?.filter((x) => x.Type == 'gochocvien');
            this.danhmucs = this.nest(this.danhmucs);
        });

        // window.location.href = 'https://v1.timona.edu.vn/hoc-vien.html'
    }
}
