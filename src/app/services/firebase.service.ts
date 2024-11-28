import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getSubjectsByTeacher(teacherId: string): Observable<any[]> {
    return this.firestore.collection('subject', ref => ref.where('teachers', 'array-contains', teacherId))
      .snapshotChanges()
      .pipe(
        map(actions => 
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data }; // Retornar el id del documento junto con los datos
          })
        )
      );
  }

  // Método para cerrar sesión
  signOut() {
    return this.auth.signOut();
  }
}
