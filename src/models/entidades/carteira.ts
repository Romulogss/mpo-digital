import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Assessor} from "./assessor.entity";
import {BaseEntity} from "./base.entity";

@Entity('carteira')
export class Carteira extends BaseEntity {

  @OneToOne(() => Assessor)
  @JoinColumn({name: "id_assessor"})
  assessor: Assessor | null;


}
