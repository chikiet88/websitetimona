import { Component, OnInit } from '@angular/core';
import { LetotnghiepService } from './letotnghiep.service';

@Component({
    selector: 'app-letotnghiep',
    templateUrl: './letotnghiep.component.html',
    styleUrls: ['./letotnghiep.component.scss'],
})
export class LetotnghiepComponent implements OnInit {
    constructor(private _letotnghiepService: LetotnghiepService) {}
    letotnghieps: any[];
    ngOnInit(): void {
        this._letotnghiepService.getDataLetotnghiep().subscribe();
        this._letotnghiepService.imageLetotnghiep$.subscribe((res) => {
            console.log(res);

            this.letotnghieps = res;
        });
    }
}
