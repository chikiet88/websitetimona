import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  news;
  constructor(private homesService: HomeService) { }

  ngOnInit(): void {
    this.homesService.courses$
            .pipe(
                map(
                    (arr) =>
                        arr && arr.length && arr.reverse().filter((r) => r.Loaibaiviet == 1 && r.parentid == 16)
                )
            )
            .subscribe((result) => (this.news = result));            
  }
  

}
