import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  themes:any;
  menu:any;
  theme:any;
  message:'chon theme'
  MenuList: FormGroup;
  selectTheme: any;

  public config = {
    htmlSupport: {
      allow: [
        {
            name: /.*/,
            attributes: true,
            classes: true
        }
    ],
    

     
  }
  }
  
  
  constructor(private MenuService: MenuService, private fb: FormBuilder) { }

  onSubmit() {
    this.MenuService.Addmenu(this.MenuList.value)
    console.log(this.MenuList.value);
    alert('Tạo nội dung thành công')
    
  }

  onSelect(item){    
    this.MenuList = this.fb.group({
      parentid: [item.id],
      title: [item.title],
      slug:[item.slug],
      status:[item.status],
      ngaytao:[item.ngaytao],
    });
           
  }


  ngOnInit(): void {
 
    

    this.MenuList = this.fb.group({
      title: [''],
      menu:[''],
      parentid:[''],
      slug:[''],
      status:[''],
      ngaytao:[''],
    });

   this.MenuService.getMenu().subscribe();
   this.MenuService.menu$.subscribe((menu)=>{
    this.menu = menu
  })
  
    // this.addheaderService.getHeader().subscribe();
    
    // this.addheaderService.themes$.subscribe((themes)=>{
    //   this.themes = themes
    // })

    
  }

}
