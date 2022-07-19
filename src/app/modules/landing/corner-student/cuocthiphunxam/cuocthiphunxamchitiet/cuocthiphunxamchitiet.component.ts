import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhoahocService } from 'app/modules/landing/khoahoc/khoahoc.service';
import { FileUploadService } from 'app/modules/landing/services/file-upload.service';
import { take } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
    selector: 'app-cuocthiphunxamchitiet',
    templateUrl: './cuocthiphunxamchitiet.component.html',
    styleUrls: ['./cuocthiphunxamchitiet.component.scss'],
})
export class CuocthiphunxamchitietComponent implements OnInit {
    @ViewChild(SwiperComponent) swiper: SwiperComponent;
    album;
    config;
    title;
    listimage = [];
    b = [];
    a = [];
    x;
    constructor(
        private _khoahocService: KhoahocService,
        private route: ActivatedRoute,
        private _uploadService: FileUploadService
    ) {}

    swipePrev() {
        this.swiper.swiperRef.slidePrev();
    }
    swipeNext() {
        this.swiper.swiperRef.slideNext();
    }
    callback(item) {
        return new Promise((resolve, reject) => {
            console.log(item);

            this._uploadService
                .getValueByKey(item)
                .pipe(take(1))
                .subscribe((data) => {
                    console.log(data[1]);

                    resolve(data[1]);
                });
        });
    }
    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get('slug');
        this._khoahocService.getKhoahocChitiet(slug).subscribe();
        this._khoahocService.course$.pipe(take(1)).subscribe((res) => {
            this.title = res.title;
            this.album = res.image;
            console.log(this.album);

            for (
                let i = 0, p = Promise.resolve();
                i < Object.keys(this.album).length;
                i++
            ) {
                p = p.then(() =>
                    this.callback(Object.values(this.album)[i]).then((x) => {
                        this.listimage.push(x);
                        if (
                            this.listimage.length ==
                            Object.keys(this.album).length
                        ) {
                            this.x = this.listimage.length / 3;
                            for (let i = 0; i < this.x; i++) {
                                this.b.push(
                                    this.listimage.slice(3 * i, 3 * i + 3)
                                );
                            }
                        }
                    })
                );
            }

            // this.x = Object.keys(this.album?.image)?.length / 3;
            // for (let i = 0; i <= this.x; i++) {
            //     this.b.push(
            //         Object.values(this.album).slice(3 * i, 3 * i + 3)
            //     );
            // }
        });
        this.config = {
            direction: 'vertical',
            freeMode: true,

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },

                982: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        };
    }
}
