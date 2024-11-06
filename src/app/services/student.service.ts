import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Modelo para estudiantes
interface Student {
  id?: string; // ID generado automáticamente
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'alumno'; // Solo el rol de "alumno" para este servicio
  assignedCourses: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsCollection: AngularFirestoreCollection<Student>;

  constructor(private firestore: AngularFirestore) {
    this.studentsCollection = this.firestore.collection<Student>('users', ref => ref.where('role', '==', 'alumno'));
  }

  getStudents(): Observable<Student[]> {
    return this.studentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { ...data, id }; // Retornar el estudiante junto con el ID
      }))
    );
  }

  createStudent(student: Student): Promise<void> {
    return this.studentsCollection.add(student).then(docRef => {
      console.log(`Estudiante agregado con ID: ${docRef.id}`);
    });
  }

  updateStudent(id: string, data: Partial<Student>): Promise<void> {
    return this.studentsCollection.doc(id).update(data);
  }

  deleteStudent(id: string): Promise<void> {
    return this.studentsCollection.doc(id).delete().then(() => {
      console.log(`Estudiante con ID ${id} eliminado correctamente.`);
    }).catch(error => {
      console.error("Error al eliminar el estudiante:", error);
      throw error;
    });
  }
}
