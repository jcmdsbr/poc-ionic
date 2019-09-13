import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
