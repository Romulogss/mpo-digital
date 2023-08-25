import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ClientePotencialPageRoutingModule} from './cliente-potencial-routing.module';
import {ClientePotencialPage} from './cliente-potencial.page';
import {MaskitoModule} from "@maskito/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePotencialPageRoutingModule,
    ReactiveFormsModule,
    MaskitoModule,
  ],
  declarations: [ClientePotencialPage],
})
export class ClientePotencialPageModule {
}
