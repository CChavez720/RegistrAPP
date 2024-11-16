import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

class MockAuthService {
  login(email: string, password: string) {
    return Promise.resolve({ role: 'profesor' });
  }
  logout() {}
}

fdescribe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: LoginPage },
        ]),
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        Location,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location); 
    fixture.detectChanges();
  });

  fit('Iniciar sesion con credenciales y ser redirigido', async () => {
    component.form.controls['email'].setValue('ta.prado@duocuc.cl');
    component.form.controls['password'].setValue('123456');
    await component.submit();  
    expect(location.path()).toBe('/home');
  });
});
