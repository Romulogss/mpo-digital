import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {LogicoEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";

@Entity('SituacaoSocioeconomica')
export class SituacaoSocioEconomica extends BaseEntity {

  @Synch()
  @Column({name: 'fl_cadUnico', nullable: true})
  cadUnico: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: 'fl_chefeDeFamilia', nullable: true})
  chefeDeFamilia: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: 'fl_egresso', nullable: true})
  egresso: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: 'fl_vitimaDeViolencia', nullable: true})
  vitimaDeViolencia: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: 'fl_pcd', nullable: true})
  pcd: string = LogicoEnum.NAO.nome;

  @Synch()
  @Column({name: 'fl_jovemEmpreendedor', nullable: true})
  jovemEmpreendedor: string = LogicoEnum.NAO.nome;

  @OneToOne(() => Cliente, cliente => cliente.situacaoSocioeconomica, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;
}
