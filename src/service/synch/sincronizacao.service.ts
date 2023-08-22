import {Injectable} from '@angular/core';
import {FectchData, SynchEntityInfo} from "../../utils/synch/synchronizable";
import {AssessorSynchService} from "./assessor-synch.service";
import {EnvService} from "../env.service";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";

@Injectable()
export class SincronizacaoService {

  private entitieInfoSelect: SynchEntityInfo;
  private entitiesInfo: SynchEntityInfo[] = [];

  constructor(
    private assesorService: AssessorSynchService,
    private env: EnvService,
    private auth: AuthService
  ) {
  }

  public buscarRelatorioSincronizacao(): Observable<FectchData> {
    return this.auth.secureGet(this.env.getUrlServicoSync().concat(`/fetch-dados-gerais/${this.auth.usuarioLogado.uuid}`))
  }

  // public conciliarDados(relatorio: FectchData, entidades: string[], paraSincronizar: FectchData) {
  //   let synchData = new SynchronizeData();
  //
  // }
}
