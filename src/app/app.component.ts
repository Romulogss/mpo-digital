import {Component} from '@angular/core';
import {RotasService} from "../service/rotas.service";
import {MenuItemInterface} from "../models/interfaces/menu-item.interface";
import {Platform} from "@ionic/angular";
import {DatabaseProvider} from "../utils/database";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: MenuItemInterface[] = [];

  constructor(
    platform: Platform,
    private dataBase: DatabaseProvider,
    public rotaService: RotasService,
  ) {
    platform.ready().then(async () => {
      await dataBase.configurarDatabase(platform).then((res) => {
        this.appPages = this.rotaService.sideMenu();
        rotaService.irParaTelaInicial();
      })
    })
  }

  public sair() {
    this.rotaService.sair();
  }

  get showMenu(): boolean {
    return !(this.rotaService.obterRotaAtual() === '/login' || this.rotaService.obterRotaAtual() === '/')
  }
}
