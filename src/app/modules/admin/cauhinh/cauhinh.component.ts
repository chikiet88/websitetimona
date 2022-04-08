import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import * as customBuild from "../../ckCustomBuild/build/ckEditor"
import { CauhinhService } from './cauhinh.service';

@Component({
  selector: 'app-cauhinh',
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.scss']
})
export class CauhinhComponent implements OnInit {

  idSelect;
  theme:any;
  message:'chon theme'
  cauhinhList: FormGroup;
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
  
  
  constructor(private cauhinhService: CauhinhService, private fb: FormBuilder) { }

  onSubmit() {
  this.cauhinhService.addCauhinh(this.cauhinhList.value).subscribe()
  
    alert('Tạo nội dung thành công')
    
  }
  // onFileChange(file){
  //   this.cauhinhList.get('logo').setValue(file.target.files);
  
  // }
  onSelect(item){
    this.cauhinhList.get('module').setValue(item.module);
    this.cauhinhList.get('des').setValue(item.des);
    this.cauhinhList.get('data.title').setValue(item.data.title);
    this.cauhinhList.get('data.phone').setValue(item.data.phone);
    this.cauhinhList.get('data.email').setValue(item.data.email);
    this.cauhinhList.get('data.address').setValue(item.data.address);
    // this.cauhinhList.addControl('id', new FormControl(item.id));
    // this.cauhinhList.get('id').setValue(item.id);

    this.idSelect   = item.id
  }
  updateCauhinh() {
    alert('Cập nhật thành công');
    this.cauhinhService.updateCauhinh(this.cauhinhList.value).subscribe();
}
  
  
  deleteCauhinh() {
    alert('Xóa bài thành công');
    this.cauhinhService.deleteCauhinh(this.idSelect).subscribe();
}
// updateBaiviet() {
//     alert('Cập nhật thành công');

//     this.cauhinhService.updateBaiviet(this.userProfile.value).subscribe();
// }

  ngOnInit(): void {
    this.cauhinhList = this.fb.group({
      module:[''],
      des:[''],
      data: this.fb.group(
        {
          title:[''],
          phone:[''],
          address:[''],
          email:[''],
          
        }
      ),
    });

    this.cauhinhService.getCauhinh().subscribe();
        this.cauhinhService.cauhinhs$
            .pipe(
                map(
                    (arr) =>
                        arr && arr.length && arr.filter((r) => r.module == 'Footer')
                )
            )
            .subscribe((result) => {this.footer = result
            
            });

    

    
  }
}
