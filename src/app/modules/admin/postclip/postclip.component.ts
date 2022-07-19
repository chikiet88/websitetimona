import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostclipService } from './postclip.service';

@Component({
  selector: 'app-postclip',
  templateUrl: './postclip.component.html',
  styleUrls: ['./postclip.component.scss']
})
export class PostclipComponent implements OnInit {
  clipForm: FormGroup
  constructor(private _clipsSerrvice: PostclipService, private fb: FormBuilder) { }

  resetForm(){
    this.clipForm = this.fb.group({
        links:[''],
        idDM:['']
    }) 
  }
  onSubmit(){}
  updateClip(){}
  deleteClip(){}
  ngOnInit(): void {
   
  }

}
