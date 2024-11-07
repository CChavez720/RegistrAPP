import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userName: string = 'Tania Prado'; // Nombre del usuario

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

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
