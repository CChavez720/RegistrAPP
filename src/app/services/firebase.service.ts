import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // Método para iniciar sesión
  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  // Método para cerrar sesión
  signOut() {
    return this.auth.signOut();
  }

}
