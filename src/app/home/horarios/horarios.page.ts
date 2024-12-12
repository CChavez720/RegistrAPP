import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  currentDate: Date;
  days: number[];
  selectedDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.days = [];
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 0; i < startingDay; i++) {
      this.days.push(null); // Espacios vacíos antes del primer día
    }
    for (let i = 1; i <= totalDays; i++) {
      this.days.push(i); // Días del mes
    }
  }

  selectDate(day: number) {
    if (day) {
      this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    }
  }

  goToPreviousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  goToNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
