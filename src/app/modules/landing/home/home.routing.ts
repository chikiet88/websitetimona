import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { MainlayoutComponent } from '../components/mainlayout/mainlayout.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { IntroduceComponent } from '../introduce/introduce.component';
import { LecturerPageComponent } from '../lecturer-page/lecturer-page.component';
import { CornerStudentComponent } from '../corner-student/corner-student.component';
import { AnswerPageComponent } from '../answer-page/answer-page.component';
import { ActivatePageComponent } from '../activate-page/activate-page.component';
import { StudentFeelPageComponent } from '../student-feel-page/student-feel-page.component';
import { ContactPageComponent } from '../contact-page/contact-page.component';
export const landingHomeRoutes: Route[] = [
    {
        path: '',
        component: LandingHomeComponent,
        children: [
            { path: '', component: HomepageComponent },
            { path: 'gioi-thieu/hoc-vien', component: IntroduceComponent },
            { path: 'gioi-thieu/:slug', component: LecturerPageComponent },
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
            { path: 'goc-hoc-vien', component: CornerStudentComponent },
            { path: 'goc-hoc-vien/giai-dap', component: AnswerPageComponent },
            {
                path: 'goc-hoc-vien/hoat-dong',
                component: ActivatePageComponent,
            },
            {
                path: 'goc-hoc-vien/cam-nghi',
                component: StudentFeelPageComponent,
            },
            { path: 'lien-he', component: ContactPageComponent },

        ],
    },
];
