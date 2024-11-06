import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

interface Student {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'alumno';
  assignedCourses: string[];
}

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  async addStudent() {
    const alert = await this.alertController.create({
      header: 'Agregar Estudiante',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre del Estudiante' },
        { name: 'last_name', type: 'text', placeholder: 'Apellido del Estudiante' },
        { name: 'email', type: 'email', placeholder: 'Correo (nombre@alumno.duoc.cl)' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
        { name: 'assignedCourses', type: 'text', placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: data => {
            const newStudent: Student = {
              name: data.name,
              last_name: data.last_name,
              email: data.email,
              password: data.password,
              role: 'alumno',
              assignedCourses: data.assignedCourses.split(',').map(id => id.trim())
            };
            this.studentService.createStudent(newStudent).then(() => this.loadStudents());
          }
        }
      ]
    });
    await alert.present();
  }

  async editStudent(student: Student) {
    const alert = await this.alertController.create({
      header: 'Editar Estudiante',
      inputs: [
        { name: 'name', type: 'text', value: student.name, placeholder: 'Nombre del Estudiante' },
        { name: 'last_name', type: 'text', value: student.last_name, placeholder: 'Apellido del Estudiante' },
        { name: 'email', type: 'email', value: student.email, placeholder: 'Correo (nombre@alumno.duoc.cl)' },
        { name: 'assignedCourses', type: 'text', value: student.assignedCourses?.join(', '), placeholder: 'Cursos asignados (IDs separados por comas)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.studentService.updateStudent(student.id!, {
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

  async deleteStudent(student: Student) {
    const alert = await this.alertController.create({
      header: 'Eliminar Estudiante',
      message: `¿Estás seguro de eliminar a ${student.name} ${student.last_name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.studentService.deleteStudent(student.id!).then(() => this.loadStudents());
          }
        }
      ]
    });
    await alert.present();
  }

  goBackToAdmin() {
    this.router.navigate(['/admin']);  // Redirige a la página de administración
  }
}