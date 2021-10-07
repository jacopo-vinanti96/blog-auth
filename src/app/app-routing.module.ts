import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementEditComponent } from './management/management-edit/management-edit.component';
import { ManagementComponent } from './management/management.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostsComponent } from './posts/posts.component'

const routes: Routes = [
  {path:'', redirectTo:'posts', pathMatch: 'full'},
  {path:'posts', component: PostsComponent, children: [
    {path: ':id', component: PostDetailComponent}
  ]},
  {path:'management', component: ManagementComponent, children: [
    {path:'new', component: ManagementEditComponent},
    {path:':id/edit', component: ManagementEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
