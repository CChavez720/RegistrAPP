import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {
  nombreUsuario: string = 'Camilo Chavez';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  // Función para redirigir a la página de asistencia del estudiante
  verAsistencia() {
    this.router.navigate(['/asistencia-alumno']);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      // Redirigir a la página de login después de cerrar sesión
      this.router.navigate(['/login']);
    });
    console.log('Cerrando sesión...');
  }
}
