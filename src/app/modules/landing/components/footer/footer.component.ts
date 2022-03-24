import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer:any;
  constructor(private footerService: FooterService) { }

  ngOnInit(): void {

    this.footerService.getFooter().subscribe();
    this.footerService.footer$.subscribe((footer)=>{
      // this.footer = footer[footer.length - 1]
    })
  }

}
