import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Subject {
  id?: string;
  name: string;
  description: string;
  students: string[]; // Lista de IDs de estudiantes
  teachers: string[]; // Lista de IDs de profesores
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
}
