import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddFooterService } from './add-footer.service';
import * as customBuild from "../../../ckCustomBuild/build/ckEditor"
@Component({
  selector: 'app-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.css']
})
export class AddFooterComponent implements OnInit {

  
  theme:any;
  message:'chon theme'
  FooterList: FormGroup;
footer:any;
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
  
  
  constructor(private addfooterService: AddFooterService, private fb: FormBuilder) { }

  onSubmit() {
    this.addfooterService.addFooter(this.FooterList.value)
    alert('Tạo nội dung thành công')
    
  }
  onFileChange(file){
    this.FooterList.get('logo').setValue(file.target.files);
  
  }
  onSelect(item){
   
    this.FooterList = this.fb.group({
      title: [item.data.title],
      phone: [item.data.phone],
      email:[item.data.email],
      address:[item.data.address],
      logo:[item.data.logo],
    });    
  }
  

  ngOnInit(): void {
 
    

    this.FooterList = this.fb.group({
      title:[''],
      phone:[''],
      email:[''],
      address:[''],
      logo:['']
      
      
    });

    this.addfooterService.getFooter().subscribe();
    this.addfooterService.footer$.subscribe((footer)=>{
      this.footer = footer
    })
    

    
  }
}
