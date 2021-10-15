import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: Post[] = [];
  listActive = new Subject<boolean>()

  constructor(private http: HttpClient) { }
    
    fetchPosts() {
      let fetchedPosts!: Post[];
      
      return this.http.get<Post[]>('http://localhost:8080/api/read.php')
      .pipe( take(1), tap(
        res => { fetchedPosts = res;
          if (fetchedPosts != undefined) {
            this.posts = fetchedPosts;
            return fetchedPosts;
          } else {
            return [];
          }
        }
      ))
    }

    searchPosts(query: string) {
      return this.http.get<Post[]>('http://localhost:8080/api/search.php?q='+query)
      .pipe( take(1), map(
        res => {
          if (res != undefined) {
            return res;
          } else {
            return [];
          }
        }
      ))
    }

    getPost(id: number): Post {
      return this.posts.filter( el => el.id === id )[0];
    }

    getPosts(): Post[] {
      return this.posts.slice();
    }
    
    getUserPosts() {
      return this.posts.slice();
    }
}
