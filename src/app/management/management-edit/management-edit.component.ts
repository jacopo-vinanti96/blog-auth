import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-management-edit',
  templateUrl: './management-edit.component.html',
  styleUrls: ['./management-edit.component.scss']
})
export class ManagementEditComponent implements OnInit {
  editMode = !!this.route.snapshot.params['id'];
  title = 'Un post';
  content = '';
  img = '';
  constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
      console.log(this.editMode);
    }

    onSubmit() {

    }

}
