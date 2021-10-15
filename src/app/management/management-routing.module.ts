import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { ManagementResolver } from './management.resolver';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ManagementEditComponent } from './management-edit/management-edit.component';
import { CanDeactivateEdit } from './deactivate-guard.service';

const routes: Routes = [
  {path:'', component: ManagementComponent, 
  resolve: [ManagementResolver], runGuardsAndResolvers: (curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot) => {
    return future.children.toString() == '' || future.children.toString() == curr.children.toString() ? true : false
  },
  canActivate: [AuthGuardService], children: [
    {path:'new', component: ManagementEditComponent, canDeactivate: [CanDeactivateEdit]},
    {path:':id/edit', component: ManagementEditComponent, canDeactivate: [CanDeactivateEdit]}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
