import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  active = ''
  active1 = 'hidden'
  hidden = ''
  hidden1 = ''

  showVideo(){
    this.active = 'active'
    this.hidden = 'hidden'
  }
  showVideo1(){
    this.active1 = 'block'
    this.hidden1 = 'hidden'
    
  }
  ngOnInit(): void {
  }

}
