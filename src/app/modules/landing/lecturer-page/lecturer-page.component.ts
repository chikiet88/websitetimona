import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';

@Component({
    selector: 'app-lecturer-page',
    templateUrl: './lecturer-page.component.html',
    styleUrls: ['./lecturer-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LecturerPageComponent implements OnInit {
    lecturer;
    slug;
    constructor(private homeService: HomeService, private route: ActivatedRoute) {}

  
    ngOnInit(): void {
      this.slug = this.route.snapshot.paramMap.get("slug")
      this.homeService.getKhoahocChitiet(this.slug).subscribe((result)=> {
        this.lecturer = result
        console.log(result);
        
      })
        
    }
}
