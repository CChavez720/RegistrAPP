import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

interface Subject {
  id?: string;
  name: string;
  description: string;
  students: string[];
  teachers: string[];
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  // Cargar las asignaturas de Firebase
  loadSubjects() {
    this.subjectsService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  // Agregar una nueva asignatura
  addSubject() {
    const newSubject: Subject = { name: 'Nueva Asignatura', description: '', students: [], teachers: [] };
    this.subjectsService.addSubject(newSubject);
  }

  // Asignar usuario a asignatura
  assignUser(subjectId: string, userId: string, role: 'student' | 'teacher') {
    this.subjectsService.assignToSubject(subjectId, userId, role);
  }

  // Eliminar asignatura
  deleteSubject(subjectId: string) {
    this.subjectsService.deleteSubject(subjectId);
  }
}
