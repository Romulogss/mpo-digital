import {SynchronizableService} from "../../../utils/synch/synchronizable";
import {Assessor} from "../../../models/entidades/assessor.entity";
import {AssessorService} from "../assessor.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AssessorSynchService implements SynchronizableService<Assessor> {

  constructor(
    private assessorService: AssessorService
  ) {
  }

  confirmLocal(uuid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getSynchronizableByUuid(uuid).then(assessor => {
        assessor.setSynchronized(true);
        this.assessorService.salvar(assessor).then(() => {
          resolve();
        })
          .catch(erro => {
            reject(erro);
          });
      })
        .catch(erro => {
          reject(erro);
        });
    });
  }

  getAllSynchronizable(suuid: string): Promise<Assessor[]> {
    return this.assessorService.buscarTodos();
  }

  getSynchronizableByUuid(uuid: string): Promise<Assessor> {
    //@ts-ignore
    return this.assessorService.buscarPor({uuid})
  }

  insertLocal(synchronizable: Assessor): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Assessor.save(synchronizable).then(() => {
        resolve();
      })
        .catch(erro => {
          reject(erro);
        });
    });
  }

  updateLocal(synchronizable: Assessor): Promise<void> {
    return this.insertLocal(synchronizable);
  }

  newSynchronizable(b?: boolean): Assessor {
    return new Assessor();
  }

  prepareToSend(local: any, remote: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeLocal(synchronizable: Assessor): Promise<void> {
    return Promise.resolve(undefined);
  }


}
