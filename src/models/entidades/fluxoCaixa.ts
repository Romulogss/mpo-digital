import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";
import {ProdutoFluxoDeCaixa} from "./produtoFluxoDeCaixa.model";

@Entity('fluxo_caixa')
export class FluxoCaixa extends BaseEntity {

  @OneToOne(() => Cliente, cliente => cliente.fluxoCaixa, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "vl_custo_mercadoria", nullable: true})
  custoMercadoria: number;
  //Custo operacional
  @Synch()
  @Column({name: "vl_pagamento_pessoal", nullable: true})
  pagamentoPessoal: number;

  @Synch()
  @Column({name: "vl_transporte", nullable: true})
  transporte: number;

  @Synch()
  @Column({name: "vl_agua_luz_gas", nullable: true})
  aguaLuzGas: number;

  @Synch()
  @Column({name: "vl_internet_celular", nullable: true})
  internetCelular: number;

  @Synch()
  @Column({name: "vl_taxa_aluguel", nullable: true})
  taxaAluguel: number;

  @Synch()
  @Column({name: "vl_taxa_impostos", nullable: true})
  taxaImpostos: number;

  @Synch()
  @Column({name: "vl_outros_custos", nullable: true})
  outrosCustos: number;
  //Receita não operacional
  @Synch()
  @Column({name: "vl_aposentadoria", nullable: true})
  aposentadoria: number;

  @Synch()
  @Column({name: "vl_bolsaFamilia", nullable: true})
  bolsaFamilia: number;

  @Synch()
  @Column({name: "vl_receita_da_familia", nullable: true})
  receitasDaFamilia: number;
  //Custo não operacional
  @Synch()
  @Column({name: "vl_alimentacao", nullable: true})
  alimentacao: number;

  @Synch()
  @Column({name: "vl_transporte_no", nullable: true})
  transporteNaoOperacional: number;

  @Synch()
  @Column({name: "vl_agua_luz_gas_no", nullable: true})
  aguaLuzGasNaoOperacional: number;

  @Synch()
  @Column({name: "vl_internet_celular_no", nullable: true})
  internetCelularNaoOperacional: number;

  @Synch()
  @Column({name: "vl_saude", nullable: true})
  saude: number;

  @Synch()
  @Column({name: "vl_educacao", nullable: true})
  educacao: number;

  @Synch()
  @Column({name: "vl_lazer", nullable: true})
  lazer: number;

  @Synch()
  @Column({name: "vl_prestacao_carne", nullable: true})
  prestacaoCarne: number; //Carnê

  @Synch()
  @Column({name: "vl_aluguel_prestacao", nullable: true})
  aluguelPrestacao: number;

  @Synch()
  @Column({name: "vl_custos_dividas_emprestimo", nullable: true})
  custosDividasEmprestimo: number;

  @Synch()
  @Column({name: "vl_dizimo", nullable: true})
  dizimo: number;

  @Synch()
  @Column({name: "dt_atu", nullable: true})
  dataAtualizacao: number;

  @Synch()
  @OneToMany(() => ProdutoFluxoDeCaixa, produto => produto.fluxoCaixa, {cascade: true, eager: true})
  produtos: Relation<ProdutoFluxoDeCaixa[]>

  get lucroBrutoOperacional(): number {
    let valorBruto: number = 0
    this.produtos.forEach(produto => valorBruto += produto.receitaOperacional)
    return valorBruto;
  }

  get custoOperacional(): number {
    return AppUtils.somarValores(
      this.pagamentoPessoal,
      this.transporte,
      this.aguaLuzGas,
      this.internetCelular,
      this.taxaAluguel,
      this.taxaImpostos,
      this.outrosCustos,
      this.custoDeVendas);
  }

  get lucroOperacional(): number {
    return AppUtils.subtrair(this.lucroBrutoOperacional, this.custoOperacional)
  }

  get receitaBrutaNaoOperacional(): number {
    return AppUtils.somarValores(this.receitasDaFamilia, this.bolsaFamilia, this.aposentadoria)
  }

  get custoNaoOperacional(): number {
    return AppUtils.somarValores(
      this.alimentacao,
      this.aguaLuzGasNaoOperacional,
      this.transporteNaoOperacional,
      this.internetCelularNaoOperacional,
      this.saude,
      this.educacao,
      this.lazer,
      this.prestacaoCarne,
      this.aluguelPrestacao,
      this.custosDividasEmprestimo,
      this.dizimo
    )
  }

  get receitaNaoOperacional(): number {
    return AppUtils.subtrair(this.receitaBrutaNaoOperacional, this.custoNaoOperacional)
  }

  get disponibilidadeLiquida(): number {
    return AppUtils.somarValores(this.lucroOperacional, this.receitaNaoOperacional)
  }

  get capacidadePagamentoReal(): number {
    try {
      return AppUtils.multiplicar(this.disponibilidadeLiquida, 0.7);
    } catch (err) {
      console.log(err)
      return 0;
    }
  }

  get rendaBrutaAnual(): number {
    return AppUtils.multiplicar(this.lucroOperacional, 12);
  }

  get recebimentoDeVendasAnual(): number {
    return AppUtils.multiplicar(this.recebimentoVendas, 12)
  }

  get ultimaAtualizacao(): Date {
    return AppUtils.ignorarHora(new Date(this.dataAtualizacao));
  }

  get recebimentoVendas(): number {
    let recebimentoDeVendas = 0;
    if (this.produtos != null && this.produtos.length > 0) {
      for (const produto of this.produtos) {
        recebimentoDeVendas += produto.receitaOperacional
      }
    }
    return recebimentoDeVendas
  }

  get custoDeVendas(): number {
    try {
      return this.produtos.map(p => p.custoDeVendas).reduce((total, atual) => total + atual);
    } catch (err) {
      return 0
    }
  }

}
