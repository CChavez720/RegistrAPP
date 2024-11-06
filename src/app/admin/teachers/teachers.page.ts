import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

interface Teacher {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'profesor';
  assignedCourses: string[];
}

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private teacherService: TeacherService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  goBackToAdmin() {
    this.router.navigate(['/admin']);
  }

  async addTeacher() {
    const alert = await this.alertController.create({
      header: 'Agregar Profesor',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre del Profesor' },
        { name: 'last_name', type: 'text', placeholder: 'Apellido del Profesor' },
        { name: 'email', type: 'email', placeholder: 'Correo (nombre@profesor.duoc.cl)' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
        { name: 'assignedCourses', type: 'text', placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: data => {
            const newTeacher: Teacher = {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              password: data.password,
              role: 'profesor',
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            };
            this.teacherService.createTeacher(newTeacher).then(() => this.loadTeachers());
          }
        }
      ]
    });
    await alert.present();
  }

  async editTeacher(teacher: Teacher) {
    const alert = await this.alertController.create({
      header: 'Editar Profesor',
      inputs: [
        { name: 'name', type: 'text', value: teacher.name, placeholder: 'Nombre del Profesor' },
        { name: 'last_name', type: 'text', value: teacher.last_name, placeholder: 'Apellido del Profesor' },
        { name: 'email', type: 'email', value: teacher.email, placeholder: 'Correo (nombre@profesor.duoc.cl)' },
        { name: 'assignedCourses', type: 'text', value: teacher.assignedCourses?.join(', '), placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.teacherService.updateTeacher(teacher.id!, {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            }).then(() => this.loadTeachers());
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteTeacher(teacher: Teacher) {
    const alert = await this.alertController.create({
      header: 'Eliminar Profesor',
      message: `¿Estás seguro de eliminar a ${teacher.name} ${teacher.last_name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.teacherService.deleteTeacher(teacher.id!).then(() => this.loadTeachers());
          }
        }
      ]
    });
    await alert.present();
  }
}
