import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageModule} from "./home/home.module";
import {HttpClientModule} from "@angular/common/http";
import {EnvService} from "./service/env.service";
import {AuthService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginPage} from "./login/login.page";
import "reflect-metadata";
import {DatabaseProvider} from "../utils/database";

@NgModule({
  declarations: [AppComponent, LoginPage],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, EnvService, AuthService, DatabaseProvider],
  bootstrap: [AppComponent],
})
export class AppModule {
}
