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
    if (!this.platform.is('capacitor')) {
      this.mostrarAlerta('Escaneo QR solo está disponible en dispositivos reales.');
      return;
    }

    try {
      const permiso = await this.verificarPermisos();
      if (permiso) {
        this.prepararEscaneo();
        const resultado = await BarcodeScanner.startScan();

        if (resultado.hasContent) {
          this.resultado = resultado.content;
        }
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      this.terminarEscaneo();
    }
  }

  private async verificarPermisos(): Promise<boolean> {
    let permiso = await BarcodeScanner.checkPermission();

    if (!permiso.granted) {
      permiso = await BarcodeScanner.checkPermission({ force: true });
    }

    if (permiso.granted) {
      return true;
    } else if (permiso.denied) {
      this.mostrarAlerta('Los permisos de la cámara fueron denegados permanentemente. Actívalos manualmente en la configuración.');
      BarcodeScanner.openAppSettings();
    } else {
      this.mostrarAlerta('Se necesitan permisos para usar la cámara.');
    }

    return false;
  }

  private prepararEscaneo() {
    BarcodeScanner.hideBackground();
    document.body.style.backgroundColor = 'transparent';
  }

  private terminarEscaneo() {
    BarcodeScanner.showBackground();
    document.body.style.backgroundColor = '';
  }

  private mostrarAlerta(mensaje: string) {
    alert(mensaje);
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
  }
}
