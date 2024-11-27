import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  userName: string = ''; // Nombre del usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) {}

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

  logout() {
    this.authService.logout(); // Llamar al logout del servicio
  }

  navigateToMaterias() {
    this.router.navigate(['/materias']);
  }

  navigateToGrupos() {
    this.router.navigate(['/grupos']);
  }

  navigateToHorarios() {
    this.router.navigate(['/horarios']);
  }

  navigateToAlumnos() {
    this.router.navigate(['/alumnos']);
  }

  navigateToAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  navigateToReporte() {
    this.router.navigate(['/reporte']);
  }
}
