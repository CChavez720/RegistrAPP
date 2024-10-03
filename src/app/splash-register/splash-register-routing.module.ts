import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashRegisterPage } from './splash-register.page';

const routes: Routes = [
  {
    path: '',
    component: SplashRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashRegisterPageRoutingModule {}
