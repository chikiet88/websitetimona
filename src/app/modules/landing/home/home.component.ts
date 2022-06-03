import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Khoahoc } from './home.types';
import $ from 'jquery';
import { ViewportScroller } from '@angular/common';
import { FacebookService, InitParams } from 'ngx-facebook';
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
    constructor(private homeService :HomeService, private scroll: ViewportScroller, private facebookService: FacebookService ) {
      this.initFacebookService();
    }
    private initFacebookService(): void {
      const initParams: InitParams = { xfbml:true, version:'v3.2'};
      this.facebookService.init(initParams);
    }
    courses$: Observable<Khoahoc[]>;
    panelOpenState = false;
    showFiller = false;
    isShow=false;
    
    goDown1() {
      document.getElementById("header").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  
    
   
    toggleMenu()
    {
      this.isShow =!this.isShow
    }
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
    mouseRemove(trigger){
      this.timedOutCloser = setTimeout(() => {
        trigger.closeMenu();
      }, 150);
    }
    scrollToTop(){
      this.scroll.scrollToPosition([0,0]);
    }
     nest = (items, id = '', link = 'parentid') => items.filter(item => item[link] == id).map(item => ({
      ...item,
      children: this.nest(items, item.id)
  }));
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
          this.menu = this.nest(dataMenu).reverse(); 
        
        })



        
  
        
  
      // const datas= this.items.concat(data)
      

         
      
      })
     
     
      
      
      
      
  
    }
}
