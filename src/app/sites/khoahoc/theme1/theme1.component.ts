import { Component, OnInit, Input } from '@angular/core';

import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css']
})
export class Theme1Component implements OnInit {
 
  constructor(private route: ActivatedRoute, private khoahocService: KhoahocService, private location: Location) { }
  theme:any;
  
 
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.khoahocService.getKhoahocChitiet(id)
      .subscribe(theme => this.theme = theme);
    }
    
    
  }

}
