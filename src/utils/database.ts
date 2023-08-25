import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {DataSource} from "typeorm";
import {MensagemService} from "../service/mensagem.service";
import {Assessor} from "../models/entidades/assessor.entity";
import {Carteira} from "../models/entidades/carteira";
import {Cliente} from "../models/entidades/cliente";
import {Telefone} from "../models/entidades/telefone";
import {Localizacao} from "../models/entidades/localizacao";
import {Conta} from "../models/entidades/conta";
import {Renda} from "../models/entidades/renda";
import {AvaliacaoPatrimonial} from "../models/entidades/avaliacaoPatrimonial";
import {FluxoCaixa} from "../models/entidades/fluxoCaixa";
import {ProdutoFluxoDeCaixa} from "../models/entidades/produtoFluxoDeCaixa.model";
import {SituacaoSocioEconomica} from "../models/entidades/situacaoSocioEconomica";
import {HistoricoAtendidmentoCliente} from "../models/entidades/historicoAtendimentoCliente.model";
import {Arquivo} from "../models/entidades/arquivo";
import {Identificacao} from "../models/entidades/identificacao";
import {Ocupacao} from "../models/entidades/ocupacao";
import {Sincronizacao} from "../models/entidades/sincronizacao";
import {Referencia} from "../models/entidades/referencia";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatabaseProvider {

  //@ts-ignore
  dataSource: DataSource = null!
  private _dataSourceSubject: BehaviorSubject<DataSource> = new BehaviorSubject<DataSource>(this.dataSource);

  constructor(
    private msgService: MensagemService,
    platform: Platform
  ) {
    if (this.dataSource == null) {
      this.configurarDatabase(platform)
    }
    this._dataSourceSubject.next(this.dataSource)
  }

  async configurarDatabase(platform: Platform) {
    return new Promise<boolean>((resolve) => {
      console.log('Platform Browser');
      try {
        const AppDataSource = new DataSource({
          type: "sqljs",
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          autoSave: true,
          entities: [
            Arquivo, Assessor, Cliente, Identificacao, Conta, Telefone, Localizacao, Renda, Ocupacao, Carteira, FluxoCaixa,
            AvaliacaoPatrimonial, Sincronizacao, SituacaoSocioEconomica, HistoricoAtendidmentoCliente, ProdutoFluxoDeCaixa,
            Referencia
          ],
          migrations: []
        })
        AppDataSource.initialize().then(dataSource => {
          this.updateDataSource(dataSource)
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

  updateDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
    this._dataSourceSubject.next(dataSource);
  }

  get dataSource$(): Observable<DataSource> {
    return this._dataSourceSubject.asObservable();
  }
}
