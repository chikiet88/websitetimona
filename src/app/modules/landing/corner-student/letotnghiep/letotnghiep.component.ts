import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import { LetotnghiepService } from './letotnghiep.service';

@Component({
    selector: 'app-letotnghiep',
    templateUrl: './letotnghiep.component.html',
    styleUrls: ['./letotnghiep.component.scss'],
})
export class LetotnghiepComponent implements OnInit {
    letotnghieps: any[];
    danhmucs;
    constructor(
        private _HomeService: HomeService,
        private _khoahocService: KhoahocService
    ) {}
    ngOnInit(): void {
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            
            this.danhmucs = res?.filter((x) => x.Type == 'letotnghiep');
        });
        this._HomeService.getKhoahoc().subscribe();
        this._HomeService.courses$.subscribe((result) => {
            this.letotnghieps = result;
            let a = [];
            for (let i = 0; i < this.letotnghieps?.length; i++) {
                for (let j = 0; j < this.danhmucs?.length; j++) {
                    if (this.letotnghieps[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.letotnghieps[i]);
                    }
                }
            }

            this.letotnghieps = a
        });
    }
}
