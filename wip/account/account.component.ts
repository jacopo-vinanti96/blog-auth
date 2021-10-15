import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData } from '../auth/auth.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  email = '';
  name = '';
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    const userData = this.accountService.getData();
    if (userData) {
      this.email = userData.email;
    }
  }
  
  onSubmitName(form: NgForm) {
    
  }

}
