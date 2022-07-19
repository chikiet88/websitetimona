import {
    AfterViewInit,
    Component,
    DoCheck,
    HostListener,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import { ViewportScroller } from '@angular/common';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
@Component({
    selector: 'app-tintucdetail',
    templateUrl: './tintucdetail.component.html',
    styleUrls: ['./tintucdetail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TintucdetailComponent implements OnInit, AfterViewInit {
    isSticky: boolean = false;

    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private fragment: string;
    slug;
    course$: Observable<any>;
    courses: any[];
    danhmucs;
    danhmucTintuc: any[];
    baivietnoibat = 1;

    tintucs: any[];
    constructor(
        private _khoahocService: KhoahocService,
        private route: ActivatedRoute,
    ) {
      
    }

    theme: any;

    goDown1() {
        document.getElementById('header').scrollIntoView({
            block: 'start',
            inline: 'nearest',
        });
        console.log(document.querySelectorAll('#header'));
        this.ngOnInit();
    }
    initScrollTriggers() {
        let box = document.querySelector('.form-submit');
        console.log(box);
    }
    onscroll(e) {
        let item = window.scrollY;
        let box = document.querySelector('.form-submit').clientHeight;
        let header = document.getElementById('header').clientHeight;

        let heightDes = document.getElementById('top').clientHeight;
        let heightCourse =
            document.querySelector('.courses-tintuc').clientHeight;
        let totalHeight = header + heightDes + heightCourse + 40;
        let heigtnewpage = document.querySelector('.new-page').clientHeight;
        box = heigtnewpage - box - 40
        if (item >= totalHeight && item < box)  {
            console.log('sssssssss');
            this.isSticky = true;
            console.log(this.isSticky);
            document
                .querySelector('.scroll-fixed')
                .classList.add('fixed', 'delay-100', 'top-10');
            document.querySelector('.image-form').classList.add('w-72');
            document
                .querySelector('.scroll-fixed')
                .classList.remove('absolute', 'delay-100', 'bottom-0');
        } else if (item <= totalHeight) {
            this.isSticky = false;
            console.log(this.isSticky);
            document
                .querySelector('.scroll-fixed')
                .classList.remove('fixed', 'delay-100', 'top-10');

            document.querySelector('.image-form').classList.remove('w-72');
        } else if (item > box) {
            console.log('sss');
            
            document
                .querySelector('.scroll-fixed')
                .classList.remove('fixed', 'top-10');

            document
                .querySelector('.scroll-fixed')
                .classList.add('absolute', 'delay-100', 'bottom-0');
        }
    }
    ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            this.slug = data.slugdetail;
            this._khoahocService.getKhoahocChitiet(data.slugdetail).subscribe();
            this._khoahocService.course$.subscribe((course: any) => {
                if (course) {
                    this.theme = course;
                }
            });
        });
        window.addEventListener('scroll', this.onscroll, true);
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            this.danhmucs = res?.filter((x) => x.Type == 'chuyennganh');
            this.danhmucTintuc = res?.filter((x) => x.Type == 'tintucsukien');
        });
        this._khoahocService.getKhoahoc().subscribe();
        this._khoahocService.courses$.subscribe((result) => {
            this.courses = result;
            this.tintucs = result;
            let a = [];
            let b = [];
            for (let i = 0; i < this.courses?.length; i++) {
                for (let j = 0; j < this.danhmucs.length; j++) {
                    if (this.courses[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.courses[i]);
                    }
                }
            }
            for (let i = 0; i < this.tintucs?.length; i++) {
                for (let j = 0; j < this.danhmucTintuc.length; j++) {
                    if (this.tintucs[i]?.idDM == this.danhmucTintuc[j].id) {
                        b.push(this.tintucs[i]);
                    }
                }
            }
            this.tintucs = b.sort(() => 0.5 - Math.random());
            this.tintucs = this.tintucs.slice(0, 4);

            this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
            this.courses.sort((a, b) => {
                return a.Ordering - b.Ordering;
            });
        });
    }

    ngAfterViewInit(): void {
        try {
            document.querySelector('#' + this.fragment).scrollIntoView();
        } catch (e) {}
    }
}
