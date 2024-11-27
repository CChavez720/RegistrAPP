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
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const currentUser = userCredential.user;
  
      if (!currentUser) {
        console.error('Error al autenticar: Usuario no válido.');
        throw new Error('Usuario no válido.');
      }
  
      console.log('Usuario autenticado con UID:', currentUser.uid);
  
      // Obtener el documento del usuario
      const userDocRef = this.firestore.collection('users').doc(currentUser.uid);
      const userDocSnapshot = await userDocRef.get().toPromise();
  
      if (!userDocSnapshot.exists) {
        console.error('Documento del usuario no encontrado en Firestore.');
        throw new Error('Documento del usuario no encontrado en Firestore.');
      }
  
      const userData = userDocSnapshot.data();
      console.log('Datos obtenidos de Firestore:', userData);
  
      // Almacenar el usuario actual
      this.currentUser = { uid: currentUser.uid, userData };
      console.log('Inicio de sesión exitoso:', this.currentUser);
  
      return this.currentUser;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
  

  // Obtener el usuario actual
  getCurrentUser() {
    return this.currentUser;
  }

  // Enviar correo de recuperación de contraseña
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación de contraseña:', error);
      throw error;
    }
  }

  // Cerrar sesión
  logout() {
    // Limpiar credenciales
    localStorage.removeItem('userCredentials');
    sessionStorage.removeItem('userCredentials');
    this.currentUser = null;

    // Cerrar sesión en Firebase y redirigir al login
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
