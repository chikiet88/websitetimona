import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as customBuild from "../../ckCustomBuild/build/ckEditor"
import { AddContactService } from './add-contact.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contacts:any;
  
  message:'chon theme'
  ContactBanner: FormGroup;
 
  onFileChange(file){
    
    this.ContactBanner = this.fb.group({
           bannerimg: [file.target.files],
      bannerform: [file.target.files],
    });
  }
  
  constructor(private contactService: AddContactService, private fb: FormBuilder) { }

  onSubmit() {
    
    this.contactService.addContact(this.ContactBanner.value)
    
    this.contactService.contact$.subscribe((data)=>
      this.contacts = data
    )

    alert('Tạo nội dung thành công')
    
  }

  // onSelect(item){    
  //   this.ContactBanner = this.fb.group({
  //     bannerimg: [item.img],
  //     bannerform: [item.bannerform],
  //   });
           
  // }


  ngOnInit(): void {
 
    

    this.ContactBanner = this.fb.group({
      bannerimg: [''],
      bannerform: [''],
    });

  //  this.contactService.getMenu().subscribe();
  //  this.contactService.menu$.subscribe((menu)=>{
  //   this.menu = menu
  // })
  
    // this.addheaderService.getHeader().subscribe();
    
    // this.addheaderService.themes$.subscribe((themes)=>{
    //   this.themes = themes
    // })

    
  }



}
