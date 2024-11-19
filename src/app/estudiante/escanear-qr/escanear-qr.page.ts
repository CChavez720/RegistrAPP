import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage {
  resultado: string | null = null;

  constructor(private platform: Platform) {}

  async iniciarEscaneo() {
    // Verificar si la plataforma soporta el plugin
    if (!this.platform.is('capacitor')) {
      alert('Escaneo QR solo está disponible en dispositivos reales.');
      return;
    }

    try {
      // Pedir permiso para usar la cámara
      const permiso = await BarcodeScanner.checkPermission({ force: true });

      if (permiso.granted) {
        // Iniciar el escaneo
        await BarcodeScanner.hideBackground(); // Ocultar el fondo de la app
        const resultado = await BarcodeScanner.startScan();

        // Detener el escaneo si se escaneó correctamente
        if (resultado.hasContent) {
          this.resultado = resultado.content; // Guardar el contenido escaneado
        }
      } else {
        alert('Permiso denegado para usar la cámara.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      // Mostrar el fondo de la app después del escaneo
      BarcodeScanner.showBackground();
    }
  }

  ionViewWillLeave() {
    // Detener el escaneo al salir de la página
    BarcodeScanner.stopScan();
  }
}
