import { Route } from '@angular/router';
import { HocnghecungchuyengiaComponent } from './hocnghecungchuyengia/hocnghecungchuyengia.component';
import { LamdepComponent } from './lamdep/lamdep.component';
import { NewPageComponent } from './new-page.component';
import { SukienComponent } from './sukien/sukien.component';
import { TintucComponent } from './tintuc/tintuc.component';

export const newPageRoutes: Route[] = [
  {
    path: '',
    component: NewPageComponent,
    // pathMatch:'full',
    // redirectTo:"tin-tuc-su-kien/tintuc",
    children: [
      {

        path: 'tintuc',
        component: TintucComponent,
      },
      {
        path: 'sukien',
        component: SukienComponent
      },
      {
        path: 'lamdep',
        component: LamdepComponent
      },
      {
        path: 'hoc-nghe-cung-chuyen-gia',
        component: HocnghecungchuyengiaComponent
      },

      
      
    ],
  },
];
