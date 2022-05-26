import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../../home/home.service';
import { FooterService } from './footer.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
    footer: any;
    constructor(private homeService: HomeService) {}

    ngOnInit(): void {
        this.homeService.getCauhinh().subscribe();
        this.homeService.cauhinh$
            .pipe(
                map(
                    (arr) =>
                        arr &&
                        arr.length &&
                        arr.reverse().filter((r) => r.module == 'Footer')
                )
            )
            .subscribe((result) => {
                if (result) {
                    this.footer = result[0];
                }
            });
    }
}
