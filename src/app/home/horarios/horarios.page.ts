import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage {
  viewDate: Date = new Date(); // Fecha actual
  events: CalendarEvent[] = []; // Lista de eventos en el calendario

  constructor() {}

  // Manejar clics en días del calendario
  dayClicked(day: { date: Date; events: CalendarEvent[] }): void {
    const subject = prompt('Ingrese la asignatura para este día:');
    if (subject) {
      this.events.push({
        start: day.date,
        title: subject,
      });
    }
  }

  // Manejar clics en eventos
  eventClicked(event: CalendarEvent): void {
    alert(`Evento: ${event.title}`);
  }
}
