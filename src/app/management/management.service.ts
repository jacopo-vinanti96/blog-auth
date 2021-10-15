import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { take, tap } from "rxjs/operators";
import { Post } from "../posts/post.model";

@Injectable({providedIn: 'root'})
export class ManagementService {
    
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    userPosts!: Post[];
    refresh = new BehaviorSubject<Post[]>([]);
    resMsg = new Subject<{msg: string, error: boolean}>();
        
        createPost(post: Post) { 
            const user = this.getUserData();
            if (user) {
                this.http.post('http://localhost:8080/api/create.php', {
                     ...post, email: user.email, token: user.token })
                .subscribe(
                    () => {
                        this.refreshRoute();
                        this.onSubRes('New post created successfully', false);
                    },
                    () => this.onSubRes('Not authorized, please try logging again', true)
                );
            } else {
                this.onSubRes('User session ended, please log in', true);
            }
        }

        updatePost(post: Post) {
            const user = this.getUserData();
            if (user) {
                this.http.post('http://localhost:8080/api/update.php', {
                     ...post, email: user.email, token: user.token })
                .subscribe(
                    () => {
                        this.refreshRoute();
                        this.onSubRes('Post updated successfully', false);
                    },
                    () => this.onSubRes('Not authorized, please try logging again', true)
                );
            } else {
                this.onSubRes('User session ended, please log in', true);
            }
        }

        deletePost(id: number) {
            const user = this.getUserData();
            if (user) {
                this.http.post('http://localhost:8080/api/delete.php', {
                     id: id, email: user.email, token: user.token })
                .subscribe(
                    () => {
                        this.refreshRoute();
                        this.onSubRes('Post deleted successfully', false);
                    },
                    () => this.onSubRes('Not authorized, please try logging again', true)
                );
            } else {
                this.onSubRes('User session ended, please log in', true);
            }
        }

        fetchPosts() {
            const user = this.getUserData();
            return this.http.post<Post[]>('http://localhost:8080/api/user-read.php', {
                email: user.email, token: user.token
            })
            .pipe( take(1), tap( res => {
                if (res != undefined) {
                    this.userPosts = res;
                    this.refresh.next(this.userPosts);
                } else {
                    this.userPosts = [];
                    this.refresh.next(this.userPosts);
                }
            }));
        }

        getPosts() {
            return this.userPosts.slice();
        }

        getPost(id: number) {
            return this.userPosts.filter( el => el.id === id )[0];
        }

        getUserData() {
            let userData = localStorage.getItem('userData');
            if (userData) {
                return JSON.parse(userData);
            }
            return false;
        }

        refreshRoute() {
            this.router.navigate(['/management']);
        }

        onSubRes(msg: string, isErr: boolean) {
            this.resMsg.next({ 
              msg: msg, 
              error: isErr
            });
        }
}