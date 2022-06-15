import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { MaterialExampleModule } from 'material.module';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from '../theme/theme.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddBaivietComponent } from '../add-baiviet/add-baiviet.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CauhinhComponent } from '../cauhinh/cauhinh.component';
import { DanhmucComponent } from '../danhmuc/danhmuc.component';
import { LetotnghiepComponent } from '../letotnghiep/letotnghiep.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExampleComponent,
        children: [
            { path: 'menu', component: MenuComponent },
            { path: 'theme', component: ThemeComponent },
            { path: 'bai-viet', component: AddBaivietComponent },
            { path: 'contact', component: AddContactComponent },
            { path: 'footer', component: CauhinhComponent },
            { path: 'danhmuc', component: DanhmucComponent },
            { path: 'letotnghiep', component: LetotnghiepComponent },
        ],
    },
];

@NgModule({
    declarations: [
        ExampleComponent,
        MenuComponent,
        ThemeComponent,
        AddBaivietComponent,
        AddContactComponent,
        CauhinhComponent,
        DanhmucComponent,
        LetotnghiepComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialExampleModule,
        CommonModule,
        CKEditorModule,
    ],
})
export class ExampleModule {}
