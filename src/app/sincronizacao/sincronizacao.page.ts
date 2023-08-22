import {Component, OnInit} from '@angular/core';
import {DadoBasico, LogErro} from "../../models/interfaces/dados-basicos";
import {EntidadesEnum} from "../../models/enums/enums-types";
import {Sincronizacao} from "../../models/entidades/sincronizacao";

@Component({
  selector: 'app-sincronizacao',
  templateUrl: './sincronizacao.page.html',
  styleUrls: ['./sincronizacao.page.scss'],
})
export class SincronizacaoPage implements OnInit {

  ultimaSincronizacao: Sincronizacao;
  logErro: LogErro[] = [];
  entidadesSincIndividual: DadoBasico[] = EntidadesEnum.valoresSincIndividual();
  public disableButton: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  async mostrarModal(entidade: DadoBasico): Promise<void> {

  }

  sincronizar(): void {

  }

  get exibirUltimaSincronizacao(): boolean {
    return this.ultimaSincronizacao != null;
  }

}
