import {FectchData, FetchDataUuid} from "./synchronizable";
import {BaseEntity} from "../../models/entidades/base.entity";

export abstract class SincronizavelAbstract extends BaseEntity {

  labelRelatorio: string;
  abstract getUuid(): string;
  abstract getLastUpdate(): number;
  abstract isSynchronized(): boolean;
  abstract setSynchronized(synchronized: boolean): void;
  abstract getNome(): string;
  createFetchDataWithDependecias?(dados: FetchDataUuid[], selecionados: FectchData): void;
}
