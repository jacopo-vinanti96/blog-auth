import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { ManagementEditComponent } from './management-edit/management-edit.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ManagementRoutingModule } from './management-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ManagementComponent,
    ManagementEditComponent
  ],
  imports: [
    CommonModule, 
    MatButtonToggleModule, 
    ManagementRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    ManagementComponent,
    ManagementEditComponent
  ]
})
export class ManagementModule { }
