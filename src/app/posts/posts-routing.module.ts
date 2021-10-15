import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsComponent } from './posts.component';
import { PostsResolver } from './posts.resolver';



const routes: Routes = [
  {path:'', component: PostsComponent, resolve: [PostsResolver], children: [
    {path: ':id', component: PostDetailComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
