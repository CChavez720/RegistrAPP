import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  alumnos: any[] = [  // Lista de alumnos simulados
    { id: 1, nombre: 'Camilo Chávez' },
    { id: 2, nombre: 'Santino Mardones' }
  ];

  asistenciaSimulada: any = {  // Datos de asistencia simulados por alumno
    1: [
      { fecha: '2024-12-03', estado: 'Presente' },
      { fecha: '2024-12-05', estado: 'Ausente' },
      { fecha: '2024-12-10', estado: 'Ausente' },
      { fecha: '2024-12-12', estado: 'Presente' }
    ],
    2: [
      { fecha: '2024-12-03', estado: 'Ausente' },
      { fecha: '2024-12-05', estado: 'Presente' },
      { fecha: '2024-12-10', estado: 'Presente' },
      { fecha: '2024-12-12', estado: 'Presente' }
    ],
  };

  selectedAlumno: any;  // Alumno seleccionado
  asistencia: any[] = []; // Asistencia del alumno seleccionado

  constructor() {}

  ngOnInit() {}

  // Manejar la selección del alumno
  onAlumnoSelected() {
    if (this.selectedAlumno) {
      this.asistencia = this.asistenciaSimulada[this.selectedAlumno.id] || [];
    }
  }
}
