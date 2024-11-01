import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userImage: string = 'ruta/a/la/imagen'; // Ruta de la imagen del usuario
  userName: string = 'Nombre de Usuario'; // Nombre del usuario

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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

  logout() {
    // Lógica para cerrar sesión
    // Por ejemplo, si usas Firebase:
    this.afAuth.signOut().then(() => {
      // Redirigir a la página de login después de cerrar sesión
      this.router.navigate(['/login']);
    });
  }
}
