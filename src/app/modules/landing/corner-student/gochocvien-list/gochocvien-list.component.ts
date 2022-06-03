import { Component, OnInit } from '@angular/core';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
  selector: 'app-gochocvien-list',
  templateUrl: './gochocvien-list.component.html',
  styleUrls: ['./gochocvien-list.component.scss']
})
export class GochocvienListComponent implements OnInit {

  danhmucs: any[];
    constructor(private _khoahocService: KhoahocService) {}

    ngOnInit(): void {
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'gochocvien');
            this.danhmucs = nest(this.danhmucs)
        });
        const nest = (items, id = '', link = 'pid') => items?.filter(item => item[link] == id).map(item => ({
          ...item,
          children: nest(items, item.id)
      }));
        // window.location.href = 'https://v1.timona.edu.vn/hoc-vien.html'
    }

}
