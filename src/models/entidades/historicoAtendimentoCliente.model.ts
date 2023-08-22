import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {DetalheSituacaoClienteEnum, SituacaoClienteEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";

@Entity('historicoAtendidmentoCliente')
export class HistoricoAtendidmentoCliente extends BaseEntity {

  @Synch(SynchType.TIMESTAMP)
  @Column({name: 'dt_parecer', nullable: true})
  dataAtendimento: number;

  @Synch()
  @Column({name: 'cd_usu', nullable: true})
  cdUsu: string;

  @Synch()
  @Column({name: 'parecer', nullable: true, length: 400})
  informacaoAdicional: string;

  @Synch()
  @Column({name: 'en_detalhe_situacao', nullable: true})
  detalheSituacao: string;

  @Synch()
  @Column({name: 'en_situacao', nullable: true})
  situacao: string;

  @ManyToOne(() => Cliente, cliente => cliente.historicoDeAtendimento, {eager: false})
  @JoinColumn({name: 'id'})
  cliente: Relation<Cliente>;


  get dtParecer(): string {
    return AppUtils.millisecondsToStr(this.dataAtendimento)!;
  }

  set dtParecer(valor: string) {
    this.dataAtendimento = AppUtils.ISO8601ToMilliseconds(valor)!;
  }

  get dsSituacao(): string {
    if (this.situacao) {
      return SituacaoClienteEnum.parse(this.situacao).descricao
    } else {
      return SituacaoClienteEnum.parse(DetalheSituacaoClienteEnum.parse(this.detalheSituacao).situacao).descricao
    }
  }

  get dsDetalheSituacao(): string {
    return DetalheSituacaoClienteEnum.parse(this.detalheSituacao).descricao
  }


}
