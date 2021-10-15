import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../posts/post.model';
import { ManagementService } from './management.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementResolver implements Resolve<Post[]> {
  constructor (private managementService: ManagementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.managementService.fetchPosts();
  }
}
