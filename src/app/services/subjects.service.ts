import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

interface User {
  id: string;
  email: string;
  name: string;
  last_name: string;
  role: 'alumno' | 'profesor';
  assignedCourses: string[];  // Propiedad que contiene las asignaturas
}

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
    const userDoc = this.firestore.collection('users').doc(userId);

    return this.firestore.firestore.runTransaction(async (transaction) => {
      const subject = (await transaction.get(subjectDoc.ref)).data() as Subject;
      const user = (await transaction.get(userDoc.ref)).data() as User;  // Se asegura de que 'user' tenga el tipo 'User'

      // Agregar al estudiante o profesor en la asignatura
      if (role === 'student') {
        subject.students = [...(subject.students || []), userId];
      } else {
        subject.teachers = [...(subject.teachers || []), userId];
      }

      // Agregar la asignatura al campo assignedCourses del usuario
      const assignedCourses = user?.assignedCourses || [];
      if (!assignedCourses.includes(subjectId)) {
        assignedCourses.push(subjectId);
      }

      // Actualizar los documentos
      transaction.update(subjectDoc.ref, subject);
      transaction.update(userDoc.ref, { assignedCourses });
    });
  }

  // Asignar múltiples estudiantes o profesores a una asignatura
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

      // Actualizar los usuarios seleccionados en 'assignedCourses'
      const userDocs = userIds.map(userId => this.firestore.collection('users').doc(userId));
      const users = await Promise.all(userDocs.map(doc => transaction.get(doc.ref)));
      
      users.forEach(userSnapshot => {
        const user = userSnapshot.data() as User;  // Usamos el tipo 'User' aquí
        const assignedCourses = user?.assignedCourses || [];
        if (!assignedCourses.includes(subjectId)) {
          assignedCourses.push(subjectId);
        }
        transaction.update(userSnapshot.ref, { assignedCourses });
      });

      transaction.update(subjectDoc.ref, subject);
    }).catch(error => {
      console.error("Error en la transacción de asignación:", error);
      throw error;
    });
  }

  // Obtener estudiantes
  getStudents(): Observable<any[]> {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'alumno')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Obtener profesores
  getTeachers(): Observable<any[]> {
    return this.firestore.collection('users', ref => ref.where('role', '==', 'profesor')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getSubjectsByTeacher(teacherId: string): Observable<Subject[]> {
    return this.firestore.collection<Subject>('subjects', ref => ref.where('teachers', 'array-contains', teacherId))
      .valueChanges({ idField: 'id' });
  }
}
