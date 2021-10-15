import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ResMsgComponent } from './res-msg/res-msg.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    PostItemComponent,
    ResMsgComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    PostItemComponent,
    ResMsgComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
