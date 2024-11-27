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
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Definir el formulario reactivo y validaciones
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Limpiar el formulario al cargar la página (en caso de persistencia de datos)
    this.form.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
  
      try {
        const userCredential = await this.authService.login(email, password);
  
        // Extraer el rol desde userCredential
        const userRole = userCredential.userData.role;
  
        if (userRole === 'profesor') {
          this.router.navigate(['/home']);
        } else if (userRole === 'alumno') {
          this.router.navigate(['/estudiante']);
        } else if (userRole === 'administrador') {
          this.router.navigate(['/admin']);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
  

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
  
  logout() {
    this.form.reset();  // Limpia los campos del formulario
    // Resetea el formulario de login
    localStorage.removeItem('userCredentials');  // Asegúrate de eliminar las credenciales
    sessionStorage.removeItem('userCredentials');  // También elimina de sessionStorage si usas
    this.authService.logout();  // Llama al logout del servicio
  }
}
