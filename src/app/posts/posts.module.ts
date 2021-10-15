import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PostsComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    PostsComponent,
    PostDetailComponent
  ]
})
export class PostsModule { }
