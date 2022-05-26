import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { DanhmucService } from './danhmuc.service';
// import { DanhmucService } from './danhmuc.service';

@Component({
    selector: 'app-danhmuc',
    templateUrl: './danhmuc.component.html',
    styleUrls: ['./danhmuc.component.scss'],
})
export class DanhmucComponent implements OnInit {
    themes: any;
    danhmuc: any;
    theme: any;
    thumb;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    DanhmucList: FormGroup;
    selectTheme: any;
    idSelect;
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
        private DanhmucService: DanhmucService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}

    onSubmit() {
        this.DanhmucService.AddDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
                if (res) {
                    alert('Tạo nội dung thành công');
                } else {
                    alert('Tạo nội dung không thành công');
                }
            }
        );
        this.resetForm();
    }

    onSelect(item) {
        this.DanhmucList.get('pid').setValue(item.id);
    }
    onSelectDanhmuc(item) {
        this.DanhmucList.addControl('id', new FormControl(item.id));
        this.DanhmucList.get('id').setValue(item.id);
        this.DanhmucList.get('Tieude').setValue(item.Tieude);
        this.DanhmucList.get('Type').setValue(item.Tieude);
        this.DanhmucList.get('Slug').setValue(item.Slug);
        this.DanhmucList.get('pid').setValue(item.pid);
        this.idSelect = item.id;
    }
    deleteDanhmuc() {
        alert('Xóa Danhmuc thành công');
        this.DanhmucService.deleteDanhmuc(this.idSelect).subscribe();
        this.resetForm();
    }
    updateDanhmuc() {
        this.DanhmucService.updateDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
                if (res) {
                    alert('Cập nhật Danh mục thành công');
                } else {
                    alert('Cập nhật Danh mục không thành công');
                }
            }
        );
        this.resetForm();
    }
    resetForm() {
        this.DanhmucList = this.fb.group({
            Tieude: [''],
            Mota: [''],
            Image: [''],
            Type: [0],
            pid: [''],
            Slug: [''],
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
                this.thumb = res;
                this.DanhmucList.get('image').setValue(res);
            }
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    ngOnInit(): void {
        this.resetForm();

        this.DanhmucService.getDanhmuc().subscribe();
        this.DanhmucService.danhmucs$.subscribe((danhmuc) => {
            this.danhmuc = danhmuc;
        });

        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
