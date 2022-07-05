import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { MaterialExampleModule } from 'material.module';
import { CornerStudentRoutes } from './corner.routing';
import { FormComponent } from './form/form.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { StudentFeelPageComponent } from './student-feel-page/student-feel-page.component';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LetotnghiepComponent } from './letotnghiep/letotnghiep.component';
import { LetotnghiepDetailComponent } from './letotnghiep/letotnghiep-detail/letotnghiep-detail.component';
import { GochocvienListComponent } from './gochocvien-list/gochocvien-list.component';
import { CuocthiphunxamComponent } from './cuocthiphunxam/cuocthiphunxam.component';
import { CuocthiphunxamchitietComponent } from './cuocthiphunxam/cuocthiphunxamchitiet/cuocthiphunxamchitiet.component';


@NgModule({
    declarations: [
      FormComponent,
      AnswerPageComponent,
      StudentFeelPageComponent,
      ActivatePageComponent,
      PaginationComponent,
      CoursesComponent,
      LetotnghiepComponent,
      LetotnghiepDetailComponent,
      GochocvienListComponent,
      CuocthiphunxamComponent,
      CuocthiphunxamchitietComponent
    
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(CornerStudentRoutes),
        SwiperModule,
        MaterialExampleModule,
    ],
})
export class CornerStudentModule {}
