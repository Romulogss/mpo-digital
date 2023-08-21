import {Injectable} from '@angular/core';
import {MenuItemInterface} from "../../models/interfaces/menu-item.interface";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RotasService {

  private appPages: MenuItemInterface[] = [
    {title: 'Início', url: '/home', icon: 'home', showInCardMenu: false, showInSideMenu: true},
    {title: 'Carteira', url: '/folder/inbox', icon: 'person-sharp', showInCardMenu: true, showInSideMenu: true},
    {title: 'Agenda', url: '/folder/outbox', icon: 'calendar-sharp', showInCardMenu: true, showInSideMenu: true},
    {
      title: 'Nova Proposta',
      url: '/folder/favorites',
      icon: 'documents-sharp',
      showInCardMenu: true,
      showInSideMenu: true
    },
    {
      title: 'Área de Atuação',
      url: '/folder/archived',
      icon: 'navigate-circle-sharp',
      showInCardMenu: true,
      showInSideMenu: true
    },
    {title: 'Simulação', url: '/folder/trash', icon: 'cash-sharp', showInCardMenu: true, showInSideMenu: true},
    {title: 'Relatórios', url: '/folder/trash', icon: 'newspaper-sharp', showInCardMenu: true, showInSideMenu: true},
    {title: 'Sincronização', url: '/folder/spam', icon: 'sync-sharp', showInCardMenu: true, showInSideMenu: true},
    {title: 'Sair', url: '', icon: 'power-sharp', showInCardMenu: false, showInSideMenu: true},
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  public sideMenu(): MenuItemInterface[] {
    return this.appPages.filter(menu => menu.showInSideMenu)
  }

  public cardMenu(): MenuItemInterface[] {
    return this.appPages.filter(menu => menu.showInCardMenu)
  }

  public irPara(path: string) {
    if (!path.startsWith('/')) path = '/' + path
    this.router.navigate([`${path}`])
  }

  public irParaTelaInicial() {
    this.authService.isAutenticate().then(ativo => {
      if (ativo) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  public async sair() {
    await this.authService.logout();
    this.irParaTelaInicial()
  }
}
