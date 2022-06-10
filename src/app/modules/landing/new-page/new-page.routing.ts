import { Route } from '@angular/router';
import { HocnghecungchuyengiaComponent } from './hocnghecungchuyengia/hocnghecungchuyengia.component';
import { LamdepComponent } from './lamdep/lamdep.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewPageComponent } from './new-page.component';
import { SukienComponent } from './sukien/sukien.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { TintucdetailComponent } from './tintucdetail/tintucdetail.component';

export const newPageRoutes: Route[] = [
    {
        path: '',
        component: NewPageComponent,
        // pathMatch:'full',
        // redirectTo:"tin-tuc-su-kien/tintuc",
        children: [
            {
                path: '',
                component: NewListComponent,
                children: [
                    {
                        path: ':slug',
                        component: TintucComponent,
                    },

                   
                ],
            },

            // { path: ':slug', component: TintucdetailComponent },
        ],
    },
];
