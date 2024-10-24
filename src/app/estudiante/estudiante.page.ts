import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; // Importa el servicio de Firebase

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage {
  nombreUsuario: string;

  constructor(private router: Router, private firebaseSvc: FirebaseService) {
    this.nombreUsuario = 'Juan Perez';
  }

  verAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  escanearQR() {
    this.router.navigate(['/escanear-qr']);
  }

  logout() {
    this.firebaseSvc.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
