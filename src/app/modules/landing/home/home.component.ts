import {
    Component,
    ElementRef,
    HostListener,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Khoahoc } from './home.types';
import $ from 'jquery';
import { ViewportScroller } from '@angular/common';
import { FacebookService, InitParams } from 'ngx-facebook';
import gsap from 'gsap';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],

    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent {
    timedOutCloser;
    items: any;
    menu: any;
    menuArray;
    Array = [];
    constructor(
        private homeService: HomeService,
        private scroll: ViewportScroller,
        private facebookService: FacebookService
    ) {
        this.initFacebookService();
    }
    private initFacebookService(): void {
        const initParams: InitParams = { xfbml: true, version: 'v3.2' };
        this.facebookService.init(initParams);
    }
    courses$: Observable<Khoahoc[]>;
    panelOpenState = false;
    showFiller = false;
    isShow = false;

    goDown1() {
        document.getElementById('header').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
        console.log(document.getElementById('header'));
    }

    toggleMenu() {
        this.isShow = !this.isShow;
    }

    onscroll() {
        let item = window.scrollY;
        let header = document.getElementById('header');
        let backtotop = document.querySelector('.backtotop')
        if (item > 140) {
            header.classList.add('header');
        }
        if (item > header.clientHeight + 200) {
            header.classList.add('header-active');
            backtotop.classList.add('backtotop-active')
        }
        if (item < 10) {
            header.classList.remove('header-active');
            header.classList.remove('header');
            backtotop.classList.remove('backtotop-active')

        }
    }
    nest = (items, id = '', link = 'parentid') =>
        items
            .filter((item) => item[link] == id)
            .map((item) => ({
                ...item,
                children: this.nest(items, item.id),
            }));
    ngOnInit(): void {
        window.addEventListener('scroll', this.onscroll, true);

        this.homeService.getMenu().subscribe((dataMenu) => {
            this.homeService.getKhoahoc().subscribe((dataBaiviet) => {
                this.items = dataBaiviet;
                const array = [];
                dataMenu.forEach((v1) => {
                    const x = [];
                    dataBaiviet.forEach((v2) => {
                        if (v1.id === v2.parentid) {
                            x.push(v2);
                        }
                        v1.Baiviet = x;
                    });
                });
                this.menu = this.nest(dataMenu).reverse();
            });

            // const datas= this.items.concat(data)
        });
    }
}
