import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../posts/post.model';
import { ManagementService } from './management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  posts: Post[] = [];
  refSub!: Subscription;
  msgSub!: Subscription;
  msg?: {msg: string, error: boolean};
  listActive = true;
  isMobile!: boolean;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1025 ? true : false;
    if (!this.isMobile) {
      this.listActive = true;
    }
  }

  constructor(private managementService: ManagementService) { }

    ngOnInit(): void {
      this.isMobile = window.innerWidth < 1025 ? true : false;
      this.posts = this.managementService.getPosts();
      this.refSub = this.managementService.refresh.subscribe(
        posts => this.posts = posts
      );
      this.msgSub = this.managementService.resMsg.subscribe(
        msg => {
          this.msg = msg;
          if (this.isMobile && !msg.error) {
            this.listActive = true;
          }
          const destroyMsg = setTimeout(
            () => {
              this.msg = undefined;
            }, 6000
          )
        } 
      )
    }

}
