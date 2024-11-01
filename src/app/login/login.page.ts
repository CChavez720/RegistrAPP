import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Define el formulario reactivo y agrega validaciones
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async submit() {
    if (this.form.valid) {
      try {
        const { email, password } = this.form.value;
        const userCredential = await this.authService.login(email, password);
  
        if (userCredential) {
          console.log('Inicio de sesión exitoso:', userCredential);
          this.router.navigate(['/home']); // Redirige a la página de inicio
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    }
  }
  
}
