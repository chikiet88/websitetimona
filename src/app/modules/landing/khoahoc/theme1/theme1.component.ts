import { Component, OnInit, Input, ViewEncapsulation, Pipe } from '@angular/core';

import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({

  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Theme1Component implements OnInit {
  course$: Observable<Khoahoc>;
  massTimingsHtml;

  constructor( private khoahocService: KhoahocService, private sanitizer: DomSanitizer) {
    // this.massTimingsHtml = this.getInnerHTMLValue()
  }
  
  theme:any;
  
 text:SafeHtml
 
 getCourse(){
    
  this.khoahocService.course$
      
  .subscribe((course: any) => {
    
      // Update the counts
      this.theme = course[0];
      
  });
  
  
 // return this.sanitizer.bypassSecurityTrustHtml(this.theme.content);

  
 }
 
 
 
//   reloadCurrentRoute() {
//     const currentUrl = this.router.url;
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//         this.router.navigate([currentUrl]);
//     });
// }

  ngOnInit(): void {
    this.getCourse()
    
    
  }

}
