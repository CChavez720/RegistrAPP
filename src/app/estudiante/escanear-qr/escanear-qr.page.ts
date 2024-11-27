import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation'; 
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage {
  resultado: string | null = null;
  private institutoLat = -33.599908;
  private institutoLng = -70.7001783;
  private radioPermitido = 500; // en metros
  public ubicacionActual: string = '';  
  public distanciaCalculada: string = '';  

  constructor(private platform: Platform) {}

  async ngOnInit() {
    // Verificar permisos de cámara y ubicación al cargar la página
    const permisosCamara = await this.verificarPermisosCamara();
    const permisosUbicacion = await this.verificarPermisosUbicacion();
    if (!permisosCamara || !permisosUbicacion) {
      return; // Detener el proceso si los permisos no son correctos
    }
  }

  async iniciarEscaneo() {
    if (!this.platform.is('capacitor')) {
      this.mostrarAlerta('Escaneo QR solo está disponible en dispositivos reales.');
      return;
    }

    try {
      // Validación de ubicación antes de iniciar el escaneo
      const ubicacionValida = await this.validarUbicacion();
      if (!ubicacionValida) {
        this.mostrarAlerta('No estás en el lugar permitido para escanear el QR.');
        return;
      }

      // Verificación de permisos de cámara nuevamente antes de iniciar el escaneo
      const permisoCamara = await this.verificarPermisosCamara();
      if (!permisoCamara) {
        this.mostrarAlerta('Se necesitan permisos para usar la cámara.');
        return;
      }

      this.prepararEscaneo();
      const resultado = await BarcodeScanner.startScan();

      if (resultado.hasContent) {
        this.resultado = resultado.content;
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      this.terminarEscaneo();
    }
  }

  private async verificarPermisosCamara(): Promise<boolean> {
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

  private async verificarPermisosUbicacion(): Promise<boolean> {
    const permisoUbicacion = await Geolocation.requestPermissions();
    if (permisoUbicacion.location !== 'granted') {
      this.mostrarAlerta('Se necesitan permisos de ubicación.');
      return false;
    }
    return true;
  }

  private async validarUbicacion(): Promise<boolean> {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,  // Alta precisión
        timeout: 10000  // Tiempo de espera
      });

      this.ubicacionActual = `Lat: ${coordinates.coords.latitude}, Lng: ${coordinates.coords.longitude}`;

      const distancia = this.calcularDistancia(
        coordinates.coords.latitude,
        coordinates.coords.longitude,
        this.institutoLat,
        this.institutoLng
      );

      this.distanciaCalculada = `${distancia.toFixed(2)} metros`;

      // Asegúrate de que la distancia calculada sea válida y comparada correctamente
      if (distancia <= this.radioPermitido) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.mostrarAlerta('Error al obtener tu ubicación. Por favor, activa la geolocalización.');
      return false;
    }
  }

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
    return R * c;  // Distancia en metros
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
