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
import { SpecialzedComponent } from '../homepage/specialzed/specialzed.component';

import { MainlayoutComponent } from '../components/mainlayout/mainlayout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { KhoahocComponent } from '../khoahoc/khoahoc.component';
import { SwiperModule } from 'swiper/angular';

import {FormComponent} from '../components/form/form.component'
import { IntroduceComponent } from '../introduce/introduce.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { LecturerPageComponent } from '../lecturer-page/lecturer-page.component';
import { CommitComponent } from '../homepage/commit/commit.component';
import { LecturerComponent } from '../homepage/lecturer/lecturer.component';
import { IntroComponent } from '../homepage/intro/intro.component';
import { NewEventComponent } from '../homepage/new-event/new-event.component';
import { StoryComponent } from '../homepage/story/story.component';
import { ExpertComponent } from '../homepage/expert/expert.component';
import { NewPageComponent } from '../new-page/new-page.component';
import { CornerStudentComponent } from '../corner-student/corner-student.component';

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
        FormComponent,
        IntroduceComponent,
        ContactPageComponent,
        LecturerPageComponent,
        CommitComponent,
        LecturerComponent,
        StoryComponent,
        ExpertComponent,
        NewPageComponent,
        CornerStudentComponent
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
