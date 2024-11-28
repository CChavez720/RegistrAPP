import { Component, AfterViewChecked } from '@angular/core';
import * as QRCode from 'qrcode'; // Importa la biblioteca QR

@Component({
  selector: 'app-asistencia',
  templateUrl: 'asistencia.page.html',
  styleUrls: ['asistencia.page.scss'],
})
export class AsistenciaPage implements AfterViewChecked {
  progress = 0;  // Valor de la barra de progreso
  timer: any;  // Temporizador
  remainingTime = 60; // 10 minutos en segundos (600 segundos)
  showQRCode = true; // Controla si el QR es visible
  canvas: HTMLCanvasElement | null = null; // Referencia al canvas

  constructor() {}

  ngAfterViewChecked() {
    // Verifica si el canvas existe después de cada ciclo de detección de cambios
    if (this.showQRCode && !this.canvas) {
      this.canvas = document.getElementById('qrcode') as HTMLCanvasElement;
    }
  }

  generateQRCode() {
    const qrCodeData = 'PGY4121-005D - Sección 123456'; // Los datos que se incluirán en el código QR

    // Aseguramos que el canvas está disponible antes de intentar generar el QR
    if (this.canvas) {
      QRCode.toCanvas(this.canvas, qrCodeData, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('¡Código QR generado!');
        }
      });

      // Inicia el temporizador de 10 minutos y la barra de progreso
      this.startTimer();
    } else {
      console.error('No se pudo encontrar el canvas para el QR.');
    }

    // Hacemos que el QR sea visible cuando se genera
    this.showQRCode = true;
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.progress = 1 - (this.remainingTime / 60); // Actualiza la barra de progreso
      } else {
        clearInterval(this.timer);  // Detiene el temporizador cuando el tiempo se agota
        console.log('Tiempo agotado');
        this.showQRCode = false;  // Oculta el QR cuando el tiempo se acaba
      }
    }, 1000); // Actualiza cada segundo
  }

  // Método para resetear la barra de progreso en caso de necesidad
  resetTimer() {
    clearInterval(this.timer);  // Detiene el temporizador
    this.remainingTime = 60;  // Reinicia el tiempo a 10 minutos
    this.progress = 0;  // Reinicia la barra de progreso
    this.showQRCode = false;  // Oculta el QR
  }
}
