import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ThemeService } from './theme.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
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
  idtheme;
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
    this.themeService.postTheme(this.userProfile.value).subscribe()
    alert('Tạo nội dung thành công') 
  }

  updateTheme(){
    alert('Cập nhật thành công')
    
    this.themeService.updateTheme(this.userProfile.value).subscribe()
  }
  deleteTheme(){
    alert('Xóa thêm thành công')
    
    this.themeService.deleteTheme(this.idtheme).subscribe()
  }

  onSelect(item){    
    this.userProfile.get('content').setValue(item.content);
    this.userProfile.get('title').setValue(item.title);
    this.userProfile.addControl('id', new FormControl(item.id));
    this.userProfile.get('id').setValue(item.id);
    this.idtheme = item.id
  }
  // onSelectId(id){
    
  //   this.userProfile.get('parentid').setValue(id);   
  // }   



  ngOnInit(): void {

    

    this.userProfile = this.fb.group({
      title: [''],
      // des:[''],
      content:[''],
      // parentid:[''],
      // slug: [''],
      
    });
    this.themeService.getTheme()
    
    this.themeService.themes$.subscribe((themes)=>{
      this.themes = themes
      
    })
    // this.themeService.getMenu().subscribe();
    // this.themeService.menu$.subscribe((menu)=>{
    //   this.menu = menu.filter(e => e.parentid =='')
    //   console.log(this.menu);
      
    // })

    
  }

}
