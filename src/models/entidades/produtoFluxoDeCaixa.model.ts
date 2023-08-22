import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {AppUtils} from "../../utils/app-utils";
import {FluxoCaixa} from "./fluxoCaixa";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";

@Entity('produto_fc')
export class ProdutoFluxoDeCaixa extends BaseEntity {

  @Synch()
  @Column({name: 'nome', nullable: true})
  nome: string;

  @Synch()
  @Column({name: 'receita_op', nullable: true})
  receitaOperacional: number;

  @Synch()
  @Column({name: 'custo_venda', nullable: true})
  custoDeVendas: number;

  @ManyToOne(() => FluxoCaixa, {cascade: false, eager: false})
  @JoinColumn({name: 'id'})
  fluxoCaixa: Relation<FluxoCaixa>;

  get bruto(): number {
    return AppUtils.subtrair(this.receitaOperacional, this.custoDeVendas)
  }

  get liquido(): number {
    return this.bruto
  }
}
