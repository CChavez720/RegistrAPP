import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  clases: any[] = []; // Clases extraídas de Firebase
  estudiantes: any[] = []; // Estudiantes asociados a la clase seleccionada
  selectedClase: any = null; // Clase seleccionada
  equipos: any[] = []; // Equipos creados

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerClases();
  }

  // Obtener las clases desde Firebase
  obtenerClases() {
    this.firestore
      .collection('subjects')
      .valueChanges({ idField: 'id' })
      .subscribe((clases: any[]) => {
        this.clases = clases;
      });
  }

  // Obtener los estudiantes de la clase seleccionada
  obtenerEstudiantes(claseId: string) {
    this.estudiantes = []; // Limpiar la lista de estudiantes
    const claseSeleccionada = this.clases.find((clase) => clase.id === claseId);

    if (claseSeleccionada && claseSeleccionada.students) {
      // Obtener datos de los estudiantes
      claseSeleccionada.students.forEach((studentId: string) => {
        this.firestore
          .collection('users')
          .doc(studentId)
          .valueChanges()
          .subscribe((student: any) => {
            if (student && student.role === 'alumno') {
              this.estudiantes.push({
                id: studentId,
                name: `${student.name} ${student.last_name}`,
                email: student.email,
                selected: false,
              });
            }
          });
      });
    }
  }

  // Crear equipos con los estudiantes seleccionados
  crearEquipos() {
    const seleccionados = this.estudiantes.filter((e) => e.selected);
    if (seleccionados.length === 0) {
      alert('Por favor selecciona al menos un estudiante.');
      return;
    }

    const nuevoEquipo = {
      id: this.equipos.length + 1,
      miembros: seleccionados.map((e) => e.name),
    };

    this.equipos.push(nuevoEquipo);
    this.estudiantes.forEach((e) => (e.selected = false)); // Reiniciar selección
    alert('Equipo creado con éxito.');
  }
}
