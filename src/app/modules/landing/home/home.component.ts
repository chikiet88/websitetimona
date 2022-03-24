import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Khoahoc } from './home.types';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
  styleUrls: ['./home.component.css'],

    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
  timedOutCloser;
    items:any;
    menu:any;
    menuArray;
    Array = [];
    constructor(private homeService :HomeService ) {}
    courses$: Observable<Khoahoc[]>;
    panelOpenState = false;
    showFiller = false;
   
    mouseEnter(trigger) {
      if (this.timedOutCloser) {
        clearTimeout(this.timedOutCloser);
      }
      trigger.openMenu();
    }
  
    mouseLeave(trigger) {
      this.timedOutCloser = setTimeout(() => {
        trigger.closeMenu();
      }, 150);
    }
  
    ngOnInit(): void {
   
      
      this.homeService.getMenu().subscribe((dataMenu)=>{

        this.homeService.getKhoahoc().subscribe((dataBaiviet) =>{
       
          this.items=dataBaiviet
          const array = []
          dataMenu.forEach(v1 => {
            const x = [];
            dataBaiviet.forEach(v2 =>{
              if(v1.id === v2.parentid){
                x.push(v2);
              }
              v1.Baiviet = x;
            })
          });
          this.menu = nest(dataMenu).reverse(); 
        
        })



        const nest = (items, id = '', link = 'parentid') => items.filter(item => item[link] == id).map(item => ({
          ...item,
          children: nest(items, item.id)
      }));
  
        
  
      // const datas= this.items.concat(data)
      

         
      
      })
     
     
      
      
      
      
  
    }
}
