import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation'; // Importar geolocalización
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage {
  resultado: string | null = null;

  // Coordenadas del instituto (ejemplo)
  private institutoLat = -33.598819; // Latitud del instituto
  private institutoLng = -70.705345; // Longitud del instituto
  private radioPermitido = 300; // Radio permitido en metros

  constructor(private platform: Platform) {}

  async iniciarEscaneo() {
    if (!this.platform.is('capacitor')) {
      this.mostrarAlerta('Escaneo QR solo está disponible en dispositivos reales.');
      return;
    }

    try {
      const ubicacionValida = await this.validarUbicacion();
      if (!ubicacionValida) {
        this.mostrarAlerta('No estás en el lugar permitido para escanear el QR.');
        return;
      }

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

  // Validar la ubicación actual
  private async validarUbicacion(): Promise<boolean> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const distancia = this.calcularDistancia(
        coordinates.coords.latitude,
        coordinates.coords.longitude,
        this.institutoLat,
        this.institutoLng
      );

      return distancia <= this.radioPermitido;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.mostrarAlerta('Error al obtener tu ubicación. Por favor, activa la geolocalización.');
      return false;
    }
  }

  // Calcular la distancia entre dos puntos geográficos
  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la Tierra en metros
    const rad = Math.PI / 180;
    const φ1 = lat1 * rad;
    const φ2 = lat2 * rad;
    const Δφ = (lat2 - lat1) * rad;
    const Δλ = (lon2 - lon1) * rad;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en metros
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
