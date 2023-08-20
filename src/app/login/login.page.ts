import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialInterface} from "../../models/interfaces/credential.interface";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public esqueceuSenha: boolean = false;
  public loginForm: FormGroup = new FormGroup<any>({});
  public login: CredentialInterface = {
    login: null!,
    password: null!
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl(this.login.login, Validators.required),
      password: new FormControl(this.login.password, Validators.required),
      cpf: new FormControl(null),
    })
  }

  async ngOnInit() {
    if (await this.authService.isAutenticate()) {
      await this.router.navigate(['/home'])
    }
  }

  doLogin() {
    this.login = this.loginForm.value as CredentialInterface;
    //@ts-ignore
    delete this.login.cpf
    this.authService.realizarLogin(this.login)
      .subscribe((user) => {
        this.router.navigate(['/home'])
      })
  }

  goToForgotPassword() {
    this.esqueceuSenha = true;
    this.loginForm.get('cpf')?.setValidators([Validators.required])
    this.loginForm.updateValueAndValidity()
  }

  solicitarSenhaProvisoria() {

  }

  cancelarSolicitacaoNovaSenha() {
    this.esqueceuSenha = false;
    this.loginForm.get('cpf')?.clearValidators()
    this.loginForm.updateValueAndValidity()
  }
}
