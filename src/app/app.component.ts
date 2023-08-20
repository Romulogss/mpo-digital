import {Component} from '@angular/core';
import {RotasService} from "./service/rotas.service";
import {MenuItemInterface} from "../models/interfaces/menu-item.interface";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: MenuItemInterface[];
  constructor(
    private rotaService: RotasService
  ) {
    this.appPages = this.rotaService.sideMenu();
    rotaService.irParaTelaInicial();
  }
}
