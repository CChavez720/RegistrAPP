import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then( m => m.TeachersPageModule)
  },  {
    path: 'subjects',
    loadChildren: () => import('./subjects/subjects.module').then( m => m.SubjectsPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
