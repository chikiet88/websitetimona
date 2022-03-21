import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as customBuild from '../../../ckCustomBuild/build/ckEditor';
import { AddHeaderService } from './add-header.service';

@Component({
  selector: 'app-add-header',
  templateUrl: './add-header.component.html',
  styleUrls: ['./add-header.component.css']
})
export class AddHeaderComponent implements OnInit {
  themes:any;

  theme:any;
  message:'chon theme'
  userProfile: FormGroup;
  selectTheme: any;

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
  
  
  constructor(private addheaderService: AddHeaderService, private fb: FormBuilder) { }

  onSubmit() {
    this.addheaderService.addHeader(this.userProfile.value)
    alert('Tạo nội dung thành công')
    
  }

  onSelect(theme){
    this.selectTheme = theme
    this.userProfile = this.fb.group({
      title: [this.selectTheme.data.title],
      des:[this.selectTheme.data.des],
      content:[this.selectTheme.data.content],

    });
           
  }
  onFileChange(file){
    
  }

  ngOnInit(): void {
 
    

    this.userProfile = this.fb.group({
      img: [''],
      menu:[''],
      
      
    });
    this.addheaderService.getHeader().subscribe();
    
    this.addheaderService.themes$.subscribe((themes)=>{
      this.themes = themes
    })

    
  }
}
