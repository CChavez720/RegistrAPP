import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  constructor(private router: Router) {}

  onLogin() {
    // Aquí puedes manejar la lógica de autenticación
    console.log("Login button clicked!");

    // Simula el inicio de sesión exitoso y redirige al usuario
    this.router.navigate(['/dashboard']); // O a la ruta que desees redirigir
  }
}

