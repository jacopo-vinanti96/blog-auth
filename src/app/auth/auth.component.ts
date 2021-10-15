import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin!: boolean;
  email = '';
  password = '';
  hide = true;
  isLoading = false;
  error?: string;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.queryParams.subscribe(queryParams => {
        this.isLogin = this.route.snapshot.queryParams.isLogin == 'true'? true : false;
      });
    }

    onSubmit(authForm: NgForm) {
      this.isLoading = true;
      let authObs: Observable<AuthResponseData>;
      const user = {
        email: authForm.value.email,
        psw: authForm.value.password
      }
      if (this.isLogin) {
        authObs = this.authService.onLogin(user);
      } else {
        authObs = this.authService.onSignIn(user);
      }
      authObs.subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['posts']);
        }, error => {
          this.error = error;
          const destroyMsg = setTimeout(
            () => {
              this.error = undefined;
            }, 6000
          )
        }
      )
    }

}
