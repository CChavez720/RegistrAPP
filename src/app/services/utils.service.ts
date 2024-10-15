import { inject, Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular'; // Importa AlertController

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  alertCtrl = inject(AlertController); // Inyecta AlertController

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
