import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddBaivietService } from './add-baiviet.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
import { Khoahoc } from '../theme/theme.types';
import { map } from 'rxjs';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { ChangeEvent, FocusEvent, BlurEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
@Component({
    selector: 'app-add-baiviet',
    templateUrl: './add-baiviet.component.html',
    styleUrls: ['./add-baiviet.component.scss'],
})
export class AddBaivietComponent implements OnInit {
    fileUploads?: any[];

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
    themes: any;
    theme: any;
    message: 'chon theme';
    userProfile: FormGroup;
    selectTheme: any;
    menu: any;
    loader;
    idSelect;
    thumb;
    courses: Khoahoc[];
    public Editor = customBuild;
    BACK_END_MAPPING_URL_FOR_SAVE_IMG:string = 'gs://timona-9c284.appspot.com/uploads';

    public config = {

        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                },
            ],
        },
        ckfinder: {
            options: {
                resourceType: 'Images'
            },
            uploadUrl: this.BACK_END_MAPPING_URL_FOR_SAVE_IMG,
            withCredentials: false,
            
            headers: {
                'X-CSRF-TOKEN': 'CSRF-Token',
                Authorization: 'Bearer AIzaSyCQ58kPYsxlE328vWL7BlkxfkHhJwLSYb8'
            }
          },
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl:  this.BACK_END_MAPPING_URL_FOR_SAVE_IMG,

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
                'X-CSRF-TOKEN': 'CSRF-Token',
                Authorization: 'Bearer AIzaSyCQ58kPYsxlE328vWL7BlkxfkHhJwLSYb8'
            }
        }
    };
  
    
  public componentEvents: string[] = [];
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  

    constructor(
        private baivietService: AddBaivietService,
        private fb: FormBuilder,
        private uploadService: FileUploadService,
    ) {}

    onSubmit() {
        
        this.baivietService.postCourse(this.userProfile.value).subscribe();
        alert('Tạo nội dung thành công');
    }

    onSelect(item) {
        this.userProfile.get('content').setValue(item.content);
        this.userProfile.get('title').setValue(item.title);
    }
    onSelectId(id) {
        this.userProfile.addControl('parentid', new FormControl(id));
        this.userProfile.get('parentid').setValue(id);
        this.baivietService.courses$
        .pipe(
            map(
                (arr) =>
                    arr && arr.length && arr.filter((r) => r.parentid == id)
            )
        )
        .subscribe((result) => (this.courses = result));
    
        
        
    }

    onSelectBaiviet(item) {
        this.userProfile.get('content').setValue(item.content);
        this.userProfile.get('des').setValue(item.des);
        this.userProfile.get('title').setValue(item.title);
        this.userProfile.addControl('id', new FormControl(item.id));
        this.userProfile.get('id').setValue(item.id);
        this.userProfile.get('slug').setValue(item.slug);
        this.userProfile.get('Loaibaiviet').setValue(item.Loaibaiviet);
        this.userProfile.get('thumbimage').setValue(item.thumbimage);

        this.idSelect = item.id;
        this.thumb = item.thumbimage
        
    }
    deleteBaiviet() {
        alert('Xóa bài thành công');
        this.baivietService.deleteBaiviet(this.idSelect).subscribe();
    }
    updateBaiviet() {
        alert('Cập nhật thành công');

        this.baivietService.updateBaiviet(this.userProfile.value).subscribe();
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
      }
      deleteFileUpload(fileUpload: FileUpload): void {
        console.log(fileUpload);
        
        this.uploadService.deleteFile(fileUpload);
      }

    ngOnInit(): void {
        this.userProfile = this.fb.group({
            title: [''],
            des: [''],
            content: [''],
            slug:[''],
            Loaibaiviet:[0],
            thumbimage:[''],
        });
        this.baivietService.getTheme().subscribe();

        this.baivietService.themes$.subscribe((themes) => {
            this.themes = themes;
        });
        this.baivietService.getMenu().subscribe();
        this.baivietService.menu$
            .pipe(
                map(
                    (arr) =>
                        arr && arr.length && arr.filter((r) => r.parentid == '')
                )
            )
            .subscribe((result) => (this.menu = result));

        this.baivietService.getBaiviet().subscribe();
        this.baivietService.courses$.subscribe((courses) => {
            this.courses = courses;
        });

        this.uploadService.getFiles(1).snapshotChanges().pipe(
            map(changes =>
              // store the key
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          ).subscribe(fileUploads => {
            this.fileUploads = fileUploads.reverse();
            // console.log(fileUploads);
            
          });
          this.uploadService._thumb$.subscribe((res)=>{
              if(res){
                this.userProfile.get('thumbimage').setValue(res);
              }

              
          })
    }
}
