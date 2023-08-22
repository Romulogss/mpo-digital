import {Column, Entity, JoinColumn, OneToOne, Relation} from "typeorm";
import {Cliente} from "./cliente";
import {AppUtils} from "../../utils/app-utils";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";

@Entity('avaliacao_patrimonial')
export class AvaliacaoPatrimonial extends BaseEntity {

  @OneToOne(() => Cliente, cliente => cliente.avaliacaoPatrimonial, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;
//Ativo circulante
  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_caixa_poupanca", nullable: true})
  caixaBancoPoupanca: number;

  @Synch()
  @Column({name: "vl_contas_receber", nullable: true})
  contasReceber: number;

  @Synch()
  @Column({name: "vl_estoques", nullable: true})
  estoques: number;

  @Synch()
  @Column({name: "vl_outros_bens", nullable: true})
  outrosAtivosCiruclante: number;
  //Ativo Imobilizado
  @Synch()
  @Column({name: "vl_imoveis", nullable: true})
  imoveis: number;

  @Synch()
  @Column({name: "vl_maquinas_equipamentos", nullable: true})
  maquinasEquipamentos: number;

  @Synch()
  @Column({name: "vl_moveis_utensilios", nullable: true})
  moveisUtensilios: number;

  @Synch()
  @Column({name: "vl_veiculos", nullable: true})
  veiculos: number;

  @Synch()
  @Column({name: "vl_outros_imobilizados", nullable: true})
  outrosImobilizados: number;

  @Synch()
  @Column({name: "vl_ativo_da_familia", nullable: true})
  ativoDaFamilia: number;
//Passivo circulante
  @Synch()
  @Column({name: "vl_financiamento_emprestimo", nullable: true})
  financiamentoDeEmprestimo: number;

  @Synch()
  @Column({name: "vl_fornecedores", nullable: true})
  fornecedores: number;

  @Synch()
  @Column({name: "vl_adiantamento_de_clientes", nullable: true})
  adiantamentoDeClientes: number;

  @Synch()
  @Column({name: "vl_outros_passivo_circulante", nullable: true})
  outrosPassivoCirculante: number;
  //Passivo Longo prazo
  @Synch()
  @Column({name: "vl_financiamento_longo_prazo", nullable: true})
  financiamentoDeLongoPrazo: number;


  @Synch()
  @Column({name: "dt_atu", nullable: true})
  dataAtualizacao: number;

  get ativoCirculanteTotal(): number {
    return AppUtils.somarValores(
      this.caixaBancoPoupanca,
      this.contasReceber,
      this.estoques,
      this.outrosAtivosCiruclante
    )
  }

  get imobilizadoTotal(): number {
    return AppUtils.somarValores(
      this.imoveis,
      this.maquinasEquipamentos,
      this.moveisUtensilios,
      this.veiculos,
      this.outrosImobilizados,
      this.ativoDaFamilia
    )
  }

  get ativoTotal(): number {
    return AppUtils.somarValores(
      this.ativoCirculanteTotal,
      this.imobilizadoTotal
    )
  }

  get passivoCirculanteTotal(): number {
    return AppUtils.somarValores(
      this.financiamentoDeEmprestimo,
      this.fornecedores,
      this.adiantamentoDeClientes,
      this.outrosPassivoCirculante,
    )
  }

  get patromonioLiquido(): number {
    return AppUtils.subtrairValores(this.ativoTotal, this.passivoCirculanteTotal, this.financiamentoDeLongoPrazo);
  }

  getAtivoTotal(): number {
    return AppUtils.somarValores(
      this.caixaBancoPoupanca,
      this.contasReceber,
      this.estoques,
      this.outrosAtivosCiruclante);
  }

  getPassivoTotal(): number {
    return AppUtils.somarValores(this.passivoCirculanteTotal, this.financiamentoDeLongoPrazo);
  }

  getRecursosProprios(): number {
    return AppUtils.subtrairValores(
      this.getAtivoTotal(),
      this.fornecedores,
      this.financiamentoDeLongoPrazo);
  }

  get ultimaAtualizacao(): Date {
    return AppUtils.ignorarHora(new Date(this.dataAtualizacao));
  }

  get indiceLiquidezCorrente(): number {
    return AppUtils.dividir(this.ativoCirculanteTotal, this.passivoCirculanteTotal);
  }

  get indiceLiquidezGeral(): number{
    const somatoriaAtivoImobilizado = this.ativoCirculanteTotal + this.imobilizadoTotal;
    const somatoriPassivoLongoPrazo = this.passivoCirculanteTotal + this.financiamentoDeLongoPrazo;
    return AppUtils.dividir(somatoriaAtivoImobilizado, somatoriPassivoLongoPrazo);
  }


}
