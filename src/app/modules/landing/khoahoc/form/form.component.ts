import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    this.khoahocService.getKhoahoc().subscribe()
    this.khoahocService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr &&
                        arr.length &&
                        arr
                            .reverse()
                            .filter(
                                (r) =>  r.parentid == 5
                            )
                )
            )
            .subscribe((result) => {this.courses = result
             
              
            });
  }

}
