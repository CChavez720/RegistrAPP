import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';
import { AlertController } from '@ionic/angular';

interface Subject {
  id?: string;
  name: string;
  section: string;
  room: string;
  date: string;
  description?: string;
  students: string[];  // IDs de los estudiantes asignados
  teachers: string[];  // IDs de los profesores asignados
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  subjects: Subject[] = [];  // Lista de asignaturas
  students: any[] = [];  // Lista de estudiantes (sin necesidad de una interfaz extra)
  teachers: any[] = [];  // Lista de profesores (sin necesidad de una interfaz extra)

  constructor(
    private subjectsService: SubjectsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.loadUsers();
  }

  // Cargar todas las asignaturas desde el servicio
  loadSubjects() {
    this.subjectsService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  // Cargar estudiantes y profesores desde Firestore
  loadUsers() {
    this.subjectsService.getStudents().subscribe(students => {
      console.log('Estudiantes cargados:', students);  // Verifica la respuesta
      this.students = students;
    });
    this.subjectsService.getTeachers().subscribe(teachers => {
      console.log('Profesores cargados:', teachers);  // Verifica la respuesta
      this.teachers = teachers;
    });
  }
  

  // Agregar una nueva asignatura
  async addSubject() {
    const alert = await this.alertController.create({
      header: 'Agregar Asignatura',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre de la asignatura' },
        { name: 'section', type: 'text', placeholder: 'Sección' },
        { name: 'room', type: 'text', placeholder: 'Sala' },
        { name: 'date', type: 'date', placeholder: 'Fecha' },
        { name: 'description', type: 'textarea', placeholder: 'Descripción' }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const newSubject: Subject = {
              name: data.name,
              section: data.section,
              room: data.room,
              date: data.date,
              description: data.description || '', // Campo opcional
              students: [],  // Se asignarán posteriormente
              teachers: []   // Se asignarán posteriormente
            };
            this.subjectsService.addSubject(newSubject);
          }
        }
      ]
    });
    await alert.present();
  }

  // Asignar estudiantes o profesores a una asignatura
  async assignUsers(subjectId: string, role: 'student' | 'teacher') {
    const users = role === 'student' ? this.students : this.teachers;

    // Verifica si hay usuarios disponibles
    if (users.length === 0) {
      const alert = await this.alertController.create({
        header: 'No hay usuarios disponibles',
        message: `No hay ${role}s disponibles para asignar.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: `Asignar ${role === 'student' ? 'Estudiantes' : 'Profesores'}`,
      inputs: users.map(user => ({
        type: 'checkbox',
        label: user.name,
        value: user.id,
        checked: false,  // Asegúrate de que el checkbox no esté marcado por defecto
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Asignar',
          handler: (selectedUserIds: string[]) => {
            if (selectedUserIds && selectedUserIds.length > 0) {
              this.subjectsService.assignMultipleUsersToSubject(
                subjectId,
                selectedUserIds,
                role
              ).catch(error => {
                console.error("Error al asignar usuarios:", error);
              });
            } else {
              console.log("No se seleccionaron usuarios para asignar.");
            }
          }
        }
      ]
    });

    await alert.present();
  }


  // Eliminar una asignatura
  deleteSubject(subjectId: string) {
    this.subjectsService.deleteSubject(subjectId);
  }
}
