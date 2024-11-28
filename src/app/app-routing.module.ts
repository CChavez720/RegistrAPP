import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard que has creado

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
  {
    path: '',
    redirectTo: 'splash-register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash-register',
    loadChildren: () => import('./components/splash-register/splash-register.module').then(m => m.SplashRegisterPageModule)
  },
  {
    path: 'estudiante',
    loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudiantePageModule),
    canActivate: [AuthGuard] // Protege la ruta de estudiante
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuard] // Protege la ruta de admin si es necesario
  },
  {
    path: 'materias',
    loadChildren: () => import('./home/materias/materias.module').then( m => m.MateriasPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./home/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./asistencia-alumno/asistencia-alumno.module').then( m => m.AsistenciaAlumnoPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


