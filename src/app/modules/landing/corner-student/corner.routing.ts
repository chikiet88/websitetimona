import { Route } from '@angular/router';
import { ActivatePageComponent } from './activate-page/activate-page.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { CornerStudentComponent } from './corner-student.component';
import { StudentFeelPageComponent } from './student-feel-page/student-feel-page.component';

export const CornerStudentRoutes: Route[] = [
    {
        path: '',
        component: CornerStudentComponent,
        // pathMatch:'full',
        // redirectTo:"tin-tuc-su-kien/tintuc",
        children: [
            { path: 'giai-dap', component: AnswerPageComponent },
            { path: 'hoat-dong', component: ActivatePageComponent },
            { path: 'cam-nghi', component: StudentFeelPageComponent },
        ],
    },
];
