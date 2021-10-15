import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import { CanEditDeactivate } from '../can-edit-deactivate';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-management-edit',
  templateUrl: './management-edit.component.html',
  styleUrls: ['./management-edit.component.scss']
})


export class ManagementEditComponent implements OnInit, CanEditDeactivate {
  @ViewChild('postForm') form!: NgForm;
  post!: Post;
  editMode = !!this.route.snapshot.params['id'];
  id = 0;
  title = '';
  content = '';
  img = '';
  tag = '';
  tags: string[] = [];
  visible = 0;
  msg = '';
  submitted = false;
  isMobile!: boolean;
  isLoading = false;
  
  constructor(
    private route: ActivatedRoute, 
    private managementService: ManagementService) { }
    
    canDeactivate(): boolean | Observable<boolean> {
      if (this.form != undefined && this.form.form.dirty && !this.submitted) {
        const result = window.confirm('There are unsaved changes! Are you sure?');
        if (result) {
          this.form.form.markAsPristine();
        }
        return of(result);
      }
      return true;
    }

    ngOnInit(): void {
      if (this.editMode) {
        this.route.params.subscribe(params => {
          this.post = this.managementService.getPost(params['id']);
          this.msg = '';
          if (this.post) {
            this.title = this.post.title;
            this.content = this.post.content;
            this.img = this.post.img;
            this.tags = [...this.post.tags];
            this.visible = this.post.visible;
            this.id = this.post.id;
          } else {
            this.msg = 'Could not find the requested post';
          }
        })
      }
      
      this.managementService.resMsg.subscribe(
        () => this.isLoading = false
      )
    }

    onSubmit(form: NgForm) {
      this.submitted = true;
      const date = !!this.post? this.post.date : new Date();
      const post = new Post(
        this.id, form.value.title, form.value.content, this.tags, 
        form.value.visible, form.value.img, date
      )
      this.isLoading = true;
      if (this.editMode) {
        this.managementService.updatePost(post);
      } else {
        this.managementService.createPost(post);
      }
    }

    onDelete() {
      /* const isSure = prompt("Are you sure you want to delete this post? If you proceed it won' t be recoverable"); */
      const result = window.confirm(
        `Are you sure you want to delete this post? 
        If you proceed it won' t be recoverable`
        );
        if (result) {
          this.managementService.deletePost(this.id);
        }
    }

    addTag() {
      this.tags.push(this.tag);
      this.tag = '';
    }

}
