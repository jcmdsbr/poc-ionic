import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { NavbarModule } from 'src/app/modules/navbar.module';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMaskIonicModule.forRoot(),
    NavbarModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
