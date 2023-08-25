import {Injectable} from '@angular/core';
import {DatabaseProvider} from "../utils/database";
import {AbstractService} from "./abstract.service";
import {Cliente} from "../models/entidades/cliente";
import {AppUtils} from "../utils/app-utils";
import {ClienteParticipanteInterface} from "../models/interfaces/cliente-participante.interface";
import {Assessor} from "../models/entidades/assessor.entity";
import {Carteira} from "../models/entidades/carteira";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends AbstractService<Cliente> {

  constructor(
    private dataBase: DatabaseProvider,
    private authService: AuthService
  ) {
    super(dataBase, Cliente)
  }

  salvar(cliente: Cliente): Promise<Cliente> {
    cliente.preView();
    return new Promise<Cliente>((resolve, reject) => {
      cliente.carteira = this.authService.usuarioLogado.carteira;
      cliente.posView();
      cliente.sinalizarSincronizacao();
      Cliente.save(cliente).then((it) => {
        resolve(it);
      })
        .catch(error => {
          reject(error);
        });
    });
  }

  public buscarTodosParaProposta(idAssessor: number, cpfCnpj: string, nome: string, tipoPessoa: string): Promise<ClienteParticipanteInterface[]> {
    const params: any[] = [idAssessor]
    let andWhere = "and ca.id_assessor = ? ";
    if (AppUtils.strNotEmptyOrNull(cpfCnpj)) {
      params.push(cpfCnpj)
      andWhere.concat("and cl.cd_cpf_cnpj = ? ")
    }
    if (AppUtils.strNotEmptyOrNull(nome)) {
      params.push(`%${nome}%`)
      andWhere.concat("and no_completo like ? ")
    }
    if (AppUtils.strNotEmptyOrNull(tipoPessoa)) {
      params.push(tipoPessoa)
      andWhere.concat("and cl.cd_tipo_pessoa = ? ")
    }
    return this.repository.manager.query<ClienteParticipanteInterface[]>(
      `
      select cl.cd_uuid as uuid, cl.cd_cpf_cnpj as cpfCnpj, cl.no_completo as nomeCompleto, cl.nu_sincronizado as sincronizado, cl.nu_ativo as ativo
      from cliente cl
      join carteira ca on (ca.id_carteira = cl.id_carteira)
      where cl.fl_excluido = 0
      and cl.cd_cpf_cnpj is not null
      and cl.no_completo is not null
      and cl.fl_arquivado <> 'SIM'
      ${andWhere}
      order by cl.no_completo
      `,
      params
    )
  }

  public filtrar(idAssessor: number, textoBuscaNome?: string, textoBuscaCpf?: string, textoBuscaBairro?: string, textoBuscaSituacao?: string, limite?: number): Promise<Cliente[]> {
    const whereNome: string = (textoBuscaNome != null && textoBuscaNome.length > 0) ? ` AND (cliente.nomeCompleto LIKE '%${textoBuscaNome}%') ` : '';
    const whereCpf: string = (textoBuscaCpf != null && textoBuscaCpf.length > 0) ? ` AND (cliente.cpfCnpj LIKE '%${textoBuscaCpf}%') ` : '';
    const whereBairro: string = (textoBuscaBairro != null && textoBuscaBairro.length > 0) ? ` AND endereco.bairro LIKE '%${textoBuscaBairro}%' ` : '';
    const whereSituacao: string = (textoBuscaSituacao != null && textoBuscaSituacao.length > 0) ? ` AND cliente.situacaoAtual LIKE '%${textoBuscaSituacao}%' ` : '';
    const whereSQL: string = ` 1=1 ${whereNome} ${whereCpf} ${whereSituacao} ${whereBairro}`;
    return this.repository.createQueryBuilder("cliente")
      .leftJoinAndSelect("cliente.telefones", "telefone")
      .leftJoinAndSelect("cliente.enderecos", "endereco")
      .leftJoinAndSelect("cliente.historicoDeAtendimento", "historicoDeAtendimento")
      .innerJoin("cliente.carteira", "carteira")
      .where(whereSQL)
      .andWhere(" carteira.assessor = :assessor AND cliente.excluido = :excluido", {
        assessor: idAssessor,
        excluido: 0
      }).orderBy('cliente.nomeCompleto', 'ASC').limit(limite).getMany();
  }

  public getClienteByCpf(cpf?: string, uuid?: string, assessorLogado?: Assessor): Promise<Cliente[]> {
    uuid = uuid || '';
    return this.repository.createQueryBuilder("cliente")
      .innerJoin("cliente.carteira", "carteira")
      .where("cliente.cpfCnpj LIKE :cpf", {cpf: `%${cpf}%`})
      .andWhere("cliente.uuid <> :uuid", {uuid})
      .andWhere(" carteira.assessor = :assessor AND cliente.excluido = :excluido", {
        assessor: assessorLogado.id,
        excluido: 0
      }).getMany();
  }

  public findAll(idAssessor: number): Promise<Cliente[]> {
    return this.repository.createQueryBuilder("cliente")
      .leftJoinAndSelect("cliente.telefones", "telefone")
      .leftJoinAndSelect("cliente.enderecos", "endereco")
      .innerJoin("cliente.carteira", "carteira")
      .where(" carteira.assessor = :assessor AND cliente.excluido = :excluido", {
        assessor: idAssessor,
        excluido: 0
      }).take(100).getMany();
  }

  public filtrarParaRegiaoAtuacao(textoBuscaBairro?: string, assessorLogado?: Assessor): Promise<Cliente[]> {
    let whereBairro: string = (textoBuscaBairro != null && textoBuscaBairro.length > 0) ? ` AND endereco.bairro LIKE '%${textoBuscaBairro}%' ` : '';
    let whereSQL: string = ` 1=1 ${whereBairro}`;

    return this.repository.createQueryBuilder("cliente")
      .leftJoinAndSelect("cliente.enderecos", "endereco")
      .innerJoin("cliente.carteira", "carteira")
      .where(whereSQL)
      .andWhere(" carteira.assessor = :assessor AND cliente.excluido = :excluido", {
        assessor: assessorLogado.id,
        excluido: 0
      }).getMany();
  }

  public buscarQuantidadeDeClientes(assessorLogado: Assessor, situacao?: string): Promise<number> {
    let andWhere: string = AppUtils.strNotEmptyOrNull(situacao) ? `cliente.situacaoAtual = ${situacao.toUpperCase()}` : null
    return this.repository.createQueryBuilder("cliente")
      .select(' COUNT(0) ', 'quantidade')
      .innerJoin("cliente.carteira", "carteira")
      .where(" carteira.assessor = :assessor AND cliente.excluido = :excluido AND (:situacao IS NULL OR " +
        "cliente.situacaoAtual = :situacao)", {
        assessor: assessorLogado.id,
        excluido: 0,
        situacao
      })
      .getRawOne();
  }

  buscarClienteCompleto(uuid?: string, id?: number): Promise<Cliente> {
    const where = AppUtils.strNotEmptyOrNull(uuid) ? `cliente.uuid = '${uuid}'` : `cliente.id = ${id}`
    return this.repository.createQueryBuilder("cliente")
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

  public findByCarteira(carteira: Carteira): Promise<Cliente[]> {
    // @ts-ignore
    return Cliente.find({'carteira': carteira, "excluido": false});
  }

  findAllToFetch(assessor: Assessor): Promise<any> {
    return this.repository.manager.query("select cl.cd_uuid as uuid, cl.dt_ultima_atualizacao as ultimaAtualizacao, cl.nu_sincronizado as sincronizado "
      + "from cliente cl "
      + "join carteira ca on (ca.id_carteira = cl.id_carteira) "
      + "where ca.id_assessor = ?", [assessor.id]);
  }

  public  getClienteByUuidArquivo(uuid: string): Promise<Cliente> {
    return this.repository.createQueryBuilder("cliente")
      .innerJoinAndSelect("cliente.arquivos", "arquivo")
      .where('arquivo.uuid = :uuid', {uuid: uuid})
      .getOne();
  }
}
