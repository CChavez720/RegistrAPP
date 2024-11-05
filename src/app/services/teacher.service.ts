import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Modelo User para profesores
interface User {
  id?: string; // ID generado automáticamente
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'profesor'; // Solo el rol de "profesor" para este servicio
  assignedCourses: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.teachersCollection = this.firestore.collection<User>('users', ref => ref.where('role', '==', 'profesor'));
  }

  getTeachers(): Observable<User[]> {
    return this.teachersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }

  createTeacher(teacher: User): Promise<void> {
    return this.teachersCollection.add(teacher).then(docRef => {
      console.log(`Profesor agregado con ID: ${docRef.id}`);
    });
  }

  updateTeacher(id: string, data: Partial<User>): Promise<void> {
    return this.teachersCollection.doc(id).update(data);
  }

  deleteTeacher(id: string): Promise<void> {
    return this.teachersCollection.doc(id).delete();
  }
}
