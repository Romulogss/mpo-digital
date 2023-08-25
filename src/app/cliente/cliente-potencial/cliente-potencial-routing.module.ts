import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePotencialPage } from './cliente-potencial.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePotencialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePotencialPageRoutingModule {}
