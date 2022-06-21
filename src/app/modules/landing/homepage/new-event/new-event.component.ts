import { Component, OnInit } from '@angular/core';
import { DanhmucService } from 'app/modules/admin/danhmuc/danhmuc.service';
import { map } from 'rxjs';
import { HomeService } from '../../home/home.service';

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
    news;
    danhmuc;
    constructor(
        private homeService: HomeService,
        private _danhmucService: DanhmucService
    ) {}

    ngOnInit(): void {
        this._danhmucService.getDanhmuc().subscribe();
        this._danhmucService.danhmucs$.subscribe((res) => {
            res?.find((x) => {
              if(x.Type == 'sukien'){
                this.danhmuc = x
              }
            });
        });
        this.homeService.courses$.subscribe((result) => {
            this.news = result?.filter((res) => res.idDM == this.danhmuc.id);
        });
    }
}
