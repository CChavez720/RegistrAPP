import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  userName: string = ''; // Nueva propiedad para almacenar el nombre del usuario

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private auth: AngularFireAuth // Inyectar AngularFireAuth para obtener el uid del usuario
  ) {}

  ngOnInit() {
    // Obtener el uid del usuario autenticado
    this.auth.currentUser.then(user => {
      if (user) {
        const uid = user.uid; // Extrae el uid del usuario actual
        // Llamar a getUserData con el uid
        this.firebaseService.getUserData(uid).subscribe((userData: any) => {
          if (userData) {
            this.userName = userData.name; // Asigna el nombre del usuario
          }
        });
      }
    }).catch(error => console.error('Error al obtener el usuario', error));
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.firebaseService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  // Métodos de navegación
  navigateToStudents() {
    this.router.navigateByUrl('/admin/students');
  }

  navigateToTeachers() {
    this.router.navigateByUrl('/admin/teachers');
  }

  navigateToSubjects() {
    this.router.navigate(['/admin/subjects']);
  }
}
