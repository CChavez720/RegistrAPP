import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; // Asegúrate de importar el servicio de Firebase
import { AuthService } from '../services/auth.service'; // Importa el servicio de AuthService

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private firebaseSvc: FirebaseService,
    private authService: AuthService // Asegúrate de que el AuthService esté inyectado
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser(); // Obtiene el usuario actual
    if (user) {
      this.firebaseSvc.getUserData(user.uid).subscribe(userData => {
        if (userData) {
          this.nombreUsuario = `${userData['name']} ${userData['last_name']}`; // Asigna el nombre completo
        }
      });
    }
  }

  verAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  escanearQR() {
    this.router.navigate(['/escanear-qr']);
  }

  logout() {
    this.firebaseSvc.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
