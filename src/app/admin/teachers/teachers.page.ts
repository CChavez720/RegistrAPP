import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

interface User {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'alumno' | 'profesor';
  assignedCourses: string[];
}

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {
  teachers: User[] = [];

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.studentService.getUsersByRole('profesor').subscribe(teachers => {
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
            const newTeacher: User = {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              password: data.password,
              role: 'profesor',
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            };
            this.studentService.createUser(newTeacher).then(() => this.loadTeachers());
          }
        }
      ]
    });
    await alert.present();
  }

  async editTeacher(teacher: User) {
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
            this.studentService.updateUser(teacher.email, {
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

  async deleteTeacher(teacher: User) {
    const alert = await this.alertController.create({
      header: 'Eliminar Profesor',
      message: `¿Estás seguro de eliminar a ${teacher.name} ${teacher.last_name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.studentService.deleteUser(teacher.email).then(() => this.loadTeachers());
          }
        }
      ]
    });
    await alert.present();
  }
}
