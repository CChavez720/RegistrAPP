import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashRegisterPage } from './splash-register.page';

describe('SplashRegisterPage', () => {
  let component: SplashRegisterPage;
  let fixture: ComponentFixture<SplashRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
