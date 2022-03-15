import { Component, OnInit } from '@angular/core';
import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';

@Component({
  selector: 'app-khoahoc-list',
  templateUrl: './khoahoc-list.component.html',
  styleUrls: ['./khoahoc-list.component.css']
})
export class KhoahocListComponent implements OnInit {
  themes: Khoahoc[] = [];
  selectTheme:any;
  constructor(private khoahocService: KhoahocService) { }
  getKhoahoc(){
    this.themes = this.khoahocService.getKhoahoc();
  }
  ngOnInit(): void {
    this.getKhoahoc()
  }

}
