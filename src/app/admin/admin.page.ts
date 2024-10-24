import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; // Importa el servicio de Firebase

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  // Método para cerrar sesión
  async logout() {
    try {
      // Llamada a Firebase signOut
      await this.firebaseService.signOut();
      // Redirigir a la página de login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  // Métodos de navegación opcionales
  navigateToStudents() {
    this.router.navigateByUrl('/admin/students');
  }

  navigateToTeachers() {
    this.router.navigateByUrl('/admin/teachers');
  }
}
