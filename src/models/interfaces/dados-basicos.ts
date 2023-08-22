export interface DadoBasico {
  id: number | string
  nome: string
  descricao: string
}

export interface TipoTelefone extends DadoBasico {
}

export interface TipoLocalizacao extends DadoBasico {
}

export interface TipoPessoa extends DadoBasico {
}

export interface TipoAplicacaoCredito extends DadoBasico {
}

export interface Setor extends DadoBasico {
}

export interface TipoResidencia extends DadoBasico {
  tipoEndereco: string
}

export interface TipoComprovanteResidencia extends DadoBasico {
}

export interface TipoIdentificacao extends DadoBasico {
}

export interface GrauReferenciaResponsavelImovel extends DadoBasico {
}

export interface TipoArquivo extends DadoBasico {
  contentType: string
}

export interface SituacaoCliente extends DadoBasico {
  automatica: boolean;
  registraAtendimento: boolean;
}

export interface DetalheSituacaoCliente extends DadoBasico {
  situacao: string;
}

export interface Logico extends DadoBasico {
}

export interface Sexo extends DadoBasico {
}

export interface GrauInstrucao extends DadoBasico {
}

export interface EstadoCivil extends DadoBasico {
}

export interface CapacidadeCivel extends DadoBasico {
}

export interface Nacionalidade extends DadoBasico {
}

export interface TipoConta extends DadoBasico {
}

export interface TipoEndereco extends DadoBasico {
  cor: string
}

export interface SituacaoVisita extends DadoBasico {
}

export interface TipoVisita extends DadoBasico {
  cor: string
}

export interface TipoVideo extends DadoBasico {
}

export interface TipoVisaoRegiaAtuacao extends DadoBasico {
}

export interface FinalidadeProposta extends DadoBasico {
}

export interface DetalheImovelProprio extends DadoBasico {
  imovelProprio: string
}

export interface SituacaoProposta extends DadoBasico {
  estilo: string,
  editavel: boolean
}

export interface TipoCheckList extends DadoBasico {
}

export interface TipoBotoesOpcoes extends DadoBasico {
}

export interface AcaoBotoesOpcoes extends DadoBasico {
  tipoBotao: TipoBotoesOpcoes[]
}

export interface DadosCapturaOpcao extends DadoBasico {
  descricaoRestritivo?: string
  opcional: boolean
}

export interface FaixaEtaria extends DadoBasico {
}

export interface Resolucao {
  width: number,
  heigth: number;
}

export interface TipoOcupacao extends DadoBasico {
  tipoPessoa: string;
}

export interface VigenciaCarteiraMilitar extends DadoBasico {
}

export interface GrauVinculo extends DadoBasico {
}

export interface ObjetivoDoCredito extends DadoBasico {
}

export interface TipoRenda extends DadoBasico {
}

export interface Entidade extends DadoBasico {
  path?: string;
}

export interface LogErro {
  entidade: string
  enviado: number
  recebido: number
  pendente: number
  erro: any
  msg: string
}

export const resolucoes: Resolucao[] = [
  {width: 1440, heigth: 1080},
  {width: 1600, heigth: 900},
  {width: 1280, heigth: 720}
]
