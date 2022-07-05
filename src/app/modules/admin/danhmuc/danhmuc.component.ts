import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { DanhmucService } from './danhmuc.service';
// import { DanhmucService } from './danhmuc.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { map, take } from 'rxjs';
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}
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
    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.Tieude || node.title,
            level: level,
            item: node,
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        (node) => node.level,
        (node) => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
    );
    constructor(
        private DanhmucService: DanhmucService,
        private fb: FormBuilder,
        private uploadService: FileUploadService
    ) {
        this.Editor = customBuild;
    }
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
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
        this.DanhmucList.get('Ordering').setValue(item.Ordering);

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
            Ordering:[0],
            tenDMcha: [''],
        });
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.DanhmucList.get('Image').setValue(x.url);
            this.thumb = x.url;
        });
        return;
    }
    callback(item, i) {
        return new Promise((resolve, reject) => {
            const file: File | null = item;

            this.currentFileUpload = new FileUpload(file);
            this.uploadService
                .pushFileToStorage(this.currentFileUpload)
                .subscribe(
                    (percentage) => {
                        this.percentage = Math.round(
                            percentage ? percentage : 0
                        );

                        if (percentage == 100) {
                            setTimeout(() => {
                                this.uploadService
                                    .getFiles(1) //lấy file  chứa key từ firebase về
                                    .snapshotChanges()
                                    .pipe(
                                        take(1),
                                        map((changes) =>
                                            // store the key
                                            changes.map((c) => ({
                                                key: c.payload.key,
                                                ...c.payload.val(),
                                            }))
                                        )
                                    )
                                    .subscribe((fileUploads) => {
                                        if (fileUploads[0]?.key) {
                                            fileUploads = fileUploads.reverse();
                                            resolve(fileUploads[0]);
                                        }
                                    });
                            }, 1000);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
         
        });
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    nest = (items, id = '', link = 'pid') =>
    items
        ?.filter((item) => item[link] == id)
        .map((item) => ({
            ...item,
            children: this.nest(items, item.id),
        }));
    ngOnInit(): void {
        this.resetForm();

        this.DanhmucService.getDanhmuc().subscribe();
        this.DanhmucService.danhmucs$.subscribe((danhmuc) => {
            this.danhmuc = danhmuc;
            this.dataSource.data = this.nest(danhmuc);
        });
       
        // this.addheaderService.getHeader().subscribe();

        // this.addheaderService.themes$.subscribe((themes)=>{
        //   this.themes = themes
        // })
    }
}
