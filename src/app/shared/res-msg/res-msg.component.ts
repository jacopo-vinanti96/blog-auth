import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-res-msg',
  templateUrl: './res-msg.component.html',
  styleUrls: ['./res-msg.component.scss']
})
export class ResMsgComponent implements OnInit {
  @Input('error') error!: string;
  @Input('success') success!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
