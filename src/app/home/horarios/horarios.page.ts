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
  selectedDateText: string = ''; // Variable para almacenar el texto de la fecha seleccionada

  // Simulación de eventos o texto por fecha
  dateTexts: { [key: string]: string } = {
    '2024-12-03': 'Programacion de Aplicaciones Moviles 005D "Clase Teorica" LC11 8:30 - 9:40',
    '2024-12-05': 'Programacion de Aplicaciones Moviles 005D "Clase Practica" LC10 8:30 - 10:40',
    '2024-12-10': 'Programacion de Aplicaciones Moviles 005D "Clase Teorica" LC11 8:30 - 9:40',
    '2024-12-12': 'Programacion de Aplicaciones Moviles 005D "Examen" LC11 8:30 - 10:40'
  };

  // Fechas con clase (Simulación de días con clases)
  classDates: string[] = ['2024-12-03', '2024-12-05', '2024-12-10', '2024-12-12'];

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
      const selectedDateString = this.selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      this.selectedDateText = this.dateTexts[selectedDateString] || 'No hay eventos programados para este día.';
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

  // Función para verificar si el día tiene clase
  isClassDay(day: number): boolean {
    if (day) {
      const dateString = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day).toISOString().split('T')[0];
      return this.classDates.includes(dateString);
    }
    return false;
  }
}
