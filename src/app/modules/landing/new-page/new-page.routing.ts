import { Route } from '@angular/router';
import { NewPageComponent } from './new-page.component';
import { TintucComponent } from './tintuc/tintuc.component';

export const newPageRoutes: Route[] = [
  {
    path: '',
    component: NewPageComponent,
    children: [
      {
        path: 'A',
        component: TintucComponent
      },

      
      
    ],
  },
];
