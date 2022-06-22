import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { MainlayoutComponent } from '../components/mainlayout/mainlayout.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { IntroduceComponent } from '../introduce/introduce.component';
import { LecturerPageComponent } from '../lecturer-page/lecturer-page.component';
import { CornerStudentComponent } from '../corner-student/corner-student.component';
import { AnswerPageComponent } from '../corner-student/answer-page/answer-page.component';
import { ActivatePageComponent } from '../corner-student/activate-page/activate-page.component';
import { StudentFeelPageComponent } from '../corner-student/student-feel-page/student-feel-page.component';
import { ContactPageComponent } from '../contact-page/contact-page.component';
export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        children: [
            { path: '', component: HomepageComponent },
            { path: 'gioi-thieu/hoc-vien', component: IntroduceComponent },
            { path: 'gioi-thieu/giang-vien', component: LecturerPageComponent },
            {
                path: '',
                children: [
                    {
                        path: 'khoa-hoc',
                        loadChildren: () =>
                            import('../khoahoc/khoahoc.module').then(
                                (m) => m.KhoahocModule
                            ),
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'tin-tuc-su-kien',
                        loadChildren: () =>
                            import('../new-page/new-page.module').then(
                                (m) => m.NewPageModule
                            ),
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'goc-hoc-vien',
                        loadChildren: () =>
                            import(
                                '../corner-student/corner-student.module'
                            ).then((m) => m.CornerStudentModule),
                    },
                ],
            },
            { path: 'lien-he', component: ContactPageComponent },
        ],
    },
];
