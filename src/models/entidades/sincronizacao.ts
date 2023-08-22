import {Column, Entity} from "typeorm";
import {BaseEntity} from "./base.entity";
import {ErroData} from "../../utils/synch/synchronizable";
import {AppUtils} from "../../utils/app-utils";

@Entity('sincronizacao')
export class Sincronizacao extends BaseEntity {

  @Column({name: "dt_ultima_sincronizacao", nullable: true})
  ultimaSincronizacao: number;

  @Column({length: 1024, name: "no_log", nullable: true})
  log: string;

  _erros: ErroData;


  constructor(id?: number | null, ultimaSincronizacao?: number, log?: string) {
    super(id);
    this.ultimaSincronizacao = ultimaSincronizacao!;
    this.log = log!;
  }

  get dtUltimaSincronizacao(): string {
    return AppUtils.millisecondsToISO8601(this.ultimaSincronizacao)!;
  }

  static async getUltimaSincronizacao(): Promise<Sincronizacao|null> {
    // @ts-ignore
    return await Sincronizacao.findOne({id: 1})
  }

  static async registrarSincronizacao(erro: ErroData) {
    let sinc = null;
    await Sincronizacao.getUltimaSincronizacao().then(it => sinc = it);
    if (sinc == null) {
      sinc = new Sincronizacao(null, new Date().valueOf(), JSON.stringify(erro));
    }
    await Sincronizacao.save(sinc);
  }

  get erros(): ErroData {
    if (this._erros == null) {
      this._erros = JSON.parse(this.log);
    }
    return this._erros;
  }

}
