import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  title = '';
  content = '';
  img = '';
  genre = 'economy';

  constructor() { }

  ngOnInit(): void {
  }

}