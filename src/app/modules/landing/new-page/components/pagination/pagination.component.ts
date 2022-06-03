import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Input() paginate;
    numberArr = [];
    constructor() {}
    ngOnInit(): void {
        for (let i = 0; i <= this.paginate; i++) {
            this.numberArr.push(i);
            console.log(this.numberArr);
            console.log(this.paginate);
            
        }
       
        
    }
}
