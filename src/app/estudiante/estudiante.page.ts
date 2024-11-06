import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage implements OnInit {
  nombreUsuario: string = 'Camilo C.';

  constructor(private router: Router) {}

  ngOnInit() {}

  // Función para redirigir a la página de asistencia del estudiante
  verAsistencia() {
    this.router.navigate(['/asistencia-alumno']);
  }

  logout() {
    console.log('Cerrando sesión...');
  }
}
