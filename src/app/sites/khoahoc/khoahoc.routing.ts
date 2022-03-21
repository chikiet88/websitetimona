import { Route } from '@angular/router';
import { KhoahocListComponent } from './khoahoc-list/khoahoc-list.component';
import { KhoahocComponent } from './khoahoc.component';
import { KhoahocDetailResolver, KhoahocResolver } from './khoahoc.resolvers';
import { Theme1Component } from './theme1/theme1.component';
import { Theme2Component } from './theme2/theme2.component';
import { Theme3Component } from './theme3/theme3.component';

export const khoahocRoutes: Route[] = [
  {
    path: '',
    component: KhoahocComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: KhoahocListComponent,
        resolve: {
          courses: KhoahocResolver,
        },
      },

      {
        path: 'theme1',
        pathMatch: 'full',
        component:Theme1Component,
       
      },
      {
        path: 'theme2',
        pathMatch: 'full',
        component:Theme2Component,
       
      },
      {
        path: 'theme3',
        pathMatch: 'full',
        component:Theme3Component,
       
      },

        {
        path: ':id',
        component: Theme1Component,
        resolve: {
          detail: KhoahocDetailResolver,
        },
      },
      // { path:'theme2',component:Theme2Component},
      // { path:'theme3',component:Theme3Component},
    ],
  },
];
