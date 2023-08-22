// noinspection ES6UnusedImports

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  CapacidadeCivel,
  DadosCapturaOpcao,
  DetalheSituacaoCliente,
  EstadoCivil,
  FaixaEtaria,
  FinalidadeProposta,
  GrauInstrucao, GrauVinculo,
  Logico,
  Nacionalidade,
  Resolucao,
  resolucoes,
  Setor,
  Sexo,
  SituacaoCliente,
  SituacaoVisita,
  TipoAplicacaoCredito,
  TipoArquivo,
  TipoComprovanteResidencia,
  TipoConta,
  TipoEndereco,
  TipoIdentificacao,
  TipoLocalizacao,
  TipoOcupacao,
  TipoPessoa, TipoRenda,
  TipoResidencia,
  TipoTelefone,
  TipoVideo,
  TipoVisaoRegiaAtuacao,
  TipoVisita
} from '../models/interfaces/dados-basicos';
import {
  CapacidadeCivelEnum,
  DadosCapturaOpcaoEnum,
  DetalheSituacaoClienteEnum,
  EstadoCivilEnum,
  FaixaEtariaEnum,
  FinalidadePropostaEnum,
  GrauInstrucaoEnum,
  GrauReferenciaResponsavelImovelEnum, GrauVinculoEnum,
  LogicoEnum,
  NacionalidadeEnum,
  SetorEnum,
  SexoEnum,
  SituacaoClienteEnum,
  SituacaoPropostaEnum,
  SituacaoVisitaEnum,
  TipoAplicacaoCreditoEnum,
  TipoComprovanteResidenciaEnum,
  TipoContaEnum,
  TipoEnderecoEnum,
  TipoIdentificacaoEnum,
  TipoOcupacaoEnum,
  TipoPessoaEnum, TipoRendaEnum,
  TipoResidenciaEnum,
  TipoTelefoneEnum,
  TipoVideoEnum,
  TipoVisaoRegiaAtuacaoEnum,
  TipoVisitaEnum
} from '../models/enums/enums-types';

@Injectable({
  providedIn: 'root'
})
export class DadosBasicosProvider {

  constructor() {
  }

  getTodosTiposPessoa(): TipoPessoa[] {
    return TipoPessoaEnum.valores();
  }

  getTodosSetores(): Setor[] {
    return SetorEnum.valores();
  }

  getTodosTiposResidencia(tipoEndereco: string): TipoResidencia[] {
    return TipoResidenciaEnum.valores(tipoEndereco);
  }

  getTodasSituacoesCliente(): SituacaoCliente[] {
    return SituacaoClienteEnum.valores();
  }

  getTodasSituacoesClienteParaAtendimento(): SituacaoCliente[] {
    return SituacaoClienteEnum.valores().filter(situacao => !situacao.automatica);
  }

  getTodosTiposComprovantesResidencia(): TipoComprovanteResidencia[] {
    return TipoComprovanteResidenciaEnum.valores();
  }

  getTodosTiposIdentificacoes(): TipoIdentificacao[] {
    return TipoIdentificacaoEnum.valores();
  }

  getSexos(): Sexo[] {
    return SexoEnum.valores();
  }

  getTodosGrauInstrucao(): GrauInstrucao[] {
    return GrauInstrucaoEnum.valores();
  }

  getTodosEstadoCivil(): EstadoCivil[] {
    return EstadoCivilEnum.valores();
  }

  getTodosCapacidadeCivil(): CapacidadeCivel[] {
    return CapacidadeCivelEnum.valores();
  }

  getTodosNacionalidade(): Nacionalidade[] {
    return NacionalidadeEnum.valores();
  }

  getTodosLogico(): Logico[] {
    return LogicoEnum.valores();
  }

  getTodosTipoConta(): TipoConta[] {
    return TipoContaEnum.valores();
  }

  getTodosGrauReferenciaResponsavelImovelEnum(): TipoConta[] {
    return GrauReferenciaResponsavelImovelEnum.valores();
  }

  getTodosTipoEndereco(): TipoEndereco[] {
    return TipoEnderecoEnum.valores();
  }

  getTodosTipoTelefone(): TipoTelefone[] {
    return TipoTelefoneEnum.valores();
  }

  getTodasSituacoesVisitas(): SituacaoVisita[] {
    return SituacaoVisitaEnum.valores();
  }

  getTodosTiposVisitas(): TipoVisita[] {
    return TipoVisitaEnum.valores();
  }

  getTodosTiposVideos(): TipoVideo[] {
    return TipoVideoEnum.valores();
  }

  getTodasVisoesRegiaoAtuacao(): TipoVisaoRegiaAtuacao[] {
    return TipoVisaoRegiaAtuacaoEnum.valores();
  }

  getTodasTiposAplicacaoCredito(): TipoAplicacaoCredito[] {
    return TipoAplicacaoCreditoEnum.valores();
  }

  getTodasFinalidadeProposta(): FinalidadeProposta[] {
    return FinalidadePropostaEnum.valores();
  }

  getTodosDadosCapturaOpcoes(): DadosCapturaOpcao[] {
    return DadosCapturaOpcaoEnum.valores();
  }

  getTodasFaixaEtarias(): FaixaEtaria[] {
    return FaixaEtariaEnum.valores();
  }

  getTodosDetalhesSituacao(): DetalheSituacaoCliente[] {
    return DetalheSituacaoClienteEnum.valores();
  }

  getResolucoesPreferenciais(): Resolucao[] {
    return resolucoes;
  }

  getTodosTipoOcupacao(): TipoOcupacao[] {
    return TipoOcupacaoEnum.valores();
  }

  getTodosGrausVinculo(): GrauVinculo[] {
    return GrauVinculoEnum.valores();
  }

  getTodosTipoRenda(): TipoRenda[] {
    return TipoRendaEnum.valores();
  }
}
