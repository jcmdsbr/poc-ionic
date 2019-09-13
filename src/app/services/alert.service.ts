import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  private errorAlert(message: string) {
    return this.alertController.create({
      header: 'Erro !',
      message: message,
      buttons: ['OK']
    });
  }

  private successAlert(message: string) {
    return this.alertController.create({
      header: 'Sucesso !',
      message: message,
      buttons: ['OK']
    });
  }

  async success(message: string) {
    const alert = await this.successAlert(message)
    return await alert.present();
  }

  async error(message: string) {
    const alert = await this.errorAlert(message)
    return await alert.present();
  }
}
