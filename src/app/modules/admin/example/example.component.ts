import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DangnhapService } from 'app/modules/landing/dangnhap/dangnhap.service';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {
    token = localStorage.getItem('accessToken') || null;
    user;
    idUser;

    isLogin = false;
    /**
     * Constructor
     */
    constructor(
        private _dangnhapService: DangnhapService,
        private _route: ActivatedRoute,

        private _router: Router
    ) {}
    ngOnInit(): void {
        if (this.token != null) {
            this._dangnhapService.get().subscribe();
            this._dangnhapService.user$.subscribe((res) => {
                this.user = res;
                this.idUser = res.id;
                if (this.idUser) {
                }
            });
        } else {
            const redirectURL =
                this._route.snapshot.queryParamMap.get('redirectURL') || '/';
            this._router.navigateByUrl(redirectURL);
        }
    }
}
