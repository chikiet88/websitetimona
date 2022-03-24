import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhoahocService } from '../../sites/khoahoc/khoahoc.service';
import { Khoahoc } from '../../sites/khoahoc/khoahoc.types';
import { MainlayoutService } from './mainlayout.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {
  public sanitizer: DomSanitizer
  items:any;
  menu:any;
  menuArray;
  Array = [];
  constructor(private mainlayoutService :MainlayoutService ) {}
  courses$: Observable<Khoahoc[]>;
  panelOpenState = false;
  showFiller = false;
  menuchild;
  getMenuchild(id){
   
     this.menuchild = this.menuArray.filter(e => e.parentid == id)
     
    //  console.log(this.menuchild);
     
     const showbaiviet = this.items.filter(e => e.idMenu == id)
      // console.log(showbaiviet);
      
    return this.menuchild
     
  }



  ngOnInit(): void {
 
    this.mainlayoutService.getKhoahoc().subscribe((data) =>{
     
      this.items=data
    
      
    
    }) 
    this.mainlayoutService.getMenu().subscribe((data)=>{
    //   const nest = (items, id = '', link = 'parentid') => items.filter(item => item[link] == id).map(item => ({
    //     ...item,
    //     children: nest(items, item.id)
    // }));

  
      console.log(data);
      
    // const datas= this.items.concat(data)
    // this.menu = nest(datas); 
    // console.log(this.menu);
       
    
    })
   
   
    
    
    
    

  }
  

}
