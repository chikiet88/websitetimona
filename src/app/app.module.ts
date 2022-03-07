import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePagesComponent } from './components/home-pages/home-pages.component';
import {MatSidenavModule} from '@angular/material/sidenav';


import { SpecialzedComponent } from './components/specialzed/specialzed.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { IntroComponent } from './components/intro/intro.component';
import { LecturerPageComponent } from './sites/lecturer-page/lecturer-page.component';
import { NewPageComponent } from './sites/new-page/new-page.component';
import { ContactPageComponent } from './sites/contact-page/contact-page.component';
import { IntroduceComponent } from './sites/introduce/introduce.component';
import { HeaderComponent } from './components/header/header.component';

import { CornerStudentComponent } from './sites/corner-student/corner-student.component';
import { AnswerPageComponent } from './sites/answer-page/answer-page.component';
import { ActivatePageComponent } from './sites/activate-page/activate-page.component';
import { StudentFeelPageComponent } from './sites/student-feel-page/student-feel-page.component';
import { HomepageComponent } from './sites/homepage/homepage.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { FooterComponent } from './components/footer/footer.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { Theme1Component } from './sites/theme1/theme1.component';
import { Theme2Component } from './sites/theme2/theme2.component';
import { Theme3Component } from './sites/theme3/theme3.component';




@NgModule({
  declarations: [
    
    AppComponent,
          HomePagesComponent,   
                      SpecialzedComponent,
                                             NewEventComponent,
                                             IntroComponent,
                                             LecturerPageComponent,
                                             NewPageComponent,
                                             ContactPageComponent,
                                             IntroduceComponent,
                                             HeaderComponent,
                                         
                                             CornerStudentComponent,
                                                                                        AnswerPageComponent,
                                                                                        ActivatePageComponent,
                                                                                        StudentFeelPageComponent,
                                                                                        HomepageComponent,
                                                                                        MainlayoutComponent,
                                                                                        FooterComponent,
                                                                                       
                                                                                       
                                                                                                                                                                                
                                                                                                                                                                                 Theme1Component,
                                                                                                                                                                                 Theme2Component,
                                                                                                                                                                                 Theme3Component
                                       
                      
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
      
    }),
    MatSidenavModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

