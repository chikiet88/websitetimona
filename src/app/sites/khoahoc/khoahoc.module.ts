import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { khoahocRoutes } from './khoahoc.routing';

import { Theme1Component } from './theme1/theme1.component';
import { Theme2Component } from './theme2/theme2.component';
import { Theme3Component } from './theme3/theme3.component';
import { KhoahocListComponent } from './khoahoc-list/khoahoc-list.component';

@NgModule({
  declarations: [
    Theme1Component,
    Theme2Component,
    Theme3Component,
    KhoahocListComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(khoahocRoutes),
   
    
  ]
})
export class KhoahocModule { }
