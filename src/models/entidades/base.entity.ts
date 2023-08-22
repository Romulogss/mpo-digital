import {PrimaryGeneratedColumn, BaseEntity as Base} from "typeorm";

export abstract class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number

  protected constructor(id?: number | null) {
    super()
    this.id = id!;
  }
}
