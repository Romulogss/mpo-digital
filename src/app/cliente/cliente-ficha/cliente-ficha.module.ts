import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteFichaPageRoutingModule } from './cliente-ficha-routing.module';

import { ClienteFichaPage } from './cliente-ficha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteFichaPageRoutingModule
  ],
  declarations: [ClienteFichaPage]
})
export class ClienteFichaPageModule {}
