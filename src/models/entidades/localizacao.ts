import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {LogicoEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";
import {ViaCEP} from "../interfaces/viaCEP";

@Entity('localizacao')
export class Localizacao extends BaseEntity {

  @Synch()
  @Column({name: "en_consulta_cep", nullable: true})
  consultaCep: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: "en_indicativo_zona_urbana", nullable: true})
  indicativoZonaUrbana: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: "en_tipo_endereco", nullable: true})
  tipoEndereco: string;

  @Synch()
  @Column({name: "en_tipo_responsavel_comprovante", nullable: true})
  tipoResponsavelComprovante: string;

  @Synch()
  @Column({name: "en_tipo_comprovante", nullable: true})
  tipoComprovante: string = 'CONTA_LUZ';

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_comprovante", nullable: true})
  dataComprovante: number;

  @Synch()
  @Column({name: "en_tipo_residencia", nullable: true})
  tipoResidencia: string;

  @Synch()
  @Column({length: 8, name: "nu_cep", nullable: true})
  cep: string;

  @Synch()
  @Column({length: 60, name: "tx_logradouro", nullable: true})
  logradouro: string;

  @Synch()
  @Column({length: 10, name: "nu_endereco", nullable: true})
  numero: string;

  @Synch()
  @Column({length: 2, name: "no_uf", nullable: true})
  uf: string;

  @Synch()
  @Column({length: 60, name: "no_cidade", nullable: true})
  cidade: string;

  @Synch()
  @Column({name: "id_cidade", nullable: true})
  idCidade: number;

  @Synch()
  @Column({length: 60, name: "tx_complemento", nullable: true})
  complemento: string;

  @Synch()
  @Column({length: 60, name: "tx_perimetro", nullable: true})
  perimetro: string;

  @Synch()
  @Column({length: 60, name: "no_bairro", nullable: true})
  bairro: string;

  @Synch()
  @Column({name: "nu_tempo_utilizacao", nullable: true})
  tempoUtilizacao: number = 0;

  @Synch()
  @Column({name: "en_endereco_correspondencia", nullable: true})
  enderecoCorrespondencia: string = LogicoEnum.SIM.nome;

  @Synch()
  @Column({name: "en_imovel_proprio", nullable: true})
  imovelProprio: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: "en_detalhe_imovel_proprio", nullable: true})
  detalheImovelProprio: string;

  @ManyToOne(() => Cliente, cliente => cliente.enderecos, {cascade: ['insert']})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "nu_latitude", nullable: true})
  latitude: number;

  @Synch()
  @Column({name: "nu_longitude", nullable: true})
  longitude: number;

  getDescricaoSimples(): string {
    return `${this.logradouro ? this.logradouro : 'Sem Endereço'},${this.numero ? this.numero : 'Sem Número'} - ${this.bairro ? this.bairro : 'Sem Bairro'}`
  }

  existeCoordenadasGeografica(): boolean {
    return this.latitude != null && this.longitude != null;
  }

  preencherByViaCEP(viaCEPResult: ViaCEP, cidade: any) {
    this.bairro = AppUtils.retiraTodosAcento(viaCEPResult.bairro.toUpperCase())
    this.logradouro = AppUtils.retiraTodosAcento(viaCEPResult.logradouro.toUpperCase())
    this.logradouro = AppUtils.retiraTodosAcento(viaCEPResult.logradouro.toUpperCase())
    if (cidade) {
      this.cidade = AppUtils.retiraTodosAcento(cidade.nome.toUpperCase());
      this.idCidade = cidade.value;
      this.uf = AppUtils.retiraTodosAcento(cidade.uf.toUpperCase());
    }
    this.consultaCep = LogicoEnum.SIM.nome;
  }

  get dtDataComprovante() {
    return this.dataComprovante ? AppUtils.millisecondsToStr(this.dataComprovante) : null;
  }

  set dtDataComprovante(value: string) {
    this.dataComprovante = value ? AppUtils.strToMilliseconds(value) : null;
  }

}
