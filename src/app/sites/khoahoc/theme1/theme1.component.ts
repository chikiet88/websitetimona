import { Component, OnInit, Input } from '@angular/core';

import { KhoahocService } from '../khoahoc.service';
import { Khoahoc } from '../khoahoc.types';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css']
})
export class Theme1Component implements OnInit {
 
  constructor(private route: ActivatedRoute, private router: Router, private khoahocService: KhoahocService, private location: Location, private state: RouterStateSnapshot) { }
  theme:any;
  
 
  goBack(): void {
    this.location.back();
  }
//   reloadCurrentRoute() {
//     const currentUrl = this.router.url;
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//         this.router.navigate([currentUrl]);
//     });
// }

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id')); //1
    if(id){
      this.khoahocService.getKhoahocChitiet(id)
      .subscribe(theme => {
        
        // const parentUrl = this.state.url.split('/').slice(0, -1).join('/');

        //                    // Navigate to there
        //                    this.router.navigateByUrl(parentUrl);
        
        this.theme = theme});
      // Get the parent url
                           
    }
    
    
  }

}
