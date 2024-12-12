import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  classes: any[] = []; // Clases asignadas al profesor
  selectedClass: any = null; // Clase seleccionada
  alumnos: any[] = []; // Alumnos de la clase seleccionada
  currentProfessorId: string = '2eqGwmkNA8Tv38nQVHwDacpYlbk1'; // Cambiar por el ID del profesor logueado

  constructor() {}

  async ngOnInit() {
    await this.obtenerClases();
  }

  // Método para obtener las clases asignadas al profesor
  async obtenerClases() {
    const db = getFirestore();
    const subjectsRef = collection(db, 'subjects');
    const q = query(subjectsRef, where('teachers', 'array-contains', this.currentProfessorId));
    const querySnapshot = await getDocs(q);

    this.classes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Clases asignadas:', this.classes);
  }

  // Método para obtener los alumnos de una clase seleccionada
  async seleccionarClase(clase: any) {
    this.selectedClass = clase; // Guarda la clase seleccionada
    this.alumnos = []; // Limpia la lista de alumnos

    const db = getFirestore();
    const usersRef = collection(db, 'users');

    // Consulta para obtener los alumnos inscritos en la clase
    for (const studentId of clase.students) {
      const studentDoc = await getDoc(doc(usersRef, studentId));
      if (studentDoc.exists()) {
        this.alumnos.push({ id: studentDoc.id, ...studentDoc.data() });
      }
    }

    console.log('Alumnos de la clase:', this.alumnos);
  }
}
