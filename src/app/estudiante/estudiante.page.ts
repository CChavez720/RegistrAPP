import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.page.html',
  styleUrls: ['./estudiante.page.scss'],
})
export class EstudiantePage {
  nombreUsuario: string; // Propiedad para el nombre del usuario

  constructor(private router: Router) {
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
}
