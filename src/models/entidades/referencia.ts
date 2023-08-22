import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";

@Entity('referencia')
export class Referencia extends BaseEntity {

  @Synch()
  @Column({name: "nome", nullable: true})
  nome: string;

  @Synch()
  @Column({name: "telefone", nullable: true})
  telefone: string;

  @Synch()
  @Column({name: "ddd", nullable: true})
  ddd: string;

  @Synch()
  @Column({name: "grau_vinculo", nullable: true})
  grauVinculo: string;

  @ManyToOne(() => Cliente, cliente => cliente.referencias, {eager: false, cascade: false})
  @JoinColumn({name: 'id'})
  cliente: Relation<Cliente>;
}
