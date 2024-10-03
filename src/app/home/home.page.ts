import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Declaración de propiedades de la clase
  userName: string = 'Juan Pérez';  // Nombre de usuario
  userImage: string = 'assets/img/user.png';  // Ruta de la imagen del usuario

  constructor() {
    // El constructor está vacío porque no necesitas inicializar nada especial aquí
  }
}

