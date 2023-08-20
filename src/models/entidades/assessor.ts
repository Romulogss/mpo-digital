// noinspection ES6UnusedImports

import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('assessor')
export class Assessor {

  @PrimaryGeneratedColumn({name: "id_assessor"})
  id: number;

  @Column({length: 60, name: "no_assessor", nullable: true})
  nome: string;

  @Column({length: 11, name: "tx_cpf", nullable: true})
  cpf: string;

  @Column({length: 150, name: "tx_token", nullable: true})
  token: string;

  @Column({name: "dt_exp_token", nullable: true})
  expToken: number;

  @Column({name: 'cd_usu', nullable: true})
  cdUsu: string;
  /* Campos para a sincronizacao */

  @Column({name: "cd_uuid", nullable: true})
  uuid: string;

  @Column({name: "dt_ultima_atualizacao", nullable: true})
  ultimaAtualizacao: number;

  @Column({name: "nu_sincronizado", nullable: true})
  sincronizado: boolean;

  @Column({name: 'lg_senha_provisoria', nullable: true})
  senhaProvisoria: boolean;


  constructor(id: number, nome: string, cpf: string, token: string, expToken: number, cdUsu: string, uuid: string,
              ultimaAtualizacao: number, sincronizado: boolean, senhaProvisoria: boolean) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.token = token;
    this.expToken = expToken;
    this.cdUsu = cdUsu;
    this.uuid = uuid;
    this.ultimaAtualizacao = ultimaAtualizacao;
    this.sincronizado = sincronizado;
    this.senhaProvisoria = senhaProvisoria;
  }

  /* Metodos para a sincronizacao */

  getUuid(): string {
    return this.uuid;
  }

  getLastUpdate(): number {
    return this.ultimaAtualizacao;
  }

  isSynchronized(): boolean {
    return this.sincronizado;
  }

  setSynchronized(synchronized: boolean): void {
    this.sincronizado = synchronized;
  }

}
