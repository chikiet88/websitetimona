import { Route } from '@angular/router';
import { KhoahocComponent } from './khoahoc.component';
import { Theme1Component } from './theme1/theme1.component';
import { Theme2Component } from './theme2/theme2.component';
import { Theme3Component } from './theme3/theme3.component';

export const khoahocRoutes: Route[]=[
    {path:'',component:KhoahocComponent, children:[
        {path:':id', component:Theme1Component},
        { path:'khoa-hoc/theme2',component:Theme2Component},
        { path:'khoa-hoc/theme3',component:Theme3Component},
    ]},
]
