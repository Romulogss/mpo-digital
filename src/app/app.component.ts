import {Component} from '@angular/core';
import {RotasService} from "./service/rotas.service";
import {MenuItemInterface} from "../models/interfaces/menu-item.interface";
import {Platform} from "@ionic/angular";
import {DatabaseProvider} from "../utils/database";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: MenuItemInterface[];
  constructor(
    private rotaService: RotasService,
    platform: Platform,
    private dataBase: DatabaseProvider
  ) {
    this.appPages = this.rotaService.sideMenu();
    rotaService.irParaTelaInicial();
    platform.ready().then(() => {
      dataBase.configurarDatabase(platform).then(() => {
        console.log('concluido')
      })
    })
  }
}
