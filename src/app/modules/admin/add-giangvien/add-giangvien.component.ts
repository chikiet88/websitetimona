import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { AddGiangvienService } from './add-giangvien.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';

@Component({
  selector: 'app-add-giangvien',
  templateUrl: './add-giangvien.component.html',
  styleUrls: ['./add-giangvien.component.scss']
})
export class AddGiangvienComponent implements OnInit {
  themes: any;
    giangviens: any;
    theme: any;
    thumb;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    GiangvienList: FormGroup;
    selectTheme: any;
    idSelect;
    public Editor: customBuild;

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
    };

    constructor(
        private GiangvienService: AddGiangvienService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.Editor = customBuild;
    }

    onSubmit() {
        this.GiangvienList.removeControl('id');

        this.GiangvienService.AddGiangvien(this.GiangvienList.value).subscribe(
            (res) => {
                if (res) {
                    console.log(res);

                    alert('Tạo nội dung thành công');
                } else {
                    alert('Tạo nội dung không thành công');
                }
            }
        );
        this.resetForm();
    }

    onSelectGiangvienEdit(item) {
        this.resetForm();
        this.GiangvienList.addControl('id', new FormControl(item.id));
        this.GiangvienList.get('id').setValue(item.id);
        this.GiangvienList.get('Mota').setValue(item.Mota);
        this.GiangvienList.get('Image').setValue(item.Image);

      
        this.idSelect = item.id;
        this.thumb = item.Image;
    }
  
    deleteGiangvien() {
        this.GiangvienService.deleteGiangvien(this.idSelect).subscribe((res) =>
            alert('Xóa Giảng viên thành công')
        );
        this.resetForm();
    }
    updateGiangvien() {
        this.GiangvienList.removeControl('tenDMcha');

        this.GiangvienService.updateGiangvien(this.GiangvienList.value).subscribe(
            (res) => {
                if (res) {
                    console.log(res);

                    alert('Cập nhật Giảng viên thành công');
                } else {
                    alert('Cập nhật Giảng viên không thành công');
                }
            }
        );
        this.resetForm();
    }
    resetForm() {
        this.GiangvienList = this.fb.group({
            Mota: [''],
            Image: [''],
        });
    }
    upload(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            if (file) {
                this.currentFileUpload = new FileUpload(file);
                this.uploadService
                    .pushFileToStorage(this.currentFileUpload)
                    .subscribe(
                        (percentage) => {
                            this.percentage = Math.round(
                                percentage ? percentage : 0
                            );
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        }
        this.uploadService._thumb$.subscribe((res) => {
            if (res) {
                this.thumb = res.url;
                this.GiangvienList.get('Image').setValue(res.url);
            }
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    ngOnInit(): void {
        this.resetForm();

        this.GiangvienService.getGiangvien().subscribe();
        this.GiangvienService.giangviens$.subscribe((giangviens) => {
            this.giangviens = giangviens;
        });

        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
