import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {TipoTelefoneEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";

@Entity('telefone')
export class Telefone extends BaseEntity {

  @Synch()
  @Column({name: "en_tipo_telefone", nullable: true})
  tipoTelefone: string;

  @Synch()
  @Column({length: 6, name: "nu_ddi", nullable: true})
  ddi: string = "55";

  @Synch()
  @Column({length: 3, name: "nu_ddd", nullable: true})
  ddd: string;

  @Synch()
  @Column({length: 16, name: "nu_telefone", nullable: true})
  telefone: string;

  @Synch()
  @Column({length: 10, name: "nu_ramal", nullable: true})
  ramal: string;

  @Synch()
  @Column({name: 'en_whatsapp', nullable: true})
  telefoneIsWhatsapp: string;

  @ManyToOne(() => Cliente, cliente => cliente.telefones, {cascade: ['insert']})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  get dddETelefone(): string {
    return `(${this.ddd ? this.ddd : 'Sem DDD'}) ${this.telefone ? this.telefone : 'Sem Telefone'}`;
  }

  get dddETelefoneSoNumeros(): string {
    return `${this.ddd}${this.telefone}`
  }

  isFixo(): boolean {
    return TipoTelefoneEnum.FIXO.nome == this.tipoTelefone;
  }

}
