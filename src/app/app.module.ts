import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePagesComponent } from './components/home-pages/home-pages.component';

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
                                                                                        StudentFeelPageComponent
                                       
                      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

