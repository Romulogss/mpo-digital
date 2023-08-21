import {DataSource, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository} from "typeorm";
import {DatabaseProvider} from "../../utils/database";
import {Assessor} from "../../models/entidades/assessor";

export abstract class AbstractService<T extends ObjectLiteral> {
  protected repository: Repository<T> = null!;

  protected constructor(
    protected db: DatabaseProvider,
    private entityType: new () => T
  ) {
  }

  private criarRepo() {
    if (this.repository == null) {
      // @ts-ignore
      this.repository = this.db.dataSource.getRepository<T>(this.entityType);
    }
  }

  salvar(objeto: T): Promise<T> {
    this.criarRepo();
    return this.repository.save(objeto);
  }

  buscarPorId(id: number): Promise<T | null> {
    this.criarRepo();
    // @ts-ignore
    return this.repository.findOneBy({id});
  }

  buscarTodo(): Promise<T[]> {
    this.criarRepo();
    return this.repository.find();
  }

  buscarPor(clause: FindOptionsWhere<T>): Promise<T[]> {
    this.criarRepo();
    return this.repository.findBy(clause)
  }
}
