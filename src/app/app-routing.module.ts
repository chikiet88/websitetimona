import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './components/home-pages/home-pages.component';
import { IntroComponent } from './components/intro/intro.component';
import { ActivatePageComponent } from './sites/activate-page/activate-page.component';
import { AnswerPageComponent } from './sites/answer-page/answer-page.component';
import { ContactPageComponent } from './sites/contact-page/contact-page.component';
import { CornerStudentComponent } from './sites/corner-student/corner-student.component';
import { IntroduceComponent } from './sites/introduce/introduce.component';
import { LecturerPageComponent } from './sites/lecturer-page/lecturer-page.component';
import { NewPageComponent } from './sites/new-page/new-page.component';
import { StudentFeelPageComponent } from './sites/student-feel-page/student-feel-page.component';



const routes: Routes = [
  { path:'', component:HomePagesComponent },
 { path:'gioi-thieu-hoc-vien',component:IntroduceComponent },
 { path:'gioi-thieu-giang-vien',component:LecturerPageComponent },
 { path:'lien-he',component:ContactPageComponent },
 { path:'tin-tuc',component:NewPageComponent },
 { path:'goc-hoc-vien',component:CornerStudentComponent },
 { path:'goc-hoc-vien/giai-dap',component:AnswerPageComponent},
 { path:'goc-hoc-vien/hoat-dong',component:ActivatePageComponent},
 { path:'goc-hoc-vien/cam-nghi-hoc-vien',component:StudentFeelPageComponent}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routting = [HomePagesComponent, IntroComponent, LecturerPageComponent ]

