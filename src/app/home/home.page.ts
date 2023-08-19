import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public appPages = [
    {title: 'Carteira', url: '/folder/inbox', icon: 'person-sharp'},
    {title: 'Agenda', url: '/folder/outbox', icon: 'calendar-sharp'},
    {title: 'Nova Proposta', url: '/folder/favorites', icon: 'documents-sharp'},
    {title: 'Área de Atuação', url: '/folder/archived', icon: 'navigate-circle-sharp'},
    {title: 'Simulação', url: '/folder/trash', icon: 'cash-sharp'},
    {title: 'Relatórios', url: '/folder/trash', icon: 'newspaper-sharp'},
    {title: 'Sincronização', url: '/folder/spam', icon: 'sync-sharp'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
