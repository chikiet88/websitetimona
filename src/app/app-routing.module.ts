import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './sites/homepage/homepage.component';
import { IntroComponent } from './components/intro/intro.component';
import { ActivatePageComponent } from './sites/activate-page/activate-page.component';
import { AnswerPageComponent } from './sites/answer-page/answer-page.component';
import { ContactPageComponent } from './sites/contact-page/contact-page.component';
import { CornerStudentComponent } from './sites/corner-student/corner-student.component';
import { IntroduceComponent } from './sites/introduce/introduce.component';
import { LecturerPageComponent } from './sites/lecturer-page/lecturer-page.component';
import { NewPageComponent } from './sites/new-page/new-page.component';
import { StudentFeelPageComponent } from './sites/student-feel-page/student-feel-page.component';
import { ThemeComponent } from './admin/components/theme/theme.component';
import { AddHeaderComponent } from './admin/components/add-header/add-header.component';
import { MenuComponent } from './admin/components/menu/menu.component';
import { AddContactComponent } from './admin/components/add-contact/add-contact.component';
import { AddFooterComponent } from './admin/components/add-footer/add-footer.component';
// import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path:'', component:HomepageComponent },
 { path:'gioi-thieu-hoc-vien',component:IntroduceComponent },
 { path:'gioi-thieu-giang-vien',component:LecturerPageComponent },
 { path:'lien-he',component:ContactPageComponent },
 { path:'tin-tuc',component:NewPageComponent },
 { path:'goc-hoc-vien',component:CornerStudentComponent },
 { path:'goc-hoc-vien/giai-dap',component:AnswerPageComponent},
 { path:'goc-hoc-vien/hoat-dong',component:ActivatePageComponent},
 { path:'goc-hoc-vien/cam-nghi-hoc-vien',component:StudentFeelPageComponent},
  {path:'theme', component:ThemeComponent},
  {path:'header', component:AddHeaderComponent},
  {path:'menu', component:MenuComponent},
  {path:'contact', component:AddContactComponent},
  {path:'footer', component: AddFooterComponent},





{path:'', children:[
  {path:'khoa-hoc', loadChildren: () => import('../app/sites/khoahoc/khoahoc.module').then(m => m.KhoahocModule)},

] },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routting = [HomepageComponent, IntroComponent, LecturerPageComponent ]

