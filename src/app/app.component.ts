import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Início', url: '', icon: 'home'},
    {title: 'Carteira', url: '/folder/inbox', icon: 'person-sharp'},
    {title: 'Agenda', url: '/folder/outbox', icon: 'calendar-sharp'},
    {title: 'Nova Proposta', url: '/folder/favorites', icon: 'documents-sharp'},
    {title: 'Área de Atuação', url: '/folder/archived', icon: 'navigate-circle-sharp'},
    {title: 'Simulação', url: '/folder/trash', icon: 'cash-sharp'},
    {title: 'Relatórios', url: '/folder/trash', icon: 'newspaper-sharp'},
    {title: 'Sincronização', url: '/folder/spam', icon: 'sync-sharp'},
  ];
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAutenticate().then(ativo => {
      if (ativo) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/'])
      }
    })
  }
}
