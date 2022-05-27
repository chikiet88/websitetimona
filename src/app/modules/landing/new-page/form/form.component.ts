import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
  selector: 'app-form-new',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courses
  constructor(private _khoahocSerivce:KhoahocService) { }

  ngOnInit(): void {
    this._khoahocSerivce.courses$
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
