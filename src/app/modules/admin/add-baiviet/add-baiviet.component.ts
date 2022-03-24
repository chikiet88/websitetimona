import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddBaivietService } from './add-baiviet.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';

@Component({
  selector: 'app-add-baiviet',
  templateUrl: './add-baiviet.component.html',
  styleUrls: ['./add-baiviet.component.scss']
})
export class AddBaivietComponent implements OnInit {

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
  
  
  constructor(private baivietService: AddBaivietService, private fb: FormBuilder) { }

  onSubmit() {
    this.baivietService.postTheme(this.userProfile.value)
    alert('Tạo nội dung thành công')
    
  }

  onSelect(item){    
    this.userProfile.get('content').setValue(item.content);
    console.log(item);
    
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
    this.baivietService.getTheme().subscribe();
    
    this.baivietService.themes$.subscribe((themes)=>{
      this.themes = themes
      console.log(themes);
      
    })
    this.baivietService.getMenu().subscribe();
    this.baivietService.menu$.subscribe((menu)=>{
      this.menu = menu.filter(e => e.parentid =='')
      console.log(this.menu);
      
    })
  }

}
