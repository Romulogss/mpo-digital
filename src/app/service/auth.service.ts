import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, observable, Observable, of, tap} from "rxjs";
import {EnvService} from "./env.service";
import {CredentialInterface} from "../../models/interfaces/credential.interface";
import jwtDecode from "jwt-decode";
import {UserInterface} from "../../models/interfaces/user.interface";
import {TokenInterface} from "../../models/interfaces/token.interface";
import {MensagemService} from "./mensagem.service";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioLogado: UserInterface = null!;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private msgService: MensagemService
  ) {
  }

  public realizarLogin(login: CredentialInterface) {
    this.msgService.showLoading('Realizando login...', 'auth-load')
    return new Observable<UserInterface>((observable) => {
      this._realizarLogin(login).subscribe(token => {
        this.usuarioLogado = AuthService.decodeToken(token!);
        this.usuarioLogado.token = token;
        Preferences.set({
          key: '@user',
          value: JSON.stringify(this.usuarioLogado)
        })
        observable.next(this.usuarioLogado)
        observable.complete()
      })
    })
  }

  public async isAutenticate(): Promise<boolean> {
    if (!!this.usuarioLogado) {
      if (this.usuarioLogado.exp == null) return false;
      return new Date(this.usuarioLogado.exp) >= new Date();
    } else {
      const userStorage = (await Preferences.get({key: '@user'})).value;
      if (userStorage == null || userStorage == '') {
        return false;
      }
      //@ts-ignore
      this.usuarioLogado = JSON.parse(userStorage as string);
      return new Date(this.usuarioLogado.exp) >= new Date();
    }
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
      'Authorization': 'token'
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
