import { Component } from '@angular/core';
import * as QRCode from 'qrcode'; // Importa la biblioteca QR

@Component({
  selector: 'app-asistencia',
  templateUrl: 'asistencia.page.html',
  styleUrls: ['asistencia.page.scss'],
})
export class AsistenciaPage {

  constructor() {}

  generateQRCode() {
    const qrCodeData = 'PGY4121-005D - Sección 123456'; // Los datos que se incluirán en el código QR
    const canvas = document.getElementById('qrcode') as HTMLCanvasElement; // Asegúrate de que sea un canvas

    if (canvas) {
      QRCode.toCanvas(canvas, qrCodeData, function (error) {
        if (error) {
          console.error(error);
        } else {
          console.log('¡Código QR generado!');
        }
      });
    } else {
      console.error('No se pudo encontrar el canvas para el QR.');
    }
  }
}
