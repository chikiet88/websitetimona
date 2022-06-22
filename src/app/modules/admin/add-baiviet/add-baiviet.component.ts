import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddBaivietService } from './add-baiviet.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
import { Khoahoc } from '../theme/theme.types';
import { map, Observable, take } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { MyUploadAdapter } from '../MyUploadAdapter';
import { DanhmucService } from '../danhmuc/danhmuc.service';

@Component({
    selector: 'app-add-baiviet',
    templateUrl: './add-baiviet.component.html',
    styleUrls: ['./add-baiviet.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddBaivietComponent implements OnInit {
    fileUploads?: any[];
    public html: string;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    themes: any[];
    theme: any;
    danhmucs: any[];
    message: 'chon theme';
    baivietForm: FormGroup;
    selectTheme: any;
    menu: any[];
    isSelectTheme1 = false;
    isSelectTheme2 = false;
    listslide1: any = {};
    listslide2: any = {};
    listkey: any = {};
    listimage: any[] = [];
    i = 0;
    loader;
    idSelect;
    thumb;
    isbaiviet; // title loại bài viết (có hoặc không)
    courses: any;
    tenDMcha;
    // formBaiviet;
    slide1 = {};
    slide2 = {};
    itemIdCarousel1: number;
    itemIdCarousel2: number;
    itemContentCarousel1: any;
    itemContentCarousel2: any;
    isSelectedCarousel1 = false;
    isSelectedCarousel2 = false;
    ckeditorImage;
    public Editor: customBuild;
    checklistCourse: any[] = [];
    BACK_END_MAPPING_URL_FOR_SAVE_IMG: string =
        'gs://timona-9c284.appspot.com/uploads';

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

    public componentEvents: string[] = [];
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
            this.uploadService._thumb$.pipe(take(2)).subscribe((res) => {
                if (res != undefined && res != null) {
                    this.thumb = res.url;
                    this.baivietForm.get('thumbimage').setValue(res?.url);
                    // this.formBaiviet.thumbimage = res.url;
                }
            });
        }
    }
    upload2(): void {
        if (this.selectedFiles) {
            console.log(this.selectedFiles);
            for (
                let i = 0, p = Promise.resolve();
                i < this.selectedFiles.length;
                i++
            ) {
                p = p
                    .then(() => this.callback(this.selectedFiles.item(i), i))
                    .then((x: string) => {
                        this.listkey[i] = x;
                        if (
                            Object.keys(this.listkey).length ==
                            this.selectedFiles.length
                        ) {
                            for (const property in this.listkey) {
                                this.uploadService
                                    .getValueByKey(this.listkey[property])
                                    .pipe(take(1))
                                    .subscribe((res) => {
                                        this.listimage.push([
                                            ...res,
                                            this.listkey[property],
                                        ]);
                                        console.log(this.listimage);
                                    });
                            }
                        }
                    });
            }
        }

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
                                            resolve(fileUploads[0].key);
                                        }
                                    });
                            }, 500);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            // if (this.percentage == 100) {
            //     resolve(this.percentage);
            // } else {
            //     reject('sss');
            // }
        });
    }
    deleteImageFirebase(item, i) {
        this.listimage = this.listimage.filter((x) => x[2] != item[2]);
        console.log(this.listimage);

        this.uploadService.deleteFile(item);
    }
    constructor(
        private baivietService: AddBaivietService,
        private fb: FormBuilder,
        private uploadService: FileUploadService,
        private _danhmucService: DanhmucService
    ) {
        this.html = '';
        this.Editor = customBuild;
    }
    getLinkImage(number) {
        this.uploadService
            .getFiles(number) //lấy file  chứa key từ firebase về
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
                console.log(fileUploads);
            });
    }
    onSubmit() {
        this.baivietForm.get('image').setValue(this.listkey);
        this.baivietForm.get('listslide1').setValue(this.listslide1);
        this.baivietForm.get('listslide2').setValue(this.listslide2);
        this.baivietForm.removeControl('tenDMcha');

        this.baivietForm.removeControl('isLoaiBaiviet');
        this.baivietService
            .postCourse(this.baivietForm.value)
            .subscribe((res) => {
                if (res) {
                    alert('Tạo nội dung thành công');
                    this.listimage = [];
                    this.resetForm();
                    this.ngOnInit()
                }
            });
    }
    onSelectTheme(item) {
        if (item.title == 'Theme 1') {
            this.isSelectTheme1 = true;
        } else {
            this.isSelectTheme1 = false;
        }
        if (item.title == 'Theme 2') {
            this.isSelectTheme2 = true;
        } else {
            this.isSelectTheme2 = false;
        }
        if (item.content != '') {
            this.baivietForm.get('content1').setValue(item.content);
        } else {
            this.baivietForm.get('content1').setValue(item.content1);
        }

        this.baivietForm.get('content2').setValue(item.content2);
        this.baivietForm
            .get('slide1.titleCarousel')
            .setValue(item.slide1?.titleCarousel);
        this.baivietForm
            .get('slide1.desCarousel')
            .setValue(item.slide1?.desCarousel);
        this.baivietForm
            .get('slide1.contentCarousel')
            .setValue(item.slide1?.contentCarousel);
        this.baivietForm
            .get('slide2.titleCarousel')
            .setValue(item.slide2?.titleCarousel);
        this.baivietForm
            .get('slide2.desCarousel')
            .setValue(item.slide2?.desCarousel);
        this.baivietForm
            .get('slide2.contentCarousel')
            .setValue(item.slide2?.contentCarousel);
        this.itemContentCarousel1 = item.slide1?.contentCarousel;
        this.itemContentCarousel2 = item.slide2?.contentCarousel;
    }
    onSelectIdMenu(id) {
        this.baivietForm.addControl('parentid', new FormControl(id));
        this.baivietForm.get('parentid').setValue(id);
        this.baivietService.courses$
            .pipe(
                map((arr) => {
                    if (arr.length > 0) {
                        return arr.filter((r) => r.parentid == id);
                    } else if (arr.length == 0) {
                        return undefined;
                    }
                })
            )
            .subscribe((result) => {
                this.courses = result;
            });
    }

    SelectBaiviet(item) {
        console.log(item.listslide2);
        if (Object.keys(item.listslide1).length > 0) {
            this.isSelectTheme1 = true;
        } else {
            this.isSelectTheme1 = false;
        }
        if (Object.keys(item.listslide2).length > 0) {
            this.isSelectTheme2 = true;
        } else {
            this.isSelectTheme2 = false;
        }
        this.resetForm();
        if (item.content != '') {
            this.baivietForm.get('content1').setValue(item.content);
        } else {
            this.baivietForm.get('content1').setValue(item.content1);
        }
        this.baivietForm.get('content2').setValue(item.content2);
        this.baivietForm.get('des').setValue(item.des);
        this.baivietForm.get('title').setValue(item.title);
        this.baivietForm.addControl('id', new FormControl(item.id));
        this.baivietForm.get('id').setValue(item.id);
        this.baivietForm.get('idDM').setValue(item.idDM);
        this.baivietForm.get('listslide1').setValue(item.listslide1);
        this.baivietForm.get('listslide2').setValue(item.listslide2);
        this.baivietForm
            .get('slide1.titleCarousel')
            .setValue(item.slide1.titleCarousel);
        this.baivietForm
            .get('slide1.desCarousel')
            .setValue(item.slide1.desCarousel);
        this.baivietForm
            .get('slide2.titleCarousel')
            .setValue(item.slide2.titleCarousel);
        this.baivietForm
            .get('slide2.desCarousel')
            .setValue(item.slide2.desCarousel);
        this.baivietForm.get('slug').setValue(item.slug);
        this.baivietForm.get('Loaibaiviet').setValue(item.Loaibaiviet);
        this.baivietForm.get('thumbimage').setValue(item.thumbimage);
        if (item.listslide1) {
            this.listslide1 = item.listslide1;
        }
        if (item.listslide2) {
            this.listslide2 = item.listslide2;
        }
        this.idSelect = item.id;
        this.thumb = item.thumbimage;
        this.danhmucs.find((res) => {
            if (res.id == item.idDM) {
                this.tenDMcha = res.Tieude;
                console.log(this.tenDMcha);
            }
        });
        if (Object.keys(item.image).length > 0) {
            console.log(item.image);

            for (const property in item.image) {
                this.uploadService
                    .getValueByKey(item.image[property])
                    .subscribe((res) => {
                        this.listimage.push([...res, item.image[property]]);
                        console.log(this.listimage);
                    });
            }
        }
    }
    deleteBaiviet() {
        this.baivietForm.removeControl('isLoaiBaiviet');

        this.baivietService
            .deleteBaiviet(this.idSelect)
            .subscribe((res) => alert('Xóa bài thành công'));
        this.resetForm();
        this.isSelectTheme1 = false;
        this.idSelect = undefined;
        this.listimage = [];
    }
    updateBaiviet() {
        if (this.listimage.length > 0) {
            this.baivietForm.get('image').setValue(this.listkey);
        }
        this.baivietForm.removeControl('isLoaiBaiviet');
        this.baivietService
            .updateBaiviet(this.baivietForm.value)
            .subscribe((res) => {
                this.listimage = [];
                alert('Cập nhật thành công');
                this.resetForm()
            });
        this.isSelectTheme1 = false;
        this.idSelect = undefined;
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    onchangeLoaibaiviet(e) {
        this.baivietForm.get('Loaibaiviet').setValue(e);
    }

    resetForm() {
        this.baivietForm = this.fb.group({
            title: [''],
            des: [''],
            listslide1: [''],
            listslide2: [''],
            content: [''],
            content1: [''],
            content2: [''],
            slide1: this.fb.group({
                titleCarousel: [''],
                desCarousel: [''],
                contentCarousel: [''],
            }),
            slide2: this.fb.group({
                titleCarousel: [''],
                desCarousel: [''],
                contentCarousel: [''],
            }),
            idDM: [0],
            slug: [''],
            Loaibaiviet: [0],
            thumbimage: [''],
            image: [''],

            // checkListCourse:['']
        });
    }

    public onReady(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader, this.uploadService);
        };

        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }
    selectionDanhmuc(e) {
        this.danhmucs.find((x) => {
            if (x.Tieude == e) {
                console.log(x.id);

                this.baivietForm.get('idDM').setValue(x.id);
            }
        });
    }
    onchangeCarousel(index, item) {
        if (index == 1) {
            this.isSelectedCarousel1 = true;
            this.itemIdCarousel1 = item.key;
            this.baivietForm.get('slide1.contentCarousel').setValue(item.value);
        }
        if (index == 2) {
            this.isSelectedCarousel2 = true;
            this.itemIdCarousel2 = item.key;
            this.baivietForm.get('slide2.contentCarousel').setValue(item.value);
        }
    }
    AddCarousel(index) {
        if (index == 1) {
            if (Object.keys(this.listslide1).length == 0) {
                let value = this.baivietForm.get(
                    'slide1.contentCarousel'
                ).value;
                this.listslide1[0] = value;

                ++this.i;
                alert('Thêm carousel cơ hội nghề nghiệp thành công');
            } else {
                let i = Object.keys(this.listslide1).length;
                this.listslide1[i] = this.listslide1[0];
                alert('Thêm carousel cơ hội nghề nghiệp thành công');
            }
        }
        if (index == 2) {
            if (Object.keys(this.listslide2).length == 0) {
                let value = this.baivietForm.get(
                    'slide2.contentCarousel'
                ).value;
                this.listslide2[0] = value;
                console.log(this.listslide2);

                ++this.i;
                alert('Thêm carousel chi tiết nghề nghiệp thành công');
            } else {
                let i = Object.keys(this.listslide2).length;
                this.listslide2[i] = this.listslide2[0];
                console.log(this.listslide2);

                alert('Thêm carousel chi tiết nghề nghiệp thành công');
            }
        }
    }
    updateCarousel(index) {
        if (index == 1) {
            if (this.itemIdCarousel1 != undefined) {
                let value = this.baivietForm.get(
                    'slide1.contentCarousel'
                ).value;

                this.listslide1[this.itemIdCarousel1] = value;
                alert('Update carousel cơ hội nghề nghiệp thành công');
            }
        }
        if (index == 2) {
            if (this.itemIdCarousel2 != undefined) {
                let value = this.baivietForm.get(
                    'slide2.contentCarousel'
                ).value;
                this.listslide2[this.itemIdCarousel2] = value;
                alert('Update carousel chi tiết nghề nghiệp thành công');
            }
        }
    }
    deleteCarousel(index) {
        if (index == 1) {
            if (this.itemIdCarousel1 != undefined) {
                delete this.listslide1[this.itemIdCarousel1];
                this.baivietForm.get('slide1.contentCarousel').setValue('');
                alert('Delete carousel cơ hội nghề nghiệp thành công');
            }
        }
        if (index == 2) {
            if (this.itemIdCarousel2 != undefined) {
                delete this.listslide2[this.itemIdCarousel2];
                this.baivietForm.get('slide2.contentCarousel').setValue('');
                alert('Delete carousel chi tiết nghề nghiệp thành công');
            }
        }
    }

    ngOnInit(): void {
        this.resetForm();
        this.baivietService.getTheme().subscribe();

        this.baivietService.themes$.subscribe((themes) => {
            console.log(themes);

            return (this.themes = themes);
        });
        this.baivietService.getMenu().subscribe();
        this.baivietService.menu$
            // .pipe(
            //     map(
            //         (arr) =>
            //             arr && arr.length && arr.filter((r) => r.parentid == '')
            //     )
            // )
            .subscribe((result) => (this.menu = result));

        this.baivietService.getBaiviet().subscribe();
        this.baivietService.courses$.subscribe((courses) => {
            this.courses = courses;
        });
        this._danhmucService.getDanhmuc().subscribe();
        this._danhmucService.danhmucs$.subscribe(
            (res) => (this.danhmucs = res)
        );
    }
}
