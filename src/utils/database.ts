import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {Device} from "@capacitor/device";
import {createConnection} from "typeorm";
import {DataSource} from "typeorm/browser";
import {Assessor} from "../models/entidades/assessor";

@Injectable({
  providedIn: "root"
})
export class DatabaseProvider {

  constructor() {
  }

  async configurarDatabase(platform: Platform) {
    // Depending on the machine the app is running on, configure
    // different database connections
    const UDID = await Device.getId()
    if (platform.is('cordova')) {
      // Running on device or emulator
      console.log('Platform Cordova');
      try {
        await createConnection({
          type: 'cordova',
          database: 'teste19',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          extra: {
            key: UDID
          },
          entities: [
          ]
        });
      } catch (error) {
        console.log(error);
      }
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
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
