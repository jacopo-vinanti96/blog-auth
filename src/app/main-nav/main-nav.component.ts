import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  isAuth = false;
  open = false;
  isMobile!: boolean;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1025 ? true : false;
  }
  constructor(private authService: AuthService) { }

    ngOnInit(): void {
      this.isMobile = window.innerWidth < 1025 ? true : false;
      this.authService.user.subscribe(
        user => {
          if (!!user) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
        }
      )
    }

    onLogout() {
      this.authService.onLogout();
    }

}
