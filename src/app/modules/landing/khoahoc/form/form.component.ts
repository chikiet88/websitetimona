import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';

@Component({
  selector: 'app-form1',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courses$: Observable<Khoahoc[]>;
  courses
  danhmucs
  baivietnoibat = 1
  constructor(private _khoahocService: KhoahocService) { }

  ngOnInit(): void {
    this._khoahocService.getDanhmuc().subscribe();
    this._khoahocService.danhmucs$.subscribe((res) => {
        this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
    });
    this._khoahocService.getKhoahoc().subscribe();
    this._khoahocService.courses$.subscribe((result) => {
      console.log(result);
      
        this.courses = result;
        let a = [];
        for (let i = 0; i < this.courses?.length; i++) {
            for (let j = 0; j < this.danhmucs.length; j++) {
                if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                    a.push(this.courses[i]);
                }
            }
        }

        this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
        this.courses.sort((a, b) => {
            return a.Ordering - b.Ordering;
        });
        console.log(this.courses);
        
    });
  }

}
