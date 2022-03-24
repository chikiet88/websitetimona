import { Component, OnInit, ElementRef, Directive,Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ModulesList } from './menu';

  

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isInHoverBlock = false;

  constructor(private el: ElementRef) {}

  @Input() hoverTrigger: MatMenuTrigger;
  @Input() menu: any;

  ngOnInit() {
      this.el.nativeElement.addEventListener('mouseenter', () => {
          this.setHoverState(true);
          this.hoverTrigger.openMenu();

          const openMenu = document.querySelector(`.mat-menu-after.${this.menu._elementRef.nativeElement.className}`);
          if (!openMenu) {
              this.hoverTrigger.closeMenu();
              return;
          }
          openMenu.addEventListener('mouseenter', () => {
              this.setHoverState(true);
          });
          openMenu.addEventListener('mouseleave', () => {
              this.setHoverState(false);
          });
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
          this.setHoverState(false);
      });
  }

  private setHoverState(isInBlock: boolean) {
      this.isInHoverBlock = isInBlock;
      if (!isInBlock) {
          this.checkHover();
      }
  }

  private checkHover() {
      setTimeout(() => {
          if (!this.isInHoverBlock && this.hoverTrigger.menuOpen) {
              this.hoverTrigger.closeMenu();
          }
      }, 50);
  }



}
