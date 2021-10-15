import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  date!: string;
  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.post = this.postsService.getPost(params['id']);
      this.date = moment(this.post.date).format("DD/MM/YYYY");
    })
  }

}
