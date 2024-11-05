import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definición del modelo User dentro del mismo archivo
interface User {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'alumno' | 'profesor';  // Solo los roles "alumno" y "profesor"
  assignedCourses: string[];  // Array de IDs de ramos asignados
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  getUsersByRole(role: 'alumno' | 'profesor'): Observable<User[]> {
    return this.firestore.collection<User>('users', ref => ref.where('role', '==', role))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { ...data, id }; // Retornar el usuario junto con el ID
        }))
      );
  }

  createUser(user: User): Promise<void> {
    return this.usersCollection.add(user).then(docRef => {
      console.log(`Usuario agregado con ID: ${docRef.id}`);
    });
  }

  updateUser(id: string, data: Partial<User>): Promise<void> {
    return this.usersCollection.doc(id).update(data);
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
