import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteFichaPage } from './cliente-ficha.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteFichaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteFichaPageRoutingModule {}
