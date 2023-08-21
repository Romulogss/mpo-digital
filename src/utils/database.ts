import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {Device} from "@capacitor/device";
import {DataSource} from "typeorm";
import {Assessor} from "../models/entidades/assessor";
import {MensagemService} from "../app/service/mensagem.service";

@Injectable({
  providedIn: "root"
})
export class DatabaseProvider {

  constructor(
    private msgService: MensagemService
  ) {
  }

  async configurarDatabase(platform: Platform) {
    // Depending on the machine the app is running on, configure
    // different database connections
    const UDID = await Device.getId()
    if (platform.is('cordova')) {
      // Running on device or emulator
      console.log('Platform Cordova');
    } else {
      // Running app in browser
      console.log('Platform Browser');
      try {
        const AppDataSource = new DataSource({
          type: "sqljs",
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          autoSave: true,
          entities: [
            Assessor
          ],
          migrations: []
        })
        AppDataSource.initialize().then(r => {
          console.log(r)
          this.msgService.showAlertMensagem('Sucesso')
        }).catch(err => {
          this.msgService.showAlertMensagem('Erro')
          console.log(err)
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
