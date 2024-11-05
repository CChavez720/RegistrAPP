import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    this.auth.setPersistence('local');
  }

  // Método para obtener la información del usuario logueado
  getUserData(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  // Método para cerrar sesión
  signOut() {
    return this.auth.signOut();
  }
}
