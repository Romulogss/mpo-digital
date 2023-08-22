import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {BaseEntity} from "./base.entity";
import {Synch} from "../../utils/synch/synchronizable";
import {Cliente} from "./cliente";
//@ts-ignore
import {v4 as uuid} from 'uuid';
import {Assessor} from "./assessor.entity";


@Entity('arquivo')
export class Arquivo extends BaseEntity {

  @Synch()
  @Column({length: 100, name: "no_arquivo", nullable: true})
  nome: string;

  @Synch()
  @Column({name: "en_tipo", nullable: true})
  tipo: string;

  @Column({name: "bi_conteudo", nullable: true})
  @Synch()
  conteudo: string;

  @ManyToOne(() => Cliente, cliente => cliente.arquivos, {cascade: false, nullable: true, eager: false})
  @JoinColumn({name: "id"})
  cliente: Relation<Cliente>;

  @Synch()
  @Column({name: "en_dados_captura", nullable: true})
  tipoDadosCaptura: string;

  @Synch()
  @Column({name: "en_tipo_identificacao", nullable: true})
  tipoIdentificacao: string;

  @Synch()
  @Column({name: "en_tipo_residencia", nullable: true})
  tipoComprovante: string;

  @Synch()
  @Column({name: "en_assinatura", nullable: true})
  assinatura: string;

  /* Campos para a sincronizacao */

  @Synch()
  @Column({name: "cd_uuid", nullable: true})
  uuid: string;

  @Synch()
  @Column({name: "dt_ultima_atualizacao", nullable: true})
  ultimaAtualizacao: number;

  @Column({name: "nu_sincronizado", nullable: true})
  sincronizado: boolean;

  @Column({name: "cd_uuid_assessor", nullable: true})
  uuidAssessor: string;

  @Synch()
  conteudoBase64: string;

  @Synch()
  uuidCliente: string;


  constructor(id?: number | null) {
    super(id);
  }

  /* Metodos para a sincronizacao */

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

  sinalizarSincronizacao(uuidAssessor: string) {
    if (this.uuid == null) {
      this.uuid = uuid();
      this.uuidAssessor = uuidAssessor
    }
    this.ultimaAtualizacao = new Date().valueOf();
    this.sincronizado = false;
  }

  copiar(origem: Arquivo): void {
    this.nome = origem.nome;
    this.tipo = origem.tipo;
    this.conteudo = origem.conteudo;
    this.ultimaAtualizacao = origem.ultimaAtualizacao;
    this.sincronizado = origem.sincronizado;
    this.conteudoBase64 = origem.conteudoBase64;
  }

  static findAllToFetch(assessor: Assessor): Promise<any> {
    return Arquivo.query("select a.cd_uuid as uuid, a.dt_ultima_atualizacao as ultimaAtualizacao, a.nu_sincronizado as sincronizado, a.id as id "
      + "from arquivo a "
      + "where a.cd_uuid_assessor = ?", [assessor.uuid]);
  }

  static removerDependencia(arquivo: Arquivo): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      resolve();
    });
  }

  static findAllArquivosCliente(id: number): Promise<Arquivo[]> {
    let whereSQL: string = ` 1=1 `;
    return Arquivo.createQueryBuilder("arquivo")
      .innerJoin("arquivo.cliente", "cliente")
      .where(whereSQL)
      .andWhere(" cliente.id = :id", {id: id}).getMany();
  }

  static salvar(arquivo: Arquivo, uuidAssessor: string): Promise<Arquivo> {
    return new Promise<Arquivo>((resolve, reject) => {
      arquivo.sinalizarSincronizacao(uuidAssessor);
      Arquivo.save(arquivo)
        .then(it => resolve(it))
        .catch(error => reject(error));
    });
  }

  static getSynchronizableByUuid(uuid: string): Promise<Arquivo | null> {
    return Arquivo.createQueryBuilder("arquivo")
      .leftJoin("arquivo.cliente", "cliente")
      .where('arquivo.uuid = :uuid', {uuid: uuid})
      .getOne();
  }
}
