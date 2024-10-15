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
  router = inject(Router);  // Inyectar el Router

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        console.log(res);
        // Redirige al home si el inicio de sesión es exitoso
        this.router.navigate(['/home']);
      }).catch(error => {
        console.log(error);
        // Manejo de errores: Muestra un mensaje al usuario
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
