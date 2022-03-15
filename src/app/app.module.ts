import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



// import { AdminComponent } from './sites/admin/admin.component';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { KhoahocComponent } from './sites/khoahoc/khoahoc.component';
import { KhoahocModule } from './sites/khoahoc/khoahoc.module';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    
    AppComponent,
      
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
                                                                                       
                                                                                       
                                                                                                                                                                                
                                                                                        
                                                                                                                                                                                 KhoahocComponent,
                                                                                                                                                                                //  AdminComponent,
                                                                                                                                                                                 KhoahocComponent,
                                       
                      
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
      
    }),
    MatSidenavModule,
    MatExpansionModule,
    KhoahocModule,
   
    
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

