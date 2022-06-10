import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
    selector: 'app-tintucdetail',
    templateUrl: './tintucdetail.component.html',
    styleUrls: ['./tintucdetail.component.scss'],
})
export class TintucdetailComponent implements OnInit {
    theme;
    constructor(
        private _khohocService: KhoahocService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get('slug');
        console.log(slug);

        this._khohocService.getKhoahocChitiet(slug).subscribe();
        this._khohocService.course$.subscribe((res) => (this.theme = res));
    }
}
