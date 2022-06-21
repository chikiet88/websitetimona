import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhoahocService } from 'app/modules/landing/khoahoc/khoahoc.service';
import { FileUploadService } from 'app/modules/landing/services/file-upload.service';
import { take } from 'rxjs';
import SwiperCore, { Mousewheel, Pagination, Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { LetotnghiepService } from '../letotnghiep.service';
SwiperCore.use([Mousewheel, Pagination, Navigation]);

@Component({
    selector: 'app-letotnghiep-detail',
    templateUrl: './letotnghiep-detail.component.html',
    styleUrls: ['./letotnghiep-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LetotnghiepDetailComponent implements OnInit {
    @ViewChild(SwiperComponent) swiper: SwiperComponent;
    album;
    config;
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
    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get('slug');
        this._khoahocService.getKhoahocChitiet(slug).subscribe();
        this._khoahocService.course$.subscribe((res) => {
            this.album = res.image;
            console.log(this.album);
            
            for (const property in res.image) {
                this._uploadService
                    .getValueByKey(res.image[property])
                    .pipe(take(1))
                    .subscribe((data) => {
                        console.log(data[1]);
                        
                      this.listimage.push(res[1])
                        // this.listimage.push([
                        //     ...res,
                        //     res.image[property],
                        // ]);
                        // console.log(this.listimage);
                    });
            }
            console.log(this.listimage);
            
            this.x = this.album.length / 3;
            for (let i = 0; i < this.x; i++) {
                this.b.push(this.album.slice(3 * i, 3 * i + 3));
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
