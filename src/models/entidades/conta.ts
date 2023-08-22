import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";

@Entity('conta')
export class Conta extends BaseEntity {

  @OneToOne(type => Cliente, cliente => cliente.conta, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "codigo_banco", nullable: true})
  codigoBanco: string;

  @Synch()
  @Column({name: "descricao_banco", nullable: true})
  descricaoBanco: string;

  @Synch()
  @Column({name: "tipo_conta", nullable: true})
  tipoConta: string;

  @Synch()
  @Column({length: 7, name: "agencia", nullable: true})
  agencia: string;

  @Synch()
  @Column({length: 20, name: "conta_corrente", nullable: true})
  contaCorrente: string;

  @Synch()
  @Column({length: 4, name: "operacao", nullable: true})
  operacao: string;

  @Synch()
  @Column({length: 20, name: "pix_cpf", nullable: true})
  pixCpf: string;

  @Synch()
  @Column({length: 20, name: "pix_telefone", nullable: true})
  pixTelefone: string;

  @Synch()
  @Column({length: 150, name: "pix_email", nullable: true})
  pixEmail: string;

  @Synch()
  @Column({length: 150, name: "pix_chave", nullable: true})
  pixChave: string;

  dvAgencia: string;

  get isCaixaEconomica(): boolean {
    return this.codigoBanco == "104";
  }

  get digitoAgencia(): string {
    if(AppUtils.strNotEmptyOrNull(this?.agencia) && this?.agencia?.length > 4) {
      return this.agencia.substring(this.agencia.length - 1)
    } else {
      return ''
    }
  }

}
