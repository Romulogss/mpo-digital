import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteTabsPageRoutingModule } from './cliente-tabs-routing.module';

import { ClienteTabsPage } from './cliente-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteTabsPageRoutingModule
  ],
  declarations: [ClienteTabsPage]
})
export class ClienteTabsPageModule {}
