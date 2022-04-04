import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialExampleModule } from 'material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PageErrorComponent } from './modules/landing/page-error/page-error.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule} from '@angular/fire/compat'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireStorageModule } from '@angular/fire/compat/storage'
import { environment } from 'environments/environment';
const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        PageErrorComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        SharedModule,
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        MatSidenavModule,
        MatExpansionModule,
        MaterialExampleModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        CKEditorModule,

        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
