import { Route } from '@angular/router';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { CornerStudentComponent } from './corner-student.component';
import { GochocvienListComponent } from './gochocvien-list/gochocvien-list.component';
import { LetotnghiepDetailComponent } from './letotnghiep/letotnghiep-detail/letotnghiep-detail.component';
import { LetotnghiepComponent } from './letotnghiep/letotnghiep.component';
import { StudentFeelPageComponent } from './student-feel-page/student-feel-page.component';
import {
    KhoahocDetailResolver,
    KhoahocResolver,
} from '../khoahoc/khoahoc.resolvers';
import { CuocthiphunxamComponent } from './cuocthiphunxam/cuocthiphunxam.component';
import { CuocthiphunxamchitietComponent } from './cuocthiphunxam/cuocthiphunxamchitiet/cuocthiphunxamchitiet.component';
export const CornerStudentRoutes: Route[] = [
    {
        path: '',
        component: CornerStudentComponent,
        // pathMatch:'full',
        // redirectTo:"tin-tuc-su-kien/tintuc",
        children: [
            {
                path: '',
                component: GochocvienListComponent,
                resolve: {
                    courses: KhoahocResolver,
                },
            },

            { path: 'hoat-dong', component: ActivatePageComponent },
            { path: 'cam-nghi', component: StudentFeelPageComponent },
            { path: 'le-tot-nghiep', component: LetotnghiepComponent },
            {
                path: 'le-tot-nghiep/:slug',
                component: LetotnghiepDetailComponent,
                resolve: {
                    detail: KhoahocDetailResolver,
                },
            },
            { path: 'cuoc-thi-phun-xam', component: CuocthiphunxamComponent },
            {
                path: 'cuoc-thi-phun-xam/:slug',
                component: CuocthiphunxamchitietComponent,
                resolve: {
                    detail: KhoahocDetailResolver,
                },
            },
            {
                path: ':slug',
                component: AnswerPageComponent,
                resolve: {
                    detail: KhoahocDetailResolver,
                },
            },
        ],
    },
];
