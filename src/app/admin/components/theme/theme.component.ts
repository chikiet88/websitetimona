import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from './theme.service';
import * as customBuild from '../../../ckCustomBuild/build/ckEditor';
import { Khoahoc } from 'src/app/sites/khoahoc/khoahoc.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes:any;
  theme:any;
  message:'chon theme'
  userProfile: FormGroup;
  selectTheme: any;
  menu:any;
  public Editor = customBuild;
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
  
  
  constructor(private themeService: ThemeService, private fb: FormBuilder) { }

  onSubmit() {
    this.themeService.postTheme(this.userProfile.value)
    alert('Tạo nội dung thành công')
    
  }

  onSelect(item){    
    this.userProfile.get('content').setValue(item.content);
    this.userProfile.get('des').setValue(item.des);
    this.userProfile.get('title').setValue(item.title);      
  }
  onSelectId(id){
    
    this.userProfile.get('parentid').setValue(id);   
  }   


  ngOnInit(): void {

    

    this.userProfile = this.fb.group({
      title: [''],
      des:[''],
      content:[''],
      parentid:[''],
      slug: [''],
      
    });
    this.themeService.getTheme().subscribe();
    
    this.themeService.themes$.subscribe((themes)=>{
      this.themes = themes
      console.log(this.themes);
      
    })
    this.themeService.getMenu().subscribe();
    this.themeService.menu$.subscribe((menu)=>{
      this.menu = menu.filter(e => e.parentid =='')
      console.log(this.menu);
      
    })

    
  }

}
