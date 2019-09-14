import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { NavbarModule } from 'src/app/modules/navbar.module';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMaskIonicModule.forRoot(),
    NavbarModule
  ],
  entryComponents: [ContactFormComponent],
  declarations: [HomePage]
})
export class HomePageModule { }
