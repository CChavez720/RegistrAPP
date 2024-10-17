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

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      const user = this.form.value as User;

      // Verifica que los valores del formulario estén correctos antes de enviarlos
      console.log('Email ingresado:', user.email);
      console.log('Password ingresado:', user.password);

      this.firebaseSvc.signIn(user).then(res => {
        const userCredential = res.user;

        if (userCredential) {
          // Obtén el email del usuario autenticado en Firebase
          const firebaseEmail = userCredential.email;

          // Compara el email ingresado en el formulario con el email autenticado
          console.log('Email autenticado en Firebase:', firebaseEmail);
          console.log('Comparando correos:');
          console.log('Correo ingresado por el usuario:', user.email);
          console.log('Correo autenticado en Firebase:', firebaseEmail);

          if (user.email === firebaseEmail) {
            console.log('Los correos coinciden.');
            this.router.navigate(['/estudiante']);
          } else {
            console.log('Los correos no coinciden.');
            this.utilsSvc.presentAlert('Error', 'Las credenciales no coinciden. Por favor verifica tu email y contraseña.');
          }
        } else {
          this.utilsSvc.presentAlert('Error', 'No se ha podido iniciar sesión. Inténtalo de nuevo.');
        }
      }).catch(error => {
        // Manejo de errores en la autenticación
        console.error('Error en la autenticación:', error);

        // Muestra el email ingresado por el usuario
        console.log('Email ingresado:', user.email);

        // Observa el estado de autenticación de Firebase para obtener el email del usuario
        this.firebaseSvc.auth.authState.subscribe(authUser => {
          if (authUser) {
            const firebaseEmail = authUser.email;
            console.log('Email autenticado en Firebase durante error:', firebaseEmail);
            console.log('Comparando correos durante error:');
            console.log('Correo ingresado por el usuario:', user.email);
            console.log('Correo autenticado en Firebase:', firebaseEmail);
          } else {
            console.log('No se pudo autenticar con Firebase, no hay email disponible.');
          }
        });

        // Muestra alerta de credenciales incorrectas
        this.utilsSvc.presentAlert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
      }).finally(() => {
        loading.dismiss();
      });
    } else {
      // Si el formulario no es válido, muestra un mensaje de advertencia
      this.utilsSvc.presentAlert('Advertencia', 'Por favor, completa todos los campos correctamente.');
    }
  }
}
