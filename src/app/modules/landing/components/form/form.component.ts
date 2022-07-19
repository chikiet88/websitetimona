import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs';
import { HomeService } from '../../home/home.service';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import { FormService } from './form.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    private readonly notifier: NotifierService;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    phoneRegex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    courses;
    danhmucs;
    khachhangForm: FormGroup;
    baivietnoibat = 1;
    constructor(
        private _khoahocService: KhoahocService,
        private fb: FormBuilder,
        private _formService: FormService,
        notifierService: NotifierService // private _notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }
    resetForm() {
        this.khachhangForm = this.fb.group({
            Hoten: ['', Validators.required],
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            idKH: ['', Validators.required],
            Diachi: ['', Validators.required],
            MaGT: ['', Validators.required],
        });
    }
    onSubmit() {
        if (this.khachhangForm.get('SDT').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập SDT`);
        }
        if (this.khachhangForm.get('SDT').hasError('pattern')) {
            this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
        }
        if (this.khachhangForm.get('Hoten').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập họ và tên`);
        }
        if (this.khachhangForm.get('idKH').hasError('required')) {
            this.notifier.notify('error', `Vui lòng chọn khóa học`);
        }
        if (this.khachhangForm.get('Diachi').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập địa chỉ`);
        }
        if(this.khachhangForm.invalid){
            return
        }
        this._formService.postForm(this.khachhangForm.value).subscribe(res=>{
            this.notifier.notify('success', `Đăng ký thành công`);
            this.resetForm()
        })

    }
    ngOnInit(): void {
      this.resetForm()
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
        });
        this._khoahocService.getKhoahoc().subscribe();
        this._khoahocService.courses$.subscribe((result) => {
            this.courses = result;
            let a = [];
            for (let i = 0; i < this.courses?.length; i++) {
                for (let j = 0; j < this.danhmucs.length; j++) {
                    if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.courses[i]);
                    }
                }
            }

            this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
            this.courses.sort((a, b) => {
                return a.Ordering - b.Ordering;
            });
        });
    }
}
