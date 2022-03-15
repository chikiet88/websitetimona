import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhoahocService } from './khoahoc.service';
import { Khoahoc } from './khoahoc.types';

@Component({
  selector: 'app-khoahoc',
  templateUrl: './khoahoc.component.html',
  styleUrls: ['./khoahoc.component.css']
})
export class KhoahocComponent implements OnInit {
  themes: Khoahoc[] = [];
  selectTheme:any;
  constructor(private khoahocService: KhoahocService) { }
  getKhoahoc(){
    this.themes = this.khoahocService.getKhoahoc();
  }

 getKhoahocChitet(theme:any){
  const id = theme.id
  this.khoahocService.getKhoahocChitiet(id).subscribe(detail => this.selectTheme = detail )
 }
  ngOnInit(): void {
    this.getKhoahoc();
    
  }

}
