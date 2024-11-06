import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async resetPassword(event: Event) {
    event.preventDefault(); // Previene la recarga de la página
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      try {
        await this.authService.sendPasswordResetEmail(email);
        alert('Se ha enviado un enlace para restablecer tu contraseña');
      } catch (error) {
        console.error('Error al enviar el correo de recuperación:', error);
      }
    }
  }  
  
}
