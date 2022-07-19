import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { newPageRoutes } from './new-page.routing';
import { SwiperModule } from 'swiper/angular';
import { MaterialExampleModule } from 'material.module';
import { TintucComponent } from './tintuc/tintuc.component';
import { FormComponent } from './form/form.component';
import { SukienComponent } from './sukien/sukien.component';
import { LamdepComponent } from './lamdep/lamdep.component';
import { HocnghecungchuyengiaComponent } from './hocnghecungchuyengia/hocnghecungchuyengia.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CarouselCourseComponent } from './components/carousel-course/carousel-course.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TintucdetailComponent } from './tintucdetail/tintucdetail.component';
import { NewListComponent } from './new-list/new-list.component';
import { TintucdetailPipe } from './tintucdetail/tintucdetail.pipe';
import { CustomPipePipe } from '../customs/custom-pipe.pipe';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { WINDOW_PROVIDERS } from '../services/window.service';
import { CommentsComponent } from './comments/comments.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  
    declarations: [
    TintucComponent,
    FormComponent,
    SukienComponent,
    LamdepComponent,
    HocnghecungchuyengiaComponent,
    CoursesComponent,
    CarouselCourseComponent,
    PaginationComponent,
    TintucdetailComponent,
    NewListComponent,
    TintucdetailPipe,
    CustomPipePipe,
    CommentsComponent
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(newPageRoutes),
        SwiperModule,
        MaterialExampleModule,
        FormsModule,
        CKEditorModule,
        ReactiveFormsModule,
       
    ],
    providers: [ WINDOW_PROVIDERS ]
})
export class NewPageModule {}
