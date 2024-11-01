import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar tu AuthService
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // Obtener el usuario actual del AuthService
    if (user) {
      console.log('Usuario autenticado:', user); // Log para verificar el usuario
      return true; // Si está autenticado, permite el acceso
    } else {
      console.log('Usuario no autenticado'); // Log para verificar el estado
      this.router.navigate(['/login']); // Si no está autenticado, redirige a login
      return false;
    }
  }
}
