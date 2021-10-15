import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  listActive = true;
  isMobile!: boolean;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1025 ? true : false;
    if (!this.isMobile) {
      this.listActive = true;
    }
  }

  @ViewChild('search') search!: ElementRef;

  constructor(private postsService: PostsService) { }

    ngOnInit(): void {
      this.isMobile = window.innerWidth < 1025 ? true : false;
      this.posts = this.postsService.getPosts();
    }

    onSearch() {
      this.postsService.searchPosts(this.search.nativeElement.value).subscribe(
        res => this.posts = res
      )
    }

}
