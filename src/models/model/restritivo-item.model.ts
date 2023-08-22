export class RestritivoItem {
  descricao: string;
  possui: boolean = false;


  constructor(descricao: string, possui: boolean) {
    this.descricao = descricao;
    this.possui = possui;
  }
}
