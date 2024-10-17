import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; // Importa el servicio de Firebase

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage {
  nombreUsuario: string; // Propiedad para el nombre del usuario

  constructor(private router: Router, private firebaseSvc: FirebaseService) { // Inyecta FirebaseService
    // Aquí puedes obtener el nombre del usuario de una API, servicio, o localStorage
    this.nombreUsuario = 'Juan Perez'; 
  }

  verAsistencia() {
    // Redirigir a la página de asistencia
    this.router.navigate(['/asistencia']);
  }

  escanearQR() {
    // Redirigir a la página de escaneo de QR
    this.router.navigate(['/escanear-qr']);
  }

  // Método para cerrar sesión
  logout() {
    this.firebaseSvc.auth.signOut().then(() => {
      // Redirige al login después de cerrar sesión
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
