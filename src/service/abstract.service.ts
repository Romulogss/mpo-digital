import {BaseEntity, FindOptionsWhere, Repository} from "typeorm";
import {DatabaseProvider} from "../utils/database";

export abstract class AbstractService<T extends BaseEntity> {
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
      console.log(new this.entityType())
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

  buscarTodos(): Promise<T[]> {
    this.criarRepo();
    return this.repository.find();
  }

  buscarPor(clause: FindOptionsWhere<T>): Promise<T[]> {
    this.criarRepo();
    return this.repository.findBy(clause)
  }
}
