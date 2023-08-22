import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {EnvService} from "./env.service";
import {CredentialInterface} from "../models/interfaces/credential.interface";
import jwtDecode from "jwt-decode";
import {UserInterface} from "../models/interfaces/user.interface";
import {TokenInterface} from "../models/interfaces/token.interface";
import {MensagemService} from "./mensagem.service";
import {Preferences} from "@capacitor/preferences";
import {Assessor} from "../models/entidades/assessor.entity";
import {AssessorService} from "./assessor.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioLogado: Assessor = null!;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private msgService: MensagemService,
    private assessorService: AssessorService
  ) {
  }

  public realizarLogin(login: CredentialInterface) {
    this.msgService.showLoading('Realizando login...', 'auth-load')
    return new Observable<Assessor>((observable) => {
      this._realizarLogin(login).subscribe(token => {
        const usuarioResponse = AuthService.decodeToken(token!);
        usuarioResponse.token = token;
        this.assessorService.salvar(new Assessor(
          usuarioResponse.nome,
          '',
          usuarioResponse.token,
          usuarioResponse.exp,
          login.login,
          usuarioResponse.uuid,
          new Date().valueOf(),
          false,
          false
        )).then(async a => {
          await Preferences.set({
            key: '@cdUsu',
            value: login.login
          })
          this.usuarioLogado = a;
          observable.next(this.usuarioLogado)
          observable.complete()
        }).catch(err => {
          observable.error(err)
          observable.complete()
        })
      })
    })
  }

  public async isAutenticate(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      let ativo = false;
      if (!!this.usuarioLogado) {
        if (this.usuarioLogado.exp == null) ativo = false;
        ativo = new Date(this.usuarioLogado.exp) >= new Date()
      } else {
        const cdUsu = (await Preferences.get({key: '@cdUsu'})).value
        if (cdUsu) {
          await this.assessorService.buscarPor({
            //@ts-ignore
            cdUsu
          })
            .then(assessor => {
              if (assessor) {
                ativo = new Date(assessor[0].exp) >= new Date();
                this.usuarioLogado = assessor[0];
              } else {
                ativo = false
              }
            }).catch(err => {
              console.log(err)
              ativo = false
            })
        } else {
          ativo = false
        }
      }
      resolve(ativo);
    })
  }

  public async logout() {
    this.usuarioLogado = null!;
    await Preferences.clear();
  }


  private _realizarLogin(login: CredentialInterface) {
    return this.http.post(this.env.getUrlServicoAuth() + '/login', login, {responseType: 'text'})
      .pipe(
        tap(async _ => {
          this.msgService.closeLoading('auth-load')
        }),
        catchError(this.handleError('', 'auth-load'))
      )
  }

  public secureGetOtherToken<T>(url: string, token: string, rtype: any): Observable<T> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get<T>(url, {responseType: rtype, headers: headers});
  }

  public secureGetAsString<T>(url: string): Observable<string> {
    return this.http.get(url, {responseType: 'text', headers: this.getHttpHeadersJson()});
  }

  public secureGet<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {responseType: 'json', headers: this.getHttpHeadersJson()});
  }

  public securePost<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, {responseType: 'json', headers: this.getHttpHeadersJson()});
  }

  private static decodeToken(token: string): UserInterface {
    const tokenInfo = jwtDecode(token) as TokenInterface;
    return JSON.parse(tokenInfo.iss) as UserInterface;
  }

  private getHttpHeadersJson(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioLogado.token
    });
  }

  private handleError<T>(result?: T, loadingId?: string) {
    return (error: any): Observable<T> => {
      console.error(error);
      if (!!loadingId) {
        this.msgService.closeLoading('auth-load');
      }
      this.msgService.showAlertMensagem('Não foi possível realizar o login')
      return of(result as T);
    };
  }
}
