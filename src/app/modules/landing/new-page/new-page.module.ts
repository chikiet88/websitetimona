import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { newPageRoutes } from './new-page.routing';
import { SwiperModule } from 'swiper/angular';
import { MaterialExampleModule } from 'material.module';
import { TintucComponent } from './tintuc/tintuc.component';
@NgModule({
    declarations: [
    TintucComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(newPageRoutes),
        SwiperModule,
        MaterialExampleModule,
    ],
})
export class NewPageModule {}
