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
            let danhmucCha;
            res?.find((x) => {
                if (x.Type == 'gochocvien') {
                    danhmucCha = x
                }
            });
            this.danhmucs = res.filter((v) => v.pid == danhmucCha.id);
            this.danhmucs = this.danhmucs.reverse()
        });
        
        // window.location.href = 'https://v1.timona.edu.vn/hoc-vien.html'
    }

}
