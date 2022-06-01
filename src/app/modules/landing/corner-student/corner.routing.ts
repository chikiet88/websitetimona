import { Route } from '@angular/router';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { CornerStudentComponent } from './corner-student.component';
import { GochocvienListComponent } from './gochocvien-list/gochocvien-list.component';
import { LetotnghiepDetailComponent } from './letotnghiep/letotnghiep-detail/letotnghiep-detail.component';
import { LetotnghiepComponent } from './letotnghiep/letotnghiep.component';
import { StudentFeelPageComponent } from './student-feel-page/student-feel-page.component';

export const CornerStudentRoutes: Route[] = [
    {
        path: '',
        component: CornerStudentComponent,
        // pathMatch:'full',
        // redirectTo:"tin-tuc-su-kien/tintuc",
        children: [
            { path: '', component: GochocvienListComponent },

            { path: 'giai-dap', component: AnswerPageComponent },
            { path: 'hoat-dong', component: ActivatePageComponent },
            { path: 'cam-nghi', component: StudentFeelPageComponent },
            { path: 'le-tot-nghiep', component: LetotnghiepComponent },
            {
                path: 'le-tot-nghiep/:slug',
                component: LetotnghiepDetailComponent,
            },
        ],
    },
];
