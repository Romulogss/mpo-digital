import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageModule} from "./home/home.module";
import {HttpClientModule} from "@angular/common/http";
import {EnvService} from "../service/env.service";
import {AuthService} from "../service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {LoginPage} from "./login/login.page";
import "reflect-metadata";
import {DatabaseProvider} from "../utils/database";
import {RotasService} from "../service/rotas.service";
import {ClienteTabsPageModule} from "./cliente/cliente-tabs/cliente-tabs.module";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {MaskitoModule} from "@maskito/angular";

@NgModule({
  declarations: [AppComponent, LoginPage],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HomePageModule,
        ClienteTabsPageModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        MaskitoModule,
        IonicModule.forRoot(),
    ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }, EnvService, AuthService, RotasService, DatabaseProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
