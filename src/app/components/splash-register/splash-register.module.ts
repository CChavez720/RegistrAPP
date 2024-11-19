import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashRegisterPageRoutingModule } from './splash-register-routing.module';

import { SplashRegisterPage } from './splash-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashRegisterPageRoutingModule
  ],
  declarations: [SplashRegisterPage]
})
export class SplashRegisterPageModule {}
