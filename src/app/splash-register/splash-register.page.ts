import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-register',
  templateUrl: './splash-register.page.html',
  styleUrls: ['./splash-register.page.scss'],
})
export class SplashRegisterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('SplashPage cargada');
    // Espera 3 segundos y luego redirige a la página de inicio
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000); // 3000ms = 3 segundos
  }

}
