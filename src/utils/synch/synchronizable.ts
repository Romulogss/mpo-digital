import "reflect-metadata";
import {SincronizavelAbstract} from "./sincronizavel.entity.abstract";


export class SynchEntityInfo {
  entityName: string;
  service: SynchronizableService;

  constructor(entityName: string, service: SynchronizableService) {
    this.entityName = entityName;
    this.service = service;
  }
}

export class FectchData {
  assessor: FetchDataUuid[] = [];
  cliente: FetchDataUuid[] = [];
  arquivo: FetchDataUuid[] = [];
  visita: FetchDataUuid[] = [];
  modalidade: FetchDataUuid[] = [];
  planoPagamento: FetchDataUuid[] = [];
  proposta: FetchDataUuid[] = [];
  empreendimento: FetchDataUuid[] = [];
}

export class ErroData {
  assessor: string[] = [];
  cliente: string[] = [];
  arquivo: string[] = [];
  visita: string[] = [];
  modalidade: string[] = [];
  planoPagamento: string[] = [];
  proposta: string[] = [];
  empreendimento: string[] = [];
}

export class FetchDataUuid {
  uuid: string;
  lastUpdate: number;
  ativo: boolean;
  nome?: string;
  dependencia?: Dependencia[];
  labelRelatorio?: string;
  hidden?: boolean;
}

export class Dependencia {
  uuid: string;
  nome: string;
}

// export class SynchronizeData {
//   add: SynchDataObject = new SynchDataObject();
//   update: SynchDataObject = new SynchDataObject();
//   remove: SynchDataUuid = new SynchDataUuid();
//   fetch: SynchDataUuid = new SynchDataUuid();
//   erros: ErroData = new ErroData();
// }

// export class SynchDataObject {
//   assessor: Assessor[] = [];
//   cliente: Cliente[] = [];
//   arquivo: Arquivo[] = [];
//   visita: Visita[] = [];
//   modalidade: ModalidadeDb[] = [];
//   planoPagamento: PlanoPagamento[] = [];
//   proposta: PropostaJSON[] = [];
//   empreendimento: Empreendimento[] = [];
// }

export class SynchDataUuid {
  assessor: FetchDataUuid[] = [];
  cliente: FetchDataUuid[] = [];
  arquivo: FetchDataUuid[] = [];
  visita: FetchDataUuid[] = [];
  modalidade: FetchDataUuid[] = [];
  planoPagamento: FetchDataUuid[] = [];
  proposta: FetchDataUuid[] = [];
  empreendimento: FetchDataUuid[] = [];
}

export interface SynchronizableService {
  newSynchronizable(b?: boolean): SincronizavelAbstract;

  getSynchronizableByUuid(uuid: string): Promise<SincronizavelAbstract>;

  getAllSynchronizable(suuid: string): Promise<SincronizavelAbstract[]>;

  prepareToSend(local: any, remote: any): Promise<void>;

  insertLocal(synchronizable: SincronizavelAbstract): Promise<void>;

  updateLocal(synchronizable: SincronizavelAbstract): Promise<void>;

  confirmLocal(uuid: string): Promise<void>;

  removeLocal(synchronizable: SincronizavelAbstract): Promise<void>;
}

export interface SynchronizableConverterService extends SynchronizableService {
  convertToLocal(local: any, remote: any): SincronizavelAbstract;
}

export interface SynchronizableIndiviudalService {

  _fetchGET(uuidAssessor: string): Promise<FectchData>;

  _fetchPOST(uuidAssessor: string, uuidsNoApp: string[]): Promise<FectchData>;

  toFetchDataUUID(data: Synchronizable, fetchDataLista: FetchDataUuid[]): void;

  realizarRelatorio(): Promise<FetchDataUuid[]>;

  verificarPendencia(paraSincronizar: FetchDataUuid[]): Promise<boolean>

  createFetchDataWithDependecias(visitas: FetchDataUuid[], selecionados: FectchData): void;

  sincronizar(fetchData: FetchDataUuid[]): Promise<void>;

}

export abstract class SynchronizableAbstract {
  labelRelatorio?: string;

  abstract getUuid(): string;

  abstract getLastUpdate(): number;

  getNome?(): string;

  abstract isSynchronized(): boolean;

  abstract setSynchronized(synchronized: boolean): void;

  createFetchDataWithDependecias?(dados: FetchDataUuid[], selecionados: FectchData): void;
}

export interface Synchronizable {

  labelRelatorio?: string;

  getUuid(): string;

  getLastUpdate(): number;

  getNome?(): string;

  isSynchronized(): boolean;

  setSynchronized(synchronized: boolean): void;

  createFetchDataWithDependecias?(dados: FetchDataUuid[], selecionados: FectchData): void;
}

export class SynchronizableUtil {
  static assignFromServer<T>(target: T, source: T): T | null {
    if (target == null || source == null) {
      return null;
    }
    const obj: string[] = Object.keys(source);
    if (obj == null) {
      return null;
    }
    obj.forEach((attribut) => {
      const synchInfo = getSynchType(target, attribut);
      if (synchInfo != null) {
        const synchType = synchInfo.type;
        // @ts-ignore
        const sourceValue: any = source[attribut];
        switch (synchType) {
          case SynchType.LIST:
            if (sourceValue != null) {
              // @ts-ignore
              let list = [];
              // @ts-ignore
              sourceValue.forEach(it => {
                let newValue = synchInfo.entity != null ? new synchInfo.entity() : {};
                list.push(SynchronizableUtil.assignFromServer(newValue, it));
              });
              // @ts-ignore
              target[attribut] = list;
            } else {
              // @ts-ignore
              target[attribut] = [];
            }
            break;
          case SynchType.ENTITY:
            // @ts-ignore
            let newValue = target[attribut];
            if (newValue == null) {
              newValue = synchInfo.entity != null ? new synchInfo.entity() : {};
            }
            // @ts-ignore
            target[attribut] = SynchronizableUtil.assignFromServer(newValue, sourceValue);
            break;
          case SynchType.NUMERIC:
            // @ts-ignore
            target[attribut] = Number(sourceValue);
            break;
          case SynchType.TIMESTAMP:
            // @ts-ignore
            target[attribut] = Number(sourceValue) + 10800000
            break;
          default:
            // @ts-ignore
            target[attribut] = sourceValue;
        }
      }
    });
    return target;
  }

  static assignToServer<T>(target: T, source: T): T | null {
    if (source == null) {
      return null;
    }
    let obj = Object.keys(source);
    if (obj == null) {
      return null;
    }
    obj.forEach(attribut => {
      let synchInfo = getSynchType(source, attribut);
      if (synchInfo != null) {
        let synchType = synchInfo.type;
        if (synchType == SynchType.LIST) {
          // @ts-ignore
          if (source[attribut] != null) {
            // @ts-ignore
            let list = [];
            // @ts-ignore
            source[attribut].forEach(it => {
              list.push(SynchronizableUtil.assignToServer({}, it));
            });
            // @ts-ignore
            target[attribut] = list;
          } else {
            // @ts-ignore
            target[attribut] = [];
          }
        } else if (synchType == SynchType.ENTITY) {
          // @ts-ignore
          target[attribut] = SynchronizableUtil.assignToServer({}, source[attribut]);
        } else if (synchType == SynchType.NUMERIC) {
          // @ts-ignore
          target[attribut] = Number(source[attribut]);
        } else if (synchType == SynchType.TIMESTAMP) {
          // @ts-ignore
          target[attribut] = Number(source[attribut]) + 10800000
        } else {
          // @ts-ignore
          target[attribut] = source[attribut];
        }
      }
    });
    return target;
  }

  static isConverterService(object: any): object is SynchronizableConverterService {
    return "convertToLocal" in object;
  }
}

const synchMetadataKey = Symbol("Synch");

export class SynchType {
  static NONE: number = 0;
  static DATETIME: number = 1;
  static ENTITY: number = 2;
  static LIST: number = 3;
  static TIMESTAMP: number = 4;
  static NUMERIC: number = 5;
}

export function Synch(type: SynchType = SynchType.NONE, entity: any = null) {
  return Reflect.metadata(synchMetadataKey, {'type': type, 'entity': entity});
}

export function getSynchType(target: any, propertyKey: string) {
  return Reflect.getMetadata(synchMetadataKey, target, propertyKey);
}
