import {NgModule} from '@angular/core';
import {PreloadAllModules, provideRouter, RouterModule, Routes, withComponentInputBinding} from '@angular/router';
import {LoginPage} from "./login/login.page";
import {ClienteTabsPage} from "./cliente/cliente-tabs/cliente-tabs.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'carteira',
    loadChildren: () => import('./cliente/carteira/carteira.module').then(m => m.CarteiraPageModule)
  },
  {
    path: 'sincronizacao',
    loadChildren: () => import('./sincronizacao/sincronizacao.module').then(m => m.SincronizacaoPageModule)
  },
  {
    path: 'carteira',
    loadChildren: () => import('./cliente/carteira/carteira.module').then(m => m.CarteiraPageModule)
  },
  {
    path: 'cliente/:id',
    component: ClienteTabsPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'potencial',
      },
      {
        path: 'potencial',
        loadChildren: () => import('./cliente/cliente-potencial/cliente-potencial.module').then(m => m.ClientePotencialPageModule)
      },
      {
        path: 'ficha',
        loadChildren: () => import('./cliente/cliente-ficha/cliente-ficha.module').then( m => m.ClienteFichaPageModule)
      }
    ]
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [provideRouter(routes, withComponentInputBinding())],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
