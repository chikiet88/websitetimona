import { Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import { WINDOW } from '../../services/window.service';

@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.scss'],
})
export class TintucComponent implements OnInit {
    courses;
    danhmucs;
    danhmuc;
    slug: string;
    idDanhmuc: number;
    baivietnoibat: any[];
    paginate: number = 0;
    indexPaginate: number = 0;
    arr = [];
    baiviet1: any = {};
    baiviet2 = [];
    baiviet3 = [];
    constructor(
        private _khoahocService: KhoahocService,
        private route: ActivatedRoute,
        // @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
    ) {}
    @HostListener("window:scroll", [])
    onWindowScroll() {
    //   const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      console.log('sssssssss');
    }
    spliceBaiviet(arr) {
        if (arr?.length) {
            arr?.filter((x) => {
                if (x?.Loaibaiviet == 1) {
                    this.baiviet1 = x;
                } else {
                    this.baiviet1 = arr[0];
                }
            });
            arr = arr?.filter((x) => x?.id != this.baiviet1.id);
            // console.log(arr);

            this.baiviet2 = arr.slice(0, 2);
            // console.log(this.baiviet2);

            this.baiviet3 = arr.slice(2, 6);
            // console.log(this.baiviet3);
        }
    }
    paginateNumber(i) {
        console.log(i);
        console.log(this.arr[i]);

        this.indexPaginate = i;
        this.courses = this.arr[i];
        // this.courses = this.courses.concat(this.baivietnoibat[i]);
        this.spliceBaiviet(this.courses);
    }
    ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            this.slug = data.slug;
            console.log(this.slug);

            this._khoahocService.getDanhmuc().subscribe();
            this._khoahocService.danhmucs$.subscribe((res) => {
                let idDanhmuc = res?.find((x) => x.Slug == this.slug);
                this.idDanhmuc = idDanhmuc?.id;
                if (this.idDanhmuc != undefined) {
                    this._khoahocService
                        .getDanhmucchitiet(this.idDanhmuc)
                        .subscribe((res) => {
                            this.danhmuc = res;
                            console.log(this.idDanhmuc);
                        });
                }
            });

            this._khoahocService.getKhoahoc().subscribe();
            this._khoahocService.courses$.subscribe((res) => {
                console.log(res);

                this.baivietnoibat = res?.filter(
                    (x) => x.idDM == this.idDanhmuc && x.Loaibaiviet == 1
                );
                this.baivietnoibat.reverse()
                this.arr = [];
                res = res?.filter((x) => x.idDM == this.idDanhmuc);
                console.log(res);

                let x = res?.length / 6;
                if (res?.length > 0) {
                    for (let i = 0; i < x; i++) {
                        this.arr.push(res.slice(7 * i, 7 * i + 7));
                    }

                    this.courses = this.arr[0];
                    // if (this.baivietnoibat[0] != undefined) {
                    //     this.courses = this.courses.concat(
                    //         this.baivietnoibat[0]
                    //     );
                    // }
                    this.spliceBaiviet(this.courses);
                }
            });
        });
    }
}
