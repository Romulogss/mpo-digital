// noinspection ES6UnusedImports
import {
  Column,
  Entity,
  getManager,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import {Carteira} from "./carteira";
import {Identificacao} from "./identificacao";
import {Telefone} from "./telefone";
import {Localizacao} from "./localizacao";
import {Renda} from "./renda";
import {Ocupacao} from "./ocupacao";
//@ts-ignore
import {v4 as uuid} from 'uuid';
import {FluxoCaixa} from "./fluxoCaixa";
import {AppUtils} from "../../utils/app-utils";
import {AvaliacaoPatrimonial} from "./avaliacaoPatrimonial";
import {Conta} from "./conta";
import {Arquivo} from "./arquivo";
import {
  DadosCapturaOpcaoEnum,
  DetalheSituacaoClienteEnum,
  EstadoCivilEnum,
  LogicoEnum,
  ObjetivoDoCreditoEnum,
  SetorEnum,
  SituacaoClienteEnum,
  TipoContaEnum,
  TipoEnderecoEnum,
  TipoLocalizacaoEnum,
  TipoPessoaEnum,
  TipoRendaEnum,
  TipoTelefoneEnum
} from "../enums/enums-types";
import {SituacaoSocioEconomica} from "./situacaoSocioEconomica";
import {HistoricoAtendidmentoCliente} from "./historicoAtendimentoCliente.model";
import {Referencia} from "./referencia";
import {BaseEntity} from "./base.entity";
import {FectchData, FetchDataUuid, Synch, SynchType} from "../../utils/synch/synchronizable";
import {Assessor} from "./assessor.entity";
import {DadosCapturaOpcao} from "../interfaces/dados-basicos";
import {RestritivoItem} from "../model/restritivo-item.model";

;

@Entity('cliente')
export class Cliente extends BaseEntity {

  @Synch()
  @Column({length: 15, name: "en_situacao_atuak", nullable: true})
  situacaoAtual: string = "DISTRIBUIDO";

  @Synch()
  @Column({length: 15, name: "en_detalhe_situacao_atual", nullable: true})
  detalheSituacaoAtual: string;

  @Synch()
  @Column({length: 60, name: "no_completo", nullable: true})
  nomeCompleto: string;

  @Synch()
  @Column({length: 200, name: "no_abreviado", nullable: true})
  nomeAbreviado: string;

  @Synch()
  @Column({length: 14, name: "cd_cpf_cnpj", nullable: true})
  cpfCnpj: string;

  @Synch()
  @Column({length: 14, name: "cd_cnpj", nullable: true})
  cnpj: string;

  @Synch()
  @Column({name: "cd_tipo_pessoa", nullable: true})
  tipoPessoa: string;

  @Column({name: "dt_proxima_visita", nullable: true})
  dataProximaVisita: number;

  @Synch()
  @Column({name: "en_sexo", nullable: true})
  sexo: string;

  @Synch()
  @Column({name: "en_grau_instrucao", nullable: true})
  grauInstrucao: string;

  @Synch()
  @Column({name: "en_estado_civil", nullable: true})
  estadoCivil: string;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_nascimento", nullable: true})
  nascimento: number;

  @Synch()
  @Column({length: 30, name: "tx_nacionalidade", nullable: true})
  nacionalidade: string = 'BRASILEIRA';

  @Synch()
  @Column({length: 2, name: "tx_estado", nullable: true})
  estado: string;

  @Synch()
  @Column({length: 60, name: "tx_cidade", nullable: true})
  cidade: string;

  @Synch(SynchType.NUMERIC)
  @Column({name: "id_cidade", nullable: true})
  idCidade: number;

  @Synch()
  @Column({length: 60, name: "en_objetivo_credito", nullable: true})
  objetivoDoCredito: string;

  @Synch(SynchType.NUMERIC)
  @Column({name: "nu_grau_interesse", nullable: true})
  grauInteresse: number;

  @Synch()
  @Column({length: 60, name: "no_mae", nullable: true})
  nomeMae: string;

  @Synch()
  @Column({length: 60, name: "no_pai", nullable: true})
  nomePai: string;

  @Synch()
  @Column({length: 60, name: "no_conjuge", nullable: true})
  nomeConjuge: string;

  @Synch()
  @Column({length: 14, name: "cd_cpf_conjuge", nullable: true})
  cpfConjuge: string;

  @Synch()
  @Column({name: "en_titular", nullable: true})
  titular: string;

  @Synch()
  @Column({name: "email", nullable: true})
  email: string;

  @Synch()
  @Column({name: "en_email_proprio", nullable: true})
  isEmailProprio: string;

  @Synch()
  @Column({name: "en_realizou_cursos", nullable: true})
  realizouCursos: string = LogicoEnum.NAO.nome;

  @Synch(SynchType.ENTITY, Carteira)
  @ManyToOne(() => Carteira, {cascade: true})
  @JoinColumn({name: "id_carteira"})
  carteira: Relation<Carteira> = new Carteira();

  @Synch(SynchType.ENTITY, FluxoCaixa)
  @OneToOne(() => FluxoCaixa, fluxoCaixa => fluxoCaixa.cliente, {
    cascade: ["insert", "update", "remove"],
    eager: true
  })
  fluxoCaixa: Relation<FluxoCaixa> = new FluxoCaixa();

  @Synch(SynchType.ENTITY, AvaliacaoPatrimonial)
  @OneToOne(() => AvaliacaoPatrimonial, avaliacaoPatrimonial => avaliacaoPatrimonial.cliente, {
    cascade: ["insert", "update", "remove"],
    eager: true
  })
  avaliacaoPatrimonial: Relation<AvaliacaoPatrimonial> = new AvaliacaoPatrimonial();

  @Synch(SynchType.ENTITY, Conta)
  @OneToOne(() => Conta, conta => conta.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  conta: Relation<Conta> = new Conta();

  @Synch(SynchType.ENTITY, Renda)
  @OneToOne(() => Renda, renda => renda.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  renda: Relation<Renda> = new Renda();

  @Synch(SynchType.ENTITY, Ocupacao)
  @OneToOne(() => Ocupacao, ocupacao => ocupacao.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  ocupacao: Relation<Ocupacao> = new Ocupacao();

  @Synch(SynchType.ENTITY, Identificacao)
  @OneToOne(() => Identificacao, identificacao => identificacao.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  identificacao: Relation<Identificacao> = new Identificacao();

  @Synch(SynchType.ENTITY, SituacaoSocioEconomica)
  @OneToOne(() => SituacaoSocioEconomica, situacao => situacao.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  situacaoSocioeconomica: Relation<SituacaoSocioEconomica> = new SituacaoSocioEconomica();

  @Synch(SynchType.LIST, Referencia)
  @OneToMany(() => Referencia, referencia => referencia.cliente, {
    cascade: ["insert", "update", "remove"],
    nullable: true,
    eager: true
  })
  referencias: Relation<Referencia[]>;

  @Synch(SynchType.LIST, Telefone)
  @OneToMany(() => Telefone, telefone => telefone.cliente, {cascade: ["insert", "update", "remove"], eager: true})
  telefones: Relation<Telefone[]>;

  @Column({name: "en_telefone_ficha", nullable: true})
  tipoTelefoneFicha: string = TipoTelefoneEnum.FIXO.nome;

  @Synch(SynchType.LIST, Localizacao)
  @OneToMany(() => Localizacao, endereco => endereco.cliente, {cascade: ["insert", "update", "remove"], eager: true})
  enderecos: Relation<Localizacao[]>;

  @OneToMany(() => Arquivo, arquivo => arquivo.cliente, {
    cascade: ["insert", "update", "remove"],
    eager: true,
    nullable: true
  })
  arquivos: Relation<Arquivo[]>;

  @Synch(SynchType.LIST, HistoricoAtendidmentoCliente)
  @OneToMany(() => HistoricoAtendidmentoCliente, situacao => situacao.cliente, {
    cascade: true,
    eager: true,
    nullable: true
  })
  historicoDeAtendimento: Relation<HistoricoAtendidmentoCliente[]>;

  @Column({name: "en_endereco_ficha", nullable: true})
  tipoEnderecoFicha: string = TipoLocalizacaoEnum.COMERCIAL.nome;

  /* Campos para a sincronizacao */

  @Synch()
  @Column({name: "cd_uuid", nullable: true})
  uuid: string;

  @Synch(SynchType.NUMERIC)
  @Column({name: "dt_ultima_atualizacao", nullable: true})
  ultimaAtualizacao: number;

  @Synch(SynchType.TIMESTAMP)
  @Column({name: "dt_cadastro", nullable: true})
  dtCadastro: number;

  @Column({name: "nu_sincronizado", nullable: true})
  sincronizado: boolean;

  @Synch()
  @Column({name: "fl_excluido", nullable: true})
  excluido: boolean = false;

  @Synch()
  @Column({name: "fl_arquivado", nullable: true})
  arquivado: string = LogicoEnum.NAO.nome

  @Synch()
  @Column({name: "fl_cd_avalista", nullable: true})
  cadastroAvalista: string = LogicoEnum.NAO.nome

  @Column({name: "nu_ativo", nullable: true})
  ativo: boolean = true;

  corAviso: string = '#00FF14';

  labelRelatorio: string;


  constructor(id?: number | null) {
    super(id);
  }

  /*BEGIN Métodos de Respositório*/

  static buscarClienteCompleto(uuid: string): Promise<Cliente> {
    return Cliente.createQueryBuilder("cliente")
      .leftJoinAndSelect("cliente.situacaoSocioeconomica", "situacaoSocioeconomica")
      .leftJoinAndSelect("cliente.arquivos", "arquivos")
      .leftJoinAndSelect("cliente.referencias", "referencias")
      .leftJoinAndSelect("cliente.fluxoCaixa", "fluxoCaixa")
      .leftJoinAndSelect("fluxoCaixa.produtos", "produtos")
      .leftJoinAndSelect("cliente.avaliacaoPatrimonial", "avaliacaoPatrimonial")
      .leftJoinAndSelect("cliente.renda", "renda")
      .leftJoinAndSelect("cliente.ocupacao", "ocupacao")
      .leftJoinAndSelect("cliente.identificacao", "identificacao")
      .leftJoinAndSelect("cliente.telefones", "telefones")
      .leftJoinAndSelect("cliente.enderecos", "enderecos")
      .leftJoinAndSelect("cliente.carteira", "carteira")
      .leftJoinAndSelect("cliente.conta", "conta")
      .leftJoinAndSelect("cliente.historicoDeAtendimento", "historicoDeAtendimento")
      .where(`cliente.uuid = '${uuid}'`)
      .getOne();
  }

  static async createFetchDataWithDependecias(clientes: FetchDataUuid[], selecionados: FectchData) {
    for (const cliente of clientes) {
      await Cliente.buscarClienteCompleto(cliente.uuid).then(clienteDB => {
        selecionados.cliente.push(cliente)
        if (clienteDB) {
          for (const arquivo of clienteDB.arquivos) {
            let arq = new FetchDataUuid();
            arq.uuid = arquivo.getUuid();
            arq.lastUpdate = arquivo.getLastUpdate();
            selecionados.arquivo.push(arq)
          }
        }
      })
    }
  }

  /*END Métodos de Respositório*/

  /*BEGIN Métodos de objeto*/

  getNome(): string {
    return this.nomeCompleto;
  }

  preView() {
    if (this.fluxoCaixa == null) this.fluxoCaixa = new FluxoCaixa();
    if (this.avaliacaoPatrimonial == null) this.avaliacaoPatrimonial = new AvaliacaoPatrimonial();
    if (this.conta == null) this.conta = new Conta();
    if (this.renda == null) this.renda = new Renda();
    if (this.ocupacao == null) this.ocupacao = new Ocupacao();
    if (this.identificacao == null) this.identificacao = new Identificacao();
    if (this.situacaoSocioeconomica == null) this.situacaoSocioeconomica = new SituacaoSocioEconomica();
    if (this.referencias == null) this.referencias = [new Referencia(), new Referencia()];
    else if (this.referencias.length === 0) this.referencias.push(new Referencia(), new Referencia());
    else if (this.referencias.length === 1) {
      this.referencias.push(new Referencia());
      this.referencias.reverse();
    } else if (this.referencias.length === 2 && (AppUtils.strEmptyOrNull(this.referencia1Nome))) {
      this.referencias.reverse();
    }
    if (this.telefoneMovel == null) this.telefoneMovel = new Telefone();
    if (this.enderecoComercial == null) this.enderecoComercial = new Localizacao();
    if (this.enderecoResidencial == null) this.enderecoResidencial = new Localizacao();
    if (this.historicoDeAtendimento == null) this.historicoDeAtendimento = [];
    if (this.situacaoAtual == null) {
      this.situacaoAtual = 'DISTRIBUIDO'
    }
    if (this.cpfCnpj != undefined && this.cpfCnpj.match(/\D/g)) {
      this.cpfCnpj = AppUtils.unmask(this.cpfCnpj)
    }
    if (this.cnpj) {
      if (this.cnpj.match(/\D/g)) {
        this.cnpj = AppUtils.unmask(this.cnpj)
      }
    }
    if (this.cpfConjuge) {
      if (this.cpfConjuge.match(/\D/g)) {
        this.cpfConjuge = AppUtils.unmask(this.cpfConjuge)
      }
    }
    if (this.conta.tipoConta === TipoContaEnum.PIX_CPF.nome) {
      if (this.conta.pixCpf.match(/\D/g)) {
        this.conta.pixCpf = AppUtils.unmask(this.conta.pixCpf)
      }
    }
  }

  posView(): void {
    if (!this.isCadastroAvalista) {
      this.renda.valorBruto = this.fluxoCaixa.recebimentoVendas
    }
    if (this.conta.dvAgencia != null) {
      this.conta.agencia = this.conta.agencia.concat(this.conta.dvAgencia);
    }
  }

  async registrarDesistencia(atendimento: HistoricoAtendidmentoCliente) {
    this.situacaoAtual = DetalheSituacaoClienteEnum.DOCUMENTOS_NAO_ENTREGUE.situacao;
    this.detalheSituacaoAtual = DetalheSituacaoClienteEnum.DOCUMENTOS_NAO_ENTREGUE.nome;
    this.arquivado = LogicoEnum.SIM.nome;
    this.historicoDeAtendimento.push(atendimento);
    this.sinalizarSincronizacao();
    await Cliente.buscarClienteCompleto(this.uuid).then(async clienteDB => {
      atendimento.cliente = clienteDB;
      clienteDB.situacaoAtual = DetalheSituacaoClienteEnum.DOCUMENTOS_NAO_ENTREGUE.situacao;
      clienteDB.detalheSituacaoAtual = DetalheSituacaoClienteEnum.DOCUMENTOS_NAO_ENTREGUE.nome;
      clienteDB.arquivado = LogicoEnum.SIM.nome;
      clienteDB.historicoDeAtendimento.push(atendimento);
      clienteDB.sinalizarSincronizacao();
      await Cliente.save(clienteDB).then((clienteRemovido) => {
        console.log(clienteRemovido.nomeCompleto + " Foi arquivado por não mandar documentos no prazo")
      })
    })
  }

  getTelefones(): Telefone[] {
    if (this.telefones == null) {
      this.telefones = [];
    }
    return this.telefones;
  }

  getEnderecos(): Localizacao[] {
    if (this.enderecos == null) {
      this.enderecos = [];
    }
    return this.enderecos;
  }

  getUuid(): string {
    return this.uuid;
  }

  getLastUpdate(): number {
    return this.ultimaAtualizacao;
  }

  isSynchronized(): boolean {
    return this.sincronizado;
  }

  setSynchronized(synchronized: boolean): void {
    this.sincronizado = synchronized;
  }

  sinalizarSincronizacao() {
    if (this.uuid == null) {
      this.uuid = uuid();
    }
    this.ultimaAtualizacao = new Date().valueOf();
    this.sincronizado = false;
  }

  getArquivoByTipoCaptura(tipoCaptura: DadosCapturaOpcao): Arquivo {
    return this.arquivos.find(arquivo => arquivo.tipoDadosCaptura && arquivo.tipoDadosCaptura === tipoCaptura.nome);
  }

  registrarNovoAtendimento(atendimento: HistoricoAtendidmentoCliente) {
    this.situacaoAtual = atendimento.situacao;
    this.detalheSituacaoAtual = atendimento.detalheSituacao;
    this.historicoDeAtendimento.push(atendimento)
  }

  /*END Métodos de objeto*/

  /*BEGIN GETTERS and SETTERS*/
  get dtDataProximaVisita(): string {
    return AppUtils.millisecondsToISO8601(this.dataProximaVisita);
  }

  set dtDataProximaVisita(valor: string) {
    this.dataProximaVisita = AppUtils.ISO8601ToMilliseconds(valor);
  }

  get dtNascimento() {
    return this.nascimento ? AppUtils.millisecondsToStr(this.nascimento) : null;
  }

  set dtNascimento(value: string) {
    this.nascimento = value ? AppUtils.strToMilliseconds(value) : null;
  }

  get dataCadastro() {
    return this.dtCadastro ? AppUtils.millisecondsToStr(this.dtCadastro) : null;
  }

  get telefoneFixo(): Telefone {
    return AppUtils.getAtributoDeLista(Telefone, this.getTelefones(), 'tipoTelefone', TipoTelefoneEnum.FIXO.nome);
  }

  set telefoneFixo(valor: Telefone) {
    AppUtils.setAtributoDeLista(Telefone, this.getTelefones(), 'tipoTelefone', TipoTelefoneEnum.FIXO.nome, valor);
  }

  get telefoneMovel(): Telefone {
    return AppUtils.getAtributoDeLista(Telefone, this.getTelefones(), 'tipoTelefone', TipoTelefoneEnum.MOVEL.nome);
  }

  set telefoneMovel(valor: Telefone) {
    AppUtils.setAtributoDeLista(Telefone, this.getTelefones(), 'tipoTelefone', TipoTelefoneEnum.MOVEL.nome, valor);
  }

  get enderecoResidencial(): Localizacao {
    return AppUtils.getAtributoDeLista(Localizacao, this.getEnderecos(), 'tipoEndereco', TipoEnderecoEnum.RESIDENCIAL.nome);
  }

  get telefone(): Telefone {
    if (this.telefoneMovel != null) {
      return this.telefoneMovel;
    } else if (this.telefoneFixo != null) {
      return this.telefoneFixo;
    }
    return null;
  }

  set enderecoResidencial(valor: Localizacao) {
    AppUtils.setAtributoDeLista(Localizacao, this.getEnderecos(), 'tipoEndereco', TipoEnderecoEnum.RESIDENCIAL.nome, valor);
  }

  get enderecoComercial(): Localizacao {
    return AppUtils.getAtributoDeLista(Localizacao, this.getEnderecos(), 'tipoEndereco', TipoEnderecoEnum.COMERCIAL.nome);
  }

  set enderecoComercial(valor: Localizacao) {
    AppUtils.setAtributoDeLista(Localizacao, this.getEnderecos(), 'tipoEndereco', TipoEnderecoEnum.COMERCIAL.nome, valor);
  }

  get isPotencial(): boolean {
    return this.situacaoAtual === SituacaoClienteEnum.DISTRIBUIDO.nome;
  }

  get toJson(): any {
    return {
      uuid: this.uuid,
      nomeCompleto: this.nomeCompleto,
      cpfCnpj: this.cpfCnpj
    };
  }

  get toRestritivoItemCadastroCompleto(): RestritivoItem[] {
    let restritivos: RestritivoItem[] = [];
    this.toRestritivoItemVinculacao(restritivos);
    this.toRestritivoItemOcupacao(restritivos);
    if (!this.isCadastroAvalista) {
      this.toRestritivoItemDadosBancarios(restritivos);
      restritivos.push(...this.toRestritivoItemFluxoCaixa)
    } else {
      this.toRestritivoItemRenda(restritivos);
    }
    this.toRestritivoItemEndereco(restritivos, TipoEnderecoEnum.RESIDENCIAL.nome)
    if (!this.isCadastroAvalista) {
      this.toRestritivoItemEndereco(restritivos, TipoEnderecoEnum.COMERCIAL.nome)
    }
    this.toRestritivoItemTelefone(restritivos)
    this.toRestritivoItemIdentificacao(restritivos);
    this.toRestritivoItemArquivos(restritivos);
    return restritivos;
  }

  toRestritivoItemVinculacao(restritivos: RestritivoItem[]): void {
    restritivos.push(new RestritivoItem('TIPO PESSOA', this.tipoPessoa == null));
    restritivos.push(new RestritivoItem('NOME COMPLETO', this.nomeCompleto == null));
    restritivos.push(new RestritivoItem('NOME MÃE', this.nomeMae == null));
    restritivos.push(new RestritivoItem('SEXO', this.sexo == null));
    restritivos.push(new RestritivoItem('CPF/CNPJ', this.cpfCnpj == null));
    restritivos.push(new RestritivoItem('GRAU INSTRUÇÃO', this.grauInstrucao == null));
    restritivos.push(new RestritivoItem('ESTADO CIVIL', this.estadoCivil == null));
    restritivos.push(new RestritivoItem('DATA DE NASCIMENTO', this.dtNascimento == null));
    restritivos.push(new RestritivoItem('CIDADE DE NASCIMENTO', this.idCidade == null));
  }

  toRestritivoItemOcupacao(restritivos: RestritivoItem[]): void {
    restritivos.push(new RestritivoItem('OCUPAÇÃO', this.ocupacao == null));
    if (this.ocupacao != null) {
      restritivos.push(new RestritivoItem('INÍCIO OCUPAÇÃO', this.ocupacao.dtDataInicioOcupacao == null && !this.isPensionistaAposentado))
      if (!this.isCadastroAvalista) {
        restritivos.push(new RestritivoItem('DESCRIÇÃO ATIVIDADE', this.ocupacao.descricaoAtividade === 'OUTROS'
          || this.ocupacao.descricaoAtividade == null))
      }
      if (this.isCadastroAvalista && this.renda.empreendedorOrAssalariado) {
        restritivos.push(new RestritivoItem('NOME DA EMPRESA', this.ocupacao.nomeEmpresa == null))
        restritivos.push(new RestritivoItem('FUNÇÃO NA EMPRESA', this.ocupacao.funcaoEmpresa == null))
      }
    }
  }

  toRestritivoItemDadosBancarios(restritivos: RestritivoItem[]): void {
    if (this.conta) {
      restritivos.push(new RestritivoItem('TIPO CONTA', this.conta.tipoConta == null));
      restritivos.push(new RestritivoItem('INSTITUIÇÃO FINANCEIRA', this.conta.codigoBanco == null));

      if (this.conta.tipoConta === TipoContaEnum.CONTA_CORRENTE.nome || this.conta.tipoConta === TipoContaEnum.CONTA_POUPANCA.nome) {
        restritivos.push(new RestritivoItem('CODIGO BANCO', this.conta.codigoBanco == null));
        restritivos.push(new RestritivoItem('AGENCIA', this.conta.agencia == null));
        restritivos.push(new RestritivoItem('CONTA CORRENTE', this.conta.contaCorrente == null));
        if (this.conta.isCaixaEconomica) {
          restritivos.push(new RestritivoItem('OPERAÇÃO', this.conta.operacao == null));
        }
      }
      if (this.conta.tipoConta === TipoContaEnum.PIX_EMAIL.nome) {
        restritivos.push(new RestritivoItem('PIX E-MAIL', this.conta.pixEmail == null));
      }
      if (this.conta.tipoConta == TipoContaEnum.PIX_CPF.nome) {
        restritivos.push(new RestritivoItem('PIX CPF', this.conta.pixCpf == null));
      }
      if (this.conta.tipoConta == TipoContaEnum.PIX_TELEFONE.nome) {
        restritivos.push(new RestritivoItem('PIX TELEFONE', this.conta.pixTelefone == null));
      }
    } else {
      restritivos.push(new RestritivoItem('DADOS BANCÁRIOS', !this.conta));
    }
  }

  toRestritivoItemEndereco(restritivos: RestritivoItem[], tipoEndereco: string): void {
    let endereco: Localizacao;
    let abreviaturaDescricaoEndereco: string;
    let descricaoEndereco: string;
    if (tipoEndereco === TipoEnderecoEnum.RESIDENCIAL.nome) {
      endereco = this.enderecoResidencial
      abreviaturaDescricaoEndereco = 'END. RES.'
      descricaoEndereco = 'ENDEREÇO RESESIDENCIAL';
    } else {
      endereco = this.enderecoComercial;
      abreviaturaDescricaoEndereco = 'END. COM';
      descricaoEndereco = 'ENDEREÇO COMERCIAL';
    }

    if (endereco == null) {
      restritivos.push(new RestritivoItem(descricaoEndereco, endereco == null));
    } else {
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' TIPO COMPROVANTE', endereco.tipoComprovante == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' DATA COMPROVANTE', endereco.dataComprovante == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' CEP', endereco.cep == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' LOGRADOURO', endereco.logradouro == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' NÚMERO', endereco.numero == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' UF', endereco.uf == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' CIDADE', endereco.cidade == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' BAIRRO', endereco.bairro == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' TEMPO UTILIZAÇÃO', endereco.tempoUtilizacao == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' ENDEREÇO CORRESPONDÊNCIA', endereco.enderecoCorrespondencia == null));
      restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' IMÓVEL PRÓPRIO', endereco.imovelProprio == null));
      if (tipoEndereco === TipoEnderecoEnum.RESIDENCIAL.nome) {
        restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' TIPO RESP. COMPROVANTE', endereco.tipoResponsavelComprovante == null));
        restritivos.push(new RestritivoItem(abreviaturaDescricaoEndereco + ' DETALHE IMÓVEL PRÓPRIO', endereco.detalheImovelProprio == null));
      }
    }

  }

  toRestritivoItemConjuge(restritivos: RestritivoItem[]): void {
    if (this.cpfConjuge == null || this.cpfConjuge == '' || this.nomeConjuge == null || this.nomeConjuge == '') {
      restritivos.push(new RestritivoItem('NOME CÔNJUGE', this.nomeConjuge == null));
      restritivos.push(new RestritivoItem('CPF CÔNJUGE', this.cpfConjuge == null || this.cpfConjuge == ''));
    }
  }

  toRestritivoItemTelefone(restritivos: RestritivoItem[]): void {
    if (this.telefoneMovel == null) {
      restritivos.push(new RestritivoItem('TELEFONE MÓVEL', this.telefoneMovel == null));
    } else {
      restritivos.push(new RestritivoItem('TELEFONE MÓVEL DDD', this.telefoneMovel.ddd == null));
      restritivos.push(new RestritivoItem('TELEFONE MÓVEL TELEFONE', this.telefoneMovel.telefone == null));
    }
  }

  toRestritivoItemIdentificacao(restritivos: RestritivoItem[]): void {
    if (this.identificacao == null) {
      restritivos.push(new RestritivoItem('IDENTIFICAÇÃO', this.identificacao == null));
    } else {
      restritivos.push(new RestritivoItem('TIPO IDENTIFICAÇÃO', this.identificacao.tipoIdentificacao == null));
      restritivos.push(new RestritivoItem('NÚMERO IDENTIFICAÇÃO', this.identificacao.numero == null));
      restritivos.push(new RestritivoItem('ORGÃO EXPEDIDOR', this.identificacao.idOrgaoExpedidor == null));
      restritivos.push(new RestritivoItem('DATA EXPEDIÇÃO', this.identificacao.dataExpedicao == null));

      if (this.identificacao.tipoIdentificacao === 'CNH') {
        restritivos.push(new RestritivoItem('DATA VALIDADE', this.identificacao.dataValidade == null));
        restritivos.push(new RestritivoItem('ESTADO EMISSOR', this.identificacao.estadoEmissor == null));

      }

      if (this.identificacao.tipoIdentificacao === 'CTPS') {
        restritivos.push(new RestritivoItem('NÚMERO SÉRIE', this.identificacao.numeroSerie == null));
      }
    }
  }

  toRestritivoItemArquivos(restritivos: RestritivoItem[]): void {
    try {
      const arquivos = this.arquivos.filter(arquivo => arquivo.assinatura === null)
      if (arquivos.length === 0) {
        restritivos.push(new RestritivoItem('DADOS DE CAPTURA', arquivos.length === 0))
      } else {
        console.log('é avalista? ', this.isCadastroAvalista)
        if (this.isCadastroAvalista) {
          DadosCapturaOpcaoEnum.valoresAvalista().filter(opcao => !opcao.opcional).forEach(dcOpcao => {
            restritivos.push(new RestritivoItem(dcOpcao.descricaoRestritivo,
              !arquivos.some(arquivo => arquivo.nome === dcOpcao.nome)))
          })
        } else {
          DadosCapturaOpcaoEnum.valores().filter(opcao => !opcao.opcional).forEach(dcOpcao => {
            restritivos.push(new RestritivoItem(dcOpcao.descricaoRestritivo,
              !arquivos.some(arquivo => arquivo.nome === dcOpcao.nome)))
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  toRestritivoItemRenda(restritivos: RestritivoItem[]): void {
    if (this.renda == null) {
      restritivos.push(new RestritivoItem('RENDA', true))
    } else {
      restritivos.push(new RestritivoItem('TIPO RENDA', this.renda.natureza == null))
      restritivos.push(new RestritivoItem('VALOR RENDA', this.renda.valorBruto == null))
      restritivos.push(new RestritivoItem('Nº DEPENDENTES', this.renda.quantidadeDependentes == null))
    }
  }

  get possuiRestritivo(): boolean {
    const restritivos = this.toRestritivoItemCadastroCompleto
    return restritivos.filter(r => r.possui).length > 0
  }

  get aptoParaParticiparProposta(): boolean {
    return (this.situacaoAtual === SituacaoClienteEnum.ATENDIMENTO_EM_CURSO.nome
        || this.situacaoAtual === SituacaoClienteEnum.CONTRATADO.nome
        || this.isCadastroAvalista)
      && !this.isArquivado;
  }

  get toRestritivoItemFluxoCaixa(): RestritivoItem[] {
    let restritivos: RestritivoItem[] = [];

    if (this.fluxoCaixa == null || this.fluxoCaixa.recebimentoVendas == null) {
      restritivos.push(new RestritivoItem('FLUXO CAIXA', this.fluxoCaixa == null));
    } else {
      restritivos.push(new RestritivoItem('RECEBIMENTO VENDAS', this.fluxoCaixa.recebimentoVendas == 0));
      restritivos.push(new RestritivoItem('RECEITA NÃO OPERACIONAL', this.fluxoCaixa.receitaNaoOperacional == null));
      restritivos.push(new RestritivoItem('PAGAMENTO PESSOAL', this.fluxoCaixa.pagamentoPessoal == null));
      restritivos.push(new RestritivoItem('TRANSPORTE', this.fluxoCaixa.transporte == null));
      restritivos.push(new RestritivoItem('ÁGUA, LUZ, GAS', this.fluxoCaixa.aguaLuzGas == null));
      restritivos.push(new RestritivoItem('INTERNET/CELULAR', this.fluxoCaixa.internetCelular == null));
      restritivos.push(new RestritivoItem('TAXA ALUGUEL', this.fluxoCaixa.taxaAluguel == null));
      restritivos.push(new RestritivoItem('OUTROS CUSTOS', this.fluxoCaixa.outrosCustos == null));
      restritivos.push(new RestritivoItem('CAPACIDADE MENSAL REAL NEGATIVA', this.fluxoCaixa.capacidadePagamentoReal <= 0));
      restritivos.push(new RestritivoItem('LUCRO OPERACIONAL', this.fluxoCaixa.lucroOperacional <= 0));
    }

    return restritivos;
  }

  //TODO: validar hoje
  get necessidadeDeCapitalDeGiro(): number {
    if (this.ocupacao == null) return 0;
    if (this.ocupacao.descricaoSetor !== SetorEnum.SERVICO.descricao) {
      return (this.avaliacaoPatrimonial.estoques + this.avaliacaoPatrimonial.contasReceber) - this.avaliacaoPatrimonial.fornecedores;
    } else {
      return this.fluxoCaixa.custoOperacional
    }
  }

  get possuiDadosCaptura(): boolean {
    return (this.arquivos != null && this.arquivos.filter(arquivo => arquivo.tipoDadosCaptura).length !== 0);
  }

  get referencia1GrauVinculo(): string {
    return this.referencias[0].grauVinculo
  }

  set referencia1GrauVinculo(valor: string) {
    this.referencias[0].grauVinculo = valor
  }

  get referencia1Nome(): string {
    return this.referencias[0].nome
  }

  set referencia1Nome(valor: string) {
    this.referencias[0].nome = valor
  }

  get referencia1ddd(): string {
    return this.referencias[0].ddd
  }

  set referencia1ddd(valor: string) {
    this.referencias[0].ddd = valor
  }

  get referencia1Telefone(): string {
    return this.referencias[0].telefone
  }

  set referencia1Telefone(valor: string) {
    this.referencias[0].telefone = valor
  }

  get referencia2GrauVinculo(): string {
    return this.referencias[1].grauVinculo
  }

  set referencia2GrauVinculo(valor: string) {
    this.referencias[1].grauVinculo = valor
  }

  get referencia2Nome(): string {
    return this.referencias[1].nome
  }

  set referencia2Nome(valor: string) {
    this.referencias[1].nome = valor
  }

  get referencia2ddd(): string {
    return this.referencias[1].ddd
  }

  set referencia2ddd(valor: string) {
    this.referencias[1].ddd = valor
  }

  get referencia2Telefone(): string {
    return this.referencias[1].telefone
  }

  set referencia2Telefone(valor: string) {
    this.referencias[1].telefone = valor
  }

  get ultimoAtendimento(): HistoricoAtendidmentoCliente {
    this.historicoDeAtendimento.sort((a, b) => {
      if (a.dataAtendimento > b.dataAtendimento) {
        return 1;
      }
      if (a.dataAtendimento < b.dataAtendimento) {
        return -1;
      }
      return 0;
    });
    return this.historicoDeAtendimento.reverse()[0];
  }

  get dsObjetivoDoCredito(): string {
    try {
      return ObjetivoDoCreditoEnum.parse(this.objetivoDoCredito).descricao;
    } catch (err) {
      console.log(err)
      return '';
    }
  }

  get temConjugue(): boolean {
    return EstadoCivilEnum.temConjugue(this.estadoCivil);
  }

  get diasAguardandoDocumento(): number {
    if (this.situacaoAtual === SituacaoClienteEnum.AGUARDANDO_DOCUMENTOS.nome) {
      return AppUtils.diferencaEntreDias(AppUtils.HOJE, AppUtils.millisecondsToDate(this.ultimoAtendimento.dataAtendimento))
    } else {
      return 0
    }
  }

  get podeRegistrarAtendimento(): boolean {
    return (SituacaoClienteEnum.valores().find(
          situacaoCliente => situacaoCliente.nome === this.situacaoAtual)
      ).registraAtendimento
      && !this.isCadastroAvalista
      && !this.isArquivado
  }

  get isCadastroAvalista(): boolean {
    if (this.cadastroAvalista == null) return false;
    return this.cadastroAvalista === LogicoEnum.SIM.nome;
  }

  get isArquivado(): boolean {
    if (this.arquivado == null) return false;
    return this.arquivado === LogicoEnum.SIM.nome;
  }

  get podeConsultarSpc(): boolean {
    return (this.situacaoAtual === SituacaoClienteEnum.ATENDIMENTO_EM_CURSO.nome || this.isCadastroAvalista) && this.cpfCnpj != null;
  }

  get podeConsultarCursos(): boolean {
    return this.cpfCnpj != null;
  }

  get isPensionistaAposentado(): boolean {
    if (this.renda.natureza == null) return false;
    return this.renda.natureza === TipoRendaEnum.APOSENTADO_PENSIONISTA.nome;

  }

  get dscSituacaoAtual(): string {
    return SituacaoClienteEnum.parse(this.situacaoAtual).descricao
  }

  get isPF(): boolean {
    return this.tipoPessoa === TipoPessoaEnum.FISICA.nome;
  }

  get cadastroCompletoHabilitado(): boolean {
    return this.situacaoAtual !== SituacaoClienteEnum.DISTRIBUIDO.nome || this.isCadastroAvalista
  }

  /*END  GETTERS and SETTERS*/
}
