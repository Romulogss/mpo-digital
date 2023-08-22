import {Column, Entity, JoinColumn, OneToOne, Relation} from "typeorm";
import {AppUtils} from "../../utils/app-utils";
import {Cliente} from "./cliente";
import {LogicoEnum, TipoOcupacaoEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";

@Entity('ocupacao')
export class Ocupacao extends BaseEntity {

  @OneToOne(() => Cliente, cliente => cliente.ocupacao, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch(SynchType.NUMERIC)
  @Column({name: "cd_setor", nullable: true})
  codigoSetor: number;

  @Synch()
  @Column({name: "en_descricao_setor", nullable: true})
  descricaoSetor: string;

  @Synch(SynchType.NUMERIC)
  @Column({name: "cd_atividade", nullable: true})
  codigoAtividade: number;

  @Synch()
  @Column({name: "en_descricao_atividade", nullable: true})
  descricaoAtividade: string;

  @Synch()
  @Column({name: "en_principal", nullable: true})
  principal: string;

  @Synch()
  @Column({name: 'tx_nome_empresa', nullable: true})
  nomeEmpresa: string;

  @Synch()
  @Column({name: 'tx_funcao_empresa', nullable: true})
  funcaoEmpresa: string;

  @Synch()
  @Column({name: "en_possui_comprovante", nullable: true})
  possuiComprovante: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_data_inicio_ocupacao", nullable: true})
  dataInicioOcupacao: number;

  @Synch()
  @Column({name: 'en_tipo_ocupacao', nullable: true})
  tipoOcupacao: string;

  get dtDataInicioOcupacao() {
    return this.dataInicioOcupacao ? AppUtils.millisecondsToStr(this.dataInicioOcupacao) : null;
  }

  set dtDataInicioOcupacao(value: string) {
    this.dataInicioOcupacao = value ? AppUtils.strToMilliseconds(value) : null;
  }

  get possuiRendaExtra(): string {
    return LogicoEnum.valorPorCondicao(this.tipoOcupacao === TipoOcupacaoEnum.ASSALARIADO.nome);
  }

}
