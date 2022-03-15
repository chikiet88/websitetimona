import { Component, OnInit } from '@angular/core';
import { KhoahocService } from 'src/app/sites/khoahoc/khoahoc.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {
  items:any;
  constructor(private khoahocService :KhoahocService ) {}
  panelOpenState = false;
  showFiller = false;
  theme:any;
  onSelect(id:number){
    this.khoahocService.getKhoahocChitiet(id)
    .subscribe(theme => this.theme = theme);
  }
  ngOnInit(): void {
      this.items = this.khoahocService.getKhoahoc()
  }
  

}
