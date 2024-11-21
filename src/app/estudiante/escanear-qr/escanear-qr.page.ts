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
  escaneando: boolean = false; // Variable para controlar el estado del escaneo


  constructor(private platform: Platform) {}

  async iniciarEscaneo() {
    if (!this.platform.is('capacitor')) {
      alert('Escaneo QR solo está disponible en dispositivos reales.');
      return;
    }
  
    try {
      // Verifica y solicita permisos
      const permiso = await BarcodeScanner.checkPermission({ force: true });
  
      if (permiso.granted) {
        // Hacer que el fondo sea transparente y activar la cámara
        await BarcodeScanner.hideBackground();
        document.body.style.backgroundColor = 'transparent';
  
        const resultado = await BarcodeScanner.startScan();
  
        if (resultado.hasContent) {
          this.resultado = resultado.content;
        }
      } else if (permiso.denied) {
        alert('Los permisos de la cámara fueron denegados permanentemente. Actívalos manualmente en la configuración.');
        // Redirigir al usuario a los ajustes de la app
        BarcodeScanner.openAppSettings();
      } else {
        alert('Permiso denegado para usar la cámara.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      BarcodeScanner.showBackground();
      document.body.style.backgroundColor = '';
    }
  }
  
  
  
  

  ionViewWillLeave() {
    // Detener el escaneo al salir de la página
    BarcodeScanner.stopScan();
  }
}
