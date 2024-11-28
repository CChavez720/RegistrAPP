import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  materias: any[] = [];  // Lista de asignaturas
  profesorId: string = '';

  constructor(
    private subjectsService: SubjectsService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.profesorId = user.uid;  // Suponiendo que el ID del usuario es el ID del profesor
        this.loadMaterias();         // Cargar las materias asignadas al profesor
      }
    });
  }

  // Cargar las materias asignadas al profesor
  loadMaterias() {
    this.subjectsService.getSubjectsByTeacher(this.profesorId).subscribe(materias => {
      this.materias = materias;
      console.log('Materias asignadas al profesor:', materias);  // Verifica que se carguen correctamente
    });
  }

  goBackToHome() {
    this.router.navigate(['/home']);  // Redirige a la página de administración
  }
}
