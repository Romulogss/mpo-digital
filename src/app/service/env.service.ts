import {Injectable} from '@angular/core';
import {EnvironmentUrls} from "../../models/interfaces/environmentUrls.interface";

@Injectable()
export class EnvService {

  static URL_SERVICO_APPVERSION: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/appVersion",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/appVersion",
    prod: "https://wpe4bank.com/adece-service/rest/appVersion",
  }
  static URL_SERVICO_AUTH: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/auth",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/auth",
    prod: "https://wpe4bank.com/adece-service/rest/auth",
  }
  static URL_SERVICO_SYNC: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/datasync",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/datasync",
    prod: "https://wpe4bank.com/adece-service/rest/datasync",
  }
  static URL_SERVICO_PROPOSTA: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/proposta",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/proposta",
    prod: "https://wpe4bank.com/adece-service/rest/proposta",
  }
  static URL_SERVICO_PROPOSTA_BANCO: EnvironmentUrls = {
    dev: "http://10.0.0.106:8080/basa-service/rest/proposta",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com.0.106:8080/basa-service/rest/proposta",
    prod: "https://wpe4bank.com/adece-service/rest/proposta",
  };

  static URL_SERVICO_TIPOS_RELATORIOS: EnvironmentUrls = {
    dev: "http://10.0.0.106:8080/basa-service/rest/relatorio/tiposRelatorios",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com.0.106:8080/basa-service/rest/relatorio/tiposRelatorios",
    prod: "https://wpe4bank.com/adece-service/rest/relatorio/tiposRelatorios",
  }

  static URL_SERVICO_RELATORIO: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/relatorio/buscarRelatorioApp?",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/relatorio/buscarRelatorioApp?",
    prod: "https://wpe4bank.com/adece-service/rest/relatorio/buscarRelatorioApp?",
  }
  static URL_SERVICO_VIDEOS: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/video",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/video",
    prod: "https://wpe4bank.com/adece-service/rest/video",
  }
  static URL_ALIANCA_EMPREENDEDRA: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/aliancaEmpreendedora",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/aliancaEmpreendedora",
    prod: "https://wpe4bank.com/adece-service/rest/aliancaEmpreendedora"
  }
  static URL_SERVICO_ASSESSOR: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/assessor",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/assessor",
    prod: "https://wpe4bank.com/adece-service/rest/assessor"
  }

  static URL_SERVICO_CLIENTE: EnvironmentUrls = {
    dev: "http://localhost:8080/adece-service/rest/cliente",
    hml: "http://ec2-54-89-236-242.compute-1.amazonaws.com/adece-service/rest/cliente",
    prod: "https://wpe4bank.com/adece-service/rest/cliente"
  }

  static URL_SERVICO_BANCO: EnvironmentUrls = {
    dev: "https://brasilapi.com.br/api/banks/v1",
    hml: "https://brasilapi.com.br/api/banks/v1",
    prod: "https://brasilapi.com.br/api/banks/v1"
  }
  env: keyof EnvironmentUrls;
  local: boolean;

  constructor() {
    this.env = 'hml';
    this.local = false;
  }

  public isProd(): boolean {
    return this.env === 'prod';
  }

  public isDev(): boolean {
    return this.env === 'dev';
  }

  public isHml(): boolean {
    return this.env === 'hml';
  }

  public getUrlServicoAppVersion(): string {
    return EnvService.URL_SERVICO_APPVERSION[this.env];
  }

  public getUrlServicoAuth(): string {
    return EnvService.URL_SERVICO_AUTH[this.env];
  }

  public getUrlServicoSync(): string {
    return EnvService.URL_SERVICO_SYNC[this.env];
  }

  public getUrlServicoProposta(): string {
    return EnvService.URL_SERVICO_PROPOSTA[this.env];
  }

  public getUrlServicoPropostaBanco(): string {
    return EnvService.URL_SERVICO_PROPOSTA_BANCO[this.env];
  }

  public getUrlServicoTiposRelatorios(): string {
    return EnvService.URL_SERVICO_TIPOS_RELATORIOS[this.env];
  }

  public getUrlServicoRelatorio(): string {
    return EnvService.URL_SERVICO_RELATORIO[this.env];
  }

  public getUrlServicoVideos(): string {
    return EnvService.URL_SERVICO_VIDEOS[this.env];
  }

  public getUrlAliancaEmpreendedora(): string {
    return EnvService.URL_ALIANCA_EMPREENDEDRA[this.env];
  }

  public getUrlServicoAssessor(): string {
    return EnvService.URL_SERVICO_ASSESSOR[this.env];
  }

  public getUrlServicoCliente(): string {
    return EnvService.URL_SERVICO_CLIENTE[this.env];
  }

  public getUrlServicoBanco(): string {
    return EnvService.URL_SERVICO_BANCO[this.env];
  }
}

