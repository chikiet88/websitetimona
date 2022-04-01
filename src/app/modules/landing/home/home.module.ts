import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'material.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { SpecialzedComponent } from '../components/specialzed/specialzed.component';
import { IntroComponent } from '../components/intro/intro.component';
import { NewEventComponent } from '../components/new-event/new-event.component';
import { MainlayoutComponent } from '../components/mainlayout/mainlayout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { KhoahocComponent } from '../khoahoc/khoahoc.component';
import { SwiperModule } from 'swiper/angular';
import { AnswerPageComponent } from '../answer-page/answer-page.component';
import { ActivatePageComponent } from '../activate-page/activate-page.component';
import { StudentFeelPageComponent } from '../student-feel-page/student-feel-page.component';
import { CornerStudentComponent } from '../corner-student/corner-student.component';
import { TestComponent } from '../test/test.component';
import {FormComponent} from '../components/form/form.component'
import { IntroduceComponent } from '../introduce/introduce.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { LecturerPageComponent } from '../lecturer-page/lecturer-page.component';
@NgModule({
    declarations: [
        LandingHomeComponent,
        HomepageComponent,
        SpecialzedComponent,
        IntroComponent,
        NewEventComponent,
        MainlayoutComponent,
        FooterComponent,
        HeaderComponent,
        KhoahocComponent,
        AnswerPageComponent,
        ActivatePageComponent,
        StudentFeelPageComponent,
        CornerStudentComponent,
        TestComponent,
        FormComponent,
        IntroduceComponent,
        ContactPageComponent,
        LecturerPageComponent
    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        CarouselModule,
        MaterialExampleModule,
        SwiperModule,
        MdbDropdownModule
    ],
})
export class LandingHomeModule {}
