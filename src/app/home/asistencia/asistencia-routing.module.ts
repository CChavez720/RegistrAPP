import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';  // Asegúrate de importar HomePage correctamente

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
