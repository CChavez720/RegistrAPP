import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {
  showAttendanceHistory: boolean = false;

  attendanceRecords = [
    { fecha: '2024-10-30', materia: 'Desarrollo de Software', estado: 'Asistió' },
    { fecha: '2024-11-02', materia: 'Desarrollo de Software', estado: 'Ausente' },
    { fecha: '2024-11-04', materia: 'Desarrollo de Software', estado: 'Asistió' },
    { fecha: '2024-11-06', materia: 'Desarrollo de Software', estado: 'Asistió' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleAttendanceHistory() {
    this.showAttendanceHistory = !this.showAttendanceHistory;
  }

  // Cambia la función de volver para redirigir específicamente a la página de estudiante
  volver() {
    this.router.navigate(['/estudiante']);
  }
}
