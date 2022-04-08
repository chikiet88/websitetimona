import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
