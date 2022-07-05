import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';
import { AddGiangvienService } from './add-giangvien.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
import { map, take } from 'rxjs';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { log } from 'console';
@Component({
    selector: 'app-add-giangvien',
    templateUrl: './add-giangvien.component.html',
    styleUrls: ['./add-giangvien.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddGiangvienComponent implements OnInit {
    themes: any;
    giangviens: any;
    theme: any;
    thumb;
    i: number = 1;
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    message: 'chon theme';
    GiangvienList: FormGroup;
    selectTheme: any;
    idSelect;
    done: any[] = [];
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
        console.log(item);

        this.resetForm();
        this.GiangvienList.addControl('id', new FormControl(item.id));
        this.GiangvienList.get('id').setValue(item.id);
        this.GiangvienList.get('TenGV').setValue(item.TenGV);
        this.GiangvienList.get('Loaibaiviet').setValue(item.Loaibaiviet);

        this.GiangvienList.get('Mota').setValue(item.Mota);
        this.GiangvienList.get('Image').setValue(item.Image);

        this.idSelect = item.id;
        console.log(this.idSelect);

        this.thumb = item.Image;
    }

    deleteGiangvien() {
        this.GiangvienService.deleteGiangvien(this.idSelect).subscribe(
            (res) => {
                alert('Xóa Giảng viên thành công');
                this.resetForm();
                this.thumb = '';
                this.idSelect = undefined;
            }
        );
    }
    updateGiangvien() {
        this.GiangvienList.removeControl('tenDMcha');

        this.GiangvienService.updateGiangvien(
            this.GiangvienList.value
        ).subscribe((res) => {
            if (res) {
                alert('Cập nhật Giảng viên thành công');
                this.resetForm();
                this.thumb = '';
                this.idSelect = undefined;
            } else {
                alert('Cập nhật Giảng viên không thành công');
            }
        });
    }
    resetForm() {
        this.GiangvienList = this.fb.group({
            TenGV: [''],
            Mota: [
                `<p class="text-white uppercase font-bold"
                >Giảng viên</p
            >
            <div
                class="flex lg:block lg:pt-0 pt-2 flex-col md:flex-row"
            >
                <p
                    class="text-2xl font-bold text-yellow-500 uppercase py-3 flex-1 lg:flex-none"
                >
                    Nguyễn Thị Kiều Oanh
                </p>
                <p
                    class="text-white font-bold uppercase text-lg leading-5"
                    >Trưởng bộ môn chăm sóc điều trị da</p
                >
            </div>

            <ul>
                <li class="mt-1" class="lg:text-end mt-1">
                    15 năm kinh nghiệm làm việc, giảng dạy trong
                    ngành thẩm mỹ
                </li>
                <li class="mt-1" class="lg:text-end mt-1">
                    Chứng nhận nhiều khóa điều trị da liễu cho bác
                    sĩ/ chuyên gia nước ngoài đứng lớp
                </li>
            </ul>`,
            ],
            Image: [''],
            Loaibaiviet: [''],
        });
    }
    upload(): void {
        this.callback(this.selectedFiles.item(0), 1).then((x: any) => {
            this.GiangvienList.get('Image').setValue(x.url);
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
    selectOrdering(item) {
        // item.Ordering = this.i;
        // this.GiangvienService.updateGiangvien(item).subscribe((res) => {
        //     console.log('sssssssss');
        //     ++this.i;
        // });
    }
    drop(event: CdkDragDrop<any[]>) {
        // this.giangviens.forEach(x => {
        //     x.Ordering = x.id
        //     this.GiangvienService.updateGiangvien(x).subscribe()
        // });
        this.giangviens.sort((a, b) => {
            return a.Ordering - b.Ordering;
        });

        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            let items = event.container.data;
            const currentItem = items[event.currentIndex];
            const prevItem = items[event.currentIndex - 1] || null;
            const nextItem = items[event.currentIndex + 1] || null;
            currentItem.Ordering = event.currentIndex;
            prevItem.Ordering = event.currentIndex - 1 || null;
            nextItem.Ordering = event.currentIndex + 1 || null;
            this.GiangvienService.updateGiangvien(currentItem).subscribe();
            this.GiangvienService.updateGiangvien(prevItem).subscribe();

            this.GiangvienService.updateGiangvien(nextItem).subscribe();
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
    capnhatOrdering() {
        if (this.done.length > 0) {
            for (let i = 0; i < this.done.length; i++) {
                this.done[i].Ordering = i;
                this.GiangvienService.updateGiangvien(this.done[i]).subscribe(
                    (res) => console.log(res)
                );
            }
        }
    }
    ngOnInit(): void {
        this.resetForm();

        this.GiangvienService.getGiangvien().subscribe();
        this.GiangvienService.giangviens$
            .pipe(take(2))
            .subscribe((giangviens) => {
                this.giangviens = giangviens;
                this.giangviens?.sort((a, b) => {
                    return a.Ordering - b.Ordering;
                });
            });
    }
}
