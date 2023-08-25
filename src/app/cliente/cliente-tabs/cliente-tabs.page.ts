import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../../../service/cliente.service";
import {AuthService} from "../../../service/auth.service";
import {Cliente} from "../../../models/entidades/cliente";
import {RotasService} from "../../../service/rotas.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MensagemService} from "../../../service/mensagem.service";
import {IonTabs} from "@ionic/angular";
import {ClienteFichaService} from "../../../service/cliente-ficha.service";

@Component({
  selector: 'app-cliente-tabs',
  templateUrl: './cliente-tabs.page.html',
  styleUrls: ['./cliente-tabs.page.scss'],
})
export class ClienteTabsPage implements OnInit {

  @ViewChild('clienteTabs') clienteTabs: IonTabs;

  constructor(
    private clienteService: ClienteFichaService,
    private authServive: AuthService,
    private rotasService: RotasService,
    private msgService: MensagemService,
    private active: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.active.paramMap.subscribe((params: ParamMap) => {
      this.clienteService.iniciarCliente(Number(params.get('id')))
    })
  }

}
