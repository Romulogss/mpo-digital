import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  public showAlertMensagem(msg: string, title?: string): void {
    this.alertCtrl.create({
      header: title || 'Atenção',
      message: msg,
      backdropDismiss: true,
      buttons: ['fechar']
    }).then((alert: HTMLIonAlertElement) => {
      alert.present();
    })
  }

  public showAlertDeConfirmacao(title: string, msg: string, callSim: any, callNao: any): void {
    this.alertCtrl.create({
      header: title || 'Atenção',
      message: msg,
      backdropDismiss: true,
      buttons: [{
        text: 'Não',
        handler: callNao
      },
        {
          text: 'Sim',
          handler: callSim
        }]
    }).then((alert: HTMLIonAlertElement) => {
      alert.present();
    })
  }

  public async showLoading(msg: string, id?: string, duracao?: number) {
    this.loadCtrl.create({
      message: msg,
      id
    }).then(async (load: HTMLIonLoadingElement) => {
      if (duracao) {
        load.duration = duracao
      }
      console.log('Iniciado load')
      await load.present()
    })
  }

  public closeLoading(id?: string) {
    this.loadCtrl.dismiss({
      id
    }).catch(err => {
      console.log(err)
    })
  }

  public showToast(msg: string, duracao?: number) {
    this.toastCtrl.create({
      message: msg,
      duration: duracao || 1000
    }).then((toast: HTMLIonToastElement) => {
      toast.present()
    })
  }
}
