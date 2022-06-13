import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
    selector: 'app-tintucdetail',
    templateUrl: './tintucdetail.component.html',
    styleUrls: ['./tintucdetail.component.scss'],
})
export class TintucdetailComponent implements OnInit {
    course$: Observable<any>;

    constructor(
        private khoahocService: KhoahocService,
        private route: ActivatedRoute
    ) {}

    theme: any;
    ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            console.log(data.slugdetail);
            
            this.khoahocService.getKhoahocChitiet(data.slugdetail).subscribe();
            this.khoahocService.course$.subscribe((course: any) => {
                this.theme = course;
                console.log(this.theme);
                
            });
        });
    }
}
