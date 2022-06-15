import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { LetotnghiepService } from './letotnghiep.service';

@Component({
    selector: 'app-letotnghiep',
    templateUrl: './letotnghiep.component.html',
    styleUrls: ['./letotnghiep.component.scss'],
})
export class LetotnghiepComponent implements OnInit {
    hinhletotnghiep: any;
    theme: any;
    thumb;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    letotnghiepList: FormGroup;
    selectTheme: any;
    idSelect;

    constructor(
        private _letotnghiepService: LetotnghiepService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {}

    onSubmit() {
        console.log(this.letotnghiepList.value);

        this._letotnghiepService
            .AddHinhLetotnghiep(this.letotnghiepList.value)
            .subscribe((res) => {
                if (res) {
                    console.log(res);

                    alert('Tạo nội dung thành công');
                } else {
                    alert('Tạo nội dung không thành công');
                }
            });
        this.resetForm();
    }

    onSelectDanhmucEdit(item) {
        this.resetForm();
        this.letotnghiepList.addControl('id', new FormControl(item.id));
        this.letotnghiepList.get('id').setValue(item.id);
        this.letotnghiepList.get('Tieude').setValue(item.Tieude);
        this.letotnghiepList.get('Image').setValue(item.Image);
        this.idSelect = item.id;
        this.thumb = item.Image;
    }
    onSelectDanhmucCha(item) {
        this.letotnghiepList.get('pid').setValue(item.id);
    }
    deleteDanhmuc() {
        this._letotnghiepService
            .deleteHinhLetotnghiep(this.idSelect)
            .subscribe((res) => alert('Xóa Danhmuc thành công'));
        this.resetForm();
    }
    updateDanhmuc() {
        this._letotnghiepService
            .updateHinhLetotnghiep(this.letotnghiepList.value)
            .subscribe((res) => {
                if (res) {
                    console.log(res);

                    alert('Cập nhật Danh mục thành công');
                } else {
                    alert('Cập nhật Danh mục không thành công');
                }
            });
        this.resetForm();
    }
    resetForm() {
        this.letotnghiepList = this.fb.group({
            Tieude: [''],
            Image: [''],
            thumbimage: [''],
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
                this.letotnghiepList.get('thumbimage').setValue(res.url);
            }
        });
    }
    upload2(): void {
        if (this.selectedFiles) {
            console.log(this.selectedFiles);
            for (let i = 0; i < this.selectedFiles.length; i++) {
                const file: File | null = this.selectedFiles[i];
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
            this.uploadService
                .getFiles(this.selectedFiles.length)
                .snapshotChanges()
                .pipe(
                    map((changes) =>
                        // store the key
                        changes.map((c) => ({
                            key: c.payload.key,
                            ...c.payload.val(),
                        }))
                    )
                )
                .subscribe((fileUploads) => {
                  this.letotnghiepList.get('Image').setValue(fileUploads)
                });
            this.selectedFiles = undefined;
        }
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    ngOnInit(): void {
        this.resetForm();

        this._letotnghiepService.getHinhLetotnghiep().subscribe();
        this._letotnghiepService.letotnghieps$.subscribe((hinhletotnghiep) => {
            this.hinhletotnghiep = hinhletotnghiep;
        });

        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
