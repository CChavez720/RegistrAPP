import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null; // Guarda los datos del usuario autenticado

  constructor(private firestore: AngularFirestore) {}

  // Iniciar sesión manualmente con Firestore
  async login(email: string, password: string) {
    try {
      const usersRef = this.firestore.collection('users', ref => ref.where('email', '==', email));
      const snapshot = await usersRef.get().toPromise();

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (userData['password'] === password) {
          this.currentUser = { uid: userDoc.id, ...(userData as object) }; // Almacena los datos del usuario en currentUser
          return this.currentUser; // Devuelve los datos del usuario si la autenticación es exitosa
        } else {
          throw new Error('Contraseña incorrecta');
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

  // Cerrar sesión
  logout() {
    this.currentUser = null; // Limpia los datos del usuario al cerrar sesión
  }
}
