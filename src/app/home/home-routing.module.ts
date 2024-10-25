import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
      },
      // Se elimina la redirección automática para evitar conflictos
      {
        path: '',
        redirectTo: '',  // Puedes dejar vacío si no necesitas redirigir automáticamente
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
