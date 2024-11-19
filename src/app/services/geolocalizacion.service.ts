import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {
  async obtenerUbicacionActual(): Promise<{ lat: number; lng: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }
}
