import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  items: any;
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.contactService.getKhoahoc().subscribe((data) =>{
      this.items = data
      console.log(this.items);
      
    
    }) 
  }

}
