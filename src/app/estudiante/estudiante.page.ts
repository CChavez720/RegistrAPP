import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {
  userName: string = '';

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const uid = user.uid; // Extraer el uid del usuario actual
        // Llamar a getUserData con el uid para obtener el nombre del usuario
        this.firebaseService.getUserData(uid).subscribe((userData: any) => {
          if (userData) {
            this.userName = userData.name; // Asignar el nombre del usuario a la variable
          }
        });
      }
    }).catch(error => console.error('Error al obtener el usuario', error));
  }

  // Función para redirigir a la página de asistencia del estudiante
  verAsistencia() {
    this.router.navigate(['/asistencia-alumno']);
  }

  verQr() {
    this.router.navigate(['/estudiante/escanear-qr']);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      // Redirigir a la página de login después de cerrar sesión
      this.router.navigate(['/login']);
    });
    console.log('Cerrando sesión...');
  }
}
