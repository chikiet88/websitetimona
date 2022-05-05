import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courses
  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.homeService.courses$
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
            .subscribe((result) => (this.courses = result));

  }

}
