import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para redirigir
import { FirebaseService } from '../services/firebase.service'; // Importa el servicio de Firebase

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Declaración de propiedades de la clase
  userName: string = 'Juan Pérez';  // Nombre de usuario
  userImage: string = 'assets/img/user.png';  // Ruta de la imagen del usuario

  // Inyecta el servicio de Firebase y el Router
  constructor(private firebaseSvc: FirebaseService, private router: Router) {}

  // Método para cerrar sesión
  logout() {
    this.firebaseSvc.auth.signOut().then(() => {
      // Redirige al login después de cerrar sesión
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  // Método para redirigir a la página de asistencia
  navigateToAsistencia() {
    this.router.navigate(['/home/asistencia']);  // Redirige a la página de asistencia
  }
}
