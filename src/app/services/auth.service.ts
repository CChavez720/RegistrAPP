import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null; // Almacena el usuario autenticado en la sesión

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      const usersRef = this.firestore.collection('users', ref => ref.where('email', '==', email));
      const snapshot = await usersRef.get().toPromise();
  
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
  
        // Asegurarse de que userData es un objeto antes de usar el operador de propagación
        if (typeof userData === 'object' && userData !== null) {
          this.currentUser = { uid: userDoc.id, ...userData }; // Almacena datos del usuario
          return this.currentUser; // Devuelve los datos del usuario si la autenticación es exitosa
        } else {
          throw new Error('Datos de usuario inválidos');
        }
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
  

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUser;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación de contraseña:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }

  // Cerrar sesión
  logout() {
    // Elimina las credenciales almacenadas
    localStorage.removeItem('userCredentials');
    sessionStorage.removeItem('userCredentials');
    // Resetea el estado del usuario
    this.currentUser = null;
    // Cierra la sesión de Firebase
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
