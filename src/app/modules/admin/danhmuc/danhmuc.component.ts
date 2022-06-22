import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { DanhmucService } from './danhmuc.service';
// import { DanhmucService } from './danhmuc.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';

@Component({
    selector: 'app-danhmuc',
    templateUrl: './danhmuc.component.html',
    styleUrls: ['./danhmuc.component.scss'],
    encapsulation: ViewEncapsulation.None
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
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        }
    };

    constructor(
        private DanhmucService: DanhmucService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.Editor = customBuild;
    }

    onSubmit() {
        this.DanhmucList.removeControl('id');
        this.DanhmucList.removeControl('tenDMcha');
        console.log(this.DanhmucList.value);

        this.DanhmucService.AddDanhmuc(this.DanhmucList.value).subscribe(
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

    onSelectDanhmucEdit(item) {
        this.resetForm();
        this.DanhmucList.addControl('id', new FormControl(item.id));
        this.DanhmucList.get('id').setValue(item.id);
        this.DanhmucList.get('Tieude').setValue(item.Tieude);
        this.DanhmucList.get('Mota').setValue(item.Mota);
        this.DanhmucList.get('Image').setValue(item.Image);
        this.DanhmucList.get('pid').setValue(item.pid);
        this.DanhmucList.get('Type').setValue(item.Type);
        this.DanhmucList.get('Slug').setValue(item.Slug);
        console.log(item);

        this.danhmuc.find((x) => {
            if (x.id == item.pid) {
                this.DanhmucList.get('tenDMcha').setValue(x.Tieude);
                console.log(x);
                
            }
        });
        this.idSelect = item.id;
        this.thumb = item.Image;
    }
    onSelectDanhmucCha(item) {
        this.DanhmucList.get('pid').setValue(item.id);
    }
    deleteDanhmuc() {
        this.DanhmucService.deleteDanhmuc(this.idSelect).subscribe((res) =>
            alert('Xóa Danhmuc thành công')
        );
        this.resetForm();
    }
    updateDanhmuc() {
        this.DanhmucList.removeControl('tenDMcha');

        this.DanhmucService.updateDanhmuc(this.DanhmucList.value).subscribe(
            (res) => {
                if (res) {
                    console.log(res);

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
            Type: [''],
            pid: [''],
            Slug: [''],
            tenDMcha: [''],
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
                this.DanhmucList.get('Image').setValue(res.url);
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
