import {RestritivoItem} from "./restritivo-item.model";

export class Restritivo {
  nomeCompleto: string;
  cpfCnpj: string;
  coordenador: boolean;

  restritivos: RestritivoItem[] = [];

  expanded: boolean = false;

  constructor(nomeCompleto: string, cpfCnpj: string, coordenador: boolean, restritivos: RestritivoItem[]) {
    this.nomeCompleto = nomeCompleto;
    this.cpfCnpj = cpfCnpj;
    this.coordenador = coordenador;
    this.restritivos = restritivos;
  }

  adicionarRestritivo(descricao: string, isOk: boolean): void {
    this.restritivos.push(new RestritivoItem(descricao, isOk));
  }

  get possuiRestritivo(): boolean {
    let possuiRestritivo: boolean = false;
    this.restritivos.forEach(item => possuiRestritivo = possuiRestritivo || item.possui);
    return possuiRestritivo;
  }
}
