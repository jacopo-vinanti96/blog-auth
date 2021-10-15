import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Page404Component } from './errors/page404.component';

const routes: Routes = [
  {path:'', redirectTo:'posts', pathMatch: 'full'},
  {path:'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)},
  {path:'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)},
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'**', component: Page404Component},
  /* {path:'account', component: AccountComponent, canActivate: [AuthGuardService]} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
