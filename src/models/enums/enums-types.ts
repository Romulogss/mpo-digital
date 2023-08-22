import {
  AcaoBotoesOpcoes,
  CapacidadeCivel,
  DadoBasico,
  DadosCapturaOpcao,
  DetalheImovelProprio,
  DetalheSituacaoCliente,
  Entidade,
  EstadoCivil,
  FaixaEtaria,
  FinalidadeProposta,
  GrauInstrucao,
  GrauReferenciaResponsavelImovel,
  GrauVinculo,
  Logico,
  Nacionalidade,
  ObjetivoDoCredito,
  Setor,
  Sexo,
  SituacaoCliente,
  SituacaoProposta,
  SituacaoVisita,
  TipoAplicacaoCredito,
  TipoArquivo,
  TipoBotoesOpcoes,
  TipoCheckList,
  TipoComprovanteResidencia,
  TipoConta,
  TipoEndereco,
  TipoIdentificacao,
  TipoLocalizacao,
  TipoOcupacao,
  TipoPessoa,
  TipoRenda,
  TipoResidencia,
  TipoTelefone,
  TipoVideo,
  TipoVisaoRegiaAtuacao,
  TipoVisita,
  VigenciaCarteiraMilitar
} from "../interfaces/dados-basicos";

export class SituacaoClienteEnum {
  static DISTRIBUIDO: SituacaoCliente = {
    id: 1,
    descricao: "Distribuído",
    nome: "DISTRIBUIDO",
    automatica: true,
    registraAtendimento: true
  };
  static ATENDIDO_NAO_FINANCIADO: SituacaoCliente = {
    id: 2,
    descricao: "Atendido não financiado",
    nome: "ATENDIDO_NAO_FINANCIADO",
    automatica: true,
    registraAtendimento: true
  }
  static AGUARDANDO_DOCUMENTOS: SituacaoCliente = {
    id: 3,
    descricao: "Aguardando documentos",
    nome: "AGUARDANDO_DOCUMENTOS",
    automatica: false,
    registraAtendimento: true
  }
  static ATENDIMENTO_EM_CURSO: SituacaoCliente = {
    id: 4,
    descricao: "Atendimento em curso",
    nome: "ATENDIMENTO_EM_CURSO",
    automatica: false,
    registraAtendimento: true
  }
  static DESISTENCIA: SituacaoCliente = {
    id: 5,
    descricao: "Desistência",
    nome: "DESISTENCIA",
    automatica: true,
    registraAtendimento: true
  }
  static CONTRATADO: SituacaoCliente = {
    id: 6,
    descricao: "Contratado",
    nome: "CONTRATADO",
    automatica: true,
    registraAtendimento: true
  }
  static AGUARDANDO_DISTRIBUICAO: SituacaoCliente = {
    id: 7,
    descricao: "Aguardando distribuição",
    nome: "AGUARDANDO_DISTRIBUICAO",
    automatica: true,
    registraAtendimento: false
  }
  static FORA_DO_PERFIL: SituacaoCliente = {
    id: 8,
    descricao: "Cliente não atende requisitos",
    nome: "FORA_DO_PERFIL",
    automatica: false,
    registraAtendimento: true
  }
  static INICIADO_NAO_ATENDIDO: SituacaoCliente = {
    id: 9,
    descricao: "Iniciado atendimento, mas cliente não atendido",
    nome: "INICIADO_NAO_ATENDIDO",
    automatica: false,
    registraAtendimento: true
  }
  static TENTATIVA_ATENDIMENTO: SituacaoCliente = {
    id: 10,
    descricao: "Iniciado atendimento, não atendido",
    nome: "TENTATIVA_ATENDIMENTO",
    automatica: false,
    registraAtendimento: true
  }

  static DESARQUIVADO: SituacaoCliente = {
    id: 11,
    descricao: "Desarquivado",
    nome: "DESARQUIVADO",
    automatica: false,
    registraAtendimento: true
  }

  static DESCONHECIDO: SituacaoCliente = {
    id: 12,
    descricao: 'Não reconhecido na importação do Ceara Credi',
    nome: 'DESCONHECIDO',
    automatica: false,
    registraAtendimento: true
  }

  protected static _valores: SituacaoCliente[] = [
    SituacaoClienteEnum.DISTRIBUIDO,
    SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO,
    SituacaoClienteEnum.AGUARDANDO_DOCUMENTOS,
    SituacaoClienteEnum.ATENDIMENTO_EM_CURSO,
    SituacaoClienteEnum.DESISTENCIA,
    SituacaoClienteEnum.CONTRATADO,
    SituacaoClienteEnum.AGUARDANDO_DISTRIBUICAO,
    SituacaoClienteEnum.FORA_DO_PERFIL,
    SituacaoClienteEnum.INICIADO_NAO_ATENDIDO,
    SituacaoClienteEnum.TENTATIVA_ATENDIMENTO,
    SituacaoClienteEnum.DESARQUIVADO,
    SituacaoClienteEnum.DESCONHECIDO
  ];

  public static valores(): SituacaoCliente[] {
    return SituacaoClienteEnum._valores;
  }

  public static parse(nome: string): SituacaoCliente {
    return SituacaoClienteEnum.valores().find(situacao => situacao.nome === nome)!;
  }
}

export class DetalheSituacaoClienteEnum {
  static DISTRIBUIDO: DetalheSituacaoCliente = {
    id: 0,
    descricao: "Distribuído",
    nome: "DISTRIBUIDO",
    situacao: SituacaoClienteEnum.DISTRIBUIDO.nome
  }
  static NAO_RECONHECE_INSCRICAO: DetalheSituacaoCliente = {
    id: 1,
    descricao: "Não reconhece a inscrição",
    nome: "NAO_RECONHECE_INSCRICAO",
    situacao: SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO.nome
  };
  static DESISTIU: DetalheSituacaoCliente = {
    id: 2,
    descricao: "Desistiu",
    nome: "DESISTIU",
    situacao: SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO.nome
  }
  static NAO_LOCALIZADO: DetalheSituacaoCliente = {
    id: 3,
    descricao: "Não localizado",
    nome: "NAO_LOCALIZADO",
    situacao: SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO.nome
  }
  static RESIDENTE_OUTRO_ESTADO: DetalheSituacaoCliente = {
    id: 4,
    descricao: "Residente em outro estado",
    nome: "RESIDENTE_OUTRO_ESTADO",
    situacao: SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO.nome
  }
  static DOCUMENTOS_NAO_ENTREGUE: DetalheSituacaoCliente = {
    id: 6,
    descricao: "Documentos não entregues",
    nome: "DOCUMENTOS_NAO_ENTREGUE",
    situacao: SituacaoClienteEnum.DESISTENCIA.nome
  }
  static PERFIL_APTO: DetalheSituacaoCliente = {
    id: 7,
    descricao: 'Perfil apto para atendimento',
    nome: 'PERFIL_APTO',
    situacao: SituacaoClienteEnum.AGUARDANDO_DOCUMENTOS.nome
  }
  static DOCUMENTACAO_ENTREGUE: DetalheSituacaoCliente = {
    id: 8,
    descricao: 'Documentos entregue e válidos',
    nome: 'DOCUMENTACAO_ENTREGUE',
    situacao: SituacaoClienteEnum.ATENDIMENTO_EM_CURSO.nome
  }
  static CREDITO_LIBERAD: DetalheSituacaoCliente = {
    id: 9,
    descricao: 'Crédito liberado',
    nome: 'CREDITO_LIBERADO',
    situacao: SituacaoClienteEnum.CONTRATADO.nome
  }
  static FATURAMENTO_ALTO: DetalheSituacaoCliente = {
    id: 10,
    descricao: 'Cliente com faturamento anual acima de R$ 81 mil',
    nome: 'FATURAMENTO_ALTO',
    situacao: SituacaoClienteEnum.FORA_DO_PERFIL.nome
  }
  static SALARIO_MINIMO: DetalheSituacaoCliente = {
    id: 11,
    descricao: 'Cliente com renda pessoal acima de 3 Salários Mínimos',
    nome: 'SALARIO_MINIMO',
    situacao: SituacaoClienteEnum.FORA_DO_PERFIL.nome
  }
  static FINALIDADE_DO_CREDITO: DetalheSituacaoCliente = {
    id: 12,
    descricao: 'Finalidade do crédito fora do perfil',
    nome: 'FINALIDADE_DO_CREDITO',
    situacao: SituacaoClienteEnum.FORA_DO_PERFIL.nome
  }
  static NAO_EMANCIPADO: DetalheSituacaoCliente = {
    id: 13,
    descricao: 'Cliente menor de 18 anos, não emancipado',
    nome: 'NAO_EMANCIPADO',
    situacao: SituacaoClienteEnum.FORA_DO_PERFIL.nome
  }
  static CAPACITACAO: DetalheSituacaoCliente = {
    id: 14,
    descricao: 'Aguardando capacitação',
    nome: 'CAPACITACAO',
    situacao: SituacaoClienteEnum.AGUARDANDO_DOCUMENTOS.nome
  }
  static AGUARDANDO_DISTRIBUICAO: DetalheSituacaoCliente = {
    id: 15,
    descricao: 'Aguardando Distribuição',
    nome: 'AGUARDANDO_DISTRIBUICAO',
    situacao: SituacaoClienteEnum.AGUARDANDO_DISTRIBUICAO.nome
  }
  static TENTATIVA_ATENDIMENTO: DetalheSituacaoCliente = {
    id: 16,
    descricao: 'Iniciado atendimento, não atendido',
    nome: 'TENTATIVA_ATENDIMENTO',
    situacao: SituacaoClienteEnum.TENTATIVA_ATENDIMENTO.nome
  }
  static ATENDIDO_NAO_FINANCIADO: DetalheSituacaoCliente = {
    id: 17,
    descricao: 'Atendido não financiado',
    nome: 'ATENDIDO_NAO_FINANCIADO',
    situacao: SituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO.nome
  }
  static INICIADO_NAO_ATENDIDO: DetalheSituacaoCliente = {
    id: 18,
    descricao: 'Iniciado atendimento, mas cliente não atendido',
    nome: 'INICIADO_NAO_ATENDIDO',
    situacao: SituacaoClienteEnum.INICIADO_NAO_ATENDIDO.nome
  }

  static DESARQUIVADO: DetalheSituacaoCliente = {
    id: 11,
    descricao: "Desarquivado",
    nome: "DESARQUIVADO",
    situacao: SituacaoClienteEnum.DESARQUIVADO.nome
  }

  static OUTROS: DetalheSituacaoCliente = {
    id: 12,
    descricao: "Outros",
    nome: "OUTROS",
    situacao: SituacaoClienteEnum.FORA_DO_PERFIL.nome
  }

  static DESCONHECIDO: DetalheSituacaoCliente = {
    id: 13,
    descricao: 'Não reconhecido na importação do Ceara Credi',
    nome: 'DESCONHECIDO',
    situacao: SituacaoClienteEnum.DESCONHECIDO.nome
  }

  protected static _valores: DetalheSituacaoCliente[] = [
    DetalheSituacaoClienteEnum.NAO_RECONHECE_INSCRICAO,
    DetalheSituacaoClienteEnum.DESISTIU,
    DetalheSituacaoClienteEnum.NAO_LOCALIZADO,
    DetalheSituacaoClienteEnum.RESIDENTE_OUTRO_ESTADO,
    DetalheSituacaoClienteEnum.DOCUMENTOS_NAO_ENTREGUE,
    DetalheSituacaoClienteEnum.PERFIL_APTO,
    DetalheSituacaoClienteEnum.DOCUMENTACAO_ENTREGUE,
    DetalheSituacaoClienteEnum.CREDITO_LIBERAD,
    DetalheSituacaoClienteEnum.DISTRIBUIDO,
    DetalheSituacaoClienteEnum.FATURAMENTO_ALTO,
    DetalheSituacaoClienteEnum.SALARIO_MINIMO,
    DetalheSituacaoClienteEnum.FINALIDADE_DO_CREDITO,
    DetalheSituacaoClienteEnum.NAO_EMANCIPADO,
    DetalheSituacaoClienteEnum.CAPACITACAO,
    DetalheSituacaoClienteEnum.AGUARDANDO_DISTRIBUICAO,
    DetalheSituacaoClienteEnum.TENTATIVA_ATENDIMENTO,
    DetalheSituacaoClienteEnum.ATENDIDO_NAO_FINANCIADO,
    DetalheSituacaoClienteEnum.INICIADO_NAO_ATENDIDO,
    DetalheSituacaoClienteEnum.DESARQUIVADO,
    DetalheSituacaoClienteEnum.OUTROS,
    DetalheSituacaoClienteEnum.DESCONHECIDO
  ]

  public static valores(): DetalheSituacaoCliente[] {
    return DetalheSituacaoClienteEnum._valores;
  }

  public static parse(nome: string): DetalheSituacaoCliente {
    return DetalheSituacaoClienteEnum.valores().find(detalhe => detalhe.nome === nome)!;
  }

}

export class TipoComprovanteResidenciaEnum {

  static CONTA_GAS: TipoComprovanteResidencia = {id: 1, nome: 'CONTA_GAS', descricao: 'Conta de Gás'};
  static CONTA_INTERNET: TipoComprovanteResidencia = {id: 2, nome: 'CONTA_INTERNET', descricao: 'Conta de Internet'};
  static CONTA_LUZ: TipoComprovanteResidencia = {id: 3, nome: 'CONTA_LUZ', descricao: 'Conta de Luz'};
  static CONTA_TELEFONE_FIXO: TipoComprovanteResidencia = {
    id: 4,
    nome: 'CONTA_TELEFONE_FIXO',
    descricao: 'Conta de Telefone Fixo'
  };
  static CONTA_TELEFONE_MOVEL: TipoComprovanteResidencia = {
    id: 5,
    nome: 'CONTA_TELEFONE_MOVEL',
    descricao: 'Conta de Telefone Móvel'
  };
  static CONTA_TV_POR_ASSINATURA: TipoComprovanteResidencia = {
    id: 6,
    nome: 'CONTA_TV_POR_ASSINATURA',
    descricao: 'Conta de TV por assinatura'
  };
  static CONTRATO_LOCACAO: TipoComprovanteResidencia = {
    id: 7,
    nome: 'CONTRATO_LOCACAO',
    descricao: 'Contrato de Locação'
  };
  static ESCRITURA_DO_IMOVEL: TipoComprovanteResidencia = {
    id: 8,
    nome: 'ESCRITURA_DO_IMOVEL',
    descricao: 'Escritura do Imóvel'
  };
  static EXTRATO_BANCARIO: TipoComprovanteResidencia = {id: 9, nome: 'EXTRATO_BANCARIO', descricao: 'Extrato Bancário'};
  static FATURA_CARTAO_CREDITO: TipoComprovanteResidencia = {
    id: 10,
    nome: 'FATURA_CARTAO_CREDITO',
    descricao: 'Fatura de Cartão Crédito'
  };
  static REGISTRO_IMOVEL: TipoComprovanteResidencia = {
    id: 11,
    nome: 'REGISTRO_IMOVEL',
    descricao: 'Registro do Imóvel'
  };
  static CONTA_AGUA: TipoComprovanteResidencia = {id: 12, nome: 'CONTA_AGUA', descricao: 'Conta de Água'};
  static NOTIF_RECIBO_DECLA_IR: TipoComprovanteResidencia = {
    id: 13,
    nome: 'NOTIF_RECIBO_DECLA_IR',
    descricao: 'Declaração de IR'
  };
  static DECL_PROPRIO_PUNHO: TipoComprovanteResidencia = {
    id: 14,
    nome: 'DECL_PROPRIO_PUNHO',
    descricao: 'Declaração Cliente'
  };
  static CERT_PROPRIEDADE_VEIC: TipoComprovanteResidencia = {
    id: 15,
    nome: 'CERT_PROPRIEDADE_VEIC',
    descricao: 'Certificado de Veiculo'
  };
  static RECIBO_DECLARACAO_IRPF: TipoComprovanteResidencia = {
    id: 16,
    nome: 'RECIBO_DECLARACAO_IRPF',
    descricao: 'Recibo de IR'
  };
  static DECLARACAO_TERCEIROS: TipoComprovanteResidencia = {
    id: 17,
    nome: 'DECLARACAO_TERCEIROS',
    descricao: 'Declaracao Terceiros'
  };
  static BOLETO_COBRANCA: TipoComprovanteResidencia = {
    id: 18,
    nome: 'BOLETO_COBRANCA',
    descricao: 'Declaração Boleto de Cobrança'
  };

  protected static _valores: TipoComprovanteResidencia[] = [
    TipoComprovanteResidenciaEnum.CONTA_GAS,
    TipoComprovanteResidenciaEnum.CONTA_INTERNET,
    TipoComprovanteResidenciaEnum.CONTA_LUZ,
    TipoComprovanteResidenciaEnum.CONTA_TELEFONE_FIXO,
    TipoComprovanteResidenciaEnum.CONTA_TELEFONE_MOVEL,
    TipoComprovanteResidenciaEnum.CONTA_TV_POR_ASSINATURA,
    TipoComprovanteResidenciaEnum.CONTRATO_LOCACAO,
    TipoComprovanteResidenciaEnum.ESCRITURA_DO_IMOVEL,
    TipoComprovanteResidenciaEnum.EXTRATO_BANCARIO,
    TipoComprovanteResidenciaEnum.FATURA_CARTAO_CREDITO,
    TipoComprovanteResidenciaEnum.CONTA_AGUA,
    TipoComprovanteResidenciaEnum.NOTIF_RECIBO_DECLA_IR,
    TipoComprovanteResidenciaEnum.DECL_PROPRIO_PUNHO,
    TipoComprovanteResidenciaEnum.CERT_PROPRIEDADE_VEIC,
    TipoComprovanteResidenciaEnum.RECIBO_DECLARACAO_IRPF,
    TipoComprovanteResidenciaEnum.DECLARACAO_TERCEIROS,
    TipoComprovanteResidenciaEnum.BOLETO_COBRANCA
  ];

  static valores(): TipoComprovanteResidencia[] {
    return TipoComprovanteResidenciaEnum._valores;
  }
}

export class TipoIdentificacaoEnum {

  static RG: TipoIdentificacao = {id: 1, nome: 'RG', descricao: 'RG'};
  static CNH: TipoIdentificacao = {id: 2, nome: 'CNH', descricao: 'Carteira Nacional de Habilitação'};
  static CTPS: TipoIdentificacao = {id: 3, nome: 'CTPS', descricao: 'Carteira de Trabalho'};
  static CARTEIRA_MILITAR: TipoIdentificacao = {id: 4, nome: 'CARTEIRA_MILITAR', descricao: 'Carteira militar'};
  static CARTEIRA_DE_CLASSE: TipoIdentificacao = {id: 5, nome: 'CARTEIRA_DE_CLASSE', descricao: 'Carteira de Classe'};
  static PASSAPORTE: TipoIdentificacao = {id: 6, nome: 'PASSAPORTE', descricao: 'Passaporte'};

  private static _valores: TipoIdentificacao[] = [
    TipoIdentificacaoEnum.RG,
    TipoIdentificacaoEnum.CNH,
    TipoIdentificacaoEnum.CTPS,
    TipoIdentificacaoEnum.CARTEIRA_MILITAR,
    TipoIdentificacaoEnum.CARTEIRA_DE_CLASSE,
    TipoIdentificacaoEnum.PASSAPORTE
  ];

  static valores(): TipoIdentificacao[] {
    return TipoIdentificacaoEnum._valores;
  }

}

export class GrauReferenciaResponsavelImovelEnum {

  static PROPRIO: GrauReferenciaResponsavelImovel = {id: 1, nome: 'PROPRIO', descricao: 'PRÓPRIO'};
  static FAMILIAR: GrauReferenciaResponsavelImovel = {id: 2, nome: 'FAMILIAR', descricao: 'FAMILIAR'};
  static AMIGOS: GrauReferenciaResponsavelImovel = {id: 3, nome: 'AMIGOS', descricao: 'AMIGOS'};

  protected static _valores: GrauReferenciaResponsavelImovel[] = [
    GrauReferenciaResponsavelImovelEnum.PROPRIO,
    GrauReferenciaResponsavelImovelEnum.FAMILIAR,
    GrauReferenciaResponsavelImovelEnum.AMIGOS
  ];

  static valores(): GrauReferenciaResponsavelImovel[] {
    return GrauReferenciaResponsavelImovelEnum._valores;
  }

}

export class SexoEnum {

  static MASCULINO: Sexo = {id: 1, nome: 'MASCULINO', descricao: 'Masculino'};
  static FEMININO: Sexo = {id: 2, nome: 'FEMININO', descricao: 'Feminino'};
  static NAO_INFORMADO: Sexo = {id: 3, nome: 'NAO_INFORMADO', descricao: 'Não informado'};

  protected static _valores: Sexo[] = [
    SexoEnum.MASCULINO,
    SexoEnum.FEMININO,
    SexoEnum.NAO_INFORMADO
  ];

  static valores(): Sexo[] {
    return SexoEnum._valores;
  }

}

export class GrauInstrucaoEnum {

  static ALFABETIZADO: GrauInstrucao = {
    id: 1,
    nome: 'ALFABETIZADO',
    descricao: 'Fiz somente a alfabetização'
  };
  static ANALFABETO: GrauInstrucao = {
    id: 2,
    nome: 'ANALFABETO',
    descricao: 'Não estudei. Não sei ler e escrever'
  };
  static ENSINO_FUNDAMENTAL_COMPLETO: GrauInstrucao = {
    id: 5,
    nome: 'ENSINO_FUNDAMENTAL_COMPLETO',
    descricao: 'Concluí o Primário/Ensino Fundamental'
  };
  static ENSINO_FUNDAMENTAL_1: GrauInstrucao = {
    id: 5,
    nome: 'ENSINO_FUNDAMENTAL_1',
    descricao: 'Estudei até o 2°, 3° ou 4° ano do Primário/Ensino Fundamental'
  };
  static ENSINO_FUNDAMENTAL_2: GrauInstrucao = {
    id: 5,
    nome: 'ENSINO_FUNDAMENTAL_2',
    descricao: 'Estudei até o 5°, 6°, 7° ou 8° ano do Primário/Ensino Fundamental'
  };
  // static ENSINO_FUNDAMENTAL_INCOMPLETO: GrauInstrucao = {
  //   id: 6,
  //   nome: 'ENSINO_FUNDAMENTAL_INCOMPLETO',
  //   descricao: 'ENSINO FUNDAMENTAL INCOMPLETO'
  // };
  static ENSINO_MEDIO_COMPLETO: GrauInstrucao = {
    id: 7,
    nome: 'ENSINO_MEDIO_COMPLETO',
    descricao: 'Concluí o Ensino Médio'
  };
  static ENSINO_MEDIO_INCOMPLETO: GrauInstrucao = {
    id: 8,
    nome: 'ENSINO_MEDIO_INCOMPLETO',
    descricao: 'Estudei no Ensino Médio, mas não concluí'
  };
  static SUPERIOR_COMPLETO: GrauInstrucao = {
    id: 13,
    nome: 'SUPERIOR_COMPLETO',
    descricao: 'Concluí o Ensino Superior/Faculdade'
  };
  static SUPERIOR_INCOMPLETO: GrauInstrucao = {
    id: 14,
    nome: 'SUPERIOR_INCOMPLETO',
    descricao: 'Cursei Ensino Superior/Faculdade mas não concluí'
  };

  protected static _valores: GrauInstrucao[] = [
    GrauInstrucaoEnum.ALFABETIZADO,
    GrauInstrucaoEnum.ANALFABETO,
    GrauInstrucaoEnum.ENSINO_FUNDAMENTAL_1,
    GrauInstrucaoEnum.ENSINO_FUNDAMENTAL_2,
    GrauInstrucaoEnum.ENSINO_FUNDAMENTAL_COMPLETO,
    GrauInstrucaoEnum.ENSINO_MEDIO_COMPLETO,
    GrauInstrucaoEnum.ENSINO_MEDIO_INCOMPLETO,
    GrauInstrucaoEnum.SUPERIOR_COMPLETO,
    GrauInstrucaoEnum.SUPERIOR_INCOMPLETO
  ];

  static valores(): GrauInstrucao[] {
    return GrauInstrucaoEnum._valores;
  }

}

export class EstadoCivilEnum {

  static CASADO: EstadoCivil = {id: 1, nome: 'CASADO', descricao: 'Casado(a)'};
  static AMIGADO: EstadoCivil = {id: 1, nome: 'AMIGADO', descricao: 'Amigado(a)'};
  static DESQUITADO: EstadoCivil = {id: 1, nome: 'DESQUITADO', descricao: 'DESQUITADO'};
  static DIVORCIADO: EstadoCivil = {id: 1, nome: 'DIVORCIADO', descricao: 'DIVORCIADO'};
  static SEPARADO: EstadoCivil = {id: 1, nome: 'SEPARADO', descricao: 'Separado(a)'};
  static SOLTEIRO: EstadoCivil = {id: 1, nome: 'SOLTEIRO', descricao: 'Solteiro(a)'};
  static UNIAO_ESTAVEL: EstadoCivil = {id: 1, nome: 'UNIAO_ESTAVEL', descricao: 'União estável'};
  static VIUVO: EstadoCivil = {id: 1, nome: 'VIUVO', descricao: 'Viúvo(a)'};

  protected static _valores: EstadoCivil[] = [
    EstadoCivilEnum.CASADO,
    EstadoCivilEnum.AMIGADO,
    EstadoCivilEnum.SEPARADO,
    EstadoCivilEnum.SOLTEIRO,
    EstadoCivilEnum.UNIAO_ESTAVEL,
    EstadoCivilEnum.VIUVO
  ];

  static valores(): EstadoCivil[] {
    return EstadoCivilEnum._valores;
  }

  static parse(nome: string): EstadoCivil {
    return EstadoCivilEnum.valores().find(estadoCivil => estadoCivil.nome === nome)!;
  }

  static temConjugue(nome: string): boolean {
    return nome === EstadoCivilEnum.CASADO.nome || nome === EstadoCivilEnum.AMIGADO.nome ||
      nome === EstadoCivilEnum.UNIAO_ESTAVEL.nome;
  }
}

export class CapacidadeCivelEnum {

  static CAPAZ: CapacidadeCivel = {id: 1, nome: 'CAPAZ', descricao: 'CAPAZ'};

  protected static _valores: CapacidadeCivel[] = [
    CapacidadeCivelEnum.CAPAZ
  ];

  static valores(): CapacidadeCivel[] {
    return CapacidadeCivelEnum._valores;
  }

}

export class NacionalidadeEnum {

  static BRASILEIRO: CapacidadeCivel = {id: 1, nome: 'BRASILEIRA', descricao: 'BRASILEIRA'};

  protected static _valores: Nacionalidade[] = [
    NacionalidadeEnum.BRASILEIRO
  ];

  static valores(): Nacionalidade[] {
    return NacionalidadeEnum._valores;
  }

}

export class TipoContaEnum {

  static CONTA_CORRENTE: TipoConta = {id: 1, nome: 'CONTA_CORRENTE', descricao: 'Conta Corrente'};
  static PIX_EMAIL: TipoConta = {id: 2, nome: 'PIX_EMAIL', descricao: 'PIX - E-mail'};
  static PIX_CPF: TipoConta = {id: 3, nome: 'PIX_CPF', descricao: 'PIX - CPF'};
  static PIX_TELEFONE: TipoConta = {id: 4, nome: 'PIX_TELEFONE', descricao: 'PIX - TELEFONE'};
  static CONTA_POUPANCA: TipoConta = {id: 6, nome: 'CONTA_POUPANCA', descricao: 'Conta Poupança'};

  protected static _valores: TipoConta[] = [
    TipoContaEnum.CONTA_CORRENTE,
    TipoContaEnum.CONTA_POUPANCA,
  ];

  static valores(): TipoConta[] {
    return TipoContaEnum._valores;
  }

}

export class SituacaoVisitaEnum {

  static PENDENTE: SituacaoVisita = {id: 1, nome: 'PENDENTE', descricao: 'Pendente'};
  static CONCLUIDA: SituacaoVisita = {id: 2, nome: 'CONCLUIDA', descricao: 'Concluída'};
  static CANCELADA: SituacaoVisita = {id: 3, nome: 'CANCELADA', descricao: 'Cancelada'};

  protected static _valores: SituacaoVisita[] = [
    SituacaoVisitaEnum.PENDENTE,
    SituacaoVisitaEnum.CONCLUIDA,
    SituacaoVisitaEnum.CANCELADA
  ];

  static valores(): SituacaoVisita[] {
    return SituacaoVisitaEnum._valores;
  }

}

export class TipoVisitaEnum {

  static PROSPECCAO: TipoVisita = {id: 1, nome: 'PROSPECCAO', descricao: 'Prospecção', cor: 'green'};
  static VISITA_PREVIA: TipoVisita = {id: 2, nome: 'VISITA_PREVIA', descricao: 'Visita Prévia', cor: 'blue'};
  static CONSTITUICAO: TipoVisita = {id: 3, nome: 'CONSTITUICAO', descricao: 'Reunião', cor: 'yellow'};
  static ACOMPANHAMENTO: TipoVisita = {id: 5, nome: 'ACOMPANHAMENTO', descricao: 'Acompanhamento', cor: 'orange'};
  static COBRANCA: TipoVisita = {id: 6, nome: 'COBRANCA', descricao: 'Cobrança', cor: 'grey'};
  static RENOVACAO: TipoVisita = {id: 7, nome: 'RENOVACAO', descricao: 'Renovação', cor: 'violet'};
  static EVENTO: TipoVisita = {id: 8, nome: 'EVENTO', descricao: 'Evento', cor: 'purple'};
  static FORMALIZACAO: TipoVisita = {id: 9, nome: 'FORMALIZACAO', descricao: 'Formalização em campo', cor: 'black'};

  protected static _valores: TipoVisita[] = [
    TipoVisitaEnum.PROSPECCAO,
    TipoVisitaEnum.VISITA_PREVIA,
    TipoVisitaEnum.CONSTITUICAO,
    TipoVisitaEnum.ACOMPANHAMENTO,
    TipoVisitaEnum.COBRANCA,
    TipoVisitaEnum.RENOVACAO,
    TipoVisitaEnum.EVENTO,
    TipoVisitaEnum.FORMALIZACAO,
  ];

  static valores(): TipoVisita[] {
    return TipoVisitaEnum._valores;
  }

  static parse(nome: string): TipoVisita {
    return TipoVisitaEnum.valores().find(it => it.nome == nome)!;
  }

}

export class TipoVideoEnum {

  static COMERCIAL: TipoVideo = {id: 2, nome: 'COMERCIAL', descricao: 'Comercial'};
  static TREINAMENTO: TipoVideo = {id: 1, nome: 'TREINAMENTO', descricao: 'Treinamento'};

  protected static _valores: TipoVideo[] = [
    TipoVideoEnum.COMERCIAL,
    TipoVideoEnum.TREINAMENTO
  ];

  static valores(): TipoVideo[] {
    return TipoVideoEnum._valores;
  }

  static parse(nome: string): TipoVideo {
    return TipoVideoEnum.valores().find(it => it.nome == nome)!;
  }

}

export class TipoVisaoRegiaAtuacaoEnum {

  static CARTEIRA: TipoVisaoRegiaAtuacao = {id: 1, nome: 'CARTEIRA', descricao: 'Carteira de Clientes'};
  static AGENDA: TipoVisaoRegiaAtuacao = {id: 2, nome: 'AGENDA', descricao: 'Agenda de Visitas'};

  protected static _valores: TipoVisaoRegiaAtuacao[] = [
    TipoVisaoRegiaAtuacaoEnum.CARTEIRA,
    TipoVisaoRegiaAtuacaoEnum.AGENDA
  ];

  static valores(): TipoVisaoRegiaAtuacao[] {
    return TipoVisaoRegiaAtuacaoEnum._valores;
  }

  static parse(nome: string): TipoVisaoRegiaAtuacao {
    return TipoVisaoRegiaAtuacaoEnum.valores().find(it => it.nome == nome)!;
  }

}

export class DetalheImovelProprioEnum {

  static PROPRIO: DetalheImovelProprio = {
    id: 1,
    nome: 'PROPRIO',
    descricao: 'Próprio',
    imovelProprio: 'SIM'
  };
  static ALUGADO: DetalheImovelProprio = {id: 3, nome: 'ALUGADO', descricao: 'Alugado', imovelProprio: 'NAO'};
  static FAMILIAR: DetalheImovelProprio = {
    id: 4,
    nome: 'FAMILIAR',
    descricao: 'Compartilhado com outra família',
    imovelProprio: 'NAO'
  };
  static CEDITO: DetalheImovelProprio = {id: 5, nome: 'CEDITO', descricao: 'Cedido', imovelProprio: 'NAO'};

  protected static _valores: DetalheImovelProprio[] = [
    DetalheImovelProprioEnum.PROPRIO,
    DetalheImovelProprioEnum.ALUGADO,
    DetalheImovelProprioEnum.FAMILIAR,
    DetalheImovelProprioEnum.CEDITO
  ];

  static valores(): DetalheImovelProprio[] {
    return DetalheImovelProprioEnum._valores;
  }

  static parse(nome: string): DetalheImovelProprio {
    return DetalheImovelProprioEnum.valores().find(it => it.nome == nome)!;
  }

}

export class SituacaoPropostaEnum {
  static EE: SituacaoProposta = {id: 0, nome: 'EE', descricao: 'Em elaboração', estilo: 'pendente', editavel: true};
  static PE: SituacaoProposta = {id: 1, nome: 'PE', descricao: 'Pendente', estilo: 'pendente', editavel: false};
  static NE: SituacaoProposta = {id: 2, nome: 'NE', descricao: 'Negada', estilo: 'negado', editavel: true};
  static AP: SituacaoProposta = {id: 3, nome: 'AP', descricao: 'Aprovada', estilo: 'aprovado', editavel: false};
  static CA: SituacaoProposta = {
    id: 10,
    nome: 'CA',
    descricao: 'Cancelamento Automático',
    estilo: 'negado',
    editavel: false
  };
  static CE: SituacaoProposta = {
    id: 10,
    nome: 'CE',
    descricao: 'Cancelamento em Elaboração',
    estilo: 'negado',
    editavel: false
  };

  protected static _valores: SituacaoProposta[] = [
    SituacaoPropostaEnum.EE,
    SituacaoPropostaEnum.PE,
    SituacaoPropostaEnum.NE,
    SituacaoPropostaEnum.AP,
    SituacaoPropostaEnum.CA,
    SituacaoPropostaEnum.CE
  ];

  static valores(): SituacaoProposta[] {
    return SituacaoPropostaEnum._valores;
  }

  static parse(nome: string): SituacaoProposta {
    return SituacaoPropostaEnum.valores().find(it => it.nome == nome)!;
  }
}

export class TipoCheckListEnum {
  static ACO: TipoCheckList = {id: 0, nome: 'ACO', descricao: 'Análise Cadastro - OSCIP'};
  static ACT: TipoCheckList = {id: 1, nome: 'ACT', descricao: 'Análise Comitê - OSCIP'};
  static ACI: TipoCheckList = {id: 2, nome: 'ACI', descricao: 'Análise - Instituição Financeira'};
  static AFO: TipoCheckList = {id: 3, nome: 'AFO', descricao: 'Análise Formalização'};
  static CAV: TipoCheckList = {id: 4, nome: 'CAV', descricao: 'Cancelamento Automático por Vencimento'};

  protected static _valores: TipoCheckList[] = [
    TipoCheckListEnum.ACO,
    TipoCheckListEnum.ACT,
    TipoCheckListEnum.ACI,
    TipoCheckListEnum.AFO,
    TipoCheckListEnum.CAV,
  ];

  static valores(): TipoCheckList[] {
    return TipoCheckListEnum._valores;
  }

  static parse(nome: string): TipoCheckList {
    return TipoCheckListEnum.valores().find(it => it.nome === nome)!;
  }
}

export class TipoBotoesOpcoesEnum {
  static PROPOSTA: TipoBotoesOpcoes = {id: 0, nome: 'PROPOSTA', descricao: 'Opções da proposta'};
  static PARTICIPANTE: TipoBotoesOpcoes = {id: 1, nome: 'PARTICIPANTE', descricao: 'Opções de participantes'};
  static PARTICIPANTE_RNG: TipoBotoesOpcoes = {
    id: 1,
    nome: 'PARTICIPANTE_RNG',
    descricao: 'Opções de participantes renegociação'
  };

  protected static _valores: TipoBotoesOpcoes[] = [
    TipoBotoesOpcoesEnum.PROPOSTA,
    TipoBotoesOpcoesEnum.PARTICIPANTE,
    TipoBotoesOpcoesEnum.PARTICIPANTE_RNG,
  ];

  static valores(): TipoBotoesOpcoes[] {
    return TipoBotoesOpcoesEnum._valores;
  }

  static parse(nome: string): TipoBotoesOpcoes {
    return TipoBotoesOpcoesEnum.valores().find(it => it.nome === nome)!;
  }
}

export class AcaoBotoesOpcoesEnum {
  static VISUALIZAR: AcaoBotoesOpcoes = {
    id: 0,
    nome: 'Visualizar',
    descricao: 'Visualizar',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static EDITAR: AcaoBotoesOpcoes = {
    id: 2,
    nome: 'Editar',
    descricao: 'Editar',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static CLONAR: AcaoBotoesOpcoes = {
    id: 3,
    nome: 'Clonar',
    descricao: 'Clonar',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static CHECKLIST: AcaoBotoesOpcoes = {
    id: 4,
    nome: 'Checklist',
    descricao: 'Checklist',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static RESTRITIVO: AcaoBotoesOpcoes = {
    id: 5,
    nome: 'Restritivo',
    descricao: 'Restritivo',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA, TipoBotoesOpcoesEnum.PARTICIPANTE]
  };
  static SINCRONIZAR: AcaoBotoesOpcoes = {
    id: 6,
    nome: 'Sincronizar',
    descricao: 'Sincronizando Proposta...',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static EXCLUIR: AcaoBotoesOpcoes = {
    id: 7,
    nome: 'Excluir',
    descricao: 'Excluir',
    tipoBotao: [TipoBotoesOpcoesEnum.PARTICIPANTE]
  };

  static MUDAR_COORDENADOR: AcaoBotoesOpcoes = {
    id: 7,
    nome: 'MUDAR_COORDENADOR',
    descricao: 'Alterar Coordenador',
    tipoBotao: [TipoBotoesOpcoesEnum.PARTICIPANTE_RNG]
  };
  static ENVIAR_CHECKLIST: AcaoBotoesOpcoes = {
    id: 8,
    nome: 'Enviar Checklist',
    descricao: 'Enviando Proposta para Análiase...',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };
  static CANCELAR: AcaoBotoesOpcoes = {
    id: 9,
    nome: 'Cancelar Proposta',
    descricao: 'Cancelando proposta...',
    tipoBotao: [TipoBotoesOpcoesEnum.PROPOSTA]
  };

  protected static _valores: AcaoBotoesOpcoes[] = [
    AcaoBotoesOpcoesEnum.SINCRONIZAR,
    AcaoBotoesOpcoesEnum.EDITAR,
    AcaoBotoesOpcoesEnum.CLONAR,
    AcaoBotoesOpcoesEnum.VISUALIZAR,
    AcaoBotoesOpcoesEnum.CHECKLIST,
    AcaoBotoesOpcoesEnum.RESTRITIVO,
    AcaoBotoesOpcoesEnum.EXCLUIR,
  ];

  static valores(): AcaoBotoesOpcoes[] {
    return AcaoBotoesOpcoesEnum._valores;
  }

  static parse(nome: string): AcaoBotoesOpcoes {
    return AcaoBotoesOpcoesEnum.valores().find(it => it.nome === nome)!;
  }
}

export class DadosCapturaOpcaoEnum {
  static FOTO_CLIENTE: DadosCapturaOpcao = {
    id: 0,
    nome: 'FOTO_CLIENTE',
    descricao: 'Foto do Cliente Portando Documento',
    descricaoRestritivo: 'FOTO CLIENTE',
    opcional: false
  };
  static DOCUMENTO_IDENTIFICACAO: DadosCapturaOpcao = {
    id: 1,
    nome: 'DOCUMENTO_IDENTIFICACAO',
    descricao: 'Documento de Identificação Frente',
    descricaoRestritivo: 'DOCUMENTO IDENTIFICAÇÃO',
    opcional: false
  };
  static DOCUMENTO_IDENTIFICACAO_VERSO: DadosCapturaOpcao = {
    id: 2,
    nome: 'DOCUMENTO_IDENTIFICACAO_VERSO',
    descricao: 'Documento de Identificação Verso',
    descricaoRestritivo: 'DOCUMENTO IDENTIFICAÇÃO VERSO',
    opcional: false
  };
  static CPF: DadosCapturaOpcao = {
    id: 3,
    nome: 'CPF',
    descricao: 'CPF',
    descricaoRestritivo: 'C.P.F',
    opcional: false
  };
  static COMPROVANTE_RESIDENCIA: DadosCapturaOpcao = {
    id: 4,
    nome: 'COMPROVANTE_RESIDENCIA',
    descricao: 'Comprovante de Residência',
    descricaoRestritivo: 'COMPROVANTE RESIDÊNCIA',
    opcional: false
  };

  static FOTO_EMPREENDIMENTO: DadosCapturaOpcao = {
    id: 5,
    nome: 'FOTO_EMPREENDIMENTO',
    descricao: 'Foto do Empreendimento',
    descricaoRestritivo: 'FOTO EMPREENDIMENTO',
    opcional: false
  };
  static DECLARACAO_RESIDENCIA: DadosCapturaOpcao = {
    id: 11,
    nome: 'DECLARACAO_RESIDENCIA',
    descricao: 'Declaração de Residência',
    descricaoRestritivo: 'DECLARAÇÃO RESIDÊNCIA',
    opcional: true
  };

  static PLANO_APLICACAO: DadosCapturaOpcao = {
    id: 12,
    nome: 'PLANO_DE_APLICACAO',
    descricao: 'Plano de aplicação',
    descricaoRestritivo: 'PLANO DE APLICAÇÃO',
    opcional: false
  }

  static CERTIFICADO_CURSO1: DadosCapturaOpcao = {
    id: 13,
    nome: 'CERTIFICADO_CURSO1',
    descricao: 'Prepare-se para conseguir o crédito!',
    descricaoRestritivo: 'CERTIFICADO DO CURSO 1',
    opcional: true
  }
  static CERTIFICADO_CURSO2: DadosCapturaOpcao = {
    id: 14,
    nome: 'CERTIFICADO_CURSO2',
    descricao: 'Aprenda a fazer planos de negócio',
    descricaoRestritivo: 'CERTIFICADO DO CURSO 2',
    opcional: true
  }
  static FOTO_EMPREENDIMENTO2: DadosCapturaOpcao = {
    id: 15,
    nome: 'FOTO_EMPREENDIMENTO2',
    descricao: 'Foto do Empreendimento 2',
    descricaoRestritivo: 'FOTO EMPREENDIMENTO',
    opcional: true
  };
  static FOTO_EMPREENDIMENTO3: DadosCapturaOpcao = {
    id: 16,
    nome: 'FOTO_EMPREENDIMENTO3',
    descricao: 'Foto do Empreendimento 3',
    descricaoRestritivo: 'FOTO EMPREENDIMENTO',
    opcional: true
  };
  static CERTIDAO_CASAMENTO: DadosCapturaOpcao = {
    id: 6,
    nome: 'CERTIDAO_CASAMENTO',
    descricao: 'Certidão de Casamento',
    descricaoRestritivo: 'CERTIDAO DE CASAMENTO',
    opcional: true
  };
  static CERTIDAO_OBITO: DadosCapturaOpcao = {
    id: 7,
    nome: 'CERTIDAO_OBITO',
    descricao: 'Certidão de Óbito',
    descricaoRestritivo: 'CERTIDAO DE ÓBITO',
    opcional: true
  };
  static AVERBACAO_DIVORCIO: DadosCapturaOpcao = {
    id: 8,
    nome: 'AVERBACAO_DIVORCIO',
    descricao: 'Averbação de Divórcio',
    descricaoRestritivo: 'AVERBAÇÃO DE DIVÓRCIO',
    opcional: true
  };
  static PROCURACAO: DadosCapturaOpcao = {
    id: 9,
    nome: 'PROCURACAO',
    descricao: 'Procuração',
    descricaoRestritivo: 'PROCURAÇÃO',
    opcional: true
  };
  static COMPROVANTE_DE_RENDA: DadosCapturaOpcao = {
    id: 10,
    nome: 'COMPROVANTE_DE_RENDA',
    descricao: 'Comprovante de renda',
    descricaoRestritivo: 'COMPROVANTE DE RENDA',
    opcional: true
  };
  static OUTROS: DadosCapturaOpcao = {
    id: 17,
    nome: 'OUTROS',
    descricao: 'Outros',
    descricaoRestritivo: 'Outros',
    opcional: true
  };

  protected static _valores: DadosCapturaOpcao[] = [
    DadosCapturaOpcaoEnum.FOTO_CLIENTE,
    DadosCapturaOpcaoEnum.DOCUMENTO_IDENTIFICACAO,
    DadosCapturaOpcaoEnum.DOCUMENTO_IDENTIFICACAO_VERSO,
    DadosCapturaOpcaoEnum.CPF,
    DadosCapturaOpcaoEnum.COMPROVANTE_RESIDENCIA,
    DadosCapturaOpcaoEnum.FOTO_EMPREENDIMENTO,
    DadosCapturaOpcaoEnum.COMPROVANTE_DE_RENDA,
    DadosCapturaOpcaoEnum.DECLARACAO_RESIDENCIA,
    DadosCapturaOpcaoEnum.PLANO_APLICACAO,
    DadosCapturaOpcaoEnum.CERTIFICADO_CURSO1,
    DadosCapturaOpcaoEnum.CERTIFICADO_CURSO2,
    DadosCapturaOpcaoEnum.FOTO_EMPREENDIMENTO2,
    DadosCapturaOpcaoEnum.FOTO_EMPREENDIMENTO3,
    DadosCapturaOpcaoEnum.CERTIDAO_CASAMENTO,
    DadosCapturaOpcaoEnum.CERTIDAO_OBITO,
    DadosCapturaOpcaoEnum.AVERBACAO_DIVORCIO,
    DadosCapturaOpcaoEnum.PROCURACAO,
    DadosCapturaOpcaoEnum.OUTROS,
  ];

  static valores(): DadosCapturaOpcao[] {
    DadosCapturaOpcaoEnum.COMPROVANTE_DE_RENDA.opcional = true;
    DadosCapturaOpcaoEnum.FOTO_EMPREENDIMENTO.opcional = false;
    return DadosCapturaOpcaoEnum._valores;
  }

  static valoresAvalista(): DadosCapturaOpcao[] {
    DadosCapturaOpcaoEnum.COMPROVANTE_DE_RENDA.opcional = false;
    DadosCapturaOpcaoEnum.FOTO_EMPREENDIMENTO.opcional = true;
    DadosCapturaOpcaoEnum.FOTO_CLIENTE.opcional = true;
    return [
      DadosCapturaOpcaoEnum.FOTO_CLIENTE,
      DadosCapturaOpcaoEnum.DOCUMENTO_IDENTIFICACAO,
      DadosCapturaOpcaoEnum.DOCUMENTO_IDENTIFICACAO_VERSO,
      DadosCapturaOpcaoEnum.CPF,
      DadosCapturaOpcaoEnum.COMPROVANTE_RESIDENCIA,
      DadosCapturaOpcaoEnum.COMPROVANTE_DE_RENDA,
      DadosCapturaOpcaoEnum.DECLARACAO_RESIDENCIA,
      DadosCapturaOpcaoEnum.CERTIDAO_CASAMENTO,
      DadosCapturaOpcaoEnum.CERTIDAO_OBITO,
      DadosCapturaOpcaoEnum.AVERBACAO_DIVORCIO,
      DadosCapturaOpcaoEnum.PROCURACAO,
      DadosCapturaOpcaoEnum.OUTROS,
    ]
  }

  static parse(nome: string): DadosCapturaOpcao {
    return DadosCapturaOpcaoEnum.valores().find(it => it.nome === nome)!;
  }
}

export class FaixaEtariaEnum {
  static $18_20: FaixaEtaria = {id: 1, descricao: "18-20", nome: "$18_20"}
  static $21_30: FaixaEtaria = {id: 2, descricao: "21-30", nome: "$21_30"}
  static $31_40: FaixaEtaria = {id: 3, descricao: "31-40", nome: "$31_40"}
  static $41_50: FaixaEtaria = {id: 4, descricao: "41-50", nome: "$41_50"}
  static $51_60: FaixaEtaria = {id: 5, descricao: "51-60", nome: "$51_60"}
  static $60_MAIS: FaixaEtaria = {id: 6, descricao: "60 ou mais", nome: "$60_MAIS"}

  protected static _valores: FaixaEtaria[] = [
    FaixaEtariaEnum.$18_20,
    FaixaEtariaEnum.$21_30,
    FaixaEtariaEnum.$31_40,
    FaixaEtariaEnum.$41_50,
    FaixaEtariaEnum.$51_60,
    FaixaEtariaEnum.$60_MAIS
  ]

  public static valores(): FaixaEtaria[] {
    return FaixaEtariaEnum._valores;
  }
}

export class TipoTelefoneEnum {

  static FIXO: TipoTelefone = {id: 1, nome: 'FIXO', descricao: 'Fixo'};
  static MOVEL: TipoTelefone = {id: 2, nome: 'CELULAR', descricao: 'Celular'};

  protected static _valores: TipoTelefone[] = [
    TipoTelefoneEnum.FIXO,
    TipoTelefoneEnum.MOVEL
  ];

  static valores(): TipoTelefone[] {
    return TipoTelefoneEnum._valores;
  }

}

export class TipoArquivoEnum {

  static PNG: TipoArquivo = {id: 1, nome: 'PNG', descricao: 'Portable Network Graphics', contentType: 'image/png'};
  static JPEG: TipoArquivo = {id: 2, nome: 'JPEG', descricao: 'JPEG images', contentType: 'image/jpeg'};
  static MPEG: TipoArquivo = {id: 2, nome: 'MPEG', descricao: 'MPEG Video', contentType: 'video/jpeg'};
  static JPG: TipoArquivo = {id: 2, nome: 'JPG', descricao: 'JPG images', contentType: 'image/jpg'};
  static PDF: TipoArquivo = {id: 2, nome: 'PDF', descricao: 'Adobe PDF', contentType: 'application/pdf'};

  protected static _valores: TipoArquivo[] = [
    TipoArquivoEnum.PNG,
    TipoArquivoEnum.JPEG,
    TipoArquivoEnum.JPG,
    TipoArquivoEnum.MPEG,
    TipoArquivoEnum.PDF
  ];

  static valores(): TipoArquivo[] {
    return TipoArquivoEnum._valores;
  }

}

export class TipoLocalizacaoEnum {

  static RESIDENCIAL: TipoLocalizacao = {id: 1, nome: 'RESIDENCIAL', descricao: 'Residencial'};
  static COMERCIAL: TipoLocalizacao = {id: 2, nome: 'COMERCIAL', descricao: 'Comercial'};

  protected static _valores: TipoLocalizacao[] = [
    TipoLocalizacaoEnum.RESIDENCIAL,
    TipoLocalizacaoEnum.COMERCIAL
  ];

  static valores(): TipoLocalizacao[] {
    return TipoLocalizacaoEnum._valores;
  }

}

export class TipoResidenciaEnum {

  static PROPRIO: TipoResidencia = {id: 1, nome: 'PROPRIA', descricao: 'Próprio', tipoEndereco: 'RESIDENCIAL'};
  static ALUGADO: TipoResidencia = {id: 2, nome: 'ALUGADO', descricao: 'Alugado', tipoEndereco: 'RESIDENCIAL'};
  static CEDIDO: TipoResidencia = {id: 3, nome: 'CEDIDO', descricao: 'Cedido', tipoEndereco: 'RESIDENCIAL'};
  static FAMILIARES: TipoResidencia = {id: 4, nome: 'FAMILIARES', descricao: 'Familiares', tipoEndereco: 'RESIDENCIAL'};
  static FINANCIADO: TipoResidencia = {id: 4, nome: 'FINANCIADO', descricao: 'Financiado', tipoEndereco: 'RESIDENCIAL'};
  static MOVEL: TipoResidencia = {id: 4, nome: 'MOVEL', descricao: 'Movel', tipoEndereco: 'COMERCIAL'};
  static FEIRA: TipoResidencia = {id: 4, nome: 'FEIRA', descricao: 'Feira', tipoEndereco: 'COMERCIAL'};
  static PONTO_COMERCIAL: TipoResidencia = {
    id: 4,
    nome: 'PONTO_COMERCIAL',
    descricao: 'Ponto Comercial',
    tipoEndereco: 'COMERCIAL'
  };

  protected static _valores: TipoResidencia[] = [
    TipoResidenciaEnum.PROPRIO,
    TipoResidenciaEnum.ALUGADO,
    TipoResidenciaEnum.CEDIDO,
    TipoResidenciaEnum.FAMILIARES,
    TipoResidenciaEnum.FINANCIADO,
    TipoResidenciaEnum.MOVEL,
    TipoResidenciaEnum.FEIRA,
    TipoResidenciaEnum.PONTO_COMERCIAL
  ];

  static valores(tipoEndereco: string): TipoResidencia[] {
    return TipoResidenciaEnum._valores.filter(it => it.tipoEndereco == tipoEndereco || it.tipoEndereco == null);
  }

}

export class LogicoEnum {

  static NAO: Logico = {id: 1, nome: 'NAO', descricao: 'NÃO'};
  static SIM: Logico = {id: 2, nome: 'SIM', descricao: 'SIM'};

  protected static _valores: Logico[] = [
    LogicoEnum.NAO,
    LogicoEnum.SIM
  ];

  static valores(): Logico[] {
    return LogicoEnum._valores;
  }

  static valorPorCondicao(condicao: boolean): string {
    return condicao ? LogicoEnum.SIM.nome : LogicoEnum.NAO.nome;
  }

}

export class TipoEnderecoEnum {

  static RESIDENCIAL: TipoEndereco = {id: 1, nome: 'RESIDENCIAL', descricao: 'Residencial', cor: 'blue'};
  static COMERCIAL: TipoEndereco = {id: 2, nome: 'COMERCIAL', descricao: 'Comercial', cor: 'yellow'};

  protected static _valores: TipoEndereco[] = [
    TipoEnderecoEnum.RESIDENCIAL,
    TipoEnderecoEnum.COMERCIAL
  ];

  static valores(): TipoEndereco[] {
    return TipoEnderecoEnum._valores;
  }

  static parse(nome: string): TipoEndereco {
    return TipoEnderecoEnum.valores().find(it => it.nome == nome)!;
  }

}

export class TipoPessoaEnum {

  static FISICA: TipoPessoa = {id: 1, nome: 'FISICA', descricao: 'Pessoa Física'};
  static JURIDICA: TipoPessoa = {id: 2, nome: 'JURIDICA', descricao: 'Pessoa Jurídica'};

  protected static _valores: TipoPessoa[] = [
    TipoPessoaEnum.FISICA,
    TipoPessoaEnum.JURIDICA
  ];

  static valores(): TipoPessoa[] {
    return TipoPessoaEnum._valores;
  }

  static parse(nome: string): TipoPessoa {
    return TipoPessoaEnum.valores().find(it => it.nome == nome)!;
  }

}

export class TipoAplicacaoCreditoEnum {

  static CAPITAL_GIRO: TipoPessoa = {id: 1, nome: 'CAPITAL_GIRO', descricao: 'Capital de Giro'};

  protected static _valores: TipoAplicacaoCredito[] = [
    TipoAplicacaoCreditoEnum.CAPITAL_GIRO
  ];

  static valores(): TipoAplicacaoCredito[] {
    return TipoAplicacaoCreditoEnum._valores;
  }

}

export class FinalidadePropostaEnum {

  static INICIAR: FinalidadeProposta = {id: 1, nome: 'INICIAR', descricao: 'Iniciar'};
  static MANTER: FinalidadeProposta = {id: 2, nome: 'MANTER', descricao: 'Manter'};
  static AMPLIAR: FinalidadeProposta = {id: 3, nome: 'AMPLIAR', descricao: 'Ampliar'};

  protected static _valores: FinalidadeProposta[] = [
    FinalidadePropostaEnum.INICIAR,
    FinalidadePropostaEnum.MANTER,
    FinalidadePropostaEnum.AMPLIAR
  ];

  static valores(): FinalidadeProposta[] {
    return FinalidadePropostaEnum._valores;
  }

}

export class SetorEnum {
  static COMERCIO: Setor = {id: 1, nome: 'COMERCIO', descricao: 'Comércio'}
  static SERVICO: Setor = {id: 2, nome: 'SERVICO', descricao: 'Serviços'}
  static INDUSTRIA: Setor = {id: 3, nome: 'INDUSTRIA', descricao: 'Produção'}

  protected static _valores: Setor[] = [
    SetorEnum.COMERCIO,
    SetorEnum.SERVICO,
    SetorEnum.INDUSTRIA
  ]

  public static valores(): Setor[] {
    return SetorEnum._valores;
  }
}

export class TipoOcupacaoEnum {
  static COOPERATIVA: TipoOcupacao = {
    id: 1,
    nome: 'COOPERATIVA',
    descricao: 'Cooperativa',
    tipoPessoa: TipoPessoaEnum.JURIDICA.nome
  };
  static AUTONOMO: TipoOcupacao = {
    id: 2,
    nome: 'AUTONOMO',
    descricao: 'Faço bicos - Sou trabalhados autônomo informal, prestador de serviço',
    tipoPessoa: TipoPessoaEnum.FISICA.nome
  };
  static DESEMPREGADO: TipoOcupacao = {
    id: 3,
    nome: 'DESEMPREGADO',
    descricao: 'Não tenho trabalho e/ou renda própria Dependo de outras pessoas',
    tipoPessoa: TipoPessoaEnum.FISICA.nome

  };
  static AGRICULTOR_FAMILIAR: TipoOcupacao = {
    id: 4,
    nome: 'AGRICULTOR_FAMILIAR',
    descricao: 'Sou agricultor familiar',
    tipoPessoa: TipoPessoaEnum.FISICA.nome
  };
  static INFORMAL: TipoOcupacao = {
    id: 5,
    nome: 'INFORMAL',
    descricao: 'Sou informal - Microempreendedor ou trabalhador autônomo',
    tipoPessoa: TipoPessoaEnum.FISICA.nome
  };
  static MEI: TipoOcupacao = {
    id: 6,
    nome: 'MEI',
    descricao: 'Sou MEI - Microempreendedor formal',
    tipoPessoa: TipoPessoaEnum.JURIDICA.nome
  };
  static ASSALARIADO: TipoOcupacao = {
    id: 7,
    nome: 'ASSALARIADO',
    descricao: 'Tenho trabalho assalariado formal (carteira assinada)',
    tipoPessoa: TipoPessoaEnum.FISICA.nome
  };
  static STARTUP: TipoOcupacao = {
    id: 8,
    nome: 'STARTUP',
    descricao: 'Startup',
    tipoPessoa: TipoPessoaEnum.JURIDICA.nome
  }

  private static _valores: TipoOcupacao[] = [
    TipoOcupacaoEnum.COOPERATIVA,
    TipoOcupacaoEnum.AUTONOMO,
    TipoOcupacaoEnum.DESEMPREGADO,
    TipoOcupacaoEnum.AGRICULTOR_FAMILIAR,
    TipoOcupacaoEnum.INFORMAL,
    TipoOcupacaoEnum.MEI,
    TipoOcupacaoEnum.ASSALARIADO,
    TipoOcupacaoEnum.STARTUP
  ]

  public static valores(): TipoOcupacao[] {
    return TipoOcupacaoEnum._valores;
  }

}

export class VigenciaCarteiraMilitarEnum {

  static INDETERMINADA: VigenciaCarteiraMilitar = {id: 1, nome: 'INDETERMINADA', descricao: 'Indeterminada'};
  static A_CERTO_TEMPO: VigenciaCarteiraMilitar = {id: 2, nome: 'A_CERTO_TEMPO', descricao: 'A certo tempo'};

  private static _valores: VigenciaCarteiraMilitar[] = [
    VigenciaCarteiraMilitarEnum.INDETERMINADA,
    VigenciaCarteiraMilitarEnum.A_CERTO_TEMPO
  ];

  static valores(): VigenciaCarteiraMilitar[] {
    return VigenciaCarteiraMilitarEnum._valores;
  }

}

export class GrauVinculoEnum {
  static AMIGO: GrauVinculo = {id: 1, nome: 'AMIGO', descricao: 'Amigo(a)'}
  static FAMILIAR: GrauVinculo = {id: 1, nome: 'FAMILIAR', descricao: 'Familiar'}

  private static _valores: GrauVinculo[] = [
    GrauVinculoEnum.AMIGO,
    GrauVinculoEnum.FAMILIAR,
  ]

  public static valores(): GrauVinculo[] {
    return GrauVinculoEnum._valores;
  }
}

export class ObjetivoDoCreditoEnum {
  static AMPLIACAO_DO_NEGOCIO: ObjetivoDoCredito = {
    id: 1,
    nome: 'AMPLIACAO_DO_NEGOCIO',
    descricao: 'Ampliação do negócio'
  }
  static NOVO_NEGOCIO: ObjetivoDoCredito = {
    id: 1,
    nome: 'NOVO_NEGOCIO',
    descricao: 'Novo negócio'
  }

  private static _valores: ObjetivoDoCredito[] = [
    ObjetivoDoCreditoEnum.AMPLIACAO_DO_NEGOCIO,
    ObjetivoDoCreditoEnum.NOVO_NEGOCIO,
  ]

  public static valores(): ObjetivoDoCredito[] {
    return ObjetivoDoCreditoEnum._valores;
  }

  public static parse(nome: string): ObjetivoDoCredito {
    return ObjetivoDoCreditoEnum._valores.find(objetivo => objetivo.nome === nome)!;
  }
}

export class ObjetivoDoCreditoModalidadeEnum {
  static AMPLIACAO: ObjetivoDoCredito = {
    id: 1,
    nome: 'AMPLIACAO',
    descricao: 'Ampliação do negócio'
  }
  static INICIO: ObjetivoDoCredito = {
    id: 1,
    nome: 'INICIO',
    descricao: 'Novo negócio'
  }

  private static _valores: ObjetivoDoCredito[] = [
    ObjetivoDoCreditoModalidadeEnum.AMPLIACAO,
    ObjetivoDoCreditoModalidadeEnum.INICIO,
  ]

  public static valores(): ObjetivoDoCredito[] {
    return ObjetivoDoCreditoModalidadeEnum._valores;
  }

  public static parse(nome: string): ObjetivoDoCredito {
    return ObjetivoDoCreditoModalidadeEnum._valores.find(objetivo => objetivo.nome === nome)!;
  }
}

export class TipoRendaEnum {
  static EMPREENDIMENTO: TipoRenda = {id: 1, nome: 'EMPREENDIMENTO', descricao: 'Empreendimento'}
  static ALUGUEL: TipoRenda = {id: 1, nome: 'ALUGUEL', descricao: 'Aluguel'}
  static ASSALARIADO: TipoRenda = {id: 1, nome: 'ASSALARIADO', descricao: 'Assalariado'}
  static CLIENTE: TipoRenda = {id: 1, nome: 'CLIENTE', descricao: 'Cliente CearáCredi'}
  static BOLSA_FAMILIA: TipoRenda = {id: 1, nome: 'BOLSA_FAMILIA', descricao: 'Bolsa Família'}
  static APOSENTADO_PENSIONISTA: TipoRenda = {
    id: 1,
    nome: 'APOSENTADO_PENSIONISTA',
    descricao: 'Aposentado e/ou Pensionista'
  }

  private static _valores: TipoRenda[] = [
    TipoRendaEnum.EMPREENDIMENTO,
    TipoRendaEnum.ALUGUEL,
    TipoRendaEnum.ASSALARIADO,
    TipoRendaEnum.CLIENTE,
    TipoRendaEnum.BOLSA_FAMILIA,
    TipoRendaEnum.APOSENTADO_PENSIONISTA
  ]

  static valores(): TipoRenda[] {
    return TipoRendaEnum._valores;
  }

  static parse(tipoRenda: string): TipoRenda {
    return TipoRendaEnum.valores().find(tipo => tipo.nome === tipoRenda)!;
  }
}


export class OperacaoSincronizacaoEnum {
  static ADD: DadoBasico = {id: 1, nome: 'add', descricao: 'Cadastrar no servidor'}
  static UPDATE: DadoBasico = {id: 2, nome: 'update', descricao: 'Atualizar no servidor'}
  static FETCH: DadoBasico = {id: 3, nome: 'fetch', descricao: 'Atualizar no app'}
  static REMOVE: DadoBasico = {id: 4, nome: 'remove', descricao: 'Remover'}

  static _valores: DadoBasico[] = [
    OperacaoSincronizacaoEnum.ADD,
    OperacaoSincronizacaoEnum.UPDATE,
    OperacaoSincronizacaoEnum.REMOVE,
    OperacaoSincronizacaoEnum.FETCH,
  ]

  static valores(): DadoBasico[] {
    return OperacaoSincronizacaoEnum._valores;
  }

  static isPostOrPut(operacao: DadoBasico): boolean {
    return operacao.nome === OperacaoSincronizacaoEnum.ADD.nome || operacao.nome === OperacaoSincronizacaoEnum.UPDATE.nome;
  }

  static isFetchOrRemove(operacao: DadoBasico): boolean {
    return operacao.nome === OperacaoSincronizacaoEnum.FETCH.nome || operacao.nome === OperacaoSincronizacaoEnum.REMOVE.nome;
  }

  static parse(nome: string): DadoBasico {
    return OperacaoSincronizacaoEnum.valores().find(op => op.nome === nome)!;
  }
}

export class EntidadesEnum {
  static ASSESSOR: Entidade = {id: 1, nome: 'assessor', descricao: 'Assessor'}
  static CLIENTE: Entidade = {id: 2, nome: 'cliente', descricao: 'Cliente', path: 'clientes'}
  static ARQUIVO: Entidade = {id: 3, nome: 'arquivo', descricao: 'Arquivo'}
  static VISITA: Entidade = {id: 4, nome: 'visita', descricao: 'Visita', path: 'visitas'}
  static MODALIDADE: Entidade = {id: 5, nome: 'modalidade', descricao: 'Modalidade'}
  static PLANO_PAGAMENTO: Entidade = {id: 6, nome: 'planoPagamento', descricao: 'Plano de Pagamento'}
  static EMPREENDIMENTO: Entidade = {id: 7, nome: 'empreendimento', descricao: 'Empreendimento'}
  static PROPOSTA: Entidade = {id: 8, nome: 'proposta', descricao: 'Proposta', path: 'propostas'}

  static _valores: Entidade[] = [
    EntidadesEnum.ASSESSOR,
    EntidadesEnum.CLIENTE,
    EntidadesEnum.ARQUIVO,
    EntidadesEnum.VISITA,
    EntidadesEnum.MODALIDADE,
    EntidadesEnum.PLANO_PAGAMENTO,
    EntidadesEnum.EMPREENDIMENTO,
    EntidadesEnum.PROPOSTA
  ]

  static valores(): Entidade[] {
    return EntidadesEnum._valores;
  }

  static valoresParaSincCliente(): Entidade[] {
    return [
      EntidadesEnum.CLIENTE,
      EntidadesEnum.ARQUIVO
    ]
  }

  static valoresParaSincProposta(): Entidade[] {
    return [
      EntidadesEnum.CLIENTE,
      EntidadesEnum.ARQUIVO,
      EntidadesEnum.PROPOSTA,
    ]
  }

  static valoresParaSincVisita(): Entidade[] {
    return [
      EntidadesEnum.ARQUIVO,
      EntidadesEnum.VISITA
    ]
  }

  static valoresParaSincGeral(): Entidade[] {
    return [
      EntidadesEnum.ASSESSOR,
      EntidadesEnum.MODALIDADE,
      EntidadesEnum.PLANO_PAGAMENTO,
      EntidadesEnum.EMPREENDIMENTO
    ]
  }

  static valoresSincIndividual(): Entidade[] {
    return [
      EntidadesEnum.CLIENTE,
      EntidadesEnum.VISITA,
      EntidadesEnum.PROPOSTA
    ]
  }

  static getValoresPorEntidade(entidade: Entidade): Entidade[] {
    switch (entidade.nome) {
      case EntidadesEnum.CLIENTE.nome:
        return EntidadesEnum.valoresParaSincCliente();
      case EntidadesEnum.PROPOSTA.nome:
        return EntidadesEnum.valoresParaSincProposta();
      case EntidadesEnum.VISITA.nome:
        return EntidadesEnum.valoresParaSincVisita();
      default:
        return EntidadesEnum.valoresParaSincGeral();
    }
  }

  static parse(nome: string): Entidade {
    return EntidadesEnum.valores().find(entidade => entidade.nome === nome)!;
  }
}

export class AcaoSincronizacaoEnum {
  static GET: DadoBasico = {id: 1, nome: 'GET', descricao: 'Trazer do servidor'}
  static PUT_APP: DadoBasico = {id: 2, nome: 'PUT_APP', descricao: 'Atualizar no aplicativo'}
  static PUT_SERVER: DadoBasico = {id: 3, nome: 'PUT_SERVER', descricao: 'Atualizar no servidor'}
  static POST: DadoBasico = {id: 4, nome: 'POST', descricao: 'Cadastrar no servidor'}

  static getDescricaoPorOperacao(operacao: DadoBasico): string {
    switch (operacao.nome) {
      case OperacaoSincronizacaoEnum.ADD.nome:
        return AcaoSincronizacaoEnum.POST.descricao;
      case OperacaoSincronizacaoEnum.UPDATE.nome:
        return AcaoSincronizacaoEnum.PUT_SERVER.descricao;
      case OperacaoSincronizacaoEnum.FETCH.nome:
        return AcaoSincronizacaoEnum.GET.descricao;
      default:
        return '';
    }
  }

}

export class TipoRenegociacaoEnum {
  static LIQUIDACAO: DadoBasico = {id: 1, nome: 'LIQUIDACAO', descricao: 'Liquidação Total'}
  static ASSUNCAO: DadoBasico = {id: 2, nome: 'ASSUNCAO', descricao: 'Assunção de Dívida'}
  static COMPOSICAO: DadoBasico = {id: 3, nome: 'COMPOSICAO', descricao: 'Composição de Dívida'}

  static _valores: DadoBasico[] = [
    TipoRenegociacaoEnum.LIQUIDACAO,
    TipoRenegociacaoEnum.ASSUNCAO,
    TipoRenegociacaoEnum.COMPOSICAO
  ]

  static valores(): DadoBasico[] {
    return TipoRenegociacaoEnum._valores;
  }

  static parse(nome: string): DadoBasico {
    return TipoRenegociacaoEnum.valores().find(tipo => tipo.nome === nome)!;
  }
}
