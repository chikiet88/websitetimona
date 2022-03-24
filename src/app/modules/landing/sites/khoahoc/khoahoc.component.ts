import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KhoahocService } from './khoahoc.service';
import { Khoahoc } from './khoahoc.types';

@Component({
  selector: 'app-khoahoc',
  templateUrl: './khoahoc.component.html',
  styleUrls: ['./khoahoc.component.css']
})
export class KhoahocComponent implements OnInit {
  
  constructor(private khoahocService: KhoahocService, private route: ActivatedRoute) { }
  

 reloadCurrentRoute() {
   
    
}
  ngOnInit(): void {
    
  }

}
