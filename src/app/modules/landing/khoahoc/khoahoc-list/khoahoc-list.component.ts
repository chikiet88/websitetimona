import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';

@Component({
  selector: 'app-khoahoc-list',
  templateUrl: './khoahoc-list.component.html',
  styleUrls: ['./khoahoc-list.component.css']
})
export class KhoahocListComponent implements OnInit {
  courses$: Observable<Khoahoc[]>;

  themes: any;
  selectedCourse:any;
  constructor(private khoahocService: KhoahocService) { }

  ngOnInit(): void {
    this.courses$ = this.khoahocService.courses$;
        this.khoahocService.courses$
            
            .subscribe((courses: Khoahoc[]) => {

                // Update the counts
                this.themes = courses;
                
            });

    // this.khoahocService.course$     
    //         .subscribe((course: any) => {
    //             // Update the selected contact
    //             this.selectedCourse = course;   
    //         });
  }

}
