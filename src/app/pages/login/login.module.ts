import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { NavbarModule } from 'src/app/modules/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    NavbarModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
