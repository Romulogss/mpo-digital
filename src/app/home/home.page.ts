import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {RotasService} from "../service/rotas.service";
import {MenuItemInterface} from "../../models/interfaces/menu-item.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appPages: MenuItemInterface[];

  constructor(
    public authService: AuthService,
    private rotaService: RotasService
  ) {
    this.appPages = this.rotaService.cardMenu();
  }

  async ngOnInit() {
  }

}
