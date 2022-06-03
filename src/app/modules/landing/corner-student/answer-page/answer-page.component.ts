import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
    selector: 'app-answer-page',
    templateUrl: './answer-page.component.html',
    styleUrls: ['./answer-page.component.css'],
})
export class AnswerPageComponent implements OnInit {
    course$: Observable<any>;
    massTimingsHtml;

    constructor(private khoahocService: KhoahocService) {}

    theme: any;
    ngOnInit(): void {
        this.khoahocService.course$.subscribe((course: any) => {
            this.theme = course;
            console.log(this.theme);
            
        });
    }
}
