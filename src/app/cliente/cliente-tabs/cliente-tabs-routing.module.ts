import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteTabsPage } from './cliente-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteTabsPageRoutingModule {}
