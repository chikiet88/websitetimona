import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courses$: Observable<Khoahoc[]>;
  courses
  constructor(private khoahocService: KhoahocService) { }

  ngOnInit(): void {
    this.courses$ = this.khoahocService.courses$;
    this.khoahocService.courses$
        
        .subscribe((courses: Khoahoc[]) => {

            // Update the counts
            this.courses = courses;
            
        });
  }

}
