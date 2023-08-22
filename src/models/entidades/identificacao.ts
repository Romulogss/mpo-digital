import {Column, Entity, JoinColumn, OneToOne, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {TipoIdentificacaoEnum, VigenciaCarteiraMilitarEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";

@Entity('identificacao')
export class Identificacao extends BaseEntity {

  @OneToOne(() => Cliente, cliente => cliente.identificacao, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "en_tipo_identificacao", nullable: true})
  tipoIdentificacao: string = TipoIdentificacaoEnum.RG.nome;

  @Synch()
  @Column({length: 20, name: "nu_identificacao", nullable: true})
  numero: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_expedicao", nullable: true})
  dataExpedicao: number;

  @Synch()
  @Column({length: 20, name: "no_orgao_expedidor", nullable: true})
  orgaoExpedidor: string;

  @Synch()
  @Column({length: 2, name: "no_estado_emissor", nullable: true})
  estadoEmissor: string;

  @Synch()
  @Column({length: 60, name: "no_cidade_emissor", nullable: true})
  cidadeEmissor: string;

  @Synch()
  @Column({name: "id_orgao_expedidor", nullable: true})
  idOrgaoExpedidor: number;

  @Synch()
  @Column({length: 20, name: "nu_via", nullable: true})
  numeroVia: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_validade", nullable: true})
  dataValidade: number;

  @Synch()
  @Column({name: "tx_referencia", nullable: true})
  referencia: string;

  @Synch()
  @Column({name: "nu_serie", nullable: true})
  numeroSerie: string;

  @Synch()
  @Column({length: 20, name: "en_vigencia_cart_militar", nullable: true})
  vigenciaCarteiraMilitar: string;

  @Synch()
  @Column({name: "nu_pis", nullable: true})
  numeroPIS: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_chegada_brasil", nullable: true})
  dataChegadaBrasil: number;

  @Synch()
  @Column({name: "no_formacao", nullable: true})
  formacao: string;

  get localidade(): string {
    if (this.estadoEmissor && this.cidadeEmissor) {
      return `${this.cidadeEmissor} - ${this.estadoEmissor}`;
    }
    return '';
  }

  get isRg(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.RG.nome;
  }

  get isCnh(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.CNH.nome;
  }

  get isCtps(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.CTPS.nome;
  }

  get isCarteiraMilitar(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.CARTEIRA_MILITAR.nome;
  }

  get isCarteiraClasse(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.CARTEIRA_DE_CLASSE.nome;
  }

  get isPassaporte(): boolean {
    return this.tipoIdentificacao == TipoIdentificacaoEnum.PASSAPORTE.nome;
  }

  get isCarteiraMilitarEVigenciaACertoTempo(): boolean {
    return this.isCarteiraMilitar && this.vigenciaCarteiraMilitar == VigenciaCarteiraMilitarEnum.A_CERTO_TEMPO.nome;
  }

  get validadeRequirida(): boolean {
    return this.isCarteiraMilitarEVigenciaACertoTempo || this.isCnh || this.isPassaporte
  }

  sanitizarLocalidadeQuandoMudarOTipo() {
    this.estadoEmissor = null!;
    this.cidadeEmissor = null!;
  }

  get dtDataExpedicao(): string | null {
    return this.dataExpedicao ? AppUtils.millisecondsToStr(this.dataExpedicao) : null;
  }

  set dtDataExpedicao(value: string | null) {
    this.dataExpedicao = (value ? AppUtils.strToMilliseconds(value) : null)!;
  }

  get dtDataValidade(): string | null {
    return this.dataValidade ? AppUtils.millisecondsToStr(this.dataValidade) : null;
  }

  set dtDataValidade(value: string | null) {
    this.dataValidade = (value ? AppUtils.strToMilliseconds(value) : null)!;
  }

  get dtDataChegadaAoBrasil(): string | null {
    return this.dataChegadaBrasil ? AppUtils.millisecondsToStr(this.dataChegadaBrasil) : null;
  }

  set dtDataChegadaAoBrasil(value: string | null) {
    this.dataChegadaBrasil = (value ? AppUtils.strToMilliseconds(value) : null)!;
  }

  sanitizar(): Identificacao {

    if (this.isRg) {
      return new RG(this).sanitizar();
    } else if (this.isCnh) {
      return new CNH(this).sanitizar();
    } else if (this.isCtps) {
      return new CTPS(this).sanitizar();
    } else if (this.isCarteiraClasse) {
      return new CARTEIRA_CLASSE(this).sanitizar();
    } else if (this.isCarteiraMilitar) {
      return new CARTEIRA_MILITAR(this).sanitizar();
    } else if (this.isPassaporte) {
      return new PASSAPORTE(this).sanitizar();
    } else {
      return this;
    }

  }

  isValido(): boolean {

    if (this.isRg) {
      return new RG(this).isValido();
    } else if (this.isCnh) {
      return new CNH(this).isValido();
    } else if (this.isCtps) {
      return new CTPS(this).isValido();
    } else if (this.isCarteiraClasse) {
      return new CARTEIRA_CLASSE(this).isValido();
    } else if (this.isCarteiraMilitar) {
      return new CARTEIRA_MILITAR(this).isValido();
    } else if (this.isPassaporte) {
      return new PASSAPORTE(this).isValido();
    } else {
      return true;
    }

  }

}


export abstract class IdentificacaoBase {

  protected constructor(public identificacao: Identificacao) {
  }

  isValido(): boolean {
    if (this.identificacao.tipoIdentificacao == null) return false;
    if (this.identificacao.dataExpedicao == null) return false;
    if (this.identificacao.numero == null) return false;
    if (this.identificacao.estadoEmissor == null) return false;
    if (this.identificacao.cidadeEmissor == null) return false;
    return this.identificacao.orgaoExpedidor != null;
  }

  abstract sanitizar(): Identificacao;
}

export class RG extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    if (this.identificacao.idOrgaoExpedidor == null) return false;
    return this.identificacao.numeroVia != null;
  }

  sanitizar(): Identificacao {
    this.identificacao.dataValidade = null!;
    this.identificacao.numeroSerie = null!;
    this.identificacao.numeroPIS = null!;
    this.identificacao.dataChegadaBrasil = null!;
    this.identificacao.formacao = null!;
    this.identificacao.vigenciaCarteiraMilitar = null!;
    this.identificacao.referencia = null!;
    return this.identificacao;
  }

}

export class CNH extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    if (this.identificacao.idOrgaoExpedidor == null) return false;
  }

  sanitizar(): Identificacao {
    this.identificacao.numeroVia = null;
    this.identificacao.numeroSerie = null;
    this.identificacao.numeroPIS = null;
    this.identificacao.dataChegadaBrasil = null;
    this.identificacao.formacao = null;
    this.identificacao.vigenciaCarteiraMilitar = null;
    this.identificacao.referencia = null;
    return this.identificacao;
  }
}

export class CTPS extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    if (this.identificacao.idOrgaoExpedidor == null) return false;
    if (this.identificacao.numeroSerie == null) return false;
    if (this.identificacao.numeroPIS == null) return false;
    return this.identificacao.dataChegadaBrasil != null;
  }

  sanitizar(): Identificacao {
    this.identificacao.numeroVia = null;
    this.identificacao.dataValidade = null;
    this.identificacao.formacao = null;
    this.identificacao.vigenciaCarteiraMilitar = null;
    this.identificacao.referencia = null;
    return this.identificacao;
  }

}

export class CARTEIRA_MILITAR extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    if (this.identificacao.vigenciaCarteiraMilitar == null) return false;
    if (this.identificacao.vigenciaCarteiraMilitar == VigenciaCarteiraMilitarEnum.A_CERTO_TEMPO.nome) {
      if (this.identificacao.dataValidade == null) return false;
    }
    return true;
  }

  sanitizar(): Identificacao {
    this.identificacao.numeroVia = null;
    this.identificacao.numeroSerie = null;
    this.identificacao.numeroPIS = null;
    this.identificacao.dataChegadaBrasil = null;
    this.identificacao.formacao = null;
    this.identificacao.referencia = null;
    return this.identificacao;

  }

}

export class CARTEIRA_CLASSE extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    if (this.identificacao.numeroVia == null) return false;
    return this.identificacao.formacao != null;
  }

  sanitizar(): Identificacao {
    this.identificacao.dataValidade = null;
    this.identificacao.numeroSerie = null;
    this.identificacao.numeroPIS = null;
    this.identificacao.dataChegadaBrasil = null;
    this.identificacao.vigenciaCarteiraMilitar = null;
    return this.identificacao;
  }
}

export class PASSAPORTE extends IdentificacaoBase {

  constructor(identificacao: Identificacao) {
    super(identificacao);
  }

  isValido(): boolean {
    if (!super.isValido()) return false;
    return this.identificacao.dataValidade != null;
  }

  sanitizar(): Identificacao {
    this.identificacao.numeroVia = null;
    this.identificacao.numeroSerie = null;
    this.identificacao.numeroPIS = null;
    this.identificacao.dataChegadaBrasil = null;
    this.identificacao.formacao = null;
    this.identificacao.vigenciaCarteiraMilitar = null;
    return this.identificacao;
  }
}
