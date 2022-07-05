import {
    AfterViewInit,
    Component,
    HostListener,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { KhoahocService } from '../../khoahoc/khoahoc.service';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
import { Location, ViewportScroller } from '@angular/common';
@Component({
    selector: 'app-tintucdetail',
    templateUrl: './tintucdetail.component.html',
    styleUrls: ['./tintucdetail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TintucdetailComponent implements OnInit, AfterViewInit {
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private fragment: string;
    course$: Observable<any>;
    courses: any[];
    danhmucs;
    danhmucTintuc: any[];
    baivietnoibat = 1;
    
    tintucs: any[];
    constructor(
        private scroll: ViewportScroller,
        private router: Router,
        private _khoahocService: KhoahocService,
        private route: ActivatedRoute,
        
    ) {}

    theme: any;

    goDown1() {
        document.getElementById('header').scrollIntoView({
            block: 'start',
            inline: 'nearest',
        });
        console.log(document.querySelectorAll('#header'));
        this.ngOnInit()
    }
    scrollToTop() {
        this.scroll.scrollToPosition([0, 0]);
    }

    ngOnInit(): void {
      
        this.route.params.subscribe((data: any) => {
            this._khoahocService.getKhoahocChitiet(data.slugdetail).subscribe();
            this._khoahocService.course$.subscribe((course: any) => {
                this.theme = course;
            });
        });
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
            console.log(this.tintucs);

            this.courses = a.filter((x) => x.Loaibaiviet == this.baivietnoibat);
            this.courses.sort((a, b) => {
                return a.Ordering - b.Ordering;
            });
        });
      
    }
    ngAfterViewInit(): void {
        try {
          document.querySelector('#' + this.fragment).scrollIntoView();
        } catch (e) { }
      }
}
