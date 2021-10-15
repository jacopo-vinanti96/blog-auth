import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Post[]> {
  constructor(private postsService: PostsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
          return this.postsService.fetchPosts();
    }
}
