import {
    AfterViewInit,
    Component,
    DoCheck,
    Input,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentsService } from './comments.service';
import * as customBuild from '../../../ckCustomBuild/build/ckEditor';
import { FileUpload } from '../../models/file-upload.model';
import { FileUploadService } from '../../services/file-upload.service';
import { map, take } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommentsComponent implements OnInit, DoCheck {
    @Input() idBaiviet;
    private readonly notifier: NotifierService;
    subcommentform: FormGroup;
    idsubcommentform: FormGroup;
    idsubcomment: any[] = [];
    isSelectFile = false;
    percentage;
    subcomment: any[] = [];
    element: HTMLImageElement;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    public Editor: customBuild;
    isSub = false;
    indexSub = null;
    indexSubChild;
    public config = {
        removePlugins: ['toolbar'],
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
                reversed: true,
            },
        },
    };
    constructor(
        private fb: FormBuilder,
        private _commentService: CommentsService,
        private uploadService: FileUploadService,
        notifierService: NotifierService
    ) {
        this.Editor = customBuild;
        this.notifier = notifierService;
    }
    selectFile(event) {
        var image = document.getElementById('output');
        image.setAttribute('src', URL.createObjectURL(event.target.files[0]));
        this.selectedFiles = event.target.files;
        this.isSelectFile = true;
    }
    removeSelectFile() {
        this.isSelectFile = false;
        this.selectedFiles = null;
        var image = document.getElementById('output');
        image.setAttribute('src', '');
    }
    resetform() {
        this.subcommentform = this.fb.group({
            comment: [''],
            Image: [''],
            idBaiviet: [this.idBaiviet],
        });
        this.idsubcommentform = this.fb.group({
            idSub: [''],
            comment: [''],
            Image: [''],
            idBaiviet: [this.idBaiviet],
        });
        this.isSelectFile = false;
        this.selectedFiles = null;
        this.indexSubChild = null;
        this.indexSub = null;
    }
    GetidSub(id, i) {
        this.indexSub = i;
        this.isSub = true;
        this.idsubcommentform.get('idSub').setValue(id);
    }
    getIdSubChild(id, i) {
        this.indexSub = i;
        this.idsubcommentform.get('idSub').setValue(id);
    }

    onSubmitSubComment() {
        if (this.subcommentform.get('comment').value != '') {
            if (this.selectedFiles) {
                this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
                    this.subcommentform.get('Image').setValue(x.url);
                    this._commentService
                        .postSubcomment(this.subcommentform.value)
                        .subscribe((res) => {
                            this.notifier.notify('success', 'Gửi thành công');
                            this.resetform();
                        });
                });
            } else {
                this._commentService
                    .postSubcomment(this.subcommentform.value)
                    .subscribe((res) => {
                        this.notifier.notify('success', 'Gửi thành công');
                        var image = document.getElementById('output');
                        image.setAttribute('src', '');
                        this.resetform();
                    });
            }
        } else {
            this.notifier.notify('error', 'Gửi thất bại');
        }
        return;
    }
    onIdSubmitSubComment() {
        if (this.idsubcommentform.get('comment').value != '') {
            if (this.selectedFiles) {
                this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
                    this.idsubcommentform.get('Image').setValue(x.url);
                    this._commentService
                        .postIdSubcomment(this.idsubcommentform.value)
                        .subscribe((res) => {
                            this.notifier.notify('success', 'Gửi thành công');
                            this.resetform();
                        });
                });
            } else {
                this._commentService
                    .postIdSubcomment(this.idsubcommentform.value)
                    .subscribe((res) => {
                        this.notifier.notify('success', 'Gửi thành công');
                        var image = document.getElementById('output');
                        image.setAttribute('src', '');
                        this.resetform();
                    });
            }
        } else {
            this.notifier.notify('error', 'Gửi thất bại');
        }
        return;
    }
    callback(item, i) {
        return new Promise((resolve, reject) => {
            if (item) {
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
                                                fileUploads =
                                                    fileUploads.reverse();
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
            } else {
                reject('Không có upload hình');
            }
        });
    }
    nest = (items, id = '', link = 'idSub') =>
        items
            .filter((item) => item[link] == id)
            .map((item) => ({
                ...item,
                children: this.nest(items, item.id),
            }));

    ngOnInit(): void {
        this.resetform();
        console.log(this.idBaiviet);
        
        this._commentService.GetSubcomment().subscribe();
        this._commentService.subcomments$.subscribe((res) => {
            this.subcomment = res;

            this._commentService.getIdSubcoment().subscribe();
            this._commentService.idsubcomments$.subscribe((idsubcoment) => {
                this.idsubcomment = idsubcoment;
                if (res) {
                    res = res.filter((x) => x.idBaiviet == this.idBaiviet);
                    if (idsubcoment) {
                        idsubcoment = idsubcoment.filter(
                            (x) => x.idBaiviet == this.idBaiviet
                        );
                    }
                    res.forEach((x) => {
                        if (idsubcoment) {
                            let arr = [];

                            idsubcoment.forEach((v) => {
                                if (x.id == v.idSub) {
                                    arr.push(v);
                                }
                            });
                            x.idSub = arr;
                        }
                    });
                    this.subcomment = res;
                }
            });
        });
    }
    ngDoCheck(): void {
        
        // if (this.subcomment) {
        //     let tempSubcoment = this.subcomment;
        //     let tempIdSubcomment = this.idsubcomment;
        //     tempSubcoment = tempSubcoment.filter((x) => x.slug == this.slug);
        //     if (tempIdSubcomment) {
        //         tempIdSubcomment = tempIdSubcomment.filter(
        //             (x) => x.slug == this.slug
        //         );
        //     }
        //     tempSubcoment.forEach((x) => {
        //         if (tempSubcoment) {
        //             let arr = [];

        //             tempSubcoment.forEach((v) => {
        //                 if (x.id == v.idSub) {
        //                     arr.push(v);
        //                 }
        //             });
        //             x.idSub = arr;
        //         }
        //     });
        //     this.subcomment = tempSubcoment;
        // }
    }
}
