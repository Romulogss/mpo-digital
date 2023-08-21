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

  //@ts-ignore
  dataSource: DataSource = null!

  constructor(
    private msgService: MensagemService,
    platform: Platform
  ) {
    if (this.dataSource == null) {
      this.configurarDatabase(platform)
    }
  }

  async configurarDatabase(platform: Platform) {
    return new Promise<boolean>((resolve, reject) => {
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
          this.dataSource = r
          resolve(true)
        }).catch(err => {
          this.msgService.showAlertMensagem('Erro')
          resolve(false)
          console.log(err)
        })
      } catch (error) {
        resolve(false)
        console.log(error);
      }
    })
  }
}
