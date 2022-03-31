import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddBaivietService } from './add-baiviet.service';
import * as customBuild from '../../ckCustomBuild/build/ckEditor';
import { Khoahoc } from '../theme/theme.types';
import { map } from 'rxjs';

@Component({
    selector: 'app-add-baiviet',
    templateUrl: './add-baiviet.component.html',
    styleUrls: ['./add-baiviet.component.scss'],
})
export class AddBaivietComponent implements OnInit {
    themes: any;
    theme: any;
    message: 'chon theme';
    userProfile: FormGroup;
    selectTheme: any;
    menu: any;
    idSelect;
    courses: Khoahoc[];
    public Editor = customBuild;
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
        private baivietService: AddBaivietService,
        private fb: FormBuilder
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
        this.idSelect = item.id;
        console.log(this.userProfile.value);
    }
    deleteBaiviet() {
        alert('Xóa bài thành công');
        this.baivietService.deleteBaiviet(this.idSelect).subscribe();
    }
    updateBaiviet() {
        alert('Cập nhật thành công');

        this.baivietService.updateBaiviet(this.userProfile.value).subscribe();
    }

    ngOnInit(): void {
        this.userProfile = this.fb.group({
            title: [''],
            des: [''],
            content: [''],
            slug:[''],
            Loaibaiviet:[0],
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
    }
}
