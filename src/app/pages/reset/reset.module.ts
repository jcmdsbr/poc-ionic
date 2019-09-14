import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResetPage } from './reset.page';
import { NavbarModule } from 'src/app/modules/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: ResetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    NavbarModule
  ],
  declarations: [ResetPage]
})
export class ResetPageModule { }
