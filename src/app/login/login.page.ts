import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'src/models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);

  ngOnInit() {
    // Aquí no redirigimos automáticamente, el login es la vista inicial.
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      const user = this.form.value as User;
  
      this.firebaseSvc.signIn(user).then(res => {
        const userCredential = res.user;
  
        if (userCredential) {
          // Obtén el email del usuario autenticado
          const firebaseEmail = userCredential.email;
  
          // Define las condiciones para redirigir a diferentes páginas según el email
          if (firebaseEmail === 'tania@duoc.profesor.cl') {
            // Redirige al home si es un correo de administrador
            this.router.navigate(['/home']);
          } else if (firebaseEmail === 'camilo@duocuc.cl') {
            // Redirige a la página de estudiante si es un correo de estudiante
            this.router.navigate(['/estudiante']);
          } else {
            // Puedes manejar otros roles o redirigir a una página por defecto
            this.router.navigate(['/default']);
          }
        } else {
          this.utilsSvc.presentAlert('Error', 'No se ha podido iniciar sesión. Inténtalo de nuevo.');
        }
      }).catch(error => {
        console.error('Error en la autenticación:', error);
        this.utilsSvc.presentAlert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
      }).finally(() => {
        loading.dismiss();
      });
    } else {
      this.utilsSvc.presentAlert('Advertencia', 'Por favor, completa todos los campos correctamente.');
    }
  }
}
