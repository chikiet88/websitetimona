import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DangnhapService } from '../dangnhap/dangnhap.service';

@Component({
    selector: 'app-dangky',
    templateUrl: './dangky.component.html',
    styleUrls: ['./dangky.component.scss'],
})
export class DangkyComponent implements OnInit {
    private readonly notifier: NotifierService;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    signInForm: FormGroup;
    signUpForm: FormGroup;
    phoneRegex =
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    constructor(
        private _dangnhapService: DangnhapService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        notifierService: NotifierService // private _notifierService: NotifierService
    ) {
        this.notifier = notifierService;
    }

    ngOnInit(): void {
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: [
                '',
                [Validators.required, Validators.pattern(this.emailPattern)],
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(40),
                ],
            ],
            SDT: [
                '',
                [Validators.required, Validators.pattern(this.phoneRegex)],
            ],
            confirmPassword: ['', Validators.required],
        });
        // this._dangnhapService.signIn().subscribe()
    }

    signUp() {
        if (this.signUpForm.get('SDT').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập SDT`);
        }
        if (this.signUpForm.get('SDT').hasError('pattern')) {
            this.notifier.notify('error', `Số điện thoại không đúng định dạng`);
        }
        if (this.signUpForm.get('email').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập email`);
        }
        if (this.signUpForm.get('email').hasError('pattern')) {
            this.notifier.notify('error', `Email không đúng định dạng`);
        }

        if (this.signUpForm.get('password').hasError('required')) {
            this.notifier.notify('error', `Vui lòng nhập password`);
        }
        let password = this.signUpForm.get('password').value;
        password = password.split('');
        console.log(password);

        if (password.length < 6) {
            this.notifier.notify(
                'error',
                `Vui lòng nhập mật khẩu lớn hơn 6 ký tự`
            );
        }
        if (password.length > 20) {
            this.notifier.notify(
                'error',
                `Vui lòng nhập mật khẩu nhỏ 20 ký tự`
            );
        }
        if (this.signUpForm.get('confirmPassword').hasError('required')) {
            this.notifier.notify('error', `Vui lòng xác nhận password`);
        }

        if (
            this.signUpForm.get('confirmPassword').value !=
            this.signUpForm.get('password').value
        ) {
            this.notifier.notify('error', ` Password không đúng`);
        } else {
            if (this.signUpForm.invalid) {
                return;
            }
            this._dangnhapService
                .createNhanvien(this.signUpForm.value)
                .subscribe((res) => {
                    if (res == 1) {
                        this.notifier.notify(
                            'error',
                            'Số Điện Thoại Đã Tồn Tại'
                        );
                    } else if (res == 2) {
                        this.notifier.notify('error', 'Email Đã Tồn Tại');
                    } else {
                        this.notifier.notify(
                            'success',
                            'Tạo tài khoản thành công'
                        );
                        this.signUpForm.reset();
                    }
                });
        }
    }
}
