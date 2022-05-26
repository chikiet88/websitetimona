import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';
import { Khoahoc } from './contact-types';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  items:Khoahoc[];
  constructor(private contactService: ContactService, private homeService: HomeService) { }
  ngOnInit(): void {
    // window.location.href = 'https://v1.timona.edu.vn/lien-he.html'
   
    this.homeService.courses$.pipe(
      map(
          (arr) =>
              arr && arr.length && arr.filter((r) => r.Loaibaiviet == 1 && r.parentid == 5)
      )
  )
  .subscribe((result) => (this.items = result));
  }

}
