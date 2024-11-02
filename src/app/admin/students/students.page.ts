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
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  students: User[] = [];

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getUsersByRole('alumno').subscribe(students => {
      this.students = students;
    });
  }

  goBackToAdmin() {
    this.router.navigate(['/admin']);
  }

  async addUser() {
    const alert = await this.alertController.create({
      header: 'Agregar Estudiante',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre del Estudiante' },
        { name: 'last_name', type: 'text', placeholder: 'Apellido del Estudiante' },
        { name: 'email', type: 'email', placeholder: 'Correo (nombre@duocuc.cl)' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
        { name: 'assignedCourses', type: 'text', placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: data => {
            const newStudent: User = {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              password: data.password,
              role: 'alumno',
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            };
            this.studentService.createUser(newStudent).then(() => this.loadStudents());
          }
        }
      ]
    });
    await alert.present();
  }

  async editUser(student: User) {
    const alert = await this.alertController.create({
      header: 'Editar Estudiante',
      inputs: [
        { name: 'name', type: 'text', value: student.name, placeholder: 'Nombre del Estudiante' },
        { name: 'last_name', type: 'text', value: student.last_name, placeholder: 'Apellido del Estudiante' },
        { name: 'email', type: 'email', value: student.email, placeholder: 'Correo (nombre@duocuc.cl)' },
        { name: 'assignedCourses', type: 'text', value: student.assignedCourses?.join(', '), placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.studentService.updateUser(student.email, {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            }).then(() => this.loadStudents());
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUser(student: User) {
    const alert = await this.alertController.create({
      header: 'Eliminar Estudiante',
      message: `¿Estás seguro de eliminar a ${student.name} ${student.last_name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.studentService.deleteUser(student.email).then(() => this.loadStudents());
          }
        }
      ]
    });
    await alert.present();
  }
}
