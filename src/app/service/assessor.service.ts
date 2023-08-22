import {Injectable} from '@angular/core';
import {DatabaseProvider} from "../../utils/database";
import {Assessor} from "../../models/entidades/assessor.entity";
import {AbstractService} from "./abstract.service";

@Injectable({
  providedIn: 'root'
})
export class AssessorService extends AbstractService<Assessor> {

  constructor(
    private dataBase: DatabaseProvider
  ) {
    //@ts-ignore
    super(dataBase, Assessor);
  }


}
