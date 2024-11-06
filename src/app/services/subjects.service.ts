import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { User } from 'src/models/user.model';

interface Subject {
  id?: string;
  name: string;
  section: string;
  room: string;
  date: string;
  description?: string;
  students: string[];
  teachers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjectsCollection = this.firestore.collection<Subject>('subjects');

  constructor(private firestore: AngularFirestore) {}

  // Crear una nueva asignatura
  addSubject(subject: Subject): Promise<void> {
    const id = this.firestore.createId();
    return this.subjectsCollection.doc(id).set({ ...subject, id });
  }

  // Obtener todas las asignaturas
  getSubjects(): Observable<Subject[]> {
    return this.subjectsCollection.valueChanges({ idField: 'id' });
  }

  // Actualizar una asignatura
  updateSubject(id: string, subject: Partial<Subject>): Promise<void> {
    return this.subjectsCollection.doc(id).update(subject);
  }

  // Eliminar una asignatura
  deleteSubject(id: string): Promise<void> {
    return this.subjectsCollection.doc(id).delete();
  }

  // Asignar estudiante o profesor a una asignatura
  assignToSubject(subjectId: string, userId: string, role: 'student' | 'teacher'): Promise<void> {
    const subjectDoc = this.subjectsCollection.doc(subjectId);
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const subject = (await transaction.get(subjectDoc.ref)).data() as Subject;

      if (role === 'student') {
        subject.students = [...(subject.students || []), userId];
      } else {
        subject.teachers = [...(subject.teachers || []), userId];
      }

      transaction.update(subjectDoc.ref, subject);
    });
  }

  assignMultipleUsersToSubject(
    subjectId: string,
    userIds: string[],
    role: 'student' | 'teacher'
  ): Promise<void> {
    if (!userIds || userIds.length === 0) {
      console.error("Error: No se proporcionaron IDs de usuarios para asignar.");
      return Promise.reject("No se seleccionaron usuarios.");
    }
  
    const subjectDoc = this.subjectsCollection.doc(subjectId);
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const subject = (await transaction.get(subjectDoc.ref)).data() as any;
  
      if (role === 'student') {
        subject.students = [...new Set([...(subject.students || []), ...userIds])];
      } else {
        subject.teachers = [...new Set([...(subject.teachers || []), ...userIds])];
      }
  
      transaction.update(subjectDoc.ref, subject);
    }).catch(error => {
      console.error("Error en la transacción de asignación:", error);
      throw error;
    });
  }
  
   // Método para obtener estudiantes
   getStudents(): Observable<any[]> {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'alumno')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Método para obtener profesores
  getTeachers(): Observable<any[]> {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'profesor')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
