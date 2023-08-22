import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AppUtils} from "../../utils/app-utils";
import {Cliente} from "./cliente";
import {TipoRendaEnum} from "../enums/enums-types";
import {BaseEntity} from "./base.entity";
import {Synch, SynchType} from "../../utils/synch/synchronizable";

@Entity('renda')
export class Renda extends BaseEntity {

  @OneToOne(() => Cliente, cliente => cliente.renda, {cascade: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "en_renda_principal", nullable: true})
  rendaPrincipal: string;

  @Synch()
  @Column({name: "en_natureza", nullable: true})
  natureza: string;

  @Synch()
  @Column({name: "en_tipo_comprovante", nullable: true})
  tipoComprovante: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_data_emissao", nullable: true})
  dataEmissao: number;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_inicio_renda", nullable: true})
  inicioRenda: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_valor_bruto", nullable: true})
  valorBruto: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_valor_liquido", nullable: true})
  valorLiquido: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_bruto_familiar", nullable: true})
  valorBrutoFamiliar: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_pessoas_moram_casa", nullable: true})
  quantasPessoasMoramNaCasa: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_pessoas_ajudam_financas", nullable: true})
  quantasPessoasAjudamFinancas: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "qtd_dependentes", nullable: true})
  quantidadeDependentes: number;

  @Synch(SynchType.NUMERIC)
  @Column({name: "vl_outro_negocio", nullable: true})
  valorOutroNegocio: string;

  @Synch(SynchType.NUMERIC)
  @Column({name: "margem_consignado", nullable: true})
  margemConsignado: number;


  get vBrutoAbatido(): number {
    return AppUtils.subtrairValores(this.valorBruto, this.margemConsignado);
  }

  get dtDataEmissao(): string {
    return AppUtils.millisecondsToISO8601(this.dataEmissao);
  }

  set dtDataEmissao(valor: string) {
    this.dataEmissao = AppUtils.ISO8601ToMilliseconds(valor);
  }

  get dtInicioRenda(): string {
    return AppUtils.millisecondsToISO8601(this.inicioRenda);
  }

  set dtInicioRenda(valor: string) {
    this.inicioRenda = AppUtils.ISO8601ToMilliseconds(valor);
  }

  get naturezaDescricao(): string {
    if (this.natureza == null) return '';
    return TipoRendaEnum.parse(this.natureza).descricao;
  }

  get empreendedorOrAssalariado(): boolean {
    if (this.natureza == null) return false;
    return this.natureza === TipoRendaEnum.ASSALARIADO.nome || this.natureza === TipoRendaEnum.EMPREENDIMENTO.nome;
  }

}
